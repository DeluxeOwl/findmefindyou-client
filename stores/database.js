import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("coordinates.db");

export { db };
