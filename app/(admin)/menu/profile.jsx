import { Stack, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { IconButton, Menu } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeContext';

export default function Profile() {
  const router = useRouter();
  const { theme, colors } = useTheme();

  // Assets
  const backimg = require("@/assets/images/back.png");
  const reportImg = require("@/assets/images/report.png");
  const urgentIcon = require("@/assets/images/urgent.png");

  // Data State
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal & Tracking State
  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Tracking Target
  const [targetUserId, setTargetUserId] = useState(null);
  const [targetReportId, setTargetReportId] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');

  // Dropdown State
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Fraudulent Activity', value: 'Fraudulent Activity' },
    { label: 'Customer Complaints', value: 'Customer Complaints' },
    { label: 'Violation of Policies', value: 'Violation of Policies' },
    { label: 'Unprofessional Behavior', value: 'Unprofessional Behavior' },
    { label: 'Fake/Invalid Documents', value: 'Fake/Invalid Documents' },
    { label: 'Repeated Late Deliveries', value: 'Repeated Late Deliveries' },
    { label: 'Tampering with Orders', value: 'Tampering with Orders' },
  ]);

  // --- 1. FETCH REPORTS ---
  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('users_reporting')
        .select(`
          userreporting_id,
          report_date,
          appeal_reason,
          reported_id,
          reporter:service_user!fk_reporter(full_name),
          reported:service_user!fk_reported(full_name),
          reason:report_set!fk_reportset(report_type),
          status:report_status!fk_reportstatus(status_name)
        `)
        .order('report_date', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (err) {
      console.error("Error fetching reports:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // --- 2. SUSPEND LOGIC ---
  const handleSuspendConfirm = async () => {
    if (!targetUserId) return;

    const finalReason = value ? value : suspendReason;

    if (!finalReason) {
      Alert.alert("Required", "Please select or enter a reason.");
      return;
    }

    try {
      setActionLoading(true);

      // 1. Suspend User
      const { error: userError } = await supabase
        .from('service_user')
        .update({
          userstatus_id: 4, // 4 = Suspended
          suspension_reason: finalReason
        })
        .eq('user_id', targetUserId);

      if (userError) throw userError;

      // 2. Resolve Report
      if (targetReportId) {
        const { error: reportError } = await supabase
          .from('users_reporting')
          .update({
            reportstatus_id: 3 // 3 = Resolved
          })
          .eq('userreporting_id', targetReportId);

        if (reportError) console.warn("Report update failed:", reportError.message);
      }

      Alert.alert("Success", "User suspended and report resolved.");
      setModalVisible(false);
      setSuspendReason('');
      setValue(null);

      fetchReports();

    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // --- 3. DISMISS LOGIC (New) ---
  const handleDismiss = async (reportId) => {
    closeMenu();

    // Quick confirmation alert before action
    Alert.alert(
      "Dismiss Report?",
      "This will mark the report as invalid/dismissed. No action will be taken against the user.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Dismiss",
          onPress: async () => {
            try {
              setLoading(true); // Show global spinner briefly

              const { error } = await supabase
                .from('users_reporting')
                .update({
                  reportstatus_id: 4 // 4 = Dismissed
                })
                .eq('userreporting_id', reportId);

              if (error) throw error;

              Alert.alert("Dismissed", "Report has been closed.");
              fetchReports(); // Refresh list

            } catch (err) {
              Alert.alert("Error", err.message);
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  // Handlers
  const openMenu = (id) => setVisibleMenuId(prev => prev === id ? null : id);
  const closeMenu = () => setVisibleMenuId(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString([], {
      hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric'
    });
  };

  const getStatusStyle = (statusName) => {
    const status = statusName?.toLowerCase() || '';
    if (status === 'resolved') return { color: '#2ECC71', fontWeight: 'bold' };
    if (status === 'pending review') return { color: '#F1C40F', fontWeight: 'bold' };
    if (status === 'under investigation') return { color: '#0AB3FF', fontWeight: 'bold' };
    if (status === 'dismissed') return { color: '#95A5A6', fontWeight: 'bold' };
    return { color: colors.text };
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image source={backimg} style={styles.backicon} />
          </Pressable>
          <Text style={styles.title}>Complaints Feed</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={[styles.separator, { backgroundColor: colors.border }]} />

        <ScrollView style={styles.mainContent} contentContainerStyle={{ paddingBottom: 50 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#0AB3FF" style={{ marginTop: 50 }} />
          ) : reports.length === 0 ? (
            <Text style={{ color: colors.subText, textAlign: 'center', marginTop: 50 }}>No new notifications.</Text>
          ) : (
            reports.map((item) => (
              <View key={item.userreporting_id} style={[styles.notifcontainer, { backgroundColor: colors.card }]}>

                {/* HEADER ROW: Icon | Names | Menu */}
                <View style={styles.notifheader}>
                  <Image source={reportImg} style={styles.notificon} />

                  {/* Text Container */}
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={[styles.notifheaderText, { color: colors.text }]}>
                      {item.reporter?.full_name || "Unknown"} ➔ {item.reported?.full_name || "Unknown"}
                    </Text>
                  </View>

                  {/* Menu Button */}
                  <View style={{ marginTop: -8 }}>
                    <Menu
                      visible={visibleMenuId === item.userreporting_id}
                      onDismiss={closeMenu}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          iconColor="#0AB3FF"
                          size={24}
                          onPress={() => openMenu(item.userreporting_id)}
                        />
                      }
                    >
                      {/* Option 1: Suspend */}
                      <Menu.Item
                        onPress={() => {
                          setTargetUserId(item.reported_id);
                          setTargetReportId(item.userreporting_id);
                          setModalVisible(true);
                          closeMenu();
                        }}
                        title="Suspend User"
                      />
                      {/* Option 2: Dismiss */}
                      <Menu.Item
                        onPress={() => handleDismiss(item.userreporting_id)}
                        title="Dismiss Report"
                      />
                    </Menu>
                  </View>
                </View>

                {/* REASON */}
                <View style={styles.notifdescription}>
                  <Text style={[styles.notifdescriptiontext, { color: colors.subText }]}>
                    Reason: <Text style={{ color: '#FF4E4E', fontWeight: 'bold' }}>{item.reason?.report_type || "Unspecified"}</Text>
                  </Text>
                </View>

                {/* APPEAL BOX (Admin View) */}
                {item.appeal_reason && (
                  <View style={styles.adminAppealBox}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      <Image source={urgentIcon} style={{ width: 14, height: 14, tintColor: '#0AB3FF', marginRight: 5 }} />
                      <Text style={styles.appealTitle}>COURIER APPEAL</Text>
                    </View>
                    <Text style={styles.appealText}>"{item.appeal_reason}"</Text>
                  </View>
                )}

                {/* STATUS & DATE */}
                <View style={styles.notifdescription}>
                  <Text style={[styles.notifdescriptiontext, { color: colors.subText }]}>
                    Time: {formatDate(item.report_date)}
                  </Text>
                  <Text style={[styles.notifdescriptiontext, { color: colors.subText }]}>
                    Status: <Text style={getStatusStyle(item.status?.status_name)}>
                      {item.status?.status_name || "Pending"}
                    </Text>
                  </Text>
                </View>

              </View>
            ))
          )}
        </ScrollView>

        {/* SUSPEND MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView1, { backgroundColor: colors.card }]}>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Pressable onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                </Pressable>
                <Text style={{ fontSize: 18, color: colors.text, fontWeight: 'bold', flexShrink: 1 }}>
                  Confirm Suspension
                </Text>
              </View>

              <View style={{ width: '100%', marginBottom: 15, zIndex: 2000 }}>
                <Text style={{ color: colors.subText, marginBottom: 5, fontSize: 12 }}>Select Reason:</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="Select Reason..."
                  style={[styles.dropdown1, { backgroundColor: theme === 'dark' ? '#22262F' : '#F3F4F6', borderColor: colors.border }]}
                  textStyle={[styles.dropdownText1, { color: colors.text }]}
                  placeholderStyle={[styles.placeholderText1, { color: colors.subText }]}
                  dropDownContainerStyle={[styles.dropdownContainer1, { backgroundColor: colors.card, borderColor: colors.border }]}
                  selectedItemContainerStyle={[styles.selectedItemContainer1, { backgroundColor: theme === 'dark' ? '#4B5563' : '#E5E7EB' }]}
                  selectedItemLabelStyle={[styles.selectedItemLabel1, { color: colors.text }]}
                  listMode="SCROLLVIEW"
                  maxHeight={150}
                  theme={theme === 'dark' ? 'DARK' : 'LIGHT'}
                />
              </View>

              <View style={{ width: '100%', marginBottom: 20 }}>
                <Text style={{ color: colors.subText, marginBottom: 5, fontSize: 12 }}>Or type specific details:</Text>
                <TextInput
                  style={[styles.reasonInput, { backgroundColor: theme === 'dark' ? '#22262F' : '#F3F4F6', color: colors.text, borderColor: colors.border }]}
                  placeholder="Enter details (optional)..."
                  placeholderTextColor={colors.subText}
                  value={suspendReason}
                  onChangeText={setSuspendReason}
                  multiline
                />
              </View>

              <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                <Pressable
                  style={[styles.cancelBtn, { borderColor: colors.text }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.btnTextWhite, { color: colors.text }]}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.suspendBtn}
                  onPress={handleSuspendConfirm}
                  disabled={actionLoading}
                >
                  {actionLoading ? <ActivityIndicator color="white" /> : <Text style={styles.btnTextWhite}>Suspend</Text>}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  separator: { height: 1, width: '100%', marginBottom: 10, marginTop: 10 },
  backicon: { width: 28, height: 28, resizeMode: 'contain' },
  placeholder: { width: 28 },
  mainContent: { flex: 1, padding: 15 },
  title: { fontFamily: 'Roboto-Bold', fontSize: 20, color: '#0AB3FF' },

  notifcontainer: { borderRadius: 20, padding: 15, marginBottom: 15 },
  notifheader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5, justifyContent: 'space-between' },
  notificon: { width: 32, height: 32, resizeMode: 'contain', marginRight: 10, marginTop: 2 },
  notifheaderText: { fontFamily: 'Roboto-Bold', fontSize: 16, flexWrap: 'wrap' },
  notifdescription: { paddingLeft: 44, marginBottom: 4 },
  notifdescriptiontext: { fontFamily: 'Roboto-Light', fontSize: 13 },

  // Appeal Box
  adminAppealBox: {
    backgroundColor: 'rgba(10, 179, 255, 0.15)',
    borderLeftWidth: 3,
    borderLeftColor: '#0AB3FF',
    padding: 10,
    marginVertical: 8,
    marginLeft: 44,
    borderRadius: 6,
  },
  appealTitle: { color: '#0AB3FF', fontWeight: 'bold', fontSize: 11, letterSpacing: 0.5 },
  appealText: { color: '#FFFFFF', fontSize: 13, fontStyle: 'italic', lineHeight: 18 },

  // Modal Styles
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView1: { width: '90%', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },

  dropdown1: { borderWidth: 1 },
  dropdownText1: {},
  placeholderText1: {},
  dropdownContainer1: {},
  selectedItemContainer1: {},
  selectedItemLabel1: {},

  reasonInput: { padding: 12, borderRadius: 8, width: '100%', height: 80, textAlignVertical: 'top', borderWidth: 1 },

  cancelBtn: { flex: 1, borderWidth: 1, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  suspendBtn: { flex: 1, backgroundColor: '#FF4E4E', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  btnTextWhite: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});