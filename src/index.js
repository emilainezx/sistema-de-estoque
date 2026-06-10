import chalk from "chalk";
import { menu } from "./menu.js";
import boxen from "boxen";

console.log(boxen(chalk.rgb(123, 45, 67).underline("SISTEMA DE ESTOQUE"), {padding: 1, margin: 1, borderStyle: 'classic'}));
console.log();
menu();
