import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {

  const {signOut}=useAuth();
 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button onPress={signOut}>Sign off</Button>
      <Link href={'/login'}>Navigate to Login</Link>
    </View>
  );
}
