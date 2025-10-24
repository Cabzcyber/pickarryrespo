import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
const Userprofile = () => {
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
          Courier Profile
        </Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>
          Now showing data for Courier ID: {id}
        </Text>

        {/* NEXT STEP: 
          Now that you have the 'id', you would use it here to
          fetch the specific courier's full details (name, phone, etc.)
          from your database or API.
        */}
      </View>
    </>
  );
}
  

export default Userprofile