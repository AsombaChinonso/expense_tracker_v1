
const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {

    const {title, description, date, amount,  category} = req.body;

    const expense = ExpenseSchema({
        title, description, date, amount, category
    })

    try {
        if(!title || !category || !date || !description){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a number above 0'})
        }
        await expense.save();
        res.status(200).json({message: 'Entry was successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json({expenses})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
};

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((income) =>{
        res.status(200).json({message: 'Expense Deleted'})
    })
    .catch((err) =>{
        res.status(500).json({message: 'Server Error'})
    })
};