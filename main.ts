#! usr/bin/node env
import inquirer from "inquirer";
import chalk from "chalk";

// Initialize scores
let playerScore = 0;
let computerScore = 0;

// Function to randomly select a choice for the computer
function computerChoice(arr: string[]): string {
    let randomNumber: number = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
}

// Function to determine the winner of a round
function determineWinner(player: string, computer: string): string {
    if (player === computer) {
        return "tie";
    } else if (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Paper" && computer === "Rock") ||
        (player === "Scissors" && computer === "Paper")
    ) {
        return "player";
    } else {
        return "computer";
    }
}

// Main game function
async function startGame() {
    console.log(chalk.yellow("Let's play Rock, Paper, Scissors!"));

    while (true) {
        // Prompt the player for their choice
        const playerChoice: any = await inquirer.prompt({
            name: "askPlayer",
            type: "list",
            message: "What do you want to do?",
            choices: ["Rock", "Paper", "Scissors"]
        });

        // Get computer's choice
        const computerSelected: string = computerChoice(["Rock", "Paper", "Scissors"]);

        // Determine the winner of the round
        const winner: string = determineWinner(playerChoice.askPlayer, computerSelected);

        // Update scores and display result
        if (winner === "player") {
            playerScore++;
            console.log(chalk.green("You won this round!"));
        } else if (winner === "computer") {
            computerScore++;
            console.log(chalk.red("Computer won this round!"));
        } else {
            console.log(chalk.yellow("It's a tie!"));
        }

        console.log(chalk.yellow(`Scores - Player: ${playerScore}, Computer: ${computerScore}`));

        // Ask if the player wants to play again
        const playAgain: any = await inquirer.prompt({
            name: "playAgain",
            type: 'confirm',
            message: "Do you want to play again?",
            default: true
        });

        if (!playAgain.playAgain) {
            break; // Exit the loop if the player doesn't want to play again
        }
    }

    // Display final result
    if (playerScore > computerScore) {
        console.log(chalk.green("Congratulations! You won the game!"));
    } else if (playerScore < computerScore) {
        console.log(chalk.red("Sorry, you lost the game."));
    } else {
        console.log(chalk.yellow("The game ended in a tie."));
    }
}

// Start the game
startGame();
