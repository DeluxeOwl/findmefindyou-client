import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

// TODO: remove these hardcoded values
const latitude_REMOVE = 45.7650466;
const longitude_REMOVE = 21.2165824;

export default function Map({ avatar_url, coords }) {
  // TODO: remove this, should show loading screen when fetching data
  const isDataLoaded = true;
  console.log("coords");
  console.log(coords);

  const [markers, setMarkers] = React.useState([]);
  const [polylineCoords, setPolylineCoords] = React.useState([]);
  React.useEffect(() => {
    setMarkers(
      coords.map((c) => {
        return {
          title: "title",
          ts: c.ts,
          latlng: {
            latitude: c.latitude,
            longitude: c.longitude,
          },
        };
      })
    );
    setPolylineCoords(
      coords.map((c) => {
        return {
          latitude: c.latitude,
          longitude: c.longitude,
        };
      })
    );
    console.log("markers");
    console.log(markers);
    console.log(polylineCoords);
  }, [coords]);

  return (
    <View style={styles.container}>
      {!isDataLoaded ? (
        <Text>Loading</Text>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude_REMOVE,
            longitude: longitude_REMOVE,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latlng.latitude,
                  longitude: marker.latlng.longitude,
                }}
                title={marker.title}
                // image={{ uri: "./assets/trading_capybara" }}
              >
                <Image
                  source={{
                    uri:
                      avatar_url ||
                      "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
                  }}
                  style={{ height: 35, width: 35, borderRadius: 10 }}
                />
              </Marker>
            );
          })}
          {polylineCoords.length > 1 && (
            <Polyline
              coordinates={polylineCoords}
              strokecolor="#000"
              strokeWidth={6}
              lineDashPattern={[1, 2]}
              lineCap={"round"}
              geodesic={true}
            />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
