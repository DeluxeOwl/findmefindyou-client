import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";
import HomeScreen from "./components/HomeScreen";
import InitialScreen from "./components/InitialScreen";
import LoadingScreen from "./components/LoadingScreen";
import MapScreen from "./components/MapScreen";
import NotificationScreen from "./components/NotificationScreen";
import { credStore } from "./stores/credStore";
import { db } from "./stores/database";
import { navigationRef } from "./util/RootNavigation";
import toastConfig from "./util/toastConfig";
import env from "./env";

const Stack = createNativeStackNavigator();

export default function App() {
  const { displayName, uniqueKey, fetchCreds } = credStore();
  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   console.log("App.js ⟶ rerender: ", displayName, uniqueKey);
  // });

  React.useEffect(async () => {
    // Use this to delete the items from the store
    await fetchCreds();
    // Create the table
    db.transaction((tx) => {
      // tx.executeSql("drop table coordinates");
      tx.executeSql(`
      create table if not exists coordinates (
          timestamp text not null,
          latitude real not null,
          longitude real not null
      );    
      `);
    });
  }, []);

  // TODO: Get the latest data periodically from the local db
  React.useEffect(() => {
    const intervalID = setInterval(() => {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from coordinates order by ROWID desc LIMIT 50;`,
          [],
          (_, { rows: { _array } }) => setData(_array)
        );
      });
    }, env.UPDATE_REMOTE_DB_INTERVAL_SECONDS * 1000);
    return () => clearInterval(intervalID);
  }, []);

  // TODO: Send the data to the backend, backend should return the latest sent data
  // first and you store it in the state or as a ref (no rerender)
  React.useEffect(() => {
    if (!data) {
      return;
    }
    // the filter filters only be unique latitude and longitudes, no need to send
    // these duplicates values
    console.log(
      JSON.stringify(
        data.reverse().filter((item, pos, arr) => {
          return (
            pos === 0 ||
            item.latitude !== arr[pos - 1].latitude ||
            item.longitude !== arr[pos - 1].longitude
          );
        }),
        null,
        2
      )
    );
  }, [data]);

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
              <Stack.Screen
                name="Map"
                component={MapScreen}
                options={({ route }) => ({
                  headerTitle: route.params.headerTitle,
                })}
              />
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
