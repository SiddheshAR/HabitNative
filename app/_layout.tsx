import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

function RouteGuard({children}:{children:React.ReactNode}){
  const [isReady, setIsReady] = useState(false);
  let isAuth = true;
  const router = useRouter();
  
  useEffect(() => {
    // Small delay to ensure router is mounted
    const timer = setTimeout(() => {
      setIsReady(true);
      if (!isAuth) {
        router.replace("/auth");
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  return <>{children}</>;
}

export default function RootLayout() {
  return(
    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        <Stack.Screen name="auth" options={{headerShown:false}}/> Add this line
      </Stack>
    </RouteGuard>
  );
}