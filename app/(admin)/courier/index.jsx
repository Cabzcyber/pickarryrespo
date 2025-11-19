import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable, IconButton, Menu, Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';

const ITEMS_PER_PAGE = 7;

export default function AdminCourier() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [allCouriers, setAllCouriers] = useState([]);
  const [couriers, setCouriers] = useState([]);

  // Modals
  const [modalVisible, setModalVisible] = useState(false); // Suspend
  const [rejectModalVisible, setRejectModalVisible] = useState(false); // Reject
  const [approveModalVisible, setApproveModalVisible] = useState(false); // Approve
  const [unsuspendModalVisible, setUnsuspendModalVisible] = useState(false); // Unsuspend (NEW)

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Tracking
  const [selectedId, setSelectedId] = useState(null);
  const [visibleMenuId, setVisibleMenuId] = useState(null);

  // Reasons
  const [rejectReason, setRejectReason] = useState('');
  const [suspendReason, setSuspendReason] = useState('');

  // Dropdowns
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Suspended', value: 'Suspended' },
    { label: 'Rejected', value: 'Rejected' },
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: 'Fraudulent Activity', value: 'Fraudulent Activity' },
    { label: 'Customer Complaints', value: 'Customer Complaints' },
    { label: 'Violation of Policies', value: 'Violation of Policies' },
    { label: 'Unprofessional Behavior', value: 'Unprofessional Behavior' },
    { label: 'Fake/Invalid Documents', value: 'Fake/Invalid Documents' },
    { label: 'Repeated Late Deliveries', value: 'Repeated Late Deliveries' },
    { label: 'Tampering with Orders', value: 'Tampering with Orders' },
  ]);

  // --- FETCH DATA ---
  const fetchCouriers = async (status, search) => {
    try {
        if (!actionLoading) setLoading(true);

        const { data, error } = await supabase.rpc('get_couriers_with_filters', {
          status_filter: status || 'All',
          search_filter: search || ''
        });

        if (error) {
          console.error('Error fetching couriers:', error.message);
          setAllCouriers([]);
          return;
        }

        const formattedData = data.map(item => ({
          user_id: item.user_id,
          vehicle: item.vehicle_name || 'N/A',
          service_user: {
              full_name: item.full_name || 'N/A',
              user_status: item.status_name || 'Unknown'
          }
        }));

        setAllCouriers(formattedData || []);
        setPage(0);
    } catch (e) {
        console.log(e);
    } finally {
        setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCouriers(value, searchQuery);
    }, [value, searchQuery])
  );

  useFocusEffect(
    useCallback(() => {
        const from = page * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE;
        setCouriers(allCouriers.slice(from, to));
    }, [page, allCouriers])
  );

  // --- ACTION: SUSPEND CONFIRM ---
  const handleSuspendConfirm = async () => {
    if (!selectedId) return;

    const finalReason = value1 ? value1 : suspendReason;

    if (!finalReason || finalReason.trim() === "") {
        Alert.alert("Required", "Please select or enter a reason for suspension.");
        return;
    }

    try {
        setActionLoading(true);

        const { data, error } = await supabase.from('courier')
          .update({
              user_status: 4,
              suspension_reason: finalReason
          })
          .eq('user_id', selectedId)
          .select();

        if (error) throw error;
        if (!data || data.length === 0) throw new Error("Update failed. Check permissions.");

        setModalVisible(false);
        setSuspendReason('');
        setValue1(null);

        setTimeout(() => Alert.alert("Success", "Courier has been suspended."), 300);

        fetchCouriers(value, searchQuery);
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setActionLoading(false);
    }
  };

  // --- ACTION: UNSUSPEND CONFIRM (NEW) ---
  const handleUnsuspendConfirm = async () => {
    if (!selectedId) return;

    try {
        setActionLoading(true);

        // Update Status to 1 (Active) and Clear Suspension Reason
        const { data, error } = await supabase.from('courier')
          .update({
              user_status: 1,
              suspension_reason: null
          })
          .eq('user_id', selectedId)
          .select();

        if (error) throw error;
        if (!data || data.length === 0) throw new Error("Update failed. Check permissions.");

        setUnsuspendModalVisible(false);

        setTimeout(() => Alert.alert("Success", "Courier has been unsuspended and is now Active."), 300);

        fetchCouriers(value, searchQuery);
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setActionLoading(false);
    }
  };

  // ... Existing Approve/Reject ...
    const handleApproveConfirm = async () => {
    if (!selectedId) return;
    try {
        setActionLoading(true);
        const { data, error } = await supabase.from('courier').update({ user_status: 1 }).eq('user_id', selectedId).select();
        if (error) throw error;
        if (!data || data.length === 0) throw new Error("Update failed.");
        setApproveModalVisible(false);
        setTimeout(() => Alert.alert("Success", "Courier approved successfully!"), 300);
        fetchCouriers(value, searchQuery);
    } catch (error) { Alert.alert("Error", error.message); } finally { setActionLoading(false); }
  };

  const handleRejectConfirm = async () => {
    if (!selectedId) return;
    if (!rejectReason.trim()) { Alert.alert("Required", "Please enter a reason."); return; }
    try {
        setActionLoading(true);
        const { data, error } = await supabase.from('courier').update({ user_status: 5, rejection_reason: rejectReason }).eq('user_id', selectedId).select();
        if (error) throw error;
        if (!data || data.length === 0) throw new Error("Update failed.");
        setRejectModalVisible(false);
        setRejectReason('');
        setTimeout(() => Alert.alert("Success", "Application rejected."), 300);
        fetchCouriers(value, searchQuery);
    } catch (error) { Alert.alert("Error", error.message); } finally { setActionLoading(false); }
  };


  // Handlers
  const openMenu = (id) => setVisibleMenuId(id);
  const closeMenu = () => setVisibleMenuId(null);

  const handleView = (id) => {
    closeMenu();
    router.push({ pathname: '/(admin)/courier/[id]', params: { id: String(id), from: 'courier' } });
  };

  const handleSuspendModal = (id) => {
    closeMenu();
    setSelectedId(id);
    setSuspendReason('');
    setValue1(null);
    setTimeout(() => setModalVisible(true), 100);
  };

  const handleUnsuspendModal = (id) => {
    closeMenu();
    setSelectedId(id);
    setTimeout(() => setUnsuspendModalVisible(true), 100);
  };

  const handleRejectModal = (id) => {
    closeMenu();
    setSelectedId(id);
    setRejectReason('');
    setTimeout(() => setRejectModalVisible(true), 100);
  };

  const handleApproveModal = (id) => {
    closeMenu();
    setSelectedId(id);
    setTimeout(() => setApproveModalVisible(true), 100);
  };

  const getStatusStyle = (status) => {
    if (!status) return { color: '#BDC3C7' };
    switch (status.toLowerCase()) {
      case 'active': return { color: '#2ECC71', fontWeight: 'bold' };
      case 'inactive': return { color: '#E74C3C', fontWeight: 'bold' };
      case 'pending': return { color: '#F1C40F', fontWeight: 'bold' };
      case 'suspended': return { color: '#E74C3C', fontWeight: 'bold' };
      case 'rejected': return { color: '#888888', fontWeight: 'bold', fontStyle: 'italic' };
      default: return { color: '#BDC3C7', fontWeight: 'bold' };
    }
  };

  const headerlogo = require("@/assets/images/headerlogo.png");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={headerlogo} style={styles.logo} />
      </View>
      <View style={styles.mainContent}>
        {/* Table Header & Filter (Same as before) */}
        <View style={styles.tableheader}>
          <View><Text style={styles.tableheadertext}>Courier Table</Text></View>
          <View style={styles.filtercontainer}>
            <View style={styles.searchcontainer}>
              <Searchbar
                placeholder="Search Courier..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
                iconColor="#0AB3FF"
                inputStyle={styles.searchInput}
                placeholderTextColor="#0AB3FF"
              />
            </View>
            <View style={styles.filterbtn}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onOpen={() => setOpen1(false)}
                zIndex={2000}
                placeholder="Status"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.placeholderText}
                dropDownContainerStyle={styles.dropdownContainer}
              />
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.idColumn} textStyle={styles.headerText}>ID</DataTable.Title>
              <DataTable.Title style={styles.nameColumn} textStyle={styles.headerText}>Name</DataTable.Title>
              <DataTable.Title style={styles.vehicleColumn} textStyle={styles.headerText}>Vehicle</DataTable.Title>
              <DataTable.Title style={styles.statusColumn} textStyle={styles.headerText}>Status</DataTable.Title>
              <DataTable.Title style={styles.actionsColumn} textStyle={styles.headerText}>Actions</DataTable.Title>
            </DataTable.Header>

            {loading ? (
               <ActivityIndicator size="large" color="#0AB3FF" style={{margin: 20}} />
            ) : (
                couriers.map((courier) => {
                const fullName = courier.service_user ? courier.service_user.full_name : 'N/A';
                const status = courier.service_user ? courier.service_user.user_status : 'Unknown';
                const isPending = status.toLowerCase() === 'pending';
                const isSuspended = status.toLowerCase() === 'suspended';

                return (
                    <DataTable.Row key={courier.user_id} style={styles.row}>
                    <DataTable.Cell style={styles.idColumn} textStyle={styles.cellText}>{courier.user_id.substring(0, 6)}...</DataTable.Cell>
                    <DataTable.Cell style={styles.nameColumn} textStyle={styles.cellText}>{fullName}</DataTable.Cell>
                    <DataTable.Cell style={styles.vehicleColumn} textStyle={styles.cellText}>{courier.vehicle}</DataTable.Cell>
                    <DataTable.Cell style={styles.statusColumn}>
                        <Text style={[styles.cellText, getStatusStyle(status)]}>{status}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.actionsColumn}>
                        <Menu
                        visible={visibleMenuId === courier.user_id}
                        onDismiss={closeMenu}
                        anchor={<IconButton icon="dots-vertical" iconColor="#0AB3FF" size={20} onPress={() => openMenu(courier.user_id)} />}>

                        <Menu.Item onPress={() => handleView(courier.user_id)} title="View" />

                        {isPending && (
                          <>
                            <Menu.Item onPress={() => handleApproveModal(courier.user_id)} title="Approve" />
                            <Menu.Item onPress={() => handleRejectModal(courier.user_id)} title="Reject" />
                          </>
                        )}

                        {isSuspended && (
                            <Menu.Item onPress={() => handleUnsuspendModal(courier.user_id)} title="Unsuspend" />
                        )}

                        {!isPending && !isSuspended && <Menu.Item onPress={() => handleSuspendModal(courier.user_id)} title="Suspend" />}
                        </Menu>
                    </DataTable.Cell>
                    </DataTable.Row>
                );
                })
            )}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(allCouriers.length / ITEMS_PER_PAGE)}
              onPageChange={(newPage) => setPage(newPage)}
              label={`${page * ITEMS_PER_PAGE + 1}-${Math.min((page + 1) * ITEMS_PER_PAGE, allCouriers.length)} of ${allCouriers.length}`}
              numberOfItemsPerPage={ITEMS_PER_PAGE}
              style={styles.pagination}
            />
          </DataTable>
        </View>

         {/* SUSPEND MODAL */}
         <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Pressable onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                </Pressable>
                <Text style={styles.modalTitle}>Suspend Account?</Text>
              </View>

              <View style={{ width: '100%', marginBottom: 15, zIndex: 3000 }}>
                <Text style={{color:'#ccc', marginBottom: 5}}>Select Reason:</Text>
                <DropDownPicker
                    open={open1}
                    value={value1}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setItems1}
                    placeholder="Choose from list..."
                    zIndex={3000}
                    style={styles.dropdown1}
                    textStyle={styles.dropdownText1}
                    placeholderStyle={styles.placeholderText1}
                    dropDownContainerStyle={styles.dropdownContainer1}
                    listMode="SCROLLVIEW"
                />
              </View>

              <View style={{ width: '100%', marginBottom: 20 }}>
                <Text style={{color:'#ccc', marginBottom: 5}}>Or type specific reason:</Text>
                <TextInput
                    style={styles.reasonInput}
                    placeholder="Enter specific details..."
                    placeholderTextColor="#7398A9"
                    value={suspendReason}
                    onChangeText={setSuspendReason}
                    multiline
                />
              </View>

              <View style={styles.modalButtons}>
                <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.suspendButton} onPress={handleSuspendConfirm} disabled={actionLoading}>
                    {actionLoading ? <ActivityIndicator color="white"/> : <Text style={styles.buttonText}>Suspend</Text>}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* UNSUSPEND MODAL (NEW) */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={unsuspendModalVisible}
          onRequestClose={() => setUnsuspendModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Pressable onPress={() => setUnsuspendModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                </Pressable>
                <Text style={styles.modalTitle}>Unsuspend Account?</Text>
              </View>

              <View style={{ marginBottom: 20, width: '100%' }}>
                <Text style={{ color: '#fff', textAlign:'center', fontSize: 15 }}>
                    Are you sure you want to unsuspend this courier? They will become Active and can accept orders again.
                </Text>
              </View>

              <View style={styles.modalButtons}>
                <Pressable style={styles.cancelButton} onPress={() => setUnsuspendModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>

                <Pressable style={styles.approveButton} onPress={handleUnsuspendConfirm} disabled={actionLoading}>
                    {actionLoading ? <ActivityIndicator color="black"/> : <Text style={[styles.buttonText, {color:'black'}]}>Unsuspend</Text>}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* REJECT MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={rejectModalVisible}
          onRequestClose={() => setRejectModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Pressable onPress={() => setRejectModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                </Pressable>
                <Text style={styles.modalTitle}>Reject Application?</Text>
              </View>
              <View style={{ width: '100%', marginBottom: 20 }}>
                <Text style={{color:'#ccc', marginBottom: 8}}>Reason for Rejection:</Text>
                <TextInput
                    style={styles.reasonInput}
                    placeholder="Enter reason..."
                    placeholderTextColor="#7398A9"
                    value={rejectReason}
                    onChangeText={setRejectReason}
                    multiline
                />
              </View>
              <View style={styles.modalButtons}>
                <Pressable style={styles.cancelButton} onPress={() => setRejectModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.rejectButton} onPress={handleRejectConfirm} disabled={actionLoading}>
                    {actionLoading ? <ActivityIndicator color="white"/> : <Text style={styles.buttonText}>Reject</Text>}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* APPROVE MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={approveModalVisible}
          onRequestClose={() => setApproveModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Pressable onPress={() => setApproveModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                </Pressable>
                <Text style={styles.modalTitle}>Approve Application?</Text>
              </View>

              <View style={{ marginBottom: 20, width: '100%' }}>
                <Text style={{ color: '#fff', textAlign:'center', fontSize: 15 }}>
                    Are you sure you want to approve this courier? They will be able to log in and accept orders immediately.
                </Text>
              </View>

              <View style={styles.modalButtons}>
                <Pressable style={styles.cancelButton} onPress={() => setApproveModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>

                <Pressable style={styles.approveButton} onPress={handleApproveConfirm} disabled={actionLoading}>
                    {actionLoading ? <ActivityIndicator color="black"/> : <Text style={[styles.buttonText, {color:'black'}]}>Approve</Text>}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, padding: 15 },
  filtercontainer: { backgroundColor: '#363D47', borderColor: '#363D47', borderWidth: 1, borderRadius: 11, width: '100%', height: 'auto', marginTop: verticalScale(15), padding: 4, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: verticalScale(15), zIndex: 2000 },
  searchcontainer: { flex: 2, paddingHorizontal: 5 },
  searchbar: { backgroundColor: '#22262F', borderRadius: 8, height: 40 },
  searchInput: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular', minHeight: 0 },
  filterbtn: { flex: 1, paddingHorizontal: 5, paddingVertical: 5 },
  dropdown: { backgroundColor: '#22262F', borderColor: '#22262F', borderWidth: 0, borderRadius: 8, minHeight: 40 },
  dropdownText: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },
  placeholderText: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },
  dropdownContainer: { backgroundColor: '#22262F', borderColor: '#22262F', borderWidth: 1, borderRadius: 8, marginTop: 5 },
  tableheadertext: { color: '#FFFFFF', fontSize: 25, fontFamily: 'Roboto-Bold', minHeight: 0 },
  tableContainer: { borderRadius: 8, overflow: 'hidden', backgroundColor: '#363D47', zIndex: 1000 },
  tableHeader: { backgroundColor: '#363D47' },
  headerText: { color: 'white', fontWeight: 'bold' },
  row: { borderBottomColor: '#4A4A61', borderBottomWidth: 1, minHeight: 48 },
  cellText: { color: 'white', fontSize: 12 },
  pagination: { backgroundColor: '#363D47', color: 'white' },
  idColumn: { flex: 0.5, justifyContent: 'center' },
  nameColumn: { flex: 2 },
  vehicleColumn: { flex: 1.5 },
  statusColumn: { flex: 1.5 },
  actionsColumn: { flex: 0.8, justifyContent: 'center' },

  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, width: '95%', backgroundColor: '#363D47', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold', flexShrink: 1 },
  reasonInput: { backgroundColor: '#22262F', color: '#fff', padding: 12, borderRadius: 8, width: '100%', height: 100, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', gap: 20, marginTop: 10, zIndex: 100 },
  cancelButton: { borderColor: '#ffffff', borderWidth: 1, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 30 },
  suspendButton: { backgroundColor: '#FF4E4E', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 30 },
  rejectButton: { backgroundColor: '#E74C3C', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 30 },
  approveButton: { backgroundColor: '#2ECC71', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 30 },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  dropdown1: { backgroundColor: '#22262F', borderColor: '#22262F', borderWidth: 0, borderRadius: 8, minHeight: 40 },
  dropdownText1: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },
  placeholderText1: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },
  dropdownContainer1: { backgroundColor: '#22262F', borderColor: '#22262F', borderWidth: 1, borderRadius: 8, marginTop: 5 },
});