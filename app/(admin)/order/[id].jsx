import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal
} from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import ImageViewing from 'react-native-image-viewing';
import supabase from '../../../lib/supabase';

// Assets
const backimg = require("@/assets/images/back.png");
const geopick = require("@/assets/images/geopick.png");
const geodrop = require("@/assets/images/geodrop.png");
const goods = require("@/assets/images/goods.png");
const person = require("@/assets/images/person.png");
const vehicle = require("@/assets/images/vehicle.png");
const money = require("@/assets/images/money.png");
const calculator = require("@/assets/images/calculator.png");

export default function OrderDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Image Viewer State
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_admin_order_details', {
        target_order_id: id
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setOrder(data[0]);
      } else {
        Alert.alert("Error", "Order not found");
        router.back();
      }
    } catch (err) {
      console.error("Fetch Error:", err.message);
      Alert.alert("Error", "Could not load order details");
    } finally {
      setLoading(false);
    }
  };

  // Logic to open viewer with specific images
  const handleViewImage = (index, imagesSource) => {
    // Filter out null/undefined images and format for ImageViewing
    const validImages = imagesSource.filter(Boolean).map(uri => ({ uri }));

    if (validImages.length > 0) {
      setCurrentImages(validImages);
      setImageIndex(index);
      setIsImageViewVisible(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return '#2ECC71';
      case 'cancelled': return '#E74C3C';
      case 'ongoing': return '#3498DB';
      case 'pending': return '#F1C40F';
      default: return '#BDC3C7';
    }
  };

  // Collect all pickup images into an array
  const pickupImages = [order.goods_image1, order.goods_image2, order.goods_image3].filter(Boolean);

  // Proof image (Dropoff)
  const proofImageArray = order.goods_receivedimg ? [order.goods_receivedimg] : [];

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Image source={backimg} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>Order #{order.order_id}</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Status Card */}
        <View style={[styles.card, { borderColor: getStatusColor(order.status_name) }]}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.statusText, { color: getStatusColor(order.status_name) }]}>
            {order.status_name}
          </Text>
          <Text style={styles.dateText}>{new Date(order.created_at).toLocaleString()}</Text>
        </View>

        {/* Locations */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Route</Text>

          <View style={styles.row}>
            <Image source={geopick} style={styles.icon} />
            <View style={styles.infoBlock}>
               <Text style={styles.label}>Pickup</Text>
               <Text style={styles.value}>{order.pickup_address}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Image source={geodrop} style={styles.icon} />
            <View style={styles.infoBlock}>
               <Text style={styles.label}>Dropoff</Text>
               <Text style={styles.value}>{order.dropoff_address}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
             <Text style={styles.metaText}>Distance: {order.distance} km</Text>
             <Text style={styles.metaText}>Est. Time: {order.duration} min</Text>
          </View>
        </View>

        {/* Parties */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Parties</Text>
          <View style={styles.row}>
            <Image source={person} style={styles.icon} />
            <View style={styles.infoBlock}>
               <Text style={styles.label}>Customer</Text>
               <Text style={styles.value}>{order.customer_name}</Text>
               <Text style={styles.subValue}>{order.customer_phone}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Image source={vehicle} style={styles.icon} />
            <View style={styles.infoBlock}>
               <Text style={styles.label}>Courier</Text>
               <Text style={styles.value}>{order.courier_name}</Text>
               <Text style={styles.subValue}>
                 {order.vehicle_name} • {order.plate_number}
               </Text>
            </View>
          </View>
        </View>

        {/* Details & Financials */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.row}>
            <Image source={goods} style={styles.icon} />
            <View style={styles.infoBlock}>
               <Text style={styles.label}>Category: {order.category_name}</Text>
               <Text style={styles.value}>{order.goods_details || 'No description'}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.row, {alignItems: 'center', justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={money} style={styles.icon} />
                <View>
                    <Text style={styles.label}>Total Fare</Text>
                    <Text style={[styles.value, {color: '#0AB3FF', fontSize: 20}]}>
                        ₱ {order.total_fare}
                    </Text>
                </View>
            </View>
            <Pressable onPress={() => setModalVisible(true)} style={styles.breakdownButton}>
               <Image source={calculator} style={styles.smallIcon} />
               <Text style={styles.breakdownText}>Breakdown</Text>
            </Pressable>
          </View>
        </View>

        {/* --- PICKUP PHOTOS (Multiple) --- */}
        {pickupImages.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Pickup Photos (Goods)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 10}}>
              {pickupImages.map((uri, index) => (
                <Pressable key={index} onPress={() => handleViewImage(index, pickupImages)}>
                  <Image
                    source={{ uri }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* --- DROPOFF PHOTO (Single) --- */}
        {order.goods_receivedimg && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Proof of Delivery</Text>
            <Pressable onPress={() => handleViewImage(0, proofImageArray)}>
              <Image
                source={{ uri: order.goods_receivedimg }}
                style={styles.proofImage}
                resizeMode="cover"
              />
            </Pressable>
          </View>
        )}

      </ScrollView>

      {/* FULL SCREEN IMAGE VIEWER */}
      <ImageViewing
        images={currentImages}
        imageIndex={imageIndex}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
      />

      {/* FARE BREAKDOWN MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Fare Breakdown</Text>
            <View style={styles.breakdownContainer}>
                <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownLabel}>Base Fare</Text>
                    <Text style={styles.breakdownValue}>₱ {order.base_fare || '0.00'}</Text>
                </View>
                <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownLabel}>Distance Charge</Text>
                    <Text style={styles.breakdownValue}>₱ {order.distance_charge || '0.00'}</Text>
                </View>
                {Number(order.time_charge) > 0 && (
                    <View style={styles.breakdownRow}>
                        <Text style={styles.breakdownLabel}>Time Charge</Text>
                        <Text style={styles.breakdownValue}>₱ {order.time_charge}</Text>
                    </View>
                )}
                {Number(order.bonus) > 0 && (
                    <View style={styles.breakdownRow}>
                        <Text style={[styles.breakdownLabel, {color: '#2ECC71'}]}>Bonus (Tip)</Text>
                        <Text style={[styles.breakdownValue, {color: '#2ECC71'}]}>+ ₱ {order.bonus}</Text>
                    </View>
                )}
                <View style={styles.divider} />
                <View style={styles.breakdownRow}>
                    <Text style={[styles.breakdownLabel, {fontSize: 12}]}>Platform Commission</Text>
                    <Text style={[styles.breakdownValue, {fontSize: 12, color: '#E74C3C'}]}>- ₱ {order.commission}</Text>
                </View>
                <View style={[styles.breakdownRow, styles.totalRow]}>
                    <Text style={[styles.breakdownLabel, styles.activeText]}>Total Customer Paid</Text>
                    <Text style={[styles.breakdownValue, styles.activeText]}>₱ {order.total_fare}</Text>
                </View>
            </View>
            <Pressable style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  loadingContainer: { flex: 1, backgroundColor: '#141519', justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, marginTop: verticalScale(40), marginBottom: 20
  },
  backButton: { padding: 8, backgroundColor: '#22262F', borderRadius: 10 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },

  scrollContent: { padding: 15, paddingBottom: 50 },

  card: {
    backgroundColor: '#22262F', borderRadius: 16, padding: 20,
    marginBottom: 15, borderWidth: 1, borderColor: '#363D47'
  },

  sectionTitle: { color: '#8796AA', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 15 },
  divider: { height: 1, backgroundColor: '#363D47', marginVertical: 15 },

  row: { flexDirection: 'row', alignItems: 'flex-start' },
  icon: { width: 24, height: 24, resizeMode: 'contain', marginRight: 15, marginTop: 2 },
  infoBlock: { flex: 1 },

  label: { color: '#8796AA', fontSize: 12, marginBottom: 2 },
  value: { color: 'white', fontSize: 16, fontWeight: '500' },
  subValue: { color: '#555', fontSize: 14, marginTop: 2 },

  statusText: { fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  dateText: { color: '#555', fontSize: 12, marginTop: 5 },

  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#363D47' },
  metaText: { color: '#0AB3FF', fontSize: 14, fontWeight: 'bold' },

  // Image Styles
  thumbnailImage: { width: 100, height: 100, borderRadius: 8, marginRight: 10, borderWidth: 1, borderColor: '#444' },
  proofImage: { width: '100%', height: 200, borderRadius: 12, marginTop: 10 },

  breakdownButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#192028',
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#363D47'
  },
  smallIcon: { width: 16, height: 16, marginRight: 5, tintColor: '#87AFB9' },
  breakdownText: { color: '#87AFB9', fontSize: 12, fontWeight: 'bold' },

  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
  modalView: { margin: 20, width: '85%', backgroundColor: '#363D47', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', elevation: 5 },
  modalTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  breakdownContainer: { width: '100%' },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  breakdownLabel: { color: '#ccc', fontSize: 14 },
  breakdownValue: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  totalRow: { borderTopWidth: 1, borderColor: '#444', paddingTop: 10, marginTop: 5 },
  activeText: { color: '#0AB3FF', fontSize: 16 },
  closeBtn: { marginTop: 20, backgroundColor: '#22262F', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 },
});