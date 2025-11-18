import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable, IconButton, Menu, Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';

const ITEMS_PER_PAGE = 7;

export default function AdminCustomer() {
  const router = useRouter();
  const [page, setPage] = useState(0);

  // --- STATE FOR DATA ---
  const [allCustomers, setAllCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- DROPDOWN STATES ---
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); // Default to null (All)
  const [items, setItems] = useState([
    {label: 'All', value: 'All'},
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
    {label: 'Pending', value: 'Pending'},
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Fraudulent Activity', value: '1'},
    {label: 'Violation of Policies', value: '2'},
    {label: 'Abusive behavior', value: '3'},
    {label: 'Excessive cancellations', value: '4'},
    {label: 'Fake/invalid information', value: '5'},
    {label: 'Misuse of refunds/complaints', value: '6'},
  ]);

  const headerlogo = require("@/assets/images/headerlogo.png");
  const [visibleMenuId, setVisibleMenuId] = useState(null);

  // --- 🚀 NEW FETCH FUNCTION LINKED TO SUPABASE RPC ---
  const fetchCustomers = async (status, search) => {
    try {
      const { data, error } = await supabase.rpc('get_customers_with_filters', {
        status_filter: status || 'All',
        search_filter: search || ''
      });

      if (error) {
        console.error('Error fetching customers:', error.message);
        setAllCustomers([]);
        return;
      }

      // Map RPC columns to Component state
      const formattedData = data.map(item => ({
        id: item.user_id,
        name: item.full_name,
        contact: item.phone_number, // This comes as text now due to SQL cast
        status: item.status_name
      }));

      setAllCustomers(formattedData);
      setPage(0); // Reset pagination when filter changes

    } catch (err) {
      console.error("System Error:", err);
    }
  };

  // --- USE EFFECT: Trigger Fetch on filter change ---
  useEffect(() => {
    fetchCustomers(value, searchQuery);
  }, [value, searchQuery]);

  // --- USE EFFECT: Handle Pagination locally ---
  useEffect(() => {
    const from = page * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE;
    setCustomers(allCustomers.slice(from, to));
  }, [page, allCustomers]);


  // --- UTILS ---
  const getStatusStyle = (status) => {
    if (!status) return { color: '#BDC3C7' };
    let color;
    switch (status.toLowerCase()) {
      case 'active': color = '#2ECC71'; break;
      case 'inactive': color = '#E74C3C'; break;
      case 'pending': color = '#F1C40F'; break;
      default: color = '#BDC3C7'; break;
    }
    return { color, fontWeight: 'bold' };
  };

  const openMenu = (id) => setVisibleMenuId(id);
  const closeMenu = () => setVisibleMenuId(null);

  const handleView = (id) => {
    closeMenu(); // Ensure menu is closed before navigating
    console.log('Navigating to user profile:', id);
    // Navigate to the shared profile screen, passing 'customer' as origin
    router.push({
       pathname: '/(admin)/courier/[id]',
       params: { id: String(id), from: 'customer' }
    });
  };

  const handleSuspend = (id) => {
    closeMenu(); // Ensure menu is closed
    console.log('Suspend customer:', id);
    // Small timeout to ensure menu animation finishes before modal opens
    setTimeout(() => {
        setModalVisible(true);
    }, 100);
  };

  return (
   <View style={styles.container}>
       <View style={styles.header}>
           <Image source={headerlogo} style={styles.logo}/>
       </View>
       <View style={styles.mainContent}>
        <View style={styles.tableheader}>
          <View>
            <Text style={styles.tableheadertext}>Customer Table</Text>
          </View>
          <View style={styles.filtercontainer}>
            <View style={styles.searchcontainer}>
              <Searchbar
                placeholder="Search Customer..."
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
                zIndex={1000}
                placeholder="Status"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.placeholderText}
                dropDownContainerStyle={styles.dropdownContainer}
                selectedItemContainerStyle={styles.selectedItemContainer}
                selectedItemLabelStyle={styles.selectedItemLabel}
              />
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.idColumn} textStyle={styles.headerText}>ID</DataTable.Title>
              <DataTable.Title style={styles.nameColumn} textStyle={styles.headerText}>Name</DataTable.Title>
              <DataTable.Title style={styles.contactColumn} textStyle={styles.headerText}>Contact</DataTable.Title>
              <DataTable.Title style={styles.statusColumn} textStyle={styles.headerText}>Status</DataTable.Title>
              <DataTable.Title style={styles.actionsColumn} textStyle={styles.headerText}>Actions</DataTable.Title>
            </DataTable.Header>

            {customers.map((customer) => {
              if (!customer) return null;
              return (
                <DataTable.Row key={customer.id} style={styles.row}>
                  <DataTable.Cell style={styles.idColumn} textStyle={styles.cellText}>{customer.id}</DataTable.Cell>
                  <DataTable.Cell style={styles.nameColumn} textStyle={styles.cellText}>{customer.name}</DataTable.Cell>
                  <DataTable.Cell style={styles.contactColumn} textStyle={styles.cellText}>{customer.contact}</DataTable.Cell>
                  <DataTable.Cell style={styles.statusColumn}>
                    <Text style={[styles.cellText, getStatusStyle(customer.status)]}>
                      {customer.status}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.actionsColumn}>
                    <Menu
                      visible={visibleMenuId === customer.id}
                      onDismiss={closeMenu}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          iconColor="#0AB3FF"
                          size={20}
                          onPress={() => openMenu(customer.id)}
                        />
                      }>
                      <Menu.Item onPress={() => handleView(customer.id)} title="View" />

                      {/* Fixed: Removed Pressable wrapper to fix Menu closing issues */}
                      <Menu.Item onPress={() => handleSuspend(customer.id)} title="Suspend" />

                    </Menu>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(allCustomers.length / ITEMS_PER_PAGE)}
              onPageChange={(newPage) => setPage(newPage)}
              label={`${page * ITEMS_PER_PAGE + 1}-${Math.min((page + 1) * ITEMS_PER_PAGE, allCustomers.length)} of ${allCustomers.length}`}
              numberOfItemsPerPage={ITEMS_PER_PAGE}
              style={styles.pagination}
            />
          </DataTable>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Pressable onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                </Pressable>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', alignItems: 'center', flex: 1 }}>
                  Are you sure you want to suspend this account? The user will not be able to log in or use the services until reactivated.
                </Text>
              </View>
              <View style={{ marginBottom: 1, width: '100%', zIndex: 1100 }}>
                <View style={styles.filterbtn1}>
                  <DropDownPicker
                    open={open1}
                    value={value1}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setItems1}
                    onOpen={() => setOpen(false)}
                    placeholder="Select Reason of Suspension"
                    zIndex={1100}
                    style={styles.dropdown1}
                    textStyle={styles.dropdownText1}
                    placeholderStyle={styles.placeholderText1}
                    dropDownContainerStyle={styles.dropdownContainer1}
                    selectedItemContainerStyle={styles.selectedItemContainer1}
                    selectedItemLabelStyle={styles.selectedItemLabel1}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 40, marginTop: 100 }}>
                <Pressable
                  style={{ alignSelf: 'center', borderColor: '#ffffff', borderWidth: 1, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginTop: 8 }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={{ alignSelf: 'center', backgroundColor: '#FF4E4E', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginTop: 8 }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Suspend</Text>
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
  container:{
    flex: 1,
      backgroundColor: '#141519',
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: verticalScale(30),
  },
  header1:{
  },
  logo:{
    width:120,
    height:28,
    resizeMode:'contain',
  },
  mainContent:{
    flex: 1,
    padding: 15,
  },
  filtercontainer:{
    backgroundColor:'#363D47',
    borderColor:'#363D47',
    borderWidth:1,
    borderRadius:11,
    width:'100%',
    height:'auto',
    marginTop: verticalScale(15),
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: verticalScale(15),
  },
  searchcontainer:{
    flex: 2,
    paddingHorizontal: 5,
  },
  searchbar:{
    backgroundColor: '#22262F',
    borderRadius: 8,
    height: 40,
  },
  searchInput:{
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    minHeight: 0,
  },
  filterbtn:{
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  dropdown: {
    backgroundColor: '#22262F',
    borderColor: '#22262F',
    borderWidth: 0,
    borderRadius: 8,
    minHeight: 40,
  },
  dropdownText: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  placeholderText: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  dropdownContainer: {
    backgroundColor: '#4B5563',
    borderColor: '#4B5563',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
  },
  selectedItemContainer: {
    backgroundColor: '#4B5563',
  },
  selectedItemLabel: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  tableheadertext:{
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    minHeight: 0,
  },
 tableContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#363D47',
  },
  tableHeader: {
    backgroundColor: '#363D47',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    borderBottomColor: '#4A4A61',
    borderBottomWidth: 1,
    marginBottom: verticalScale(15),
  },
  cellText: {
    color: 'white',
    fontSize: 12,
  },
  pagination: {
    backgroundColor: '#363D47',
    color: 'white',
  },
  idColumn: {
    flex: 0.5,
    justifyContent: 'center',
  },
  nameColumn: {
    flex: 2,
  },
  contactColumn: {
    flex: 1.5,
  },
  statusColumn: {
    flex: 2,
    justifyContent: 'center',
  },
  actionsColumn: {
    flex: 0.8,
    justifyContent: 'center',
  },
   modalView: {
    margin: 20,
    width: '95%',
    backgroundColor: '#363D47',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto-regular',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  filterbtn1:{
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  dropdown1: {
    backgroundColor: '#22262F',
    borderColor: '#22262F',
    borderWidth: 0,
    borderRadius: 8,
    minHeight: 40,
  },
  dropdownText1: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  placeholderText1: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  dropdownContainer1: {
    backgroundColor: '#22262F',
    borderColor: '#22262F',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
  },
  selectedItemContainer1: {
    backgroundColor: '#22262F',
  },
  selectedItemLabel1: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
});