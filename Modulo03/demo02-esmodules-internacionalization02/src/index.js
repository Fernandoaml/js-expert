import database from "../database.json";
import Person from "./../src/person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("Process Fineshed");
      return;
    }
    const person = Person.generateInstanceFromString(answer);
    console.log("Person: ", person.formatted(DEFAULT_LANG));
    return mainLoop();
  } catch (error) {
    console.error("Deu RUIM***:  ", error);
    return mainLoop();
  }
}

await mainLoop();
