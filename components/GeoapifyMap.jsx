import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';

const GEOAPIFY_API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;
const MAP_STYLE = "osm-bright";
const TILE_URL = `https://maps.geoapify.com/v1/tile/${MAP_STYLE}/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`;

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

/**
 * Props:
 * - initialLocation: { latitude, longitude } (Optional)
 * - onConfirm: (locationData) => void (REQUIRED: Returns { latitude, longitude, address })
 * - placeholder: string (Optional)
 */
export default function GeoapifyMap({ initialLocation, onConfirm, placeholder }) {
  const mapRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Default to Dapitan City or provided initialLocation
  const [region, setRegion] = useState({
    latitude: initialLocation?.latitude || 8.6533,
    longitude: initialLocation?.longitude || 123.4252,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005 * ASPECT_RATIO,
  });

  // Current selected location (center of map)
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: initialLocation?.latitude || 8.6533,
    longitude: initialLocation?.longitude || 123.4252,
    address: ""
  });

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isManualSearch, setIsManualSearch] = useState(false);

  // Sync local state if prop changes
  useEffect(() => {
    if (initialLocation) {
      setRegion(prev => ({
        ...prev,
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude
      }));
      // We might want to reverse geocode here if address is missing, 
      // but usually initialLocation comes from context which has address.
      setSelectedLocation(prev => ({
        ...prev,
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        address: initialLocation.address || prev.address
      }));
      setQuery(initialLocation.address || "");
    }
  }, [initialLocation]);

  // ----------------- SEARCH LOGIC (Autocomplete) -----------------
  const handleSearchChange = (text) => {
    setQuery(text);
    setIsManualSearch(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (text.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceTimeout.current = setTimeout(() => fetchSuggestions(text), 500);
  };

  const fetchSuggestions = async (text) => {
    setLoading(true);
    try {
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&filter=countrycode:ph&apiKey=${GEOAPIFY_API_KEY}`;
      const response = await fetch(url);
      const json = await response.json();
      if (json.features) {
        setSuggestions(json.features);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Geoapify Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSuggestionPress = (feature) => {
    const { lat, lon, formatted } = feature.properties;
    const newLocation = {
      latitude: lat,
      longitude: lon,
      address: formatted
    };

    setSelectedLocation(newLocation);
    setQuery(formatted);
    setSuggestions([]);
    setShowSuggestions(false);
    setIsManualSearch(false);
    Keyboard.dismiss();

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005 * ASPECT_RATIO,
      }, 1000);
    }
  };

  // ----------------- REVERSE GEOCODING (On Drag) -----------------
  const handleRegionChangeComplete = async (newRegion) => {
    // Update region state
    setRegion(newRegion);

    // If this was triggered by selecting a suggestion, don't reverse geocode immediately
    // to avoid overwriting the specific address with a generic one.
    // However, if the user drags, we MUST reverse geocode.
    // We can check if the center actually changed significantly or use a flag.
    // For simplicity, we'll just reverse geocode the center.

    // Skip if we just selected a manual search result (optional optimization, 
    // but user might drag immediately after). 
    // Let's always reverse geocode on drag end to be safe, unless it's a very small movement?
    // Or better: if isManualSearch is true, we skip ONE reverse geocode? 
    // Actually, onSuggestionPress animates the map, which triggers this.
    // We can use a timeout or flag.

    // Simple approach: Always reverse geocode the center.
    // But we need to update the TextInput.

    try {
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${newRegion.latitude}&lon=${newRegion.longitude}&apiKey=${GEOAPIFY_API_KEY}`;
      const response = await fetch(url);
      const json = await response.json();
      if (json.features && json.features.length > 0) {
        const formatted = json.features[0].properties.formatted;

        // Only update if we are NOT currently typing a search (though keyboard is likely dismissed)
        // and if the location is different enough?

        // If the user selected a suggestion, the map moves there. 
        // The reverse geocode might return a slightly different string than the suggestion.
        // We should probably trust the suggestion if it was just selected.

        // Let's check if the coordinate matches the selectedLocation (from suggestion).
        const dist = Math.sqrt(
          Math.pow(newRegion.latitude - selectedLocation.latitude, 2) +
          Math.pow(newRegion.longitude - selectedLocation.longitude, 2)
        );

        // If distance is small (map didn't move much), maybe don't overwrite address?
        // But if user drags, distance is large.

        // For now, let's update it.
        setSelectedLocation({
          latitude: newRegion.latitude,
          longitude: newRegion.longitude,
          address: formatted
        });
        setQuery(formatted);
      }
    } catch (error) {
      console.error("Reverse Geocode Error:", error);
    }
  };

  // ----------------- CONFIRMATION -----------------
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedLocation);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          mapType={Platform.OS === 'android' ? "none" : "standard"}
          rotateEnabled={false}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          <UrlTile urlTemplate={TILE_URL} maximumZ={19} flipY={false} zIndex={-1} />
          {/* Center Marker is static in the view, not a map marker moving with map */}
        </MapView>

        {/* Fixed Center Marker */}
        <View style={styles.centerMarkerContainer} pointerEvents="none">
          {/* Use a simple View or Image for the pin */}
          <View style={styles.pin} />
          <View style={styles.pinPoint} />
        </View>

        {/* CONFIRM BUTTON */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder={placeholder || "Search address..."}
            value={query}
            onChangeText={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
          />
          {loading && <ActivityIndicator size="small" color="#000" style={{ marginRight: 10 }} />}
        </View>

        {showSuggestions && suggestions.length > 0 && (
          <View style={styles.suggestionsListContainer}>
            <FlatList
              data={suggestions}
              keyExtractor={item => item.properties.place_id || Math.random().toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => onSuggestionPress(item)}
                >
                  <Text style={styles.mainText} numberOfLines={1}>{item.properties.address_line1}</Text>
                  <Text style={styles.subText} numberOfLines={1}>{item.properties.address_line2}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mapContainer: { flex: 1, width: '100%', height: '100%' },
  map: { ...StyleSheet.absoluteFillObject },
  centerMarkerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -35, // Adjust based on pin size
    alignItems: 'center',
    justifyContent: 'center'
  },
  pin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#22c55e',
    borderWidth: 3,
    borderColor: 'white',
  },
  pinPoint: {
    width: 4,
    height: 15,
    backgroundColor: '#22c55e',
    marginTop: -2
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    width: '90%',
    alignSelf: 'center',
    zIndex: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  input: { flex: 1, padding: 15, fontSize: 16, color: '#000' },
  suggestionsListContainer: {
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 8,
    maxHeight: 200,
    elevation: 5,
  },
  suggestionItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  mainText: { fontWeight: 'bold', fontSize: 14 },
  subText: { color: '#666', fontSize: 12 },
  footerContainer: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
  },
  confirmButton: {
    backgroundColor: '#22c55e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});