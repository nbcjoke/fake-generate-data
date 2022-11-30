import { faker } from "@faker-js/faker";

export const randomUser = (locale, error) => {
  faker.locale = locale || "en";
  let user = {
    number: faker.datatype.number({ min: 1, max: 1000 }),
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    adress: faker.address.cityName(),
    phone: faker.phone.number(),
  };
  if (error > 0) {
    const keys = ["id", "fullname", "adress", "phone"];
    while (error > 0) {
      let probability = 1;
      if (error < 1) {
        probability = error;
      }
      faker.helpers.maybe(
        () => {
          const key = keys[error % keys.length];
          user = { ...user, [key]: randomError()(user[key], key) };
        },
        { probability }
      );
      error--;
    }
  }
  return user;
};

const errorFunctions = [addSymbol, removeSymbol];

function addSymbol(value, key) {
  if (!value) {
    return;
  }
  const index = faker.datatype.number({ min: 0, max: value.length });
  let symbol;
  if (key === "phone") {
    symbol = faker.random.numeric(1);
  } else {
    symbol = faker.random.alpha(1);
  }
  return insert(value, index, symbol);
}

function removeSymbol(value) {
  if (!value) {
    return;
  }
  const index = faker.datatype.number({ min: 0, max: value.length });
  return remove(value, index);
}

function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

function remove(str, index) {
  const splitted = str.split("");
  splitted.splice(index, 1);
  return splitted.join("");
}

function randomError() {
  return faker.helpers.arrayElement(errorFunctions);
}
