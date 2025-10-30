import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable, IconButton, Menu, Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';

const allDelivery = [
  { id: 1, customer: 'Scottie mafren', courier: 'JOHN DOE', status: 'Cancelled' },
  { id: 2, customer: 'dsadsad', courier: 'JOHN DOE', status: 'Pending' },
  { id: 3, customer: 'dsadasswgegmafren', courier: 'JOHN DOE', status: 'Delivered' },
  { id: 4, customer: 'Scottie geagseg', courier: 'JOHN DOE', status: 'Scheduled' },
  // Add more deliverys to test pagination
  { id: 5, customer: 'John Doe', courier: 'JOHN DOE', status: 'Delivered' },
  { id: 6, customer: 'Jane Smith', courier: 'JOHN DOE',  status: 'Pending' },
  { id: 7, customer: 'Mike Johnson', courier: 'JOHN DOE', status: 'In Progress' },
  { id: 8, customer: 'John Doe', courier: 'JOHN DOE',  status: 'Delivered' },
  { id: 9, customer: 'Jane Smith', courier: 'JOHN DOE', status: 'Pending' },
  { id: 10, customer: 'Mike Johnson', courier: 'JOHN DOE', status: 'Scheduled' },

];


const ITEMS_PER_PAGE = 7;


export default function AdminOrder() {
 const router = useRouter(); 
const [page, setPage] = useState(0);
  const [deliverys, setDelivery] = useState([]);

  useEffect(() => {
    // This logic simulates fetching and paginating data
    const from = page * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE;
    setDelivery(allDelivery.slice(from, to));
  }, [page]);


const getStatusStyle = (status) => {
    let color;
    switch (status.toLowerCase()) {
       case 'all': color = '#FFFFFF'; break;
      case 'delivered': color = '#2ECC71'; break;
       case 'pending': color = '#F86B38'; break;
       case 'in progress': color = '#FFA600'; break;
          case 'cancelled': color = '#FF7878'; break;
         case 'scheduled': color = '#0AB3FF'; break;
      default: color = '#BDC3C7'; break;
    }
    return { color, fontWeight: 'bold' };
  };

  
        const [open1, setOpen1] = useState(false);
        const [value1, setValue1] = useState(null);
        const [items1, setItems1] = useState([
          {label: 'All', value: '1'},
          {label: 'Documents & Papers', value: '2'},
          {label: 'School & Office Supplies', value: '3'},
          {label: 'Clothing & Apparel', value: '4'},
          {label: 'Electronics & Gadgets', value: '5'},
          {label: 'Household & Hardware', value: '6'},
          {label: 'Medicines and Health Products', value: '7'},
           {label: 'Tampering with Orders', value: '8'},
          {label: 'Others / Miscellaneous', value: '9'},
        ]);

 const headerlogo = require("@/assets/images/headerlogo.png");
    const [searchQuery, setSearchQuery] = useState('');
     const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState([
          {label: 'All', value: 'All'},
          {label: 'Delivered', value: 'Delivered'},
           {label: 'Pending', value: 'Pending'},    
            {label: 'In Progress', value: 'In Progress'}, 
          {label: 'Cancelled', value: 'Cancelled'},        
           {label: 'Scheduled', value: 'Scheduled'},       
        ]);
        


  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const openMenu = (id) => setVisibleMenuId(id);
  const closeMenu = () => setVisibleMenuId(null);

  const handleView = (id) => {
    console.log('Navigating to user profile:', id);
    router.push({ pathname: '/(admin)/order/[id]', params: { id: String(id),from:'order' } });
  };





  return (
     <View style={styles.container}>
             <View style={styles.header}>     
                 <Image  source={headerlogo} style={styles.logo}/>
               </View> 
           <View style={styles.mainContent}>
            <View style={styles.tableheader}>
              <View>
                <Text style={styles.tableheadertext}>Delivery Table</Text>
              </View>
              <View style={styles.filtercontainer}>
        <View style={styles.searchcontainer}>
          <Searchbar
            placeholder="Search Delivery..."
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
<View style={{ marginBottom: 36}}>
                                               <View style={styles.filterbtn1}>
                                              <DropDownPicker
                                                open={open1}
                                                value={value1}
                                                items={items1}
                                                setOpen={setOpen1}
                                                setValue={setValue1}
                                                setItems={setItems1}
                                                onOpen={() => setOpen(false)} // Close the other dropdown when this one opens
                                                placeholder="Category"
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


            </View>
         <View style={styles.tableContainer}>
        <DataTable>
  <DataTable.Header style={styles.tableHeader}>
    {/* --- APPLY STYLES HERE --- */}
    <DataTable.Title style={styles.idColumn} textStyle={styles.headerText}>ID</DataTable.Title>
    <DataTable.Title style={styles.customerColumn} textStyle={styles.headerText}>Customer</DataTable.Title>
    <DataTable.Title style={styles.courierColumn} textStyle={styles.headerText}>Courier</DataTable.Title>
    <DataTable.Title style={styles.statusColumn} textStyle={styles.headerText}>Status</DataTable.Title>
    <DataTable.Title style={styles.actionsColumn} textStyle={styles.headerText}>Actions</DataTable.Title>
  </DataTable.Header>

  {deliverys.map((delivery) =>  {
    
    if (!delivery) return null;
    return(
    <DataTable.Row key={delivery.id} style={styles.row}>
      {/* --- AND APPLY STYLES HERE --- */}
      <DataTable.Cell style={styles.idColumn} textStyle={styles.cellText}>{delivery.id}</DataTable.Cell>
      <DataTable.Cell style={styles.customerColumn} textStyle={styles.cellText}>{delivery.customer}</DataTable.Cell>
      <DataTable.Cell style={styles.courierColumn} textStyle={styles.cellText}>{delivery.courier}</DataTable.Cell>
      <DataTable.Cell style={styles.statusColumn}>
        <Text style={[styles.cellText, getStatusStyle(delivery.status)]}>
          {delivery.status}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.actionsColumn}>
                <Menu
                  visible={visibleMenuId === delivery.id}
                  onDismiss={closeMenu}
                  anchor={
                    <IconButton
                      icon="dots-vertical"
                      iconColor="#0AB3FF"
                      size={20}
                      onPress={() => openMenu(delivery.id)}
                    />
                  }>
                  <Menu.Item onPress={() => handleView(delivery.id)} title="View" />
                     <Pressable
       onPress={() => setModalVisible(true)}>  
                    
                    </Pressable>
                </Menu>
              </DataTable.Cell>
    </DataTable.Row>); 
    
        })}
        
            
           
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(allDelivery.length / ITEMS_PER_PAGE)}
            onPageChange={(newPage) => setPage(newPage)}
            label={`${page * ITEMS_PER_PAGE + 1}-${Math.min((page + 1) * ITEMS_PER_PAGE, allDelivery.length)} of ${allDelivery.length}`}
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
    marginBottom: verticalScale(13),
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
  customerColumn: {
    flex: 2, // Gives the Name column more space
  },
  courierColumn: {
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
    marginTop: verticalScale(-13),
     width: '57%',
     
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