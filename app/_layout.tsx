import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({children}:{children:React.ReactNode}){
  const [isReady, setIsReady] = useState(false);
  const {user,isLoadingUser } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  useEffect(() => {
    // Small delay to ensure router is mounted
    const isAuthScreen = segments[0] === "auth"
    const timer = setTimeout(() => {
      setIsReady(true);
      if (!user ) {
        router.replace("/auth");
      }else if(user && isAuthScreen && !isLoadingUser){
        router.replace("/(tabs)")
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  return <>{children}</>;
}

export default function RootLayout() {
  return(
    <AuthProvider>
      <SafeAreaProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
          <Stack.Screen name="auth" options={{headerShown:false}}/>
        </Stack>
      </RouteGuard>
      </SafeAreaProvider>
    </AuthProvider>
  );
}