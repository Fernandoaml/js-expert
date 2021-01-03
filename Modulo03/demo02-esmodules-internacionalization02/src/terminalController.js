import readline from "readline";
import chalk from "chalk";
import chalkTable from "chalk-table";
import DraftLog from "draftlog";

import Person from "./../src/person.js";
import database from "../database.json";

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatted(language));
    const table = chalkTable(this.getTableOptions(), data);

    this.print = console.draft(table);
    this.data = data;
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.green("Vehicles") },
        { field: "kmTraveled", name: chalk.yellow("kmTraveled") },
        { field: "from", name: chalk.blueBright("From") },
        { field: "to", name: chalk.red("To") },
      ],
    };
  }
}
