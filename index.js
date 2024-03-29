const express=require("express");
const { connection } = require("./config/db");
require("dotenv").config()
const {userRouter}=require("./routes/userRoutes")
const {bookRouter}=require("./routes/bookRouter")

const {borrowRouter}=require("./routes/borrowRoutes")
const {recommendRouter}=require("./routes/recommendationRoute")

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({ "msg": "Welcome to Indi.gg" })
})

app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/borrow',borrowRouter);
app.use('/recommendations', recommendRouter);


const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Library Management System API Documentation',
        version: '1.0.0',
        description: 'API documentation for Library Management System application',
      },
      servers: [
        {
          url: `https://library-e2id.onrender.com/`, // Replace with your server URL
          description: 'Development server',
        },
      ],
    },
    apis: ['./controllers/*.js'], // Path to your API route files
  };
  
  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  
  

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Database connected!")
    } catch (error) {
        console.log("Database not Connected!")
        console.error(error)
    }

    console.log(`Server is running on http://localhost:${process.env.port}`)
})
