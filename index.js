const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const challenge = cwd.includes('Social-Network-API-18')
  ? cwd.split('/Social-Network-API-18/')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Adds a one-timelistener function for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked.
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Api server for ${challenge} running on port ${PORT}!`)
    })
})

// `npm run seed`
// `npm run dev`