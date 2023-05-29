const users = [
  {
    user_id: 1,
    email: "alx@email.com",
    password: "123456789",
    account: {
      wallet_id: "00129813",
      balance: 1000.11,
    },
    fname: "Leslie",
    lname: "Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    user_id: 2,
    email: "josh@email.com",
    password: "123456789",
    account: {
      wallet_id: "00839257",
      balance: 1000.11,
    },
    fname: "Josh",
    lname: "Hensler",
    imageUrl:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    user_id: 3,
    email: "lexi@email.com",
    password: "123456789",
    account: {
      wallet_id: "00128472",
      balance: 1000.11,
    },
    fname: "Lexi",
    lname: "Brown",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    user_id: 4,
    email: "alex@email.com",
    password: "123456789",
    account: {
      wallet_id: "00934824",
      balance: 1000.11,
    },
    fname: "Alex",
    lname: "Henry",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    user_id: 5,
    email: "ben@email.com",
    password: "123456789",
    account: {
      wallet_id: "00927492",
      balance: 1000.11,
    },
    fname: "Ben",
    lname: "Walton",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    user_id: 6,
    email: "dries@email.com",
    password: "123456789",
    account: {
      wallet_id: "00918342",
      balance: 1000.11,
    },
    fname: "Dries",
    lname: "Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    user_id: 7,
    email: "foster@email.com",
    password: "123456789",
    account: {
      wallet_id: "00012843",
      balance: 11200.11,
    },
    fname: "Michael",
    lname: "Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const expenseItem = [
  {
    expense_id: 1,
    name: "",
    owner: 1,
    const: 100.11,
  },
];

const transactions = [
  {
    transaction_id: 1,
    amount: 120.01,
    transact_to: 1,
    transact_from: 3,
    type: "",
    date: "2023-04-13T13:51:06.494Z",
  },
  {
    transaction_id: 2,
    amount: 190.02,
    transact_to: 2,
    transact_from: 3,
    type: "",
    date: "2023-01-23T13:51:06.494Z",
  },
  {
    transaction_id: 3,
    amount: 130.03,
    transact_to: 4,
    transact_from: 2,
    type: "",
    date: "2023-02-23T13:51:06.494Z",
  },
  {
    transaction_id: 4,
    amount: 300.04,
    transact_to: 3,
    transact_from: 2,
    type: "",
    date: "2023-05-03T13:51:06.494Z",
  },
  {
    transaction_id: 5,
    amount: 200.05,
    transact_to: 1,
    transact_from: 3,
    type: "transfer",
    date: "2023-05-20T13:51:06.494Z",
  },
];

export { users, expenseItem, transactions };
