// const { request } = require("express");

const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async(req, res) => {
    const {title, amount, category, date, description} = req.body;
    console.log(req.body)

    const income = IncomeSchema({
        title, amount, category, date, description
    })
    // await income.save();

    try {
        if(!title || !category || !date || !description){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a number above 0'})
        }
        await income.save();
        res.status(200).json({message: 'Entry was successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    // console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
};

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id).then((income) =>{
        res.status(200).json({message: "Income deleted successfully"})
    })
    .catch((err) =>{
        res.status(500).json({message: "Server Error: " + err.message})
    })
};