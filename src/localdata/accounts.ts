import kpossokhov from "./../asets/images/users/kpossokhov.jpg";
import jnewman from "./../asets/images/users/jnewman.jpg";
import jrutherford from "./../asets/images/users/jrutherford.jpg";
import knurtas from "./../asets/images/users/knurtas.jpg";

export interface IAccounts {
  id: number;
  firstName: string;
  lastName?: string;
  balance: number;
  img?: string;
  currency: string;
  email: string;
}

const usersList: IAccounts[] = [
  {
    id: 441485,
    firstName: "Константин",
    lastName: "Посохов",
    balance: 1050280,
    img: kpossokhov,
    currency: "KZT",
    email: "kposokhov@gmail.com",
  },
  {
    id: 112223,
    firstName: "John",
    balance: 8548,
    img: jnewman,
    currency: "USD",
    email: "jnewman@gmail.com",
  },
  {
    id: 999455,
    firstName: "Shawn",
    lastName: "Mendes",
    balance: 135488,
    currency: "RUB",
    email: "smendes@gmail.com",
  },
  {
    id: 789123,
    firstName: "Jesse",
    lastName: "Rutherford",
    balance: 50156,
    img: jrutherford,
    currency: "UZS",
    email: "jrutherford@gmail.com",
  },
  {
    id: 385421,
    firstName: "Кайрат",
    lastName: "Нуртас",
    balance: 10000000,
    img: knurtas,
    currency: "EUR",
    email: "knurtas@gmail.com",
  },
];

export default usersList;
