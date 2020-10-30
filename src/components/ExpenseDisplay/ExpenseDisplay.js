import React, { useContext } from 'react';

import styles from './ExpenseDisplay.module.css';
import AppContext from '../../context/App-context';

const ExpenseDisplay = (props) => {

    const appContext = useContext(AppContext);
    const styleA = [styles.h, styles.hh].join(' ');
    let perc = props.perc;

    if(props.perc.startsWith('Infinity')){

        perc = '0%';
    }

    return(
        <div className={styles.wrapper}>
        
               <div className={styles.firstItem}
               onMouseEnter={ (e) => appContext.funcs.handleHover(e) }
               onMouseLeave={ (e) => appContext.funcs.handleHover2(e) }
               data={props.id}
               >

                <h5 className={styles.h}>{props.desc}</h5>
                <h5 className={styleA}>- {props.value}</h5> 

                <h6 className={styles.c}>{perc}</h6>
                <h6 style={props.display} className={styles.cc} 
                onClick={ () => appContext.funcs.deleteExpenseEntry(props.id) }>x</h6>
               </div>
 
        </div>
    );   
}

export default ExpenseDisplay;