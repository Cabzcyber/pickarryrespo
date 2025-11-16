import { supabase } from '@/lib/supabase'; // Assuming your supabase client is here
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator
  ,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default function About() {
  const router = useRouter();
  const backimg = require("@/assets/images/back.png");

  // --- STATE ---
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // States for Section 1: Fare Configuration
  const [isConfigEditing, setIsConfigEditing] = useState(false);
  const [globalConfig, setGlobalConfig] = useState(null);
  const [originalGlobalConfig, setOriginalGlobalConfig] = useState(null);

  // States for Section 2: Vehicle Management
  const [isVehiclesEditing, setIsVehiclesEditing] = useState(false);
  const [vehicleFares, setVehicleFares] = useState([]);
  const [originalVehicleFares, setOriginalVehicleFares] = useState([]);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error("User not authenticated.");
        }
        setCurrentUserId(user.id);

        // Run both fetches concurrently
        const [configResult, vehicleResult] = await Promise.allSettled([
          // Fetch 1: Fare Configuration
          supabase
            .from('fare_configuration')
            .select('config_id, time_rate_per_minute,platform_commission_percentage,bonus_rate,penalty_rate_per_minute,grace_period_minutes')
            .eq('is_active', true)
            .single(),

          // Fetch 2: Vehicle Fares
          supabase
            .from('type_vehicle')
            .select('slug,base_fare,distance_rate_per_km,vehicle_name')
            .eq('user_id', user.id)

        ]);

        // Check config fetch
        if (configResult.status === 'fulfilled' && configResult.value.data) {
          setGlobalConfig(configResult.value.data);
          setOriginalGlobalConfig(configResult.value.data);
        } else if (configResult.status === 'rejected') {
          console.error("Fetch Config Error:", configResult.reason.message);
          Alert.alert('Error', 'Could not load fare configuration.');
        }

        // Check vehicle fetch
        if (vehicleResult.status === 'fulfilled' && vehicleResult.value.data) {
          setVehicleFares(vehicleResult.value.data);
          setOriginalVehicleFares(vehicleResult.value.data);
        } else if (vehicleResult.status === 'rejected') {
          console.error("Fetch Vehicles Error:", vehicleResult.reason.message);
          Alert.alert('Error', 'Could not load vehicle list.');
        }

      } catch (error) {
        console.error("Fetch Data Error:", error.message);
        Alert.alert('Error', 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // End of useEffect

  // --- CONFIG (Section 1) Handlers (Unchanged) ---
  const handleConfigChange = (field, value) => {
    setGlobalConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveConfig = async () => {
    if (!globalConfig) return;
    setIsLoading(true);

    const updates = {
      time_rate_per_minute: parseFloat(globalConfig.time_rate_per_minute) || 0,
      platform_commission_percentage: parseFloat(globalConfig.platform_commission_percentage) || 0,
      bonus_rate: parseFloat(globalConfig.bonus_rate) || 0,
      penalty_rate_per_minute: parseFloat(globalConfig.penalty_rate_per_minute) || 0,
      grace_period_minutes: parseInt(globalConfig.grace_period_minutes, 10) || 0,
    };

    try {
      const { error } = await supabase
        .from('fare_configuration')
        .update(updates)
        .eq('config_id', globalConfig.config_id);

      if (error) throw error;

      setOriginalGlobalConfig(globalConfig);
      Alert.alert('Success', 'Delivery Fare Management updated!');
      setIsConfigEditing(false);
    } catch (error) {
      console.error("Save Config Error:", error.message);
      Alert.alert('Error', `Could not save config: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelConfig = () => {
    setGlobalConfig(originalGlobalConfig);
    setIsConfigEditing(false);
  };

  // --- VEHICLES (Section 2) Handlers (Unchanged) ---
  const handleVehicleChange = (slug, field, value) => {
    setVehicleFares(prevFares => {
      return prevFares.map(v =>
        v.slug === slug ? { ...v, [field]: value } : v
      );
    });
  };

  const handleSaveVehicles = async () => {
    if (!currentUserId) {
      Alert.alert("Error", "User ID not found. Cannot save.");
      return;
    }
    setIsLoading(true);

    const updates = vehicleFares.map(v => ({
      slug: v.slug,
      base_fare: parseFloat(v.base_fare) || 0,
      distance_rate_per_km: parseFloat(v.distance_rate_per_km) || 0,
      user_id: currentUserId,
      vehicle_name: v.vehicle_name
    }));

    try {
      const { error } = await supabase
        .from('type_vehicle')
        .upsert(updates, { onConflict: 'slug' });

      if (error) {
        throw error;
      }

      setOriginalVehicleFares(vehicleFares);
      Alert.alert('Success', 'Delivery Vehicle Management updated!');
      setIsVehiclesEditing(false);
    } catch (error) {
      console.error("Save Vehicles Error:", error.message);
      Alert.alert('Error', `Could not save vehicles: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelVehicles = () => {
    setVehicleFares(originalVehicleFares);
    setIsVehiclesEditing(false);
  };

  const getVehicleValue = (slug, field) => {
    const vehicle = vehicleFares.find(v => v.slug === slug);
    if (!vehicle || vehicle[field] === undefined || vehicle[field] === null) return '';
    return vehicle[field].toString();
  };

  // --- LOADING (Unchanged) ---
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  // --- RENDER ---
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/(admin)/menu')}>
          <Image source={backimg} style={styles.backicon}/>
        </Pressable>
        <Text style={styles.title}>Fare</Text>
      </View>
      <View style={styles.separator} />
      <ScrollView
        style={styles.mainContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* --- SECTION 1: DELIVERY FARE MANAGEMENT --- */}
         <Text style={styles.sectionTitle}>Delivery Fare Management</Text>
      <View style={styles.sectionCard}>

                  <View style={styles.inputcontainer}>
                    <Text style={styles.title1}>Time Rate (₱ of Every Minute)</Text>
                      {isConfigEditing ? (
                      <TextInput style={styles.textinput}
                        value={globalConfig?.time_rate_per_minute?.toString()}
                        onChangeText={(text) => handleConfigChange('time_rate_per_minute', text)}
                        placeholder='Enter Time Rate'
                        placeholderTextColor='#87AFB9'
                        keyboardType='numeric'
                      />
                      ) : (
                        <Text style={styles.descriptionText}>{globalConfig?.time_rate_per_minute}</Text>
                      )}
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text style={styles.title1}>Platform Commission (% Every Delivery)</Text>
                      {isConfigEditing ? (
                      <TextInput style={styles.textinput}
                        value={globalConfig?.platform_commission_percentage?.toString()}
                        onChangeText={(text) => handleConfigChange('platform_commission_percentage', text)}
                        placeholder='Enter Platform Commission'
                        placeholderTextColor='#87AFB9'
                        keyboardType='numeric'
                      />
                      ) : (
                        <Text style={styles.descriptionText}>{globalConfig?.platform_commission_percentage}</Text>
                      )}
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text style={styles.title1}>Ipa-Dali Bonus (Minimum Set Price)</Text>
                      {isConfigEditing ? (
                      <TextInput style={styles.textinput}
                        value={globalConfig?.bonus_rate?.toString()}
                        onChangeText={(text) => handleConfigChange('bonus_rate', text)}
                        placeholder='Enter Ipa-Dali Bonus'
                        placeholderTextColor='#87AFB9'
                        keyboardType='numeric'
                      />
                      ) : (
                        <Text style={styles.descriptionText}>{globalConfig?.bonus_rate}</Text>
                      )}
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text style={styles.title1}>Penalty Rate (₱ Per Minute)</Text>
                      {isConfigEditing ? (
                      <TextInput style={styles.textinput}
                        value={globalConfig?.penalty_rate_per_minute?.toString()}
                        onChangeText={(text) => handleConfigChange('penalty_rate_per_minute', text)}
                        placeholder='Enter Penalty Rate'
                        placeholderTextColor='#87AFB9'
                        keyboardType='numeric'
                      />
                      ) : (
                        <Text style={styles.descriptionText}>{globalConfig?.penalty_rate_per_minute}</Text>
                      )}
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text style={styles.title1}>Grace Period Rate (Seconds)</Text>
                      {isConfigEditing ? (
                      <TextInput style={styles.textinput}
                        value={globalConfig?.grace_period_minutes?.toString()}
                        onChangeText={(text) => handleConfigChange('grace_period_minutes', text)}
                        placeholder='Enter Grace Period Rate'
                        placeholderTextColor='#87AFB9'
                        keyboardType='numeric'
                      />
                      ) : (
                        <Text style={styles.descriptionText}>{globalConfig?.grace_period_minutes}</Text>
                      )}
                  </View>


                  <Pressable style={styles.mainbutton} onPress={isConfigEditing ? handleSaveConfig : () => setIsConfigEditing(true)}>
                    <Text style={styles.maintextbutton}>{isConfigEditing ? 'Save Config' : 'Edit Config'}</Text>
                  </Pressable>
                  {isConfigEditing && (
                    <Pressable style={[styles.mainbutton, styles.cancelButton]} onPress={handleCancelConfig}>
                      <Text style={styles.maintextbutton}>Cancel</Text>
                    </Pressable>
                  )}
              </View>

        {/* --- SECTION 2: DELIVERY VEHICLE MANAGEMENT --- */}
        <Text style={styles.sectionTitle}>Delivery Vehicle Management</Text>
        <View style={styles.sectionCard1}>
                  {/* On-Foot */}
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>On-Foot Fare</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('onfoot', 'base_fare')}
                      onChangeText={(text) => handleVehicleChange('onfoot', 'base_fare', text)}
                      placeholder='Enter On-Foot Fare'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('onfoot', 'base_fare')}</Text>
                )}
                  </View>
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>On-Foot Distance Rate per Km</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('onfoot', 'distance_rate_per_km')}
                      onChangeText={(text) => handleVehicleChange('onfoot', 'distance_rate_per_km', text)}
                      placeholder='Enter On-Foot Distance Rate'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('onfoot', 'distance_rate_per_km')}</Text>
                )}
                  </View>
                  {/* Motorcycle */}
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Motorcycle Fare</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('motorcycle', 'base_fare')}
                      onChangeText={(text) => handleVehicleChange('motorcycle', 'base_fare', text)}
                      placeholder='Enter Motorcycle Fare'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('motorcycle', 'base_fare')}</Text>)}
                  </View>
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Motorcycle Distance Rate per Km</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('motorcycle', 'distance_rate_per_km')}
                      onChangeText={(text) => handleVehicleChange('motorcycle', 'distance_rate_per_km', text)}
                      placeholder='Enter Motorcycle Distance Rate'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('motorcycle', 'distance_rate_per_km')}</Text>)}
                  </View>
                  {/* Bicycle */}
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Bicycle Fare</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('bicycle', 'base_fare')}
                      onChangeText={(text) => handleVehicleChange('bicycle', 'base_fare', text)}
                      placeholder='Enter Bicycle Fare'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('bicycle', 'base_fare')}</Text>)}
                  </View>
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Bicycle Distance Rate per Km</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('bicycle', 'distance_rate_per_km')}
                      onChangeText={(text) => handleVehicleChange('bicycle', 'distance_rate_per_km', text)}
                      placeholder='Enter Bicycle Distance Rate'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('bicycle', 'distance_rate_per_km')}</Text>)}
                  </View>
                  {/* Rela */}
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Rela Fare</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('rela', 'base_fare')}
                      onChangeText={(text) => handleVehicleChange('rela', 'base_fare', text)}
                      placeholder='Enter Rela Fare'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('rela', 'base_fare')}</Text>)}
                  </View>
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Rela Distance Rate per Km</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('rela', 'distance_rate_per_km')}
                      onChangeText={(text) => handleVehicleChange('rela', 'distance_rate_per_km', text)}
                      placeholder='Enter Rela Distance Rate'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('rela', 'distance_rate_per_km')}</Text>
                )}
                  </View>
                  {/* Dulog */}
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Dulog Fare</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('dulog', 'base_fare')}
                      onChangeText={(text) => handleVehicleChange('dulog', 'base_fare', text)}
                      placeholder='Enter Dulog Fare'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('dulog', 'base_fare')}</Text>)}
                  </View>
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Dulog Distance Rate per Km</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('dulog', 'distance_rate_per_km')}
                      onChangeText={(text) => handleVehicleChange('dulog', 'distance_rate_per_km', text)}
                      placeholder='Enter Dulog Distance Rate'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('dulog', 'distance_rate_per_km')}</Text>)}
                  </View>
                  {/* Passenger Car */}
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Passenger Car Fare</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('passenger-car', 'base_fare')}
                      onChangeText={(text) => handleVehicleChange('passenger-car', 'base_fare', text)}
                      placeholder='Enter Passenger Car Fare'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('passenger-car', 'base_fare')}</Text>)}
                  </View>
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Passenger Car Distance Rate per Km</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('passenger-car', 'distance_rate_per_km')}
                      onChangeText={(text) => handleVehicleChange('passenger-car', 'distance_rate_per_km', text)}
                      placeholder='Enter Passenger Car Distance Rate'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('passenger-car', 'distance_rate_per_km')}</Text>)}
                  </View>
                  {/* Truck */}
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Truck Fare</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('truck', 'base_fare')}
                      onChangeText={(text) => handleVehicleChange('truck', 'base_fare', text)}
                      placeholder='Enter Truck Fare'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('truck', 'base_fare')}</Text>)}
                  </View>
                  <View style={styles.inputcontainer1}>
                    <Text style={styles.title1}>Truck Distance Rate per Km</Text>
                    {isVehiclesEditing ? (
                    <TextInput style={styles.textinput}
                      value={getVehicleValue('truck', 'distance_rate_per_km')}
                      onChangeText={(text) => handleVehicleChange('truck', 'distance_rate_per_km', text)}
                      placeholder='Enter Truck Distance Rate'
                      placeholderTextColor='#87AFB9'
                      keyboardType='numeric'
                    />
                    ) : (<Text style={styles.descriptionText}>{getVehicleValue('truck', 'distance_rate_per_km')}</Text>
                )}
                  </View>

                  <Pressable style={styles.mainbutton1} onPress={isVehiclesEditing ? handleSaveVehicles : () => setIsVehiclesEditing(true)}>
                    <Text style={styles.maintextbutton1}>{isVehiclesEditing ? 'Save Vehicles' : 'Edit Vehicles'}</Text>
                  </Pressable>
                  {isVehiclesEditing && (
                    <Pressable style={[styles.mainbutton1, styles.cancelButton]} onPress={handleCancelVehicles}>
                      <Text style={styles.maintextbutton1}>Cancel</Text>
                    </Pressable>
                  )}
              </View>

      </ScrollView>
    </View>
  );
}

// --- STYLES (Corrected) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141519',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
   gap:20,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: verticalScale(31),
  },
  backicon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    backgroundColor: '#363D47',
    width: '100%',
    marginBottom: 1,
    marginTop: verticalScale(6),
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: verticalScale(8),
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#0AB3FF',
  },
  descriptionText: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  sectionCard: {
    backgroundColor: '#363D47',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    color: '#0AB3FF',
    marginBottom: 15,
  },
 inputcontainer:{
    flexDirection:'column',
    width:'100%',
    maxWidth:1024,
    padding: 10,
    marginHorizontal: 0,
    pointerEvents:'auto',
    marginBottom: 10,
  },
  title1:{
    flexDirection:'column',
    justifyContent:'flex-start',
    fontFamily: 'Roboto',
    color: '#0AB3FF',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.12,
    marginBottom:11,
  },
  textinput:{
    fontFamily: 'Roboto',
    backgroundColor: '#22262F',
    color:'#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.12,
    borderColor:'#22262F',
    borderRadius: 10,
    padding:12,
    borderWidth:1,
    minHeight: 44,
  },
  mainbutton:{
    flexDirection:'column',
    width:'92%',
    maxWidth:1024,
    padding:10,
    marginHorizontal:'auto',
    pointerEvents:'auto',
    backgroundColor:'#3BF579',
    borderRadius: 10,
    justifyContent:"center",
    alignItems:'center',
    marginTop:verticalScale(10),
  },
  maintextbutton:{
    fontSize:18,
    color:'black',
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  sectionCard1: {
    backgroundColor: '#363D47',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,

  },
  inputcontainer1:{
    flexDirection:'column',
    width:'100%',
    maxWidth:1024,
    padding: 10,
    marginHorizontal: 0,
    pointerEvents:'auto',
    marginBottom: 10,
  },
  mainbutton1:{
    flexDirection:'column',
    width:'92%',
    maxWidth:1024,
    padding:10,
    marginHorizontal:'auto',
    pointerEvents:'auto',
    backgroundColor:'#3BF579',
    borderRadius: 10,
    justifyContent:"center",
    alignItems:'center',
    marginTop:verticalScale(15),
  },
  maintextbutton1:{
    fontSize:18,
    color:'black',
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  cancelButton: {
    backgroundColor: '#FF6B6B', // A red color for cancel
    marginTop: 10,
  }
});