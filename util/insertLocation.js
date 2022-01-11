import { db } from "../stores/database";
import dayjs from "dayjs";

// Function to print and insert the location in the db
const insertLocation = (locationObject, from) => {
  const latitude = locationObject?.coords.latitude;
  const longitude = locationObject?.coords.longitude;
  const timestamp = dayjs(locationObject?.timestamp)
    .format("YYYY-MM-DD HH:mm:ss.SSS")
    .toString();

  console.log(
    `inserted from ${from} ⟶ latitude:${latitude} longitude:${longitude} timestamp:${timestamp}`
  );
  db.transaction((tx) => {
    tx.executeSql(
      `
              insert into coordinates (timestamp, latitude, longitude)
              values (?, ?, ?)
              `,
      [timestamp, latitude, longitude]
    );
  });
};

export default insertLocation;
