import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
export default function RootLayout() {
  return (
  <Tabs screenOptions={{tabBarActiveTintColor:"coral"}}>
    <Tabs.Screen name="index" 
    options={{
      title:"Home Page",
      tabBarIcon:({color,focused})=>{
       return focused?(
                <Feather name="home" size={24} color="coral" />)
       :(
                <Feather name="home" size={24} color="gray" />)}}}
     />
    <Tabs.Screen name="login" options={{title:"Login Page"}} />
    </Tabs>);
}