import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const LATITUDE_FALLBACK = 45.7650466;
const LONGITUDE_FALLBACK = 21.2165824;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default function Map({ avatar_url, coords }) {
  // TODO: remove this, should show loading screen when fetching data
  const isDataLoaded = true;
  console.log("coords");
  console.log(coords);
  console.log(avatar_url);

  const [markers, setMarkers] = React.useState([]);
  const [polylineCoords, setPolylineCoords] = React.useState([]);
  const [initialRegion, setInitialRegion] = React.useState({
    latitude: LATITUDE_FALLBACK,
    longitude: LONGITUDE_FALLBACK,
  });
  React.useEffect(() => {
    console.log("coords in useeffect");
    console.log(coords);
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
    if (coords.length > 0) {
      setInitialRegion({
        latitude: coords[0].latitude,
        longitude: coords[0].longitude,
      });
    }

    console.log("markers");
    console.log(markers);
    console.log(polylineCoords);
    console.log(initialRegion);
  }, [coords]);

  return (
    <View style={styles.container}>
      {!isDataLoaded ? (
        <Text>Loading</Text>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
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
                title={marker.ts.slice(0, -4)}
                // image={{ uri: "./assets/trading_capybara" }}
              >
                <Image
                  source={{
                    uri: avatar_url,
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
