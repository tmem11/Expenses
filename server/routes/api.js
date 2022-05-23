const express = require('express')
const router = express.Router()
const Expense = require('../model/Expense')
const moment = require('moment')


// const urllib = require('urllib');
function setDate(date) {
    if (!date) {
        return moment().format('LLLL')
    }
    else {
        return moment(date).format('LLLL')
    }
}

router.get('/expenses', (req, res) => {
    Expense.find({}, function (err, expenses) {

        res.send(expenses)
    })

})
router.post('/expenses', (req, res) => {
    const expense = new Expense(req.body)
    expense.date = setDate(req.body.date)
    const expenseProm = expense.save()
    expenseProm.then(function (expense) {
        console.log(`The amount of expense is ${expense.amount}\n and you spent your money on ${expense.group}`)
    })
    res.send(`New expense was inserted -> ${expense}`)
})
router.put("/update/:group1/:group2", function (request, response) {
    const g1 = request.params.group1
    const g2 = request.params.group2
    Expense.findOneAndUpdate({ group: g1 }, { group: g2 }, { new: true })
        .exec(function (err, expense) {
            response.send(`The ${g1} expense changed , to ${expense.group} `)
        })
})
router.get("/expenses/:group", function (req, res) {
    const group = request.params.group
    Expense.find({ group: group })
        .exec(function (err, expenses) {
            res.send(`All expenses for this group ${expenses}`)
        })
})
router.get("/expenses/total/:group", function (request, response) {
    const group = request.params.group
    Expense.aggregate([
        { $match: { group: group } },
        {
            $group: { _id: "$group", total: { $sum: "$amount" } }
        }]).exec((err, total) => {
            response.send(total);
    })
})

module.exports = router
