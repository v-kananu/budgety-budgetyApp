import React, { useContext } from 'react';

import styles from './BudgetReview.module.css';
import IncomeTotal from './IncomeTotal/IncomeTotal';
import ExpenseTotal from './ExpenseTotal/ExpenseTotal';
import BudgetControl from '../BudgetControl/BudgetControl';

import AppContext from '../../../context/App-context';

const BudgetReview = () => {


    const appContext = useContext(AppContext);

    const classes = [styles.txt, styles.mm].join(' ');

    const value = appContext.totalIncome;
    let month = appContext.month;

    let formatedValue;

    if(value){
        if(value.startsWith('0')){
             formatedValue = '...';
        }else{
             formatedValue =  `+ ${value}`;
        }
    }   

return (

<div className={styles.bg}>
    
    <h5 className={styles.txt}>Available Budget in {month} </h5>
    <h2 className={classes}>{formatedValue}</h2>
    <IncomeTotal />
    <ExpenseTotal />
    <BudgetControl />

</div>

);


}
   
export default BudgetReview; 