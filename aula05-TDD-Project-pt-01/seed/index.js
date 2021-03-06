const faker = require("faker/locale/pt_BR");
const { join } = require("path");
const { writeFile } = require("fs/promises");

const Car = require("./../scr/entities/car");
const CarCategory = require("./../scr/entities/carCategory");
const Customer = require("./../scr/entities/customer");

const seederBaseFolder = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 3;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];

for (let index = 0; index <= ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });
  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });
  customers.push(customer);
}

const write = (filename, data) =>
  writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

(async () => {
  await write("cars.json", cars);
  await write("carCategories.json", [carCategory]);
  await write("customers.json", customers);

  console.log("Cars: \n", cars);
  console.log(" ---------------- ");
  console.log("Cars Category: \n", carCategory);
  console.log(" ---------------- ");
  console.log("Customers: \n", customers);
})();
