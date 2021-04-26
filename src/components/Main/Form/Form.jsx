import React, { useState, useContext } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ExpenseManagerContext } from '../../../context/context'
import { v4 as uuidv4 } from 'uuid';

import useStyles from './style'
import { incomeCategories, expenseCategories } from '../../../constants/categories'

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: new Date(),
}

const Form = () => {
    const classes = useStyles();
    const [formData, setformData] = useState(initialState);
    const { addTransaction } = useContext(ExpenseManagerContext)

    const createTransaction = () => {
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }
    
        addTransaction(transaction);
        setformData(initialState);
    }

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2} >
            <Grid item xs={12}>
                <Typography align='center' variant="subtitle2" gutterBottom >
                    Try adding Income or Expenses
                </Typography>
            </Grid>
            <Grid item xs={6} >
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setformData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
          <Select value={formData.category} onChange={(e) => setformData({ ...formData, category: e.target.value })}>
            {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
          </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setformData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="date" fullWidth value={formData.date} onChange={(e) => setformData({ ...formData, date: e.target.value })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}


export default Form
