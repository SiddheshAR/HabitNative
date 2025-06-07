import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: "#green" },
      headerShadowVisible: false,
      headerTitleAlign:"center",
      tabBarStyle: {
        backgroundColor: "f5f5f5",
        borderTopWidth: 0,
        elevation: 10,
        shadowOpacity: 0
      },
      tabBarActiveTintColor: "coral",
      tabBarInactiveTintColor: "gray"
    }}>
      <Tabs.Screen name="index"
        options={{
          title: "Todays Habits",
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              // <Feather name="home" size={24} color="coral" />
              <FontAwesome name="calendar" size={24} color="coral" />
            )
              : (
                <FontAwesome name="calendar" size={24} color="gray" />
              )
          }
        }}
      />
      <Tabs.Screen name="streak" options={{
        title: "View Streak",
        tabBarIcon: ({ color, size, focused }) => {
          return focused ? (<>
            <AntDesign name="areachart" size={24} color="coral" />
          </>) : (<>
            <AntDesign name="areachart" size={24} color="gray" />
          </>)
        }
      }} />
      <Tabs.Screen name="add-habit" options={{
        title: "Add Habit",
        tabBarIcon: ({ color, size, focused }) => {
          return focused ? (
            <MaterialIcons name="add-chart" size={24} color="coral" />):(
              <MaterialIcons name="add-chart" size={24} color="gray" />)
        }
      }} />

    </Tabs>);
}