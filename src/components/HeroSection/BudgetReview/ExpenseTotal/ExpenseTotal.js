import React, {useContext} from 'react';

import styles from './ExpenseTotal.module.css';
import AppContext from '../../../../context/App-context';

const ExpenseTotal = () => {
    const appContext = useContext(AppContext);
    const value = appContext.totalExpense;
    const valuePerc =  appContext.totalExpensePercentage;
    let formatedValue;
    let formatedValuePerc;

    if(value){
        if(value.startsWith('0')){
            formatedValue = '...';
        }else{
            formatedValue =  `- ${value}`;
        }
    }

    if(valuePerc){
        const number = Number(valuePerc.replace('%',''));
        if(!isNaN(number)){
            if(valuePerc.startsWith('0') || valuePerc.startsWith('Infinity')){
                formatedValuePerc = '0%';
            }else{
                formatedValuePerc =  valuePerc;
            }
        }else{
           formatedValuePerc = '0%'
        }  
    }

    return(
        <div className={styles.bg}>

            <h5 className={styles.expense}>EXPENSE</h5>
            <h5 className={styles.calculated}>{formatedValue}</h5>
            <h6 className={styles.perc}>{formatedValuePerc}</h6>
        </div>

    );
}

export default ExpenseTotal;