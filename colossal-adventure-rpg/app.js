const readlineSync = require("readline-sync");

console.log('Welcome traveler, welcome to the game!');

const playerName = readlineSync.question('Before we start the adventure, what is your name? ');
console.log(`Greetings, ${playerName}! Your journey begins now...`);

let enemiesDefeated = 0;
let playerHP = 100;
let inventory = [];

function addItemToInventory(item) {
    inventory.push(item);
    console.log(`You received a ${item}!`);
}

function printInventory() {
    console.log(`Player: ${playerName}`);
    console.log(`HP: ${playerHP}`);
    console.log("Inventory:");
    inventory.forEach(item => console.log(item));
}

function walk() {
    while (true) {
        const action = readlineSync.question('Enter "w" to walk forward or "p" to print inventory: ');

        if (action === "w") {
            if (Math.random() < 0.33) {
                console.log('An enemy has appeared!');
                battle();
            } else {
                console.log('You continue walking straight.');
            }
        } else if (action === "p") {
            printInventory();
        } else {
            console.log('Invalid input!');
        }
    }
}

function battle() {
    const enemies = ['Orc', 'Goblin', 'Troll'];
    const enemy = enemies[Math.floor(Math.random() * enemies.length)];
    let enemyHP = 50;
    const items = ['Health Potion', 'Sword', 'Shield'];

    console.log(`You encounter a ${enemy}!`);

    while (playerHP > 0 && enemyHP > 0) {
        const action = readlineSync.question('Do you want to "attack" or "run"? ');

        if (action === "attack") {
            const playerDamage = Math.floor(Math.random() * 20) + 10;
            enemyHP -= playerDamage;
            console.log(`You dealt ${playerDamage} damage to the ${enemy}.`);

            if (enemyHP <= 0) {
                console.log('You defeated the enemy!');
                enemiesDefeated++;
                const item = items[Math.floor(Math.random() * items.length)];
                addItemToInventory(item);
                break;
            }

            const enemyDamage = Math.floor(Math.random() * 15) + 5;
            playerHP -= enemyDamage;
            console.log(`The ${enemy} dealt ${enemyDamage} damage to you.`);

            if (playerHP <= 0) {
                console.log('You have been defeated. GAME OVER!');
                process.exit();
            }
        } else if (action === "run") {
            if (Math.random() < 0.5) {
                console.log('You escaped! Continue forward.');
                break;
            } else {
                const enemyDamage = Math.floor(Math.random() * 15) + 5;
                playerHP -= enemyDamage;
                console.log(`You failed to escape and the ${enemy} dealt ${enemyDamage} damage!`);
            }
        } else {
            console.log('Invalid input, please choose one of the two options.');
        }
    }
}

walk();
