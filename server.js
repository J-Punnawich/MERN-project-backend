
// // const express = require('express')
// // const colors = require('colors')
// // const dotenv = require('dotenv').config()
// // const { errorHandler } = require('./middleware/errorMiddleware')
// // const connectDB = require('./config/db')
// // const port = process.env.PORT || 5000

// // connectDB()

// // const app = express()

// // app.use(express.json())
// // app.use(express.urlencoded({ extended: false }))

// // app.use('/api/goals', require('./routes/goalRoutes'))
// // app.use('/api/users', require('./routes/userRoutes'))

// // // Serve frontend
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static(path.join(__dirname, '../frontend/build')))

// //   app.get('*', (req, res) =>
// //     res.sendFile(
// //       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
// //     )
// //   )
// // } else {
// //   app.get('/', (req, res) => res.send('Please set to production'))
// // }

// // app.use(errorHandler)

// // app.listen(port, () => console.log(`Server started on port ${port}`))

// let express = require('express'),
//     mongoose = require('mongoose'),
//     cors = require('cors'),
//     bodyParser = require('body-parser'),
//     dbConfig = require('./database/db');
//     path = require('path');

// const app = express();

// // Express Route  ใช้งาน router module
// const studentRoute = require('./routes/student.route');
// const authRoute = require('./routes/auth.route')

// // Connecting MongDB Database
// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {useNewUrlParser: true,  useUnifiedTopology: true
//     })
//     .then(() => {
//     console.log('Database successfully connected');
// }, 
//     error => {
//         console.log('Could not connect to database: ' + error)
//     }
// )

// // เรียกใช้ app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(cors());

// // เรียกใช้ในรูปแบบ middleware โดยใช้ .use
// // เช่น จะต้องเรียก /students/create-student ใน axios 
// app.use('/students', studentRoute);

// // ต้องใช้ /students จะเข้าไปทำงานที่ root route '/' ของ studentRoute

// // แต่ถ้าเปลี่ยนเป็น app.use('/', studentRoute); ก็คือเมื่อเปิดเว็บมาจะเข้าไปทำงานใน '/' ของ studentRoute เลย


// app.use('/users', authRoute);

// // ใช้ deploy project
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../build')))           

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../build/index.html"))   
//     })
// }




// // PORT
// const port = process.env.PORT || 4000;
// const server = app.listen(port, () => {
//     console.log('Connected to port ' + port)
// })

// // 404 Error
// app.use((req, res, next) => {
//     next(createError(404))
// })

// // Error handler
// app.use(function(err, req, res, next) {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message);
// })