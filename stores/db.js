import * as SQLite from "expo-sqlite";
import * as dayjs from "dayjs";

const db = SQLite.openDatabase("coordinates.db");

const initTable = () => {
  db.transaction((tx) => {
    tx.executeSql(`
    create table if not exists coordinates (
        timestamp text not null,
        coord_x real not null,
        coord_y real not null
    );    
    `);
  });
};

// Will insert the current timestamp automatically in iso8601 format
// example 2021-11-10 19:39:16.317
const insertCoords = (coord_x, coord_y) => {
  db.transaction((tx) => {
    tx.executeSql(
      `
        insert into coordinates (timestamp, coord_x, coord_y)
        values (?, ?, ?)
        `,
      [dayjs().format("YYYY-MM-DD HH:mm:ss.SSS").toString(), coord_x, coord_y]
    );
  });
};

// Will return the last entries in the last seconds time
const getPastRows = (seconds = 30) => {
  let pastRows = null;

  db.transaction((tx) => {
    tx.executeSql(
      `select * from coordinates where timestamp > ?;`,
      [dayjs().subtract(seconds, "seconds").format("YYYY-MM-DD HH:mm:ss")],
      (_, { rows: { _array } }) => (pastRows = _array)
    );
  });
  return pastRows;
};

const getRandomCoordBetween = (min = -60, max = 60) => {
  return Number((Math.random() * (max - min + 1) + min).toFixed(7));
};
