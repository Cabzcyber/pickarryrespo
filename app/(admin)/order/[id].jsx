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
import { useTheme } from '../../../context/ThemeContext';

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
  const { colors } = useTheme();

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
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.card }]}>
          <Image source={backimg} style={styles.backIcon} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Order #{order.order_id}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Status Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: getStatusColor(order.status_name) }]}>
          <Text style={[styles.label, { color: colors.subText }]}>Status</Text>
          <Text style={[styles.statusText, { color: getStatusColor(order.status_name) }]}>
            {order.status_name}
          </Text>
          <Text style={[styles.dateText, { color: colors.subText }]}>{new Date(order.created_at).toLocaleString()}</Text>
        </View>

        {/* Locations */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.subText }]}>Route</Text>

          <View style={styles.row}>
            <Image source={geopick} style={styles.icon} />
            <View style={styles.infoBlock}>
              <Text style={[styles.label, { color: colors.subText }]}>Pickup</Text>
              <Text style={[styles.value, { color: colors.text }]}>{order.pickup_address}</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.row}>
            <Image source={geodrop} style={styles.icon} />
            <View style={styles.infoBlock}>
              <Text style={[styles.label, { color: colors.subText }]}>Dropoff</Text>
              <Text style={[styles.value, { color: colors.text }]}>{order.dropoff_address}</Text>
            </View>
          </View>

          <View style={[styles.metaRow, { borderTopColor: colors.border }]}>
            <Text style={styles.metaText}>Distance: {order.distance} km</Text>
            <Text style={styles.metaText}>Est. Time: {order.duration} min</Text>
          </View>
        </View>

        {/* Parties */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.subText }]}>Parties</Text>
          <View style={styles.row}>
            <Image source={person} style={styles.icon} />
            <View style={styles.infoBlock}>
              <Text style={[styles.label, { color: colors.subText }]}>Customer</Text>
              <Text style={[styles.value, { color: colors.text }]}>{order.customer_name}</Text>
              <Text style={[styles.subValue, { color: colors.subText }]}>{order.customer_phone}</Text>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.row}>
            <Image source={vehicle} style={styles.icon} />
            <View style={styles.infoBlock}>
              <Text style={[styles.label, { color: colors.subText }]}>Courier</Text>
              <Text style={[styles.value, { color: colors.text }]}>{order.courier_name}</Text>
              <Text style={[styles.subValue, { color: colors.subText }]}>
                {order.vehicle_name} • {order.plate_number}
              </Text>
            </View>
          </View>
        </View>

        {/* Details & Financials */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.subText }]}>Details</Text>
          <View style={styles.row}>
            <Image source={goods} style={styles.icon} />
            <View style={styles.infoBlock}>
              <Text style={[styles.label, { color: colors.subText }]}>Category: {order.category_name}</Text>
              <Text style={[styles.value, { color: colors.text }]}>{order.goods_details || 'No description'}</Text>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={money} style={styles.icon} />
              <View>
                <Text style={[styles.label, { color: colors.subText }]}>Total Fare</Text>
                <Text style={[styles.value, { color: '#0AB3FF', fontSize: 20 }]}>
                  ₱ {order.total_fare}
                </Text>
              </View>
            </View>
            <Pressable onPress={() => setModalVisible(true)} style={[styles.breakdownButton, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Image source={calculator} style={styles.smallIcon} />
              <Text style={styles.breakdownText}>Breakdown</Text>
            </Pressable>
          </View>
        </View>

        {/* --- PICKUP PHOTOS (Multiple) --- */}
        {pickupImages.length > 0 && (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.subText }]}>Pickup Photos (Goods)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
              {pickupImages.map((uri, index) => (
                <Pressable key={index} onPress={() => handleViewImage(index, pickupImages)}>
                  <Image
                    source={{ uri }}
                    style={[styles.thumbnailImage, { borderColor: colors.border }]}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* --- DROPOFF PHOTO (Single) --- */}
        {order.goods_receivedimg && (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.subText }]}>Proof of Delivery</Text>
            <Pressable onPress={() => handleViewImage(0, proofImageArray)}>
              <Image
                source={{ uri: order.goods_receivedimg }}
                style={[styles.proofImage, { borderColor: colors.border, borderWidth: 1 }]}
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
          <View style={[styles.modalView, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Fare Breakdown</Text>
            <View style={styles.breakdownContainer}>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: colors.subText }]}>Base Fare</Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>₱ {order.base_fare || '0.00'}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: colors.subText }]}>Distance Charge</Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>₱ {order.distance_charge || '0.00'}</Text>
              </View>
              {Number(order.time_charge) > 0 && (
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.subText }]}>Time Charge</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>₱ {order.time_charge}</Text>
                </View>
              )}
              {Number(order.bonus) > 0 && (
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: '#2ECC71' }]}>Bonus (Tip)</Text>
                  <Text style={[styles.breakdownValue, { color: '#2ECC71' }]}>+ ₱ {order.bonus}</Text>
                </View>
              )}
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { fontSize: 12, color: colors.subText }]}>Platform Commission</Text>
                <Text style={[styles.breakdownValue, { fontSize: 12, color: '#E74C3C' }]}>- ₱ {order.commission}</Text>
              </View>
              <View style={[styles.breakdownRow, styles.totalRow, { borderColor: colors.border }]}>
                <Text style={[styles.breakdownLabel, styles.activeText]}>Total Customer Paid</Text>
                <Text style={[styles.breakdownValue, styles.activeText]}>₱ {order.total_fare}</Text>
              </View>
            </View>
            <Pressable style={[styles.closeBtn, { backgroundColor: colors.background }]} onPress={() => setModalVisible(false)}>
              <Text style={{ color: colors.text, fontWeight: 'bold' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, marginTop: verticalScale(40), marginBottom: 20
  },
  backButton: { padding: 8, borderRadius: 10 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },

  scrollContent: { padding: 15, paddingBottom: 50 },

  card: {
    borderRadius: 16, padding: 20,
    marginBottom: 15, borderWidth: 1
  },

  sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 15 },
  divider: { height: 1, marginVertical: 15 },

  row: { flexDirection: 'row', alignItems: 'flex-start' },
  icon: { width: 24, height: 24, resizeMode: 'contain', marginRight: 15, marginTop: 2 },
  infoBlock: { flex: 1 },

  label: { fontSize: 12, marginBottom: 2 },
  value: { fontSize: 16, fontWeight: '500' },
  subValue: { fontSize: 14, marginTop: 2 },

  statusText: { fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  dateText: { fontSize: 12, marginTop: 5 },

  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingTop: 15, borderTopWidth: 1 },
  metaText: { color: '#0AB3FF', fontSize: 14, fontWeight: 'bold' },

  // Image Styles
  thumbnailImage: { width: 100, height: 100, borderRadius: 8, marginRight: 10, borderWidth: 1 },
  proofImage: { width: '100%', height: 200, borderRadius: 12, marginTop: 10 },

  breakdownButton: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1
  },
  smallIcon: { width: 16, height: 16, marginRight: 5, tintColor: '#87AFB9' },
  breakdownText: { color: '#87AFB9', fontSize: 12, fontWeight: 'bold' },

  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
  modalView: { margin: 20, width: '85%', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  breakdownContainer: { width: '100%' },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  breakdownLabel: { fontSize: 14 },
  breakdownValue: { fontSize: 14, fontWeight: 'bold' },
  totalRow: { borderTopWidth: 1, paddingTop: 10, marginTop: 5 },
  activeText: { color: '#0AB3FF', fontSize: 16 },
  closeBtn: { marginTop: 20, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 },
});