const jsonData= require('./data.json'); 
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test-db', { useNewUrlParser: true })
const Schema = mongoose.Schema


const expenseSchema = new Schema({
    item: String,
    group: String,
    amount: Number,
    date: Date
})
const Expense = mongoose.model('expense', expenseSchema)

module.exports=Expense



