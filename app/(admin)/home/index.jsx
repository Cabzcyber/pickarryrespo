import { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import {
  PieChart
} from "react-native-chart-kit";
import DropDownPicker from 'react-native-dropdown-picker';
import { verticalScale } from 'react-native-size-matters';


export default function AdminHome() {
  const person =require("@/assets/images/person.png")
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(null);
      const [items, setItems] = useState([
        {label: 'Current', value: 'Current'},
        {label: 'Week', value: 'Week'},
        {label: 'Month', value: 'Month'},
      ]);
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
};
 const data = [
  {
    name: "Delivered",
    population: 215,
    color: "#2BFF00",
    legendFontColor: "#0AB3FF",
    legendFontSize: 15
  },
  {
    name: "Canceled",
    population: 280,
    color: "#FF0000",
    legendFontColor: "#0AB3FF",
    legendFontSize: 15
  },
  {
    name: "Pending",
    population: 527,
    color: "#E25E00",
    legendFontColor: "#0AB3FF",
    legendFontSize: 15
  },
  {
    name: "Ongoing",
    population: 853,
    color: "#FFFF00",
    legendFontColor: "#0AB3FF",
    legendFontSize: 15
  },
];
const customersData = [
  { id: '01', name: 'Scottie mafren' },
  { id: '02', name: 'Kuya Sam' },
  { id: '03', name: 'Jerick Rival' },
  { id: '04', name: 'J.A. Juntilla' },
];

const couriersData = [
  { id: '05', name: 'Domskie Hansam' },
  { id: '06', name: 'Luke Chie' },
  { id: '07', name: 'Niel Cheat' },
  { id: '08', name: 'Tipsy Dee' },
];
  const headerlogo = require("@/assets/images/headerlogo.png");
  return (
     <View style={styles.container}>
          <View style={styles.header}>     
              <Image  source={headerlogo} style={styles.logo}/>
            </View> 
        <View style={styles.mainContent}>

        <View  style={styles.totalscontainer}>
          <View  style={styles.totalsinfo}>

            <View style={styles.totalcolumn}> 
                <View>
              <Text style={styles.totalstext1}>
                Total Customers
              </Text>
            </View>
          <View>
          <Text style={styles.totalstext2}>
                1,200
              </Text>
          </View>
            </View>

            <View style={styles.totalcolumn}> 
                <View>
              <Text style={styles.totalstext1}>
                Total Couriers
              </Text>
            </View>
          <View>
          <Text style={styles.totalstext2}>
                2,200
              </Text>
          </View>
            </View>

            <View style={styles.totalcolumn}> 
                <View>
              <Text style={styles.totalstext1}>
                Total Deliveries
              </Text>
            </View>
          <View>
          <Text style={styles.totalstext2}>
                1,235
              </Text>
          </View>
            </View>
          </View>
        </View>
        <View  style={styles.statisticscontainer}>
          <View  style={styles.filtercontainer}>
            <View  style={styles.dashboardheader}>
               <Text  style={styles.dashboardheader} >Overall Statistics</Text>
            </View>

            <View style={styles.filterbtn}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Timeframe"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            placeholderStyle={styles.placeholderText}
            dropDownContainerStyle={styles.dropdownContainer}
            selectedItemContainerStyle={styles.selectedItemContainer}
            selectedItemLabelStyle={styles.selectedItemLabel}
          />
        </View>
          </View>
        <PieChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"1"}
  center={[10, 10]}
  absolute
  style={styles.piechart}
/>
        </View>
        <View  style={styles.registeredcontainer}>
           <View  style={styles.dashboardheader2}>
               <Text  style={styles.dashboardtext} >Recently Registered</Text>
            </View>
          <View  style={styles.listcontainer}>
          <View  style={styles.registerlistcontainer}>
            <View style={styles.customerheader}>
              <Image  source={person} style={styles.listicon}/>                                    
              <Text  style={styles.listheader}>Customers </Text>
            </View>

          {customersData.map((customer) => (
            <View key={customer.id} style={styles.listItem}>
              <Text style={styles.listItemNumber}>{customer.id}</Text>
              <Text style={styles.listItemName}>{customer.name}</Text>
            </View>
          ))}
       

          </View>
          <View  style={styles.registerlistcontainer}>
            <View style={styles.customerheader}>
              <Image  source={person} style={styles.listicon}/>                                    
              <Text style={styles.listheader}>Couriers </Text>
          </View>
          {couriersData.map((courier) => (
            <View key={courier.id} style={styles.listItem}>
              <Text style={styles.listItemNumber}>{courier.id}</Text>
              <Text style={styles.listItemName}>{courier.name}</Text>
            </View>
          ))}

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
  totalscontainer:{
    backgroundColor:'#363D47',
    borderColor:'#363D47',
    borderWidth:1,
    borderRadius:11,
    width:'100%',
    height:'13%',
    marginTop: verticalScale(20),
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,    
  },
  totalsinfo:{
  padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 26, 
  },
  totalcolumn:{
    flexDirection: 'column',
 alignItems: 'center',

  },
  totalstext1:{
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    minHeight: 0,
  },
    totalstext2:{
        color: '#0AB3FF',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    minHeight: 0,
  },
  statisticscontainer:{
   backgroundColor:'#363D47',
    borderColor:'#363D47',
    borderWidth:1,
    borderRadius:11,
    width:'100%',
    height:'40%',
    marginTop: verticalScale(20),
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,  

  },
  registeredcontainer:{
   backgroundColor:'#363D47',
    borderColor:'#363D47',
    borderWidth:1,
    borderRadius:11,
    width:'100%',
    height:'37%',
    marginTop: verticalScale(15),
    padding: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
     
  },
  piechart:{
    marginTop: verticalScale(10),
    marginLeft: verticalScale(-295),

  }
,filtercontainer:{
width:'100%',
    marginTop: verticalScale(-180),
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 77,
},
dashboardheader:{
  color: '#FFFFFF',
    fontSize: 19,
    fontFamily: 'Roboto-Bold',
    minHeight: 0,
},
dashboardheader2:{
   marginTop: verticalScale(0),
    padding: 7,
    
},
dashboardtext:{
  color: '#FFFFFF',
    fontSize: 19,
    fontFamily: 'Roboto-Bold',

},
 filterbtn:{
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  dropdown: {
    backgroundColor: '#192028',
    borderColor: '#192028',
    borderWidth: 0,
    borderRadius: 6,
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
  listcontainer:{
    flexDirection:'row',
    alignSelf:'center',
       gap:50,
  },
  registerlistcontainer:{
    flexDirection:'column',
  },
  customerheader:{
  flexDirection:'row',
    alignItems:'center',
    gap:10,
    marginBottom:10,
  },
 listicon:{
    width:22,
    height:22,
    resizeMode:'contain',
    marginRight:5,
  },
  listheader:{
 color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  listItem: {
    backgroundColor: '#4A515A',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemNumber: {
    color: '#B0B3B8',
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 15,
  },
  listItemName: {
    color: '#FFFFFF',
    fontSize: 10,
  },
});