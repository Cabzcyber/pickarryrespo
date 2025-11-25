import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { verticalScale } from 'react-native-size-matters';
import { decode } from 'base64-arraybuffer';

import { useOrderDetails } from '../../../hooks/useOrderDetails';
import { broadcastLocation } from '../../../services/LocationService';
import { supabase } from '../../../lib/supabase';

// Components
import GeoapifyRouteMap from '../../../components/GeoapifyRouteMap';

// Assets
const headerlogo = require("@/assets/images/headerlogo.png");
const viewIcon = require("@/assets/images/eye.png");
const geopick = require("@/assets/images/geopick.png");
const geodrop = require("@/assets/images/geodrop.png");
const goodimg = require("@/assets/images/goodimg.png");
const urgent = require("@/assets/images/urgent.png");

const DeliverOngoing = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

  // DESTUCTURE 'refetch' HERE
  const { order, loading, refetch } = useOrderDetails(orderId);

  const [assets, setAssets] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  // 1. LOCATION TRACKING
  useEffect(() => {
    let sub;
    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      sub = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 10000, distanceInterval: 20
      }, (loc) => {
        if (orderId) broadcastLocation(orderId, loc.coords.latitude, loc.coords.longitude);
      });
    };
    startTracking();
    return () => sub?.remove();
  }, [orderId]);

  // 2. PICK IMAGE
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5, base64: true,
    });
    if (!result.canceled) setAssets(result.assets);
  };

  // --- 3. ACTION HANDLER (WITH FORCED REFRESH) ---
  const handleAction = async () => {
    if (!order) return;

    // CASE A: Pickup -> Ongoing
    if (order.deliverystatus_id === 2) {
        try {
            setIsSubmitting(true);
            const { error } = await supabase
                .from('order')
                .update({ deliverystatus_id: 3 })
                .eq('order_id', orderId);

            if (error) throw error;

            Alert.alert("Picked Up", "Proceed to dropoff location.");


            await refetch();

        } catch (e) {
            Alert.alert("Error", e.message);
        } finally {
            setIsSubmitting(false);
        }
    }
    // CASE B: Dropoff -> Complete
    else if (order.deliverystatus_id === 3) {
        if (assets.length === 0) {
            Alert.alert("Proof Required", "Please upload a photo.");
            return;
        }

        try {
            setIsSubmitting(true);
            const { data: { user } } = await supabase.auth.getUser();
            const imageFile = assets[0];
            const fileName = `${user.id}/proof_${orderId}_${Date.now()}.jpg`;

            const { error: uploadError } = await supabase.storage
                .from('licenses')
                .upload(fileName, decode(imageFile.base64), { contentType: 'image/jpeg' });
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('licenses').getPublicUrl(fileName);

            const { error: updateError } = await supabase
                .from('order')
                .update({
                    deliverystatus_id: 4,
                    goods_receivedimg: publicUrl
                })
                .eq('order_id', orderId);

            if (updateError) throw updateError;

            router.replace({ pathname: '/(courier)/home/delivercomplete', params: { orderId } });

        } catch (err) {
            Alert.alert("Error", err.message);
        } finally {
            setIsSubmitting(false);
        }
    }
  };

  if (loading || !order) return <ActivityIndicator size="large" color="#3BF579" style={{marginTop:50}} />;

  const goodsImages = order.goods_image1 ? [{ uri: order.goods_image1 }] : [];

  // Status Logic
  const isPickupPhase = order.deliverystatus_id === 2;
  const isDropoffPhase = order.deliverystatus_id === 3;

  // Map Coords
  const pickupCoords = { latitude: order.pickup_latitude, longitude: order.pickup_longitude };
  const dropoffCoords = { latitude: order.dropoff_latitude, longitude: order.dropoff_longitude };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.mapContainer}>
           <GeoapifyRouteMap pickup={pickupCoords} dropoff={dropoffCoords} interactive={true} />
           {showDetails && <View style={styles.dimOverlay} />}
        </View>

        <View style={styles.header}>
           <Image source={headerlogo} style={styles.logo}/>
           <Pressable
             style={[styles.headerbutton, !showDetails && styles.headerButtonActive]}
             onPress={() => setShowDetails(!showDetails)}
           >
             <Image source={viewIcon} style={[styles.iconSmall, !showDetails && { tintColor: '#3BF579' }]} />
             <Text style={styles.viewText}>{showDetails ? "Hide" : "View"}</Text>
           </Pressable>
        </View>

        {showDetails && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
            <View style={styles.mainContent}>
               <View style={styles.cardContainer}>
                 <View style={styles.orderinfo}>
                    <View style={styles.info}>
                      <Text style={styles.infotext}>Delivery #{order.order_id}</Text>
                      <Text style={styles.infosubtext}>
                        {isPickupPhase ? 'Heading to Pickup' : 'Heading to Dropoff'}
                      </Text>
                    </View>
                    <View style={styles.farecontainer}>
                      <Text style={styles.totalfare}>₱ {order.total_fare}</Text>
                    </View>
                  </View>

                  <View style={styles.locationcontainer1}>
                    <View style={[styles.sublocationcontainer, {opacity: isPickupPhase ? 1 : 0.5}]}>
                      <Image source={geopick} style={styles.geopickicon}/>
                      <Text style={styles.sublocationtext}>{order.pickup_address}</Text>
                    </View>
                    <View style={[styles.sublocationcontainer, {opacity: isDropoffPhase ? 1 : 0.5}]}>
                      <Image source={geodrop} style={styles.geodropicon}/>
                      <Text style={styles.sublocationtext}>{order.dropoff_address}</Text>
                    </View>
                  </View>

                  {/* Upload Proof Section */}
                  {isDropoffPhase && (
                    <View style={styles.imagePickerContainer}>
                       <Pressable onPress={pickImage} style={styles.imgbutton}>
                         <Text style={styles.uploadButtonText}>
                           {assets.length > 0 ? 'Photo Selected' : 'Take Proof Photo'}
                         </Text>
                       </Pressable>
                       <View style={styles.imageListContainer}>
                         {assets.map((item, idx) => (
                           <Image key={idx} source={{ uri: item.uri }} style={styles.selectedImage} />
                         ))}
                       </View>
                    </View>
                  )}

                  {/* Actions */}
                  {isSubmitting ? (
                    <ActivityIndicator size="large" color="#3BF579" style={{marginTop: 20}} />
                  ) : (
                    <View style={{gap: 10, marginTop: 20}}>
                        <Pressable style={styles.mainbutton} onPress={handleAction}>
                          <Text style={styles.maintextbutton}>
                             {isPickupPhase ? 'Confirm Pickup' : 'Confirm Delivery'}
                          </Text>
                        </Pressable>
                    </View>
                  )}
               </View>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

// Use your existing Styles object here (omitted for brevity)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapContainer: { ...StyleSheet.absoluteFillObject },
  dimOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: verticalScale(30), zIndex: 100 },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  headerbutton: { flexDirection: 'row', alignItems: 'center', backgroundColor:'#22262F', padding: 8, borderRadius: 10, gap: 6 },
  headerButtonActive: { borderColor: '#3BF579', borderWidth: 1 },
  iconSmall: { width: 18, height: 18, resizeMode: 'contain', tintColor: '#8796AA' },
  viewText: { color: '#8796AA', fontSize: 12 },
  scrollView: { flex: 1, zIndex: 10 },
  mainContent: { padding: 20, paddingTop: 10 },
  cardContainer: { backgroundColor: 'rgba(20, 21, 25, 0.95)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#363D47' },
  orderinfo: { flexDirection:'row', justifyContent:'space-between', marginBottom: 20 },
  infotext: { color:'white', fontSize:20, fontWeight:'bold' },
  infosubtext: { color:'#8796AA', fontSize:14 },
  farecontainer: { backgroundColor:'#192028', padding: 10, borderRadius:10 },
  totalfare: { color:'#87AFB9', fontSize:18 },
  locationcontainer1: { marginTop:16, backgroundColor:'#363D47', borderRadius:14, padding:12 },
  sublocationcontainer: { flexDirection:'row', gap:10, marginBottom:12 },
  sublocationtext: { color:'white', flex:1 },
  geopickicon: { width:22, height:22 },
  geodropicon: { width:22, height:22 },
  imagePickerContainer: { alignItems: 'center', marginTop: 20, backgroundColor: '#363D47', borderRadius: 11, padding: 10 },
  imgbutton: { width:'100%', height: 45, backgroundColor:'#192028', borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  uploadButtonText: { color: '#7398A9' },
  imageListContainer: { flexDirection: 'row', marginTop: 10 },
  selectedImage: { width: 60, height: 60, borderRadius: 5, margin: 5 },
  mainbutton: { backgroundColor:'#3BF579', padding:15, borderRadius:10, alignItems:'center' },
  maintextbutton: { color:'black', fontWeight:'bold', fontSize:16 }
});

export default DeliverOngoing;