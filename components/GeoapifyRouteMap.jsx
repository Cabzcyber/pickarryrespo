// components/GeoapifyRouteMap.jsx
import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

// Added 'interactive' prop (default false to protect other screens)
export default function GeoapifyRouteMap({ pickup, dropoff, interactive = false }) {
  const webViewRef = useRef(null);

  if (!API_KEY) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{color: 'red'}}>Error: EXPO_PUBLIC_GEOAPIFY_API_KEY is missing.</Text>
      </View>
    );
  }

  // Default: Jasaan Center
  const defaultLat = 8.6533;
  const defaultLon = 124.7533;

  const mapKey = `${pickup?.latitude}-${pickup?.longitude}-${dropoff?.latitude}-${dropoff?.longitude}-${interactive}`;

  const getRouteHtml = () => {
    const startLat = pickup?.latitude || defaultLat;
    const startLon = pickup?.longitude || defaultLon;
    const endLat = dropoff?.latitude || defaultLat;
    const endLon = dropoff?.longitude || defaultLon;
    const hasRoute = pickup && dropoff;

    // Dynamic Leaflet Settings based on 'interactive' prop
    const interactionSettings = interactive ? 'true' : 'false';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            html, body { margin: 0; padding: 0; height: 100%; background-color: #141519; }
            #map { width: 100%; height: 100%; }
            .custom-pin { filter: drop-shadow(0px 3px 2px rgba(0,0,0,0.5)); }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            var map = L.map('map', {
              zoomControl: ${interactionSettings},
              dragging: ${interactionSettings},
              scrollWheelZoom: ${interactionSettings},
              doubleClickZoom: ${interactionSettings},
              touchZoom: ${interactionSettings},
              attributionControl: false
            }).setView([${startLat}, ${startLon}], 15);

            L.tileLayer('https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${API_KEY}', {
              maxZoom: 20
            }).addTo(map);

            var startIcon = L.icon({
              iconUrl: 'https://api.geoapify.com/v1/icon/?type=awesome&color=%233bf579&size=large&icon=map-pin&apiKey=${API_KEY}',
              iconSize: [31, 46],
              iconAnchor: [15.5, 42],
              className: 'custom-pin'
            });

            var endIcon = L.icon({
              iconUrl: 'https://api.geoapify.com/v1/icon/?type=awesome&color=%23ff4444&size=large&icon=flag-checkered&apiKey=${API_KEY}',
              iconSize: [31, 46],
              iconAnchor: [15.5, 42],
              className: 'custom-pin'
            });

            if (${!!pickup}) L.marker([${startLat}, ${startLon}], {icon: startIcon}).addTo(map);
            if (${!!dropoff}) L.marker([${endLat}, ${endLon}], {icon: endIcon}).addTo(map);

            if (${!!hasRoute}) {
              fetch('https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLon}|${endLat},${endLon}&mode=drive&details=instruction_details&apiKey=${API_KEY}')
                .then(res => res.json())
                .then(data => {
                  if (data.features) {
                    var routeLayer = L.geoJSON(data, {
                      style: { color: '#0AB3FF', weight: 5, opacity: 0.8 }
                    }).addTo(map);
                    map.fitBounds(routeLayer.getBounds(), { padding: [50, 50] });
                  }
                })
                .catch(err => console.error(err));
            }
          </script>
        </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        key={mapKey}
        originWhitelist={['*']}
        source={{ html: getRouteHtml() }}
        style={styles.webview}
        javaScriptEnabled={true}
        scrollEnabled={interactive} // Allow Native Scroll if interactive
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  webview: { flex: 1, backgroundColor: '#141519' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#141519' }
});