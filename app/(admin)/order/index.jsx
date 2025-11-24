import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable, IconButton, Menu, Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';

const ITEMS_PER_PAGE = 7;

export default function AdminOrder() {
  const router = useRouter();
  const [page, setPage] = useState(0);

  // Data State
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  // Dropdown Data
  const [openStatus, setOpenStatus] = useState(false);
  const [statusValue, setStatusValue] = useState('All');
  const [statusItems, setStatusItems] = useState([
    {label: 'All', value: 'All'},
    {label: 'Pending', value: 'pending'}, // Lowercase matches DB
    {label: 'Accepted', value: 'accepted'},
    {label: 'Ongoing', value: 'ongoing'},
    {label: 'Completed', value: 'completed'},
    {label: 'Cancelled', value: 'cancelled'},
  ]);

  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState('All');
  const [categoryItems, setCategoryItems] = useState([
    {label: 'All Categories', value: 'All'}
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Tracking
  const [visibleMenuId, setVisibleMenuId] = useState(null);

  // --- 1. FETCH CATEGORIES (On Mount) ---
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('goods_category').select('category_name');
      if (!error && data) {
        const formatted = data.map(c => ({ label: c.category_name, value: c.category_name }));
        setCategoryItems([{label: 'All Categories', value: 'All'}, ...formatted]);
      }
    };
    fetchCategories();
  }, []);

  // --- 2. FETCH ORDERS (Central Function) ---
  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log("Fetching with:", { statusValue, categoryValue, searchQuery });

      const { data, error } = await supabase.rpc('get_orders_with_filters', {
        status_filter: statusValue,
        category_filter: categoryValue,
        search_filter: searchQuery
      });

      if (error) {
        console.error('RPC Error:', error.message);
        setAllOrders([]);
      } else {
        setAllOrders(data || []);
        setPage(0); // Reset pagination on filter change
      }

    } catch (err) {
      console.error("System Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. REACT TO FILTERS ---
  // Triggers whenever Filters or Search change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchOrders();
    }, 500); // Debounce search input

    return () => clearTimeout(delayDebounceFn);
  }, [statusValue, categoryValue, searchQuery]);

  // --- 4. REFRESH ON FOCUS ---
  // Ensures list updates when coming back from Details screen
  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  // --- 5. PAGINATION LOGIC ---
  useEffect(() => {
    const from = page * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE;
    setOrders(allOrders.slice(from, to));
  }, [page, allOrders]);

  // Handlers
  const openMenu = (id) => setVisibleMenuId(id);
  const closeMenu = () => setVisibleMenuId(null);

  const handleView = (id) => {
    closeMenu();
    router.push({ pathname: '/(admin)/order/[id]', params: { id: String(id) } });
  };

  const getStatusStyle = (status) => {
    if (!status) return { color: '#BDC3C7' };
    switch (status.toLowerCase()) {
      case 'completed': return { color: '#2ECC71', fontWeight: 'bold' };
      case 'cancelled': return { color: '#E74C3C', fontWeight: 'bold' };
      case 'pending': return { color: '#F1C40F', fontWeight: 'bold' };
      case 'ongoing': return { color: '#3498DB', fontWeight: 'bold' };
      case 'accepted': return { color: '#9B59B6', fontWeight: 'bold' };
      default: return { color: '#BDC3C7', fontWeight: 'bold' };
    }
  };

  const headerlogo = require("@/assets/images/headerlogo.png");

  return (
   <View style={styles.container}>
       <View style={styles.header}>
           <Image source={headerlogo} style={styles.logo}/>
       </View>
       <View style={styles.mainContent}>

        <View style={styles.tableheader}>
          <View><Text style={styles.tableheadertext}>Orders Table</Text></View>

          <View style={styles.filtercontainer}>
            <View style={styles.searchcontainer}>
              <Searchbar
                placeholder="Search ID/Address..."
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
                open={openStatus}
                value={statusValue}
                items={statusItems}
                setOpen={setOpenStatus}
                setValue={setStatusValue}
                setItems={setStatusItems}
                onOpen={() => setOpenCategory(false)}
                zIndex={3000}
                placeholder="Status"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.dropdownContainer}
              />
            </View>

            <View style={styles.filterbtn}>
              <DropDownPicker
                open={openCategory}
                value={categoryValue}
                items={categoryItems}
                setOpen={setOpenCategory}
                setValue={setCategoryValue}
                setItems={setCategoryItems}
                onOpen={() => setOpenStatus(false)}
                zIndex={2000}
                placeholder="Category"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.dropdownContainer}
              />
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.idColumn} textStyle={styles.headerText}>ID</DataTable.Title>
              <DataTable.Title style={styles.addrColumn} textStyle={styles.headerText}>Pickup</DataTable.Title>
              <DataTable.Title style={styles.catColumn} textStyle={styles.headerText}>Category</DataTable.Title>
              <DataTable.Title style={styles.fareColumn} textStyle={styles.headerText}>Fare</DataTable.Title>
              <DataTable.Title style={styles.statusColumn} textStyle={styles.headerText}>Status</DataTable.Title>
              <DataTable.Title style={styles.actionsColumn} textStyle={styles.headerText}>View</DataTable.Title>
            </DataTable.Header>

            {loading ? (
                <ActivityIndicator size="large" color="#0AB3FF" style={{margin: 20}} />
            ) : (
                orders.map((order) => (
                    <DataTable.Row key={order.order_id} style={styles.row}>
                        <DataTable.Cell style={styles.idColumn} textStyle={styles.cellText}>#{order.order_id}</DataTable.Cell>
                        <DataTable.Cell style={styles.addrColumn} textStyle={styles.cellText}>
                            {order.pickup_address ? order.pickup_address.substring(0, 15) + '...' : 'N/A'}
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.catColumn} textStyle={styles.cellText}>{order.category_name}</DataTable.Cell>
                        <DataTable.Cell style={styles.fareColumn} textStyle={[styles.cellText, {color:'#87AFB9'}]}>₱{order.total_fare}</DataTable.Cell>
                        <DataTable.Cell style={styles.statusColumn}>
                            <Text style={[styles.cellText, getStatusStyle(order.status_name)]}>{order.status_name}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.actionsColumn}>
                            <Menu
                                visible={visibleMenuId === order.order_id}
                                onDismiss={closeMenu}
                                anchor={<IconButton icon="dots-vertical" iconColor="#0AB3FF" size={20} onPress={() => openMenu(order.order_id)} />}
                            >
                                <Menu.Item onPress={() => handleView(order.order_id)} title="View Details" />
                            </Menu>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))
            )}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(allOrders.length / ITEMS_PER_PAGE)}
              onPageChange={(newPage) => setPage(newPage)}
              label={`${page * ITEMS_PER_PAGE + 1}-${Math.min((page + 1) * ITEMS_PER_PAGE, allOrders.length)} of ${allOrders.length}`}
              numberOfItemsPerPage={ITEMS_PER_PAGE}
              style={styles.pagination}
            />
          </DataTable>
        </View>

       </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex: 1, backgroundColor: '#141519' },
  header:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  logo:{ width:120, height:28, resizeMode:'contain' },
  mainContent:{ flex: 1, padding: 15 },

  filtercontainer:{
    backgroundColor:'#363D47', borderColor:'#363D47', borderWidth:1, borderRadius:11,
    width:'100%', height:'auto', marginTop: verticalScale(15), padding: 4,
    flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: verticalScale(15), zIndex: 2000
  },
  searchcontainer:{ flex: 2, paddingHorizontal: 2 },
  searchbar:{ backgroundColor: '#22262F', borderRadius: 8, height: 40 },
  searchInput:{ color: '#0AB3FF', fontSize: 12, fontFamily: 'Roboto-Regular', minHeight: 0 },
  filterbtn:{ flex: 1.2, paddingHorizontal: 2 },

  dropdown: { backgroundColor: '#22262F', borderColor: '#22262F', borderWidth: 0, borderRadius: 8, minHeight: 40, paddingHorizontal: 5 },
  dropdownText: { color: '#0AB3FF', fontSize: 11, fontFamily: 'Roboto-Regular' },
  dropdownContainer: { backgroundColor: '#22262F', borderColor: '#22262F', borderWidth: 1, borderRadius: 8, marginTop: 5 },

  tableheader:{ flexDirection: 'column', marginBottom: 10 },
  tableheadertext:{ color: '#FFFFFF', fontSize: 25, fontFamily: 'Roboto-Bold', marginBottom: 5 },

  tableContainer: { borderRadius: 8, overflow: 'hidden', backgroundColor: '#363D47', zIndex: 1000 },
  tableHeader: { backgroundColor: '#363D47' },
  headerText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  row: { borderBottomColor: '#4A4A61', borderBottomWidth: 1, minHeight: 48 },
  cellText: { color: 'white', fontSize: 11 },
  pagination: { backgroundColor: '#363D47', color: 'white' },

  idColumn: { flex: 0.5, justifyContent: 'center' },
  addrColumn: { flex: 2 },
  catColumn: { flex: 1.2 },
  fareColumn: { flex: 1 },
  statusColumn: { flex: 1.3 },
  actionsColumn: { flex: 0.6, justifyContent: 'center' },
});