// Aqui é onde vai ser decidido para onde será enviado browser ou console.

import { database } from "../shared/data.mjs";

class Application {
  constructor(factory) {
    this.table = factory.createTable();
  }

  initialize(database) {
    this.table.render(database);
  }
}

(async function main() {
  const platformInformation = global.window ? "browser" : "console";
  // Dynamic imports
  const { default: ViewFactory } = await import(
    `./../platforms/${platformInformation}/index.mjs`
  );
  const app = new Application(new ViewFactory());
  app.initialize(database);
})();
