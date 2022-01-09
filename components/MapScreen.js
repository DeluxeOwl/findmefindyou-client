import { Divider, Layout, RangeDatepicker, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet } from "react-native";
import Map from "./Map";
import env from "../env";
import { credStore } from "../stores/credStore";

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
  // TODO: pass display_name & avatar url to Map and fetch the coordinates
  const { display_name, avatar_url } = route.params;
  const [uniqueKey, myName] = credStore((s) => [s.uniqueKey, s.displayName]);
  const [avatarUrl, setAvatarUrl] = React.useState(avatar_url);
  const [range, setRange] = React.useState({
    startDate: oneWeekAgo,
    endDate: null,
  });
  const [coords, setCoords] = React.useState([]);
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

    //Request new coords on date change
    let body = {
      start_date: startDateString,
      end_date: endDateString,
    };
    let coordsUrl = `${env.BACKEND_URL}/my_coords`;
    if (myName !== display_name) {
      body = { friend_name: display_name, ...body };
      coordsUrl = `${env.BACKEND_URL}/friend_coords`;
      const getFriendUrl = async () => {
        let res = await fetch(`${env.BACKEND_URL}/friends`, {
          method: "GET",
          headers: {
            "X-Key": uniqueKey,
          },
        }).then((res) => res.json());
        let friend = res.find((e) => e.display_name == display_name);
        setAvatarUrl(`${env.BACKEND_URL}/${friend.avatar_url}`);
      };
      getFriendUrl();
    }
    const getCoords = async () => {
      console.log(`sending getting coords of friend or myself...\n`);
      let res = await fetch(coordsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Key": uniqueKey,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setCoords(data);
    };
    getCoords().catch(console.log);
  }, [range]);
  return (
    <Layout style={{ flex: 1, justifyContent: "flex-end" }} level="1">
      <Layout style={styles.mapContainer}>
        <Map avatar_url={avatarUrl} coords={coords} />
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
