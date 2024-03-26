#! /usr/bin/env node

import inquirer from "inquirer";

const initial = await inquirer.prompt([
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
]);
if (initial.name) {
  console.log(`Hello ${initial.name}!`);
} else {
  console.log("please enter your name");
}

const initial2 = await inquirer.prompt([
  {
    type: "list",
    name: "choice",
    message: "how can i assist you today?",
    choices: ["Register", "Login"],
  },
]);

if (initial2.choice === "Register") {
  const register = await inquirer.prompt([
    {
      type: "input",
      message: "Enter your name",
      name: "name",
    },
    {
      type: "input",
      message: "Enter your card number",
      name: "card",
    },
    {
      type: "password",
      message: "Enter your password",
      name: "password",
    },
    {
      type: "password",
      message: "Confirm your password",
      name: "confirm",
    },
  ]);

  if (register.confirm !== register.password) {
    console.error("passwords do not match!");
  } else {
    console.log(
      "your account has been created successfully, please run `npx ibbad-atm` to login in your account"
    );
  }
} else if (initial2.choice === "Login") {
  const login = await inquirer.prompt([
    {
      type: "input",
      message: "Enter your card number",
      name: "card",
    },
    {
      type: "password",
      message: "Enter your password",
      name: "password",
    },
    {
      type: "list",
      message: "What would you like to do today?",
      name: "choice",
      choices: ["Withdrawl", "Deposit"],
    },
    {
      type: "input",
      message: "Enter the amount you would like to withdraw (balance: $50,000)",
      name: "amount",
      when(answers) {
        return answers.amount = "Withdrawl";
      },
    },
    {
      type: "input",
      message: "Enter the amount you would like to deposit (balance: $50,000)",
      name: "amount",
      when(answers) {
        return answers.amount = "Deposit";
      },
    },
  ]);

if (login.choice === "Withdrawl") {
    const balance = 50000;
    const givenAmount = login.amount;
    if (balance >= givenAmount) {
      console.log(
        "Transaction was Successfull\n your current balance is",
        balance - givenAmount
      );
    } else {
      console.log("Transaction failed, Insufficient Funds");
    }
  } else {
    const balance = 50000;
    const givenAmount = login.amount;
    if (balance <= givenAmount || balance >= givenAmount) {
      console.log(
        "Transaction was Successfull\n your current balance is",
        balance + givenAmount
      );
    }
  }
}
