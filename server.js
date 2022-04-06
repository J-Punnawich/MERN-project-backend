

let express = require('express'),
    mongoose = require('mongoose'),
    colors = require('colors')
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv').config()
    dbConfig = require('./config/db');
    path = require('path');

const app = express()

// // เรียกใช้ app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());


// app.use('/post', postRoute);
app.use('/users', require('./routes/userRoutes'))


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {useNewUrlParser: true,  useUnifiedTopology: true
    })
    .then(() => {
    console.log('Database successfully connected');
}, 
    error => {
        console.log('Could not connect to database: ' + error)
    }
)



// ใช้ deploy project
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')))           

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../build/index.html"))   
    })
}


// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))
// const server = app.listen(port, () => {
//     console.log('Connected to port ' + port)
// })

// 404 Error
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})