import React, { useContext } from 'react';

import styles from './IncomeTotal.module.css';
import AppContext from '../../../../context/App-context';

const IncomeTotal = () => {
    const appContext = useContext(AppContext);
    const value = appContext.totalIncome;
    let formatedValue;

    if(value){
        if(value.startsWith('0')){
            formatedValue = '...';
        }else{
            formatedValue =  `+ ${value}`;
        }
    }

    return(
        <div className={styles.bg}>

            <h5 className={styles.income}>INCOME</h5>
            <h5 className={styles.calculated}>{formatedValue}</h5>
        </div>

    );
}

export default IncomeTotal;