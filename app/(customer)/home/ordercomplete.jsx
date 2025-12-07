// app/(customer)/home/ordercomplete.jsx
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useCallback, useEffect } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl, Modal } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import ImageViewing from 'react-native-image-viewing';
import DropDownPicker from 'react-native-dropdown-picker'; // Ensure this is installed

// Hooks & Libs
import { useOrderDetails } from '../../../hooks/useOrderDetails';
import { supabase } from '../../../lib/supabase'; // Import Supabase client
import GeoapifyRouteMap from '../../../components/GeoapifyRouteMap';

// Assets
const headerlogo = require("@/assets/images/headerlogo.png");
const cameraIcon = require("@/assets/images/done3.png");
const alertIcon = require("@/assets/images/urgent.png"); // Suggest adding a warning/alert icon

const OrderComplete = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { order, courier, loading, refetch } = useOrderDetails(orderId);

  // --- EXISTING STATE ---
  const [viewerVisible, setViewerVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // --- NEW REPORTING STATE ---
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  // Dropdown State
  const [open, setOpen] = useState(false);
  const [reportValue, setReportValue] = useState(null); // This stores reportset_id
  const [reportItems, setReportItems] = useState([]); // Stores data from report_set table

  // 1. FETCH REPORT TYPES ON MOUNT
  useEffect(() => {
    const fetchReportTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('report_set')
          .select('reportset_id, report_type');

        if (error) throw error;

        // Format for DropDownPicker
        const formattedItems = data.map(item => ({
          label: item.report_type,
          value: item.reportset_id
        }));
        setReportItems(formattedItems);
      } catch (err) {
        console.error("Error fetching report types:", err.message);
      }
    };

    fetchReportTypes();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // 2. HANDLE REPORT SUBMISSION
  const handleReportSubmit = async () => {
    if (!reportValue) {
      Alert.alert("Selection Required", "Please select a reason for reporting.");
      return;
    }

    try {
      setIsSubmittingReport(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Insert into users_reporting table
      const { error } = await supabase
        .from('users_reporting')
        .insert({
          order_id: orderId,
          reportset_id: reportValue,
          reportstatus_id: 1, // Assuming '1' is the ID for 'Pending' in your report_status table
          reporter_id: user.id,       // The Customer
          reported_id: order.courier_id, // The Courier
          report_date: new Date().toISOString()
        });

      if (error) throw error;

      setReportModalVisible(false);

      // Feedback Modal/Alert
      Alert.alert(
        "Report Submitted",
        `We have received your report regarding ${courier?.name || 'the driver'}. Our support team will review this shortly.`
      );

    } catch (err) {
      Alert.alert("Submission Failed", err.message);
    } finally {
      setIsSubmittingReport(false);
    }
  };

  if (loading || !order) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0AB3FF" />
        <Text style={styles.loadingText}>Generating Receipt...</Text>
      </View>
    );
  }

  const proofImages = order.goods_receivedimg ? [{ uri: order.goods_receivedimg }] : [];
  const pickupCoords = { latitude: order.pickup_latitude, longitude: order.pickup_longitude };
  const dropoffCoords = { latitude: order.dropoff_latitude, longitude: order.dropoff_longitude };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      {/* --- REPORT MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Report Courier</Text>
            <Text style={styles.modalSubtitle}>
              Please select the issue you encountered with {courier?.name || 'the driver'}.
            </Text>

            {/* Dropdown */}
            <View style={{ zIndex: 1000, marginBottom: 20 }}>
              <DropDownPicker
                open={open}
                value={reportValue}
                items={reportItems}
                setOpen={setOpen}
                setValue={setReportValue}
                setItems={setReportItems}
                placeholder="Select a reason..."
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
              />
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setReportModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.modalBtn, styles.submitBtn]}
                onPress={handleReportSubmit}
                disabled={isSubmittingReport}
              >
                {isSubmittingReport ? (
                   <ActivityIndicator color="white" />
                ) : (
                   <Text style={styles.submitText}>Submit Report</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <View style={styles.mapContainer}>
           <GeoapifyRouteMap pickup={pickupCoords} dropoff={dropoffCoords} />
           <View style={styles.darkOverlay} />
        </View>

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0AB3FF" />}
        >
          <View style={styles.contentWrapper}>
            <View style={styles.header}>
              <Image source={headerlogo} style={styles.logo}/>
            </View>

            <View style={styles.mainContent}>
              <View style={styles.statusPill}>
                <Text style={styles.title}>Order Completed!</Text>
                <Text style={styles.subtitle}>Thank you for using Pickarry</Text>
              </View>

              <View style={styles.receiptCard}>
                <View style={styles.courierSection}>
                  <Text style={styles.sectionTitle}>Delivered By</Text>
                  <Text style={styles.courierName}>{courier?.name || 'Unknown Driver'}</Text>
                  <Text style={styles.courierVehicle}>
                     {courier ? `${courier.vehicle_color} ${courier.vehicle_brand} • ${courier.plate_number}` : ''}
                  </Text>
                </View>

                <View style={styles.divider} />

                {order.goods_receivedimg && (
                  <>
                    <Pressable style={styles.proofButton} onPress={() => setViewerVisible(true)}>
                       <Image source={cameraIcon} style={{width: 20, height: 20, tintColor: '#0AB3FF', marginRight: 10}} />
                       <Text style={styles.proofButtonText}>View Proof of Delivery</Text>
                    </Pressable>
                    <View style={styles.divider} />
                  </>
                )}

                <View style={styles.paymentSection}>
                  <Text style={styles.sectionTitle}>Payment Summary</Text>
                  <View style={styles.row}>
                    <Text style={styles.label}>Total Paid</Text>
                    <Text style={styles.totalValue}>₱ {order.total_fare}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                 {/* MAIN ACTION: BACK TO HOME */}
                 <Pressable style={styles.homeButton} onPress={() => router.push('/(customer)/home')}>
                    <Text style={styles.homeButtonText}>Back to Home</Text>
                 </Pressable>

                 {/* SECONDARY ACTION: REPORT */}
                 <Pressable
                    style={styles.reportButton}
                    onPress={() => setReportModalVisible(true)}
                 >
                    <Text style={styles.reportButtonText}>Report Courier</Text>
                 </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <ImageViewing
        images={proofImages}
        imageIndex={0}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  mapContainer: { ...StyleSheet.absoluteFillObject },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },

  contentWrapper: { padding: 20, paddingBottom: 50 },
  loadingContainer: { flex: 1, backgroundColor: '#141519', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: 'white', marginTop: 10 },

  header: { alignItems: 'center', marginTop: verticalScale(30), marginBottom: 20 },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, alignItems: 'center' },

  statusPill: { marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#3BF579', marginBottom: 5, textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 },
  subtitle: { fontSize: 16, color: '#EEE', marginBottom: 10, textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 },

  receiptCard: { width: '100%', backgroundColor: '#363D47', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 5 },
  sectionTitle: { color: '#87AFB9', fontSize: 14, marginBottom: 10, textTransform: 'uppercase', fontWeight: 'bold' },
  courierName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  courierVehicle: { color: '#ccc', fontSize: 14, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#4a5568', marginVertical: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: '#ccc', fontSize: 16 },
  totalValue: { color: '#0AB3FF', fontSize: 22, fontWeight: 'bold' },

  buttonContainer: { width: '100%', gap: 15 },
  homeButton: { backgroundColor: '#0AB3FF', padding: 15, borderRadius: 12, alignItems: 'center' },
  homeButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  proofButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#22262F', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#0AB3FF' },
  proofButtonText: { color: '#0AB3FF', fontWeight: 'bold', fontSize: 16 },

  // --- NEW STYLES FOR REPORTING ---
  reportButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4444',
    backgroundColor: 'rgba(255, 68, 68, 0.1)'
  },
  reportButtonText: { color: '#FF4444', fontWeight: 'bold', fontSize: 16 },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)', // Dark dim
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#22262F',
    borderRadius: 20,
    padding: 20,
    paddingTop: 30,
    borderWidth: 1,
    borderColor: '#4B5563'
  },
  modalTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  modalSubtitle: { color: '#8796AA', fontSize: 14, marginBottom: 20, textAlign: 'center' },

  // Dropdown Styles inside Modal
  dropdown: { backgroundColor: '#141519', borderColor: '#4B5563' },
  dropdownText: { color: 'white' },
  dropdownContainer: { backgroundColor: '#141519', borderColor: '#4B5563' },

  modalButtons: { flexDirection: 'row', gap: 15, justifyContent: 'space-between' },
  modalBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  cancelBtn: { backgroundColor: '#363D47' },
  submitBtn: { backgroundColor: '#FF4444' },
  cancelText: { color: 'white', fontWeight: 'bold' },
  submitText: { color: 'white', fontWeight: 'bold' }
});

export default OrderComplete;