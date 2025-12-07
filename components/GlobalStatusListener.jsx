import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import supabase from '../lib/supabase';

export default function GlobalStatusListener() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    let userSubscription;

    const setupListener = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Subscribe to changes in the 'service_user' table for THIS user
      userSubscription = supabase
        .channel(`public:service_user:id=eq.${user.id}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'service_user',
            filter: `user_id=eq.${user.id}`
          },
          async (payload) => {
            const newStatus = payload.new.userstatus_id;

            // 4 = Suspended (Adjust ID if your DB is different)
            if (newStatus === 4) {
              Alert.alert(
                "Account Suspended",
                "Your account has been suspended by the administrator. You will be logged out.",
                [
                  {
                    text: "OK",
                    onPress: async () => {
                      await supabase.auth.signOut();
                      // Only redirect if not already on auth screen
                      if (segments[0] !== 'auth') {
                         router.replace('/auth/login');
                      }
                    }
                  }
                ]
              );
            }
          }
        )
        .subscribe();
    };

    setupListener();

    return () => {
      if (userSubscription) supabase.removeChannel(userSubscription);
    };
  }, []);

  return null; // Invisible component
}