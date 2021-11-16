import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

// TODO: remove these hardcoded values
const latitude_REMOVE = 45.7650466;
const longitude_REMOVE = 21.2165824;

export default function Map() {
  // TODO: remove this, should show loading screen when fetching data
  const isDataLoaded = true;

  const [markers, setMarkers] = React.useState([]);
  const [polylineCoords, setPolylineCoords] = React.useState([]);
  React.useEffect(() => {
    setMarkers((markers) => [
      ...markers,
      {
        title: "Start",
        latlng: {
          latitude: latitude_REMOVE,
          longitude: longitude_REMOVE,
        },
      },
    ]);
    setPolylineCoords((polylineCoords) => [
      ...polylineCoords,
      {
        latitude: latitude_REMOVE,
        longitude: longitude_REMOVE,
      },
    ]);
  }, []);

  // TODO: remove this (testing only)
  const handleMapPress = (e) => {
    const newMarker = {
      title: `Marker ${markers.length}`,
      latlng: { ...e.nativeEvent.coordinate },
    };
    setMarkers((markers) => [...markers, newMarker]);
    setPolylineCoords((polylineCoords) => [
      ...polylineCoords,
      { ...newMarker.latlng },
    ]);
  };

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
          onPress={handleMapPress}
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
                    uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
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