import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import dayjs from "dayjs";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";
import HomeScreen from "./components/HomeScreen";
import InitialScreen from "./components/InitialScreen";
import LoadingScreen from "./components/LoadingScreen";
import MapScreen from "./components/MapScreen";
import NotificationScreen from "./components/NotificationScreen";
import { credStore } from "./stores/credStore";
import { navigationRef } from "./util/RootNavigation";
import toastConfig from "./util/toastConfig";
// For navigation
const Stack = createNativeStackNavigator();

import { db } from "./stores/database";

export default function App() {
  const { displayName, uniqueKey, fetchCreds } = credStore();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    console.log(displayName, uniqueKey);
    console.log(JSON.stringify(data, null, 2));
  });

  React.useEffect(async () => {
    // Use this to delete the items from the store
    // await SecureStore.deleteItemAsync("displayName");
    // await SecureStore.deleteItemAsync("uniqueKey");
    await fetchCreds();
    // Create the table
    db.transaction((tx) => {
      tx.executeSql("drop table coordinates");
      tx.executeSql(`
      create table if not exists coordinates (
          timestamp text not null,
          coord_x real not null,
          coord_y real not null
      );    
      `);
      // Insert random values
      for (let i = 0; i < 4; i++) {
        tx.executeSql(
          `
              insert into coordinates (timestamp, coord_x, coord_y)
              values (?, ?, ?)
              `,
          [
            dayjs().format("YYYY-MM-DD HH:mm:ss.SSS").toString(),
            Number((Math.random() * 121 - 60).toFixed(7)),
            Number((Math.random() * 121 - 60).toFixed(7)),
          ]
        );
      }
    });
    db.transaction((tx) => {
      tx.executeSql(
        `select * from coordinates;`,
        [],
        (_, { rows: { _array } }) => setData(_array)
      );
    });
  }, []);

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light }}>
        {/* Initially, the display name is empty while we fetch stuff 
        from the secure store and we display the loading */}
        {displayName === "" ? (
          <LoadingScreen />
        ) : (
          <NavigationContainer ref={navigationRef}>
            {/* If after we fetch the creds, the displayname is null, we show the InitialScreen */}
            <Stack.Navigator
              initialRouteName={displayName === null ? "InitialScreen" : "Home"}
            >
              {displayName === null && (
                <Stack.Screen
                  name="InitialScreen"
                  component={InitialScreen}
                  options={{ headerShown: false }}
                />
              )}
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: `id: ${displayName}`,
                }}
              />
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen
                name="Notifications"
                component={NotificationScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
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
