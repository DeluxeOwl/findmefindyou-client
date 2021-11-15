import { Layout, RangeDatepicker, Divider, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import showToast from "../util/showToast";
import React from "react";
import dayjs from "dayjs";

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

  React.useEffect(() => {
    showToast({
      type: "info",
      topText: "Info",
      bottomText: `Showing map for userID ${userID}`,
    });
  }, []);

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
    console.log(`start: ${startDateString}`);
    console.log(`end: ${endDateString}`);
  }, [range]);

  return (
    <Layout style={{ flex: 1, justifyContent: "flex-end" }} level="1">
      <Layout style={styles.mapContainer}></Layout>
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
