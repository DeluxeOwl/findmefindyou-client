import dayjs from "dayjs";

// Will insert the current timestamp automatically in iso8601 format
// example 2021-11-10 19:39:16.317
function insertCoords(_db, coord_x, coord_y) {
  _db.transaction((tx) => {
    tx.executeSql(
      `
          insert into coordinates (timestamp, coord_x, coord_y)
          values (?, ?, ?)
          `,
      [dayjs().format("YYYY-MM-DD HH:mm:ss.SSS").toString(), coord_x, coord_y]
    );
  });
}
function getRandomCoordBetween(min = -60, max = 60) {
  return Number((Math.random() * (max - min + 1) + min).toFixed(7));
}
// const getPastRows = (seconds = 30) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `select * from coordinates where timestamp > ?;`,
//       [dayjs().subtract(seconds, "seconds").format("YYYY-MM-DD HH:mm:ss")],
//       (_, { rows: { _array } }) => _array
//     );
//   });
// };

export { insertCoords, getRandomCoordBetween };
