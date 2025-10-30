import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
export default function CourierBook() {
const backimg = require("@/assets/images/back.png");
    const headerlogo = require("@/assets/images/headerlogo.png");
    const headerheart = require("@/assets/images/heart.png");
    const heart = require("@/assets/images/heart.png");
    const money = require("@/assets/images/money.png");
    const time = require("@/assets/images/time.png");
    const delete1 = require("@/assets/images/delete.png");
    const geopick = require("@/assets/images/geopick.png");
    const geodrop = require("@/assets/images/geodrop.png");
    const goods = require("@/assets/images/goods.png");
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'All Books', value: 'all'},
    {label: 'Pending', value: 'pending'},
    {label: 'Pasundo', value: 'Pasundo'},
    {label: 'Pasugo', value: 'Pasugo'},
       {label: 'Food & Beverages', value: 'Food & Beverages'},
      {label: 'Documents & Papers', value: 'Documents & Papers'},
      {label: 'School & Office Supplies', value: 'School & Office Supplies'},
      {label: 'Clothing & Apparel', value: 'Clothing & Apparel'},
      {label: 'Electronics & Gadgets', value: 'Electronics & Gadgets'},
      {label: 'Household & Hardware', value: 'Household & Hardware'},
      {label: 'Medicines & Health Products', value: 'Medicines & Health Products'},
      {label: 'Others / Miscellaneous', value: 'Others / Miscellaneous'},
    ]);
    const [searchQuery, setSearchQuery] = useState('');

  return (
   <View style={styles.container}>
    <View style={styles.header}>     
      <Image  source={headerlogo} style={styles.logo}/>
    </View> 
    <View style={styles.mainContent}>
      <View style={styles.filtercontainer}>
        <View style={styles.searchcontainer}>
          <Searchbar
            placeholder="Search orders..."
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
            placeholder="Category"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            placeholderStyle={styles.placeholderText}
            dropDownContainerStyle={styles.dropdownContainer}
            selectedItemContainerStyle={styles.selectedItemContainer}
            selectedItemLabelStyle={styles.selectedItemLabel}
          />
        </View>
      </View>

      <View style={styles.ordercontent}>
        <View style={styles.ordercard}>
          <View style={styles.orderinfo}>
            {/* Product info at the top with action buttons */}
            <View style={styles.productRow}>
              <View style={styles.productInfo}>
                <Image source={goods} style={styles.ordericon}/>
                <Text style={styles.ordersubtext}>  Iced Coffee Macha 2 Cups</Text>
                </View>
                <View style={styles.actionButtons}>
                 
                </View>
              </View>
              <View style={styles.ordertext}>
                <Image source={geopick} style={styles.ordericon}/>
                <Text style={styles.ordersubtext}>Brewbox Jasaan Plaza</Text>
              </View>
              <View style={styles.ordertext}>
                <Image source={geodrop} style={styles.ordericon}/>
                <Text style={styles.ordersubtext}>Bobuntugan Zone 4</Text>
              </View>
              <View style={styles.ordertext}>
                <Image source={money} style={styles.ordericon}/>
                <Text style={styles.ordersubtext}>200.00 Cash on Delivery</Text>
              </View>
              <View style={styles.ordertext}>
                <Image source={time} style={styles.ordericon}/>
                <Text style={styles.ordersubtext}>Aug 10,2025 1:00 PM</Text>
              </View>
              <View style={styles.orderbtn}>
                <Pressable style={styles.mainbutton}
                                        onPress={()=>router.push('/(courier)/home/orderview')}
                                        > 
                                           <Text style={styles.maintextbutton}>View</Text>
                                              </Pressable>  
              </View>
            </View>
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
    marginTop: verticalScale(20),
    padding: 5,
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
  ordercontent:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding:1,
    marginTop: verticalScale(-50),
  },
  ordercard:{
    width:'100%',
    height:'52%',
    backgroundColor:'#363D47',
    borderColor:'#363D47',
    borderRadius:14,
  },
orderinfo:{
flexDirection:'column',
padding:20

},
productRow:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:15,
},
productInfo:{
  flexDirection:'row',
  alignItems:'center',
  flex:1,
},
actionButtons:{
  flexDirection:'row',
  gap:10,
},
actionButton:{
  padding:5,
},
actionIcon:{
  width:20,
  height:20,
  resizeMode:'contain',
},
orderbtn:{
flexDirection:'row',
justifyContent:'flex-end',
marginTop:-45,
},
ordertext:{
  flexDirection:'row',
  alignItems:'flex-start',
  gap:10,
  marginBottom:12,
},
ordersubtext:{
fontFamily:'Roboto-Light',
fontSize:17,
fontWeight:'300',
color:'#87AFB9',
},
ordericon:{
  width:22,
  height:22,
  resizeMode:'contain',
  marginRight:10,
},
ordersubbtn:{
flexDirection:'row'


},
mainbutton:{
  flexDirection:'column',
  width:100,
  paddingVertical:8,
  paddingHorizontal:16,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#3BF579',
  borderRadius: 8,
  },
  maintextbutton:{
  fontSize:18,
  color:'#000000',
  fontFamily: 'Roboto-Bold', 
  },


});
