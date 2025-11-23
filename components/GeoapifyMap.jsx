import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import { verticalScale } from 'react-native-size-matters';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// SECURITY: Ensure EXPO_PUBLIC_GEOAPIFY_API_KEY is in your .env file
const API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

export default function GeoapifyMap({ initialLocation, onConfirm, placeholder }) {
  const [loading, setLoading] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(initialLocation?.address || "Pan map to select...");
  const [currentCoords, setCurrentCoords] = useState(initialLocation || null);

  // --- Search State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const webViewRef = useRef(null);

  // 1. DEFAULT LOCATION: Jasaan Center
  const startLat = initialLocation?.latitude || 8.651770;
  const startLon = initialLocation?.longitude || 124.751999;

  // --- HTML Content ---
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; background-color: #141519; }
          #map { width: 100%; height: 100vh; }

          /* Center Pin Styling */
          #center-marker {
            position: absolute;
            top: 50%; left: 50%;
            width: 40px; height: 40px;
            margin-top: -40px; margin-left: -20px;
            z-index: 1000; pointer-events: none;
            background-image: url('https://api.geoapify.com/v1/icon/?type=awesome&color=%233bf579&size=large&icon=map-pin&iconSize=small&apiKey=${API_KEY}');
            background-repeat: no-repeat; background-size: contain;
          }
          .leaflet-control-attribution {
            background: rgba(255,255,255,0.8) !important;
            color: #333 !important;
            font-size: 10px;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <div id="center-marker"></div>

        <script>
          // --- BOUNDING BOX CONFIGURATION ---
          // Define the allowed area (Jasaan and immediate surroundings)
          // Format: [[South-West Lat, Lon], [North-East Lat, Lon]]
          const southWest = [8.5800, 124.7000];
          const northEast = [8.7200, 124.8200];
          const bounds = L.latLngBounds(southWest, northEast);

          var map = L.map('map', {
            zoomControl: false,
            attributionControl: true,
            // --- CREDIT SAVING LIMITS ---
            maxBounds: bounds,       // 1. Hard limit on panning
            maxBoundsViscosity: 1.0, // 2. Solid edges (no bouncing out)
            minZoom: 13,             // 3. Prevent zooming out to see the world
            maxZoom: 18              // Optional: Prevent extreme zoom
          }).setView([${startLat}, ${startLon}], 15);

          const isRetina = L.Browser.retina;

          const baseUrl = "https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${API_KEY}";
          const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}@2x.png?apiKey=${API_KEY}";

          L.tileLayer(isRetina ? retinaUrl : baseUrl, {
            attribution: 'Powered by Geoapify | © OpenStreetMap',
            maxZoom: 20,
            id: 'osm-carto',
            bounds: bounds // Hint to tile layer to not request outside
          }).addTo(map);

          function debounce(func, wait) {
            let timeout;
            return function(...args) {
              clearTimeout(timeout);
              timeout = setTimeout(() => func.apply(this, args), wait);
            };
          }

          map.on('moveend', debounce(function() {
            var center = map.getCenter();
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'moveEnd',
              latitude: center.lat,
              longitude: center.lng
            }));
          }, 500));

        </script>
      </body>
    </html>
  `;

  // --- API Functions ---

  const fetchAddress = async (lat, lon) => {
    if (!API_KEY) return;
    try {
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const formatted = data.features[0].properties.formatted;
        setCurrentAddress(formatted);
        setCurrentCoords({ latitude: lat, longitude: lon, address: formatted });
      }
    } catch (error) { console.error("Geocoding error:", error); }
  };

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.length < 3) { setSuggestions([]); return; }
    try {
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&filter=rect:124.7000,8.5800,124.8200,8.7200&apiKey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
      setIsSearching(true);
    } catch (error) { console.error("Autocomplete Error", error); }
  };

  const handleSelectSuggestion = (item) => {
    const { lat, lon, formatted } = item.properties;
    setSearchQuery(formatted);
    setCurrentAddress(formatted);
    setCurrentCoords({ latitude: lat, longitude: lon, address: formatted });
    setSuggestions([]);
    setIsSearching(false);
    Keyboard.dismiss();
    webViewRef.current?.injectJavaScript(`map.setView([${lat}, ${lon}], 17); true;`);
  };

  const handleMyLocation = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access to use this feature.');
        setLoading(false);
        return;
      }

      const providerStatus = await Location.getProviderStatusAsync();
      if (!providerStatus.locationServicesEnabled) {
        Alert.alert('GPS Off', 'Please enable location services.');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;

      // 4. Validate if User is inside Jasaan Bounds
      // Simple Check: Lat must be between 8.58 and 8.72, Lon between 124.70 and 124.82
      if (latitude < 8.58 || latitude > 8.72 || longitude < 124.70 || longitude > 124.82) {
         Alert.alert("Out of Service Area", "Your GPS location is outside our service area (Jasaan).");
         setLoading(false);
         return;
      }

      const injectScript = `
        map.setView([${latitude}, ${longitude}], 17);
        true;
      `;
      webViewRef.current?.injectJavaScript(injectScript);
      await fetchAddress(latitude, longitude);

    } catch (error) {
      console.error("GPS Error:", error);
      Alert.alert('Error', 'Could not fetch your current location.');
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'moveEnd') fetchAddress(data.latitude, data.longitude);
    } catch (err) {}
  };

  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search address..."
          placeholderTextColor="#87AFB9"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {isSearching && suggestions.length > 0 && (
          <View style={styles.suggestionsList}>
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectSuggestion(item)}>
                  <Text style={styles.suggestionText}>{item.properties.formatted}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        style={styles.webview}
        onMessage={handleMessage}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled={true}
        allowFileAccess={false}
      />

      <TouchableOpacity style={styles.myLocationButton} onPress={handleMyLocation}>
        <MaterialIcons name="my-location" size={24} color="#0AB3FF" />
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3BF579" />
        </View>
      )}

      <View style={styles.bottomCard}>
        <Text style={styles.label}>{placeholder || "Selected Location"}</Text>
        <Text style={styles.address} numberOfLines={2}>{currentAddress}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={() => currentCoords && onConfirm && onConfirm(currentCoords)}>
          <Text style={styles.confirmText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  webview: { flex: 1, backgroundColor: '#141519' },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#141519', justifyContent: 'center', alignItems: 'center', zIndex: 2 },

  searchContainer: { position: 'absolute', top: verticalScale(50), left: 20, right: 20, zIndex: 100 },
  searchInput: { backgroundColor: '#363D47', color: '#FFFFFF', borderRadius: 10, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#22262F', elevation: 5 },
  suggestionsList: { marginTop: 5, backgroundColor: '#363D47', borderRadius: 10, maxHeight: 200, borderWidth: 1, borderColor: '#22262F' },
  suggestionItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#22262F' },
  suggestionText: { color: '#B0C4D4', fontSize: 14 },

  myLocationButton: {
    position: 'absolute',
    bottom: verticalScale(180),
    right: 20,
    backgroundColor: '#363D47',
    padding: 12,
    borderRadius: 30,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#22262F',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomCard: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#363D47', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: verticalScale(30), elevation: 10 },
  label: { color: '#87AFB9', fontSize: 12, fontFamily: 'Roboto-Regular', marginBottom: 5 },
  address: { color: '#FFFFFF', fontSize: 16, fontFamily: 'Roboto-Bold', marginBottom: 20 },
  confirmButton: { backgroundColor: '#3BF579', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  confirmText: { color: '#000000', fontSize: 16, fontFamily: 'Roboto-Bold' }
});