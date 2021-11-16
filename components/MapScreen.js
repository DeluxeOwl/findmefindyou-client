import { Divider, Layout, RangeDatepicker, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet } from "react-native";
import Map from "./Map";

// You can only see the coordinates for a user from
// the past week until today, used in RangeDatepicker
const now = new Date();
// set the hours, minutes etc to 0
now.setHours(0, 0, 0, 0);
const oneWeekAgo = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 7
);

export default function MapScreen({ route, navigation }) {
  const { userID } = route.params;
  const [range, setRange] = React.useState({ startDate: now, endDate: null });

  // Format the date to our standard.
  React.useEffect(() => {
    let startDateString = "";
    let endDateString = "";

    if (range.startDate !== null) {
      startDateString = dayjs(range.startDate).format(
        "YYYY-MM-DD HH:mm:ss.SSS"
      );
    }
    if (range.endDate !== null) {
      endDateString = dayjs(range.endDate).format("YYYY-MM-DD HH:mm:ss.SSS");
    }
    console.log(`MapScreen.js ⟶ start: ${startDateString}`);
    console.log(`MapScreen.js ⟶ end: ${endDateString}`);
  }, [range]);

  return (
    <Layout style={{ flex: 1, justifyContent: "flex-end" }} level="1">
      <Layout style={styles.mapContainer}>
        <Map />
      </Layout>
      <Divider />
      <Layout style={styles.dateContainer}>
        <RangeDatepicker
          style={styles.datePicker}
          min={oneWeekAgo}
          max={now}
          range={range}
          onSelect={(nextRange) => setRange(nextRange)}
        />
        <Text style={styles.text} category="h2">
          Pick a date 🗓
        </Text>
      </Layout>
    </Layout>
  );
}
const styles = StyleSheet.create({
  mapContainer: {
    flex: 5,
  },
  dateContainer: {
    flex: 1,
  },
  text: {
    marginVertical: 10,
    textAlign: "center",
  },
  datePicker: {
    margin: 5,
  },
});
