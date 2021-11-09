import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import MapScreen from "./components/MapScreen";
import HomeScreen from "./components/HomeScreen";
import { navigationRef } from "./util/RootNavigation";
import NotificationScreen from "./components/NotificationScreen";
import Toast from "react-native-toast-message";
import toastConfig from "./util/toastConfig";
import InitialScreen from "./components/InitialScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light }}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="InitialScreen">
            <Stack.Screen name="InitialScreen" component={InitialScreen} />
            {/* <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: "id: virtuous-defender-onboard",
              }}
            />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
      <Toast
        autoHide={true}
        visibilityTime={2500}
        topOffset={80}
        config={toastConfig}
      />
    </React.Fragment>
  );
}
