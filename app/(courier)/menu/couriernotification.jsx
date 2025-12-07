import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  Image, Pressable, ScrollView, StyleSheet, Text, View,
  ActivityIndicator, RefreshControl, Modal, TextInput, Alert
} from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';

export default function Notification() {
  const router = useRouter();

  // Assets
  const backimg = require("@/assets/images/back.png");
  const warningIcon = require("@/assets/images/urgent.png");

  // Data State
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Appeal State
  const [modalVisible, setModalVisible] = useState(false);
  const [appealText, setAppealText] = useState('');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [visibleMenuId, setVisibleMenuId] = useState(null);

  // --- 1. FETCH REPORTS ---
  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('users_reporting')
        .select(`
          userreporting_id,
          report_date,

          appeal_reason,
          reporter:service_user!fk_reporter ( full_name ),
          reason:report_set!fk_reportset ( report_type ),
          status:report_status!fk_reportstatus ( status_name )
        `)
        .eq('reported_id', user.id)
        .order('report_date', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);

    } catch (err) {
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  // --- 2. APPEAL LOGIC ---
  const handleAppealSubmit = async () => {
    if (!appealText.trim()) {
        Alert.alert("Required", "Please write your reason for appeal.");
        return;
    }

    try {
        setSubmitting(true);

        // Update appeal_reason and set status to 'Under Investigation' (2)
        const { error } = await supabase
            .from('users_reporting')
            .update({
                appeal_reason: appealText,
                reportstatus_id: 2
            })
            .eq('userreporting_id', selectedReportId);

        if (error) throw error;

        Alert.alert("Appeal Sent", "The admin has been notified.");
        setModalVisible(false);
        setAppealText('');
        fetchNotifications();

    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setSubmitting(false);
    }
  };

  // Helper Styles
  const getStatusStyle = (statusName) => {
    const status = statusName?.toLowerCase() || '';
    if (status === 'pending review') return { color: '#FF4E4E', fontWeight: 'bold' };
    if (status === 'under investigation') return { color: '#0AB3FF', fontWeight: 'bold' };
    if (status === 'resolved') return { color: '#2ECC71', fontWeight: 'bold' };
    return { color: '#8796AA' };
  };

  const openMenu = (id) => setVisibleMenuId(prev => prev === id ? null : id);
  const closeMenu = () => setVisibleMenuId(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Image source={backimg} style={styles.backicon}/>
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder}/>
      </View>
      <View style={styles.separator} />

      <ScrollView
        style={styles.mainContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0AB3FF"/>}
      >
        {loading ? (
           <ActivityIndicator size="large" color="#0AB3FF" style={{marginTop: 50}} />
        ) : notifications.length === 0 ? (
           <Text style={styles.emptyText}>No reports found.</Text>
        ) : (
           notifications.map((item) => (
              <View key={item.userreporting_id} style={styles.notifcontainer}>
                <View style={styles.notifheader}>
                  <Image source={warningIcon} style={styles.notificon}/>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.notifheaderText}>
                      {item.reason?.report_type || "Report"}
                    </Text>
                    <Text style={styles.subText}>
                      From: {item.reporter?.full_name || "Customer"}
                    </Text>
                  </View>

                  {/* Show Menu ONLY if not yet resolved */}
                  {['Pending Review', 'Under Investigation'].includes(item.status?.status_name) && (
                      <Menu
                        visible={visibleMenuId === item.userreporting_id}
                        onDismiss={closeMenu}
                        anchor={
                            <IconButton
                            icon="dots-vertical"
                            iconColor="#0AB3FF"
                            size={20}
                            onPress={() => openMenu(item.userreporting_id)}
                            />
                        }
                      >
                        <Menu.Item
                            onPress={() => {
                                setSelectedReportId(item.userreporting_id);
                                setAppealText(item.appeal_reason || '');
                                setModalVisible(true);
                                closeMenu();
                            }}
                            title={item.appeal_reason ? "Edit Appeal" : "File Appeal"}
                        />
                      </Menu>
                  )}
                </View>

                <View style={styles.notifdescription}>
                  <Text style={{color:'#ccc', marginBottom:5, fontSize: 13}}>
                     Details: {item.other_details || "No details provided."}
                  </Text>
                  <Text style={styles.statusText}>
                    Status: <Text style={getStatusStyle(item.status?.status_name)}>
                        {item.status?.status_name || "Unknown"}
                    </Text>
                  </Text>

                  {item.appeal_reason && (
                      <View style={styles.appealBox}>
                          <Text style={styles.appealLabel}>Your Appeal:</Text>
                          <Text style={styles.appealText}>"{item.appeal_reason}"</Text>
                      </View>
                  )}
                </View>
              </View>
           ))
        )}
      </ScrollView>

      {/* APPEAL MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Submit Appeal</Text>
                <Text style={styles.modalSubtitle}>
                    Explain your side regarding this report. This will be reviewed by the admin.
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Type here..."
                    placeholderTextColor="#8796AA"
                    multiline
                    numberOfLines={4}
                    value={appealText}
                    onChangeText={setAppealText}
                />

                <View style={styles.modalButtons}>
                    <Pressable
                        style={styles.cancelBtn}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.btnText}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        style={styles.submitBtn}
                        onPress={handleAppealSubmit}
                        disabled={submitting}
                    >
                        {submitting ? <ActivityIndicator color="white"/> : <Text style={styles.btnText}>Submit</Text>}
                    </Pressable>
                </View>
            </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  backicon: { width: 35, height: 35, resizeMode: 'contain' },
  separator: { height: 1, backgroundColor: '#363D47', width: '100%', marginBottom: 1, marginTop: 10 },
  placeholder: { width: 35 },
  mainContent: { flex: 1, padding: 15 },
  title: { fontFamily: 'Roboto-Bold', fontSize: 20, color: '#0AB3FF' },
  emptyText: { color: '#8796AA', textAlign: 'center', marginTop: 50, fontSize: 16 },

  notifcontainer: { backgroundColor: '#1f2937', borderRadius: 20, padding: 15, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#FF4E4E' },
  notifheader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  notificon: { width: 32, height: 32, resizeMode: 'contain', marginRight: 12, tintColor: '#FF4E4E' },
  notifheaderText: { fontFamily: 'Roboto-Bold', fontSize: 16, color: '#ffffff' },
  subText: { fontFamily: 'Roboto-Regular', fontSize: 12, color: '#8796AA' },

  notifdescription: { paddingLeft: 44 },
  statusText: { color: '#d1d5db', fontSize: 14, marginBottom: 5 },

  appealBox: { backgroundColor: 'rgba(10, 179, 255, 0.1)', padding: 10, borderRadius: 8, marginTop: 8, borderLeftWidth: 2, borderLeftColor: '#0AB3FF' },
  appealLabel: { color: '#0AB3FF', fontSize: 10, fontWeight: 'bold', marginBottom: 2, textTransform: 'uppercase' },
  appealText: { color: '#ccc', fontSize: 13, fontStyle: 'italic' },

  // Modal
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalView: { width: '90%', backgroundColor: '#363D47', borderRadius: 20, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10, textAlign: 'center' },
  modalSubtitle: { fontSize: 14, color: '#8796AA', marginBottom: 15, textAlign: 'center' },
  input: { backgroundColor: '#22262F', color: 'white', borderRadius: 10, padding: 15, height: 100, textAlignVertical: 'top', marginBottom: 20, borderWidth: 1, borderColor: '#4B5563' },
  modalButtons: { flexDirection: 'row', gap: 15 },
  cancelBtn: { flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: 'white' },
  submitBtn: { flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', backgroundColor: '#0AB3FF' },
  btnText: { color: 'white', fontWeight: 'bold' }
});