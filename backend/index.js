const express= require("express")
require("dotenv").config();
const cors= require("cors")
const {graphqlHTTP}= require("express-graphql")
const schema = require("./schema/schema")
const connectDB= require('./db/mongodb');
const { default: mongoose } = require("mongoose");


const port= process.env.PORT || 5000;

const app= express();

//connect to database
connectDB();

app.use(cors())
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});