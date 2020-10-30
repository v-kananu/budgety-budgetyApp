import React, { useContext } from 'react';

import styles from './IncomeDisplay.module.css';
import AppContext from '../../context/App-context';


const IncomeDisplay = (props) => {

    const appContext = useContext(AppContext);
    const styleA = [styles.h, styles.hh].join(' ');

    return(
        <div className={styles.wrapper}>

            <div 
               className={styles.firstItem}
               onMouseEnter={ (e) => appContext.funcs.handleHover(e) }
               onMouseLeave={ (e) => appContext.funcs.handleHover2(e) }
               data={props.id}
               >

                <h5 className={styles.h}>{props.desc}</h5>
                <h5 className={styleA}>+ {props.value}</h5> 
        
                <h6 style={props.display} className={styles.cc}
                 onClick={() => appContext.funcs.deleteIncomeEntry(props.id)}>x</h6>
               </div>

        </div>
    );  
}

export default IncomeDisplay;