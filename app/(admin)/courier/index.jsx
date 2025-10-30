import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable, IconButton, Menu, Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';

const allCouriers = [
  { id: 1, name: 'Scottie mafren', vehicleType: 'Motorcycle', vehicleColor: 'Black', status: 'Inactive' },
  { id: 2, name: 'dsadsad', vehicleType: 'Motorcycle', vehicleColor: 'Black', status: 'Pending' },
  { id: 3, name: 'dsadasswgegmafren', vehicleType: 'Motorcycle', vehicleColor: 'Black', status: 'Active' },
  { id: 4, name: 'Scottie geagseg', vehicleType: 'Motorcycle', vehicleColor: 'Black', status: 'Inactive' },
  // Add more couriers to test pagination
  { id: 5, name: 'John Doe', vehicleType: 'Van', vehicleColor: 'White', status: 'Active' },
  { id: 6, name: 'Jane Smith', vehicleType: 'Bicycle', vehicleColor: 'Red', status: 'Pending' },
  { id: 7, name: 'Mike Johnson', vehicleType: 'Motorcycle', vehicleColor: 'Blue', status: 'Inactive' },
  { id: 8, name: 'John Doe', vehicleType: 'Van', vehicleColor: 'White', status: 'Active' },
  { id: 9, name: 'Jane Smith', vehicleType: 'Bicycle', vehicleColor: 'Red', status: 'Pending' },
  { id: 10, name: 'Mike Johnson', vehicleType: 'Motorcycle', vehicleColor: 'Blue', status: 'Inactive' },

];


const ITEMS_PER_PAGE = 7;
export default function AdminCourier() {
  const router = useRouter(); 
const [page, setPage] = useState(0);
  const [couriers, setCouriers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // This logic simulates fetching and paginating data
    const from = page * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE;
    setCouriers(allCouriers.slice(from, to));
  }, [page]);


const getStatusStyle = (status) => {
    let color;
    switch (status.toLowerCase()) {
      case 'active': color = '#2ECC71'; break;
      case 'inactive': color = '#E74C3C'; break;
      case 'pending': color = '#F1C40F'; break;
      default: color = '#BDC3C7'; break;
    }
    return { color, fontWeight: 'bold' };
  };

 const headerlogo = require("@/assets/images/headerlogo.png");
    const [searchQuery, setSearchQuery] = useState('');
     const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState([
          {label: 'All', value: 'All'},
          {label: 'Active', value: 'Active'},
          {label: 'Inactive', value: 'Inactive'},
          {label: 'Pending', value: 'Pending'},
          {label: 'Suspended', value: 'Suspended'},
        ]);
        
        const [open1, setOpen1] = useState(false);
        const [value1, setValue1] = useState(null);
        const [items1, setItems1] = useState([
          {label: 'Fraudulent Activity', value: '1'},
          {label: 'Customer Complaints', value: '2'},
          {label: 'Violation of Policies', value: '3'},
          {label: 'Unprofessional Behavior', value: '4'},
          {label: 'Fake/Invalid Documents', value: '5'},
          {label: 'Unprofessional Behavior', value: '6'},
          {label: 'Repeated Late Deliveries', value: '7'},
           {label: 'Tampering with Orders', value: '8'},
        ]);

  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const openMenu = (id) => setVisibleMenuId(id);
  const closeMenu = () => setVisibleMenuId(null);

  const handleView = (id) => {
    console.log('Navigating to user profile:', id);
    router.push({ pathname: '/(admin)/courier/[id]', params: { id: String(id) ,from:'courier'}});
  };

  const handleSuspend = (id) => {
    console.log('Suspend courier:', id);
    setModalVisible(true);
    closeMenu();
  };







  return (
   <View style={styles.container}>
             <View style={styles.header}>     
                 <Image  source={headerlogo} style={styles.logo}/>
               </View> 
           <View style={styles.mainContent}>
            <View style={styles.tableheader}>
              <View>
                <Text style={styles.tableheadertext}>Courier Table</Text>
              </View>
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
            zIndex={1000} // A base zIndex
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
    {/* --- APPLY STYLES HERE --- */}
    <DataTable.Title style={styles.idColumn} textStyle={styles.headerText}>ID</DataTable.Title>
    <DataTable.Title style={styles.nameColumn} textStyle={styles.headerText}>Name</DataTable.Title>
    <DataTable.Title style={styles.vehicleColumn} textStyle={styles.headerText}>Vehicle</DataTable.Title>
    <DataTable.Title style={styles.statusColumn} textStyle={styles.headerText}>Status</DataTable.Title>
    <DataTable.Title style={styles.actionsColumn} textStyle={styles.headerText}>Actions</DataTable.Title>
  </DataTable.Header>

  {couriers.map((courier) =>  {
    
    if (!courier) return null;
    return(
    <DataTable.Row key={courier.id} style={styles.row}>
      {/* --- AND APPLY STYLES HERE --- */}
      <DataTable.Cell style={styles.idColumn} textStyle={styles.cellText}>{courier.id}</DataTable.Cell>
      <DataTable.Cell style={styles.nameColumn} textStyle={styles.cellText}>{courier.name}</DataTable.Cell>
      <DataTable.Cell style={styles.vehicleColumn} textStyle={styles.cellText}>{courier.vehicleType}</DataTable.Cell>
      <DataTable.Cell style={styles.statusColumn}>
        <Text style={[styles.cellText, getStatusStyle(courier.status)]}>
          {courier.status}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.actionsColumn}>
                <Menu
                  visible={visibleMenuId === courier.id}
                  onDismiss={closeMenu}
                  anchor={
                    <IconButton
                      icon="dots-vertical"
                      iconColor="#0AB3FF"
                      size={20}
                      onPress={() => openMenu(courier.id)}
                    />
                  }>
                  <Menu.Item onPress={() => handleView(courier.id)} title="View" />
                     <Pressable
       onPress={() => setModalVisible(true)}>  
                    
                  <Menu.Item onPress={() => handleSuspend(courier.id)} title="Suspend" />
                    </Pressable>
                </Menu>
              </DataTable.Cell>
    </DataTable.Row>); 
    
        })}
        
            
           
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

         <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                                  <View style={styles.modalView}>
                                    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                                      <Pressable onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                                        <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                                      </Pressable>
                                      <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', alignItems: 'center', }}>Are you sure you want to suspend this
                                         account? {"                                                 "}The user will not be able to log in or use the services until reactivated.</Text>
                                    </View>
                                    <View style={{ marginBottom: 1 }}>
                                               <View style={styles.filterbtn1}>
                                              <DropDownPicker
                                                open={open1}
                                                value={value1}
                                                items={items1}
                                                setOpen={setOpen1}
                                                setValue={setValue1}
                                                setItems={setItems1}
                                                onOpen={() => setOpen(false)} // Close the other dropdown when this one opens
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

                                    <View style={{ flexDirection: 'row', gap: 40 ,marginTop: -140}}>
                                        <Pressable
                                      style={{ alignSelf: 'center', borderColor: '#ffffff', borderWidth: 1,borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginTop: 8 }}
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
    backgroundColor: '#22262F',
    borderColor: '#22262F',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
  },
  selectedItemContainer: {
    backgroundColor: '#22262F',
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
    overflow: 'hidden', // This is important to apply border radius to the DataTable
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
  },
  pagination: {
    backgroundColor: '#363D47',
    color: 'white',
  },
  idColumn: {
    flex: 0.5, // Makes the ID column narrow
    justifyContent: 'center', // Center the content
  },
  nameColumn: {
    flex: 2, // Gives the Name column more space
  },
  vehicleColumn: {
    flex: 1.5, // A medium amount of space
  },
  statusColumn: {
    flex: 2, // A smaller amount of space
    justifyContent: 'center', // Center the content
  },
  actionsColumn: {
    flex: 0.8,
    justifyContent: 'center', // Center the icon button
  },
   modalView: {
    margin: 20,
    width: '95%',
    height: '40%',
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
  },
  filterbtn1:{
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  dropdown1: {
    backgroundColor: '#363D47',
    borderColor: '#363D47',
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
    backgroundColor: '#4B5563',
    borderColor: '#4B5563',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
  },
  selectedItemContainer1: {
    backgroundColor: '#4B5563',
  },
  selectedItemLabel1: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
});