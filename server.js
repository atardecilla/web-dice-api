const express = require('express'); //Using express framework
const cors = require('cors'); //Importing CORS
const app = express(); // Express app instance
const PORT = process.env.PORT || 3000; //running on port 3000

//enable cors
app.use(cors({
    origin: 'https://icy-ocean-042763510.1.azurestaticapps.net'
}));

app.get('/', (req, res) => {
    res.send('Dice API is running. Use /roll/:num to roll dice.');
});

//route to roll specific amount of dice
app.get('/roll/:num', (req, res) => {
    const numDice = parseInt(req.params.num);
    if (isNaN(numDice) || numDice < 1) return res.status(400).json({ error: 'Invalid number of dice' });

    const rolls = []; // array to hold dice rolls
    for (let i = 0; i < numDice; i++) { 
        rolls.push(Math.floor(Math.random() * 6) + 1); //rolls a 6-sided die
    }
    res.json({ rolls }); //sends back the rolls as JSON
});

app.listen(PORT, () => { //starts the server
    console.log(`Dice API server running on port ${PORT}`); 
});