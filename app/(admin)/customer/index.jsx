
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable, IconButton, Menu, Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

const ITEMS_PER_PAGE = 7;

export default function AdminCustomer() {
  const router = useRouter();
  const [page, setPage] = useState(0);

  // Theme Colors
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const subTextColor = useThemeColor({}, 'subText');
  const borderColor = useThemeColor({}, 'border');
  const tintColor = useThemeColor({}, 'tint');

  // Data State
  const [allCustomers, setAllCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Modals
  const [suspendModalVisible, setSuspendModalVisible] = useState(false);
  const [unsuspendModalVisible, setUnsuspendModalVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Tracking
  const [selectedId, setSelectedId] = useState(null);
  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');

  // Dropdown Data
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Suspended', value: 'Suspended' },
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: 'Fraudulent Activity', value: 'Fraudulent Activity' },
    { label: 'Violation of Policies', value: 'Violation of Policies' },
    { label: 'Abusive behavior', value: 'Abusive behavior' },
    { label: 'Excessive cancellations', value: 'Excessive cancellations' },
    { label: 'Fake/invalid information', value: 'Fake/invalid information' },
    { label: 'Misuse of refunds', value: 'Misuse of refunds' },
  ]);

  // --- FETCH DATA ---
  const fetchCustomers = async (status, search) => {
    try {
      if (!actionLoading) setLoading(true);

      // Use the RPC for Customers
      const { data, error } = await supabase.rpc('get_customers_with_filters', {
        status_filter: status || 'All',
        search_filter: search || ''
      });

      if (error) {
        console.error('Error fetching customers:', error.message);
        setAllCustomers([]);
        return;
      }

      const formattedData = data.map(item => ({
        id: item.user_id,
        name: item.full_name,
        contact: item.phone_number,
        status: item.status_name
      }));

      setAllCustomers(formattedData);
      setPage(0);

    } catch (err) {
      console.error("System Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCustomers(value, searchQuery);
    }, [value, searchQuery])
  );

  useFocusEffect(
    useCallback(() => {
      const from = page * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE;
      setCustomers(allCustomers.slice(from, to));
    }, [page, allCustomers])
  );

  // --- ACTION: SUSPEND ---
  const handleSuspendConfirm = async () => {
    if (!selectedId) return;

    const finalReason = value1 ? value1 : suspendReason;
    if (!finalReason || finalReason.trim() === "") {
      Alert.alert("Required", "Please select or enter a reason.");
      return;
    }

    try {
      setActionLoading(true);
      // Security: Update SERVICE_USER table
      // We set userstatus_id to 4 (Suspended)
      const { data, error } = await supabase.from('service_user')
        .update({
          userstatus_id: 4,
          suspension_reason: finalReason
        })
        .eq('user_id', selectedId)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Update failed. Check permissions.");

      setSuspendModalVisible(false);
      setSuspendReason('');
      setValue1(null);

      setTimeout(() => Alert.alert("Success", "Customer suspended."), 300);
      fetchCustomers(value, searchQuery); // Refresh table to show new status

    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // --- ACTION: UNSUSPEND ---
  const handleUnsuspendConfirm = async () => {
    if (!selectedId) return;

    try {
      setActionLoading(true);
      // Security: Reset SERVICE_USER table
      // We set userstatus_id back to 1 (Active)
      const { data, error } = await supabase.from('service_user')
        .update({
          userstatus_id: 1,
          suspension_reason: null
        })
        .eq('user_id', selectedId)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Update failed.");

      setUnsuspendModalVisible(false);
      setTimeout(() => Alert.alert("Success", "Customer unsuspended (Active)."), 300);
      fetchCustomers(value, searchQuery);

    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Handlers
  const openMenu = (id) => setVisibleMenuId(id);
  const closeMenu = () => setVisibleMenuId(null);

  const handleView = (id) => {
    closeMenu();
    router.push({ pathname: '/(admin)/courier/[id]', params: { id: String(id), from: 'customer' } });
  };

  const handleSuspendModal = (id) => {
    closeMenu();
    setSelectedId(id);
    setSuspendReason('');
    setValue1(null);
    setTimeout(() => setSuspendModalVisible(true), 100);
  };

  const handleUnsuspendModal = (id) => {
    closeMenu();
    setSelectedId(id);
    setTimeout(() => setUnsuspendModalVisible(true), 100);
  };

  const getStatusStyle = (status) => {
    if (!status) return { color: '#BDC3C7' };
    switch (status.toLowerCase()) {
      case 'active': return { color: '#2ECC71', fontWeight: 'bold' };
      case 'inactive': return { color: '#E74C3C', fontWeight: 'bold' };
      case 'pending': return { color: '#F1C40F', fontWeight: 'bold' };
      case 'suspended': return { color: '#E74C3C', fontWeight: 'bold' };
      default: return { color: '#BDC3C7', fontWeight: 'bold' };
    }
  };

  const headerlogo = require("@/assets/images/headerlogo.png");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Image source={headerlogo} style={styles.logo} />
      </View>
      <View style={styles.mainContent}>
        <View style={styles.tableheader}>
          <View><Text style={[styles.tableheadertext, { color: textColor }]}>Customer Table</Text></View>
          <View style={[styles.filtercontainer, { backgroundColor: cardColor, borderColor: borderColor }]}>
            <View style={styles.searchcontainer}>
              <Searchbar
                placeholder="Search Customer..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={[styles.searchbar, { backgroundColor: backgroundColor === Colors.dark.background ? '#22262F' : Colors.light.card }]}
                iconColor={tintColor}
                inputStyle={[styles.searchInput, { color: tintColor }]}
                placeholderTextColor={tintColor}
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
                style={[styles.dropdown, { backgroundColor: backgroundColor === Colors.dark.background ? '#22262F' : Colors.light.card, borderColor: borderColor }]}
                textStyle={[styles.dropdownText, { color: tintColor }]}
                placeholderStyle={[styles.placeholderText, { color: tintColor }]}
                dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: cardColor, borderColor: borderColor }]}
                theme={backgroundColor === Colors.dark.background ? 'DARK' : 'LIGHT'}
              />
            </View>
          </View>
        </View>

        <View style={[styles.tableContainer, { backgroundColor: cardColor }]}>
          <DataTable>
            <DataTable.Header style={[styles.tableHeader, { backgroundColor: cardColor, borderBottomColor: borderColor }]}>
              <DataTable.Title style={styles.idColumn} textStyle={[styles.headerText, { color: textColor }]}>ID</DataTable.Title>
              <DataTable.Title style={styles.nameColumn} textStyle={[styles.headerText, { color: textColor }]}>Name</DataTable.Title>
              <DataTable.Title style={styles.contactColumn} textStyle={[styles.headerText, { color: textColor }]}>Contact</DataTable.Title>
              <DataTable.Title style={styles.statusColumn} textStyle={[styles.headerText, { color: textColor }]}>Status</DataTable.Title>
              <DataTable.Title style={styles.actionsColumn} textStyle={[styles.headerText, { color: textColor }]}>Actions</DataTable.Title>
            </DataTable.Header>

            {loading ? (
              <ActivityIndicator size="large" color={tintColor} style={{ margin: 20 }} />
            ) : (
              customers.map((customer) => {
                const isSuspended = customer.status.toLowerCase() === 'suspended';
                const isActive = customer.status.toLowerCase() === 'active';

                return (
                  <DataTable.Row key={customer.id} style={[styles.row, { borderBottomColor: borderColor }]}>
                    <DataTable.Cell style={styles.idColumn} textStyle={[styles.cellText, { color: textColor }]}>{customer.id.substring(0, 6)}...</DataTable.Cell>
                    <DataTable.Cell style={styles.nameColumn} textStyle={[styles.cellText, { color: textColor }]}>{customer.name}</DataTable.Cell>
                    <DataTable.Cell style={styles.contactColumn} textStyle={[styles.cellText, { color: textColor }]}>{customer.contact}</DataTable.Cell>
                    <DataTable.Cell style={styles.statusColumn}>
                      <Text style={[styles.cellText, getStatusStyle(customer.status)]}>{customer.status}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.actionsColumn}>
                      <Menu
                        visible={visibleMenuId === customer.id}
                        onDismiss={closeMenu}
                        anchor={<IconButton icon="dots-vertical" iconColor={tintColor} size={20} onPress={() => openMenu(customer.id)} />}>

                        <Menu.Item onPress={() => handleView(customer.id)} title="View" />

                        {isActive && <Menu.Item onPress={() => handleSuspendModal(customer.id)} title="Suspend" />}

                        {isSuspended && <Menu.Item onPress={() => handleUnsuspendModal(customer.id)} title="Unsuspend" />}

                      </Menu>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(allCustomers.length / ITEMS_PER_PAGE)}
              onPageChange={(newPage) => setPage(newPage)}
              label={`${page * ITEMS_PER_PAGE + 1} -${Math.min((page + 1) * ITEMS_PER_PAGE, allCustomers.length)} of ${allCustomers.length} `}
              numberOfItemsPerPage={ITEMS_PER_PAGE}
              style={[styles.pagination, { backgroundColor: cardColor }]}
              theme={{ colors: { text: textColor } }}
            />
          </DataTable>
        </View>

        {/* SUSPEND MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={suspendModalVisible}
          onRequestClose={() => setSuspendModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: cardColor }]}>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Pressable onPress={() => setSuspendModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ fontSize: 22, color: tintColor }}>{'\u25C0'}</Text>
                </Pressable>
                <Text style={[styles.modalTitle, { color: textColor }]}>Suspend Account?</Text>
              </View>

              <View style={{ width: '100%', marginBottom: 15, zIndex: 3000 }}>
                <Text style={{ color: subTextColor, marginBottom: 5 }}>Select Reason:</Text>
                <DropDownPicker
                  open={open1}
                  value={value1}
                  items={items1}
                  setOpen={setOpen1}
                  setValue={setValue1}
                  setItems={setItems1}
                  placeholder="Choose from list..."
                  zIndex={3000}
                  style={[styles.dropdown1, { backgroundColor: backgroundColor === Colors.dark.background ? '#22262F' : Colors.light.card, borderColor: borderColor }]}
                  textStyle={[styles.dropdownText1, { color: tintColor }]}
                  placeholderStyle={[styles.placeholderText1, { color: tintColor }]}
                  dropDownContainerStyle={[styles.dropdownContainer1, { backgroundColor: cardColor, borderColor: borderColor }]}
                  listMode="SCROLLVIEW"
                  theme={backgroundColor === Colors.dark.background ? 'DARK' : 'LIGHT'}
                />
              </View>

              <View style={{ width: '100%', marginBottom: 20 }}>
                <Text style={{ color: subTextColor, marginBottom: 5 }}>Or type specific reason:</Text>
                <TextInput
                  style={[styles.reasonInput, { backgroundColor: backgroundColor === Colors.dark.background ? '#22262F' : Colors.light.card, color: textColor }]}
                  placeholder="Enter specific details..."
                  placeholderTextColor={subTextColor}
                  value={suspendReason}
                  onChangeText={setSuspendReason}
                  multiline
                />
              </View>

              <View style={styles.modalButtons}>
                <Pressable style={[styles.cancelButton, { borderColor: textColor }]} onPress={() => setSuspendModalVisible(false)}>
                  <Text style={[styles.buttonText, { color: textColor }]}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.suspendButton} onPress={handleSuspendConfirm} disabled={actionLoading}>
                  {actionLoading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Suspend</Text>}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* UNSUSPEND MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={unsuspendModalVisible}
          onRequestClose={() => setUnsuspendModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: cardColor }]}>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Pressable onPress={() => setUnsuspendModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ fontSize: 22, color: tintColor }}>{'\u25C0'}</Text>
                </Pressable>
                <Text style={[styles.modalTitle, { color: textColor }]}>Unsuspend Account?</Text>
              </View>

              <View style={{ marginBottom: 20, width: '100%' }}>
                <Text style={{ color: textColor, textAlign: 'center', fontSize: 15 }}>
                  Are you sure you want to unsuspend this customer? They will be able to create orders again.
                </Text>
              </View>

              <View style={styles.modalButtons}>
                <Pressable style={[styles.cancelButton, { borderColor: textColor }]} onPress={() => setUnsuspendModalVisible(false)}>
                  <Text style={[styles.buttonText, { color: textColor }]}>Cancel</Text>
                </Pressable>

                <Pressable style={styles.approveButton} onPress={handleUnsuspendConfirm} disabled={actionLoading}>
                  {actionLoading ? <ActivityIndicator color="black" /> : <Text style={[styles.buttonText, { color: 'black' }]}>Unsuspend</Text>}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
}

// Styles (Same as AdminCourier)
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, padding: 15 },
  filtercontainer: { borderWidth: 1, borderRadius: 11, width: '100%', height: 'auto', marginTop: verticalScale(15), padding: 4, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: verticalScale(15), zIndex: 2000 },
  searchcontainer: { flex: 2, paddingHorizontal: 5 },
  searchbar: { borderRadius: 8, height: 40 },
  searchInput: { fontSize: 14, fontFamily: 'Roboto-Regular', minHeight: 0 },
  filterbtn: { flex: 1, paddingHorizontal: 5, paddingVertical: 5 },
  dropdown: { borderWidth: 0, borderRadius: 8, minHeight: 40 },
  dropdownText: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  placeholderText: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  dropdownContainer: { borderWidth: 1, borderRadius: 8, marginTop: 5 },
  tableheadertext: { fontSize: 25, fontFamily: 'Roboto-Bold', minHeight: 0 },
  tableContainer: { borderRadius: 8, overflow: 'hidden', zIndex: 1000 },
  tableHeader: {},
  headerText: { fontWeight: 'bold' },
  row: { borderBottomWidth: 1, minHeight: 48 },
  cellText: { fontSize: 12 },
  pagination: {},
  idColumn: { flex: 0.5, justifyContent: 'center' },
  nameColumn: { flex: 2 },
  contactColumn: { flex: 1.5 },
  statusColumn: { flex: 1.5 },
  actionsColumn: { flex: 0.8, justifyContent: 'center' },

  // Modal Styles
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, width: '95%', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', flexShrink: 1 },
  reasonInput: { padding: 12, borderRadius: 8, width: '100%', height: 100, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', gap: 20, marginTop: 10, zIndex: 100 },
  cancelButton: { borderWidth: 1, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 30 },
  suspendButton: { backgroundColor: '#FF4E4E', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 30 },
  approveButton: { backgroundColor: '#2ECC71', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 30 },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  dropdown1: { borderWidth: 0, borderRadius: 8, minHeight: 40 },
  dropdownText1: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  placeholderText1: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  dropdownContainer1: { borderWidth: 1, borderRadius: 8, marginTop: 5 },
});
