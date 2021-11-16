import * as React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
//import Marker from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { Image } from "react-native";

export default function Map() {
  const [location, setLocation] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [polylineCoords, setPolylineCoords] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMarkers((markers) => [
        ...markers,
        {
          title: "Home",
          latlng: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
      ]);
      setPolylineCoords((polylineCoords) => [
        ...polylineCoords,
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      ]);
    })();
  }, []);
  // ddsda
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
      {!location ? (
        <Text>Loading</Text>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
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
                  source={require("../assets/trading_capybara.png")}
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
