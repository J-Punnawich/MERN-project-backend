

let express = require('express'),
    mongoose = require('mongoose'),
    colors = require('colors')
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv').config()
    dbConfig = require('./database/db');
    path = require('path');

const app = express()






// // เรียกใช้ app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());


// app.use('/post', postRoute);
// app.use('/user', userRoutes);

// // ใช้ deploy project
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../build')))           

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../build/index.html"))   
//     })
// }




// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))
// const server = app.listen(port, () => {
//     console.log('Connected to port ' + port)
// })

