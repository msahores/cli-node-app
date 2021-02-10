#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const axios = require("axios");

const log = console.log;
const warning = chalk.red.bold;

const options = yargs
  .usage("Usage: -n <name>")
  .option("n", {
	  alias: "name",
	  describe: "Enter your name",
	  type: "string",
	  demandOption: true
  })
 .option("s", { alias: "search", describe: "Search term", type: "string" })
  .argv;

const greeting = `Hello, ${options.name}!`;

const boxenOptions = {
	padding: 1,
	margin: 1,
	borderStyle: "round",
	borderColor: "green",
	backgroundColor: "blue"
};

const msgBox = boxen(greeting, boxenOptions);

log(msgBox);

const url = "https://icanhazdadjoke.com/";

axios.get(url, { headers: { Accept: "application/json" } })
 .then(res => {
   log(warning("Here's a random joke for you:"));
   log(boxen(res.data.joke, {padding: 1, margin: 1, backgroundColor: "magenta"}))
 });

axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
 .then(res => {
   log("BTC-USD: ", boxen(res.data.bpi.USD.rate, boxenOptions))
 })