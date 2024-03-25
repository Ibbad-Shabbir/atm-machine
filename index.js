#! /usr/bin/env node
import inquirer from "inquirer";
const answers = await inquirer.prompt([
    {
        type: "input",
        name: "cardnum",
        message: "Enter your card number",
    },
    {
        type: "password",
        name: "cvv",
        message: "Enter your CVV",
    },
    {
        type: "list",
        name: "transactionType",
        choices: ["Deposit", "Withdrawl"],
        message: "What type of transaction would you like to create?",
    },
    {
        type: "number",
        name: "amount",
        message: `enter your desired amount (remaining balance is 500,000): `,
        when(answers) {
            return answers.transactionType == "Deposit";
        },
    },
    {
        type: "number",
        name: "amount",
        message: `enter your desired amount (remaining balance is 500,000): `,
        when(answers) {
            return answers.transactionType == "Withdrawl";
        },
    },
]);
if (answers.transactionType === "Withdrawl") {
    const balance = 500000;
    console.log("Previous Balance was: ", balance);
    const withdraw_amount = answers.amount;
    if (balance >= withdraw_amount) {
        const remainingamount = balance - withdraw_amount;
        console.log("Remaining Balance is: ", remainingamount);
    }
    else {
        console.log("Insufficient Funds");
    }
}
else {
    const balance = 500000;
    console.log("Previous Balance was: ", balance);
    const deposit_amount = answers.amount;
    if (balance <= deposit_amount || balance >= deposit_amount) {
        const new_amount = balance + deposit_amount;
        console.log("Remaining Balance is: ", new_amount);
    }
}
