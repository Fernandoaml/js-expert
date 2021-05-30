import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from "readline";

import database from "./../database.json";
import Person from "./person.js";
// const database = require("./../database.json");

// console.log("database: ", database);

DraftLog(console).addLineListener(process.stdin);

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.green("Vehicles") },
    { field: "kmTraveled", name: chalk.yellow("kmTraveled") },
    { field: "from", name: chalk.blueBright("From") },
    { field: "to", name: chalk.red("To") },
  ],
};

const table = chalkTable(
  options,
  database.map((item) => new Person(item).formatted("pt-BR"))
);

const print = console.draft(table);

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminal.question("Qual é o seu nome? ", (msg) => {
  console.log("msg: ", msg.toString());
});
