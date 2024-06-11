const app = require('./app');
const database = require('./db');

app.listen(process.env.PORT, ()=> {
    console.log('App is running at' + process.env.PORT);
})