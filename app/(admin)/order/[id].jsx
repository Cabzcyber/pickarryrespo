import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const deliveryprofile = () => {
  const { id } = useLocalSearchParams();
  return (
     <>
      <Stack.Screen
        options={{
          headerTitle: `Profile: ${id}`,
        }}
      />
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Delivery Profile
        </Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>
          Now showing data for Delivery ID: {id}
        </Text>

        {/* NEXT STEP: 
          Now that you have the 'id', you would use it here to
          fetch the specific courier's full details (name, phone, etc.)
          from your database or API.
        */}
      </View>
    </>
  



  )
}

export default deliveryprofile