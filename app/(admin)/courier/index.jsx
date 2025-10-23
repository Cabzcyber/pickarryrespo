import { Image, StyleSheet, Text, View, } from 'react-native';
//import { useRouter } from 'expo-router';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
export default function AdminCourier() {
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
            placeholder="Filter Status"
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
          <View style={styles.tablecontainer}>
          <View> style={styles.tablecontainerheader}







          </View>
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
    backgroundColor: '#363D47',
    borderColor: '#363D47',
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
});