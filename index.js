#! /usr/bin/env node         
import inquirer from "inquirer";
import chalk from "chalk";
// Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money 
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.blueBright.bold.italic(`Withdrawal of $${amount} successful. Remaining balance:$${this.balance}`));
        }
        else {
            console.log(chalk.bgCyanBright("Insufficiant Balance."));
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.bgBlackBright.bold.italic(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`));
    }
    // Check balance
    checkbalance() {
        console.log(chalk.yellowBright.bold.italic(`Currebt balance: $${this.balance}`));
    }
}
// Customer class
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// Create customers
const customers = [
    new customer("Irha", "Khan", "Female", 30, 316342256, accounts[0]),
    new customer("Annie", "Soomro", "Female", 25, 316342244, accounts[1]),
    new customer("Bilal", "Khan", "Male", 28, 3163425676, accounts[2])
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.bgCyanBright.bold.italic(`Welcome, ${customer.firstName} ${customer.lastName}!\n`));
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkbalance();
                    break;
                case "Exit":
                    console.log(chalk.bgGray.bold.italic("Exiting bank program..."));
                    console.log(chalk.bgMagentaBright.bold.italic("\n Thank you for using our bank services. Have a great day!"));
                    return;
            }
        }
        else {
            console.log(chalk.red.bold.italic("Invalid account number. Please try again."));
        }
    } while (true);
}
service();
