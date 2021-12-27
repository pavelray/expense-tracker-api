
const mongoose = require('mongoose');

const app = require('./app');
const {DB_URL,DB_PASS } = require('./utils/constants');
 
const PORT = 5001;

const DB = DB_URL.replace('<PASSWORD>', DB_PASS);

mongoose.connect(DB).then(()=>{
    console.log('DB Connected Successfully')
}).catch(err =>{
    console.log(`Error While connecting DB : ${err}`)
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});