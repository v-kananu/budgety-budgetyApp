import React, { Component } from 'react';

import styles from './BudgetControl.module.css';
import HeaderImageCompContext from '../../../context/HeaderImage-context';
import checkMark from '../../../assets/checkmark-circle.svg';


class BudgetControl extends Component {

    static contextType = HeaderImageCompContext;

    render(){

        let inputsStyle;
        let inputOutlineStyle =  this.context.incomeOrExpense === 'income' ? 
        {'outline-color': 'greenyellow'} : {'outline-color': '#f35d5d'};

        if(this.context.setInvalidInput){
 
            if(this.context.isInvalidDesc){
                inputsStyle = [ styles.descInvalid, styles.value ];

            }else if(this.context.isInvalidValue){
                inputsStyle = [ styles.desc, styles.valueInvalid ];
            }

            if(this.context.isInvalidDesc && this.context.isInvalidValue){
                inputsStyle = [ styles.descInvalid, styles.valueInvalid ];
            }
             
        }else{
           inputsStyle = [ styles.desc, styles.value ];
        }

        return(
            <div className={styles.iv}>
                 <select style={inputOutlineStyle} value={this.context.incomeOrExpense} 
                 onChange={this.context.selected}>
                    <option value='income'>+</option>
                    <option value='expense'>-</option>
                </select>
    
                <input style={inputOutlineStyle} type='text' className={inputsStyle[0]} 
                value={this.context.inputdescription} onChange={ this.context.desc }
                 placeholder='Add Description'></input>

                <input style={inputOutlineStyle} className={inputsStyle[1]} type='text' 
                value={this.context.inputvalue} onChange={this.context.val} 
                placeholder='Value'></input>

               <div className={styles.sp} onClick={ this.context.add }><img src={checkMark} alt='checkmark'/></div>
            </div>
        );
    }
}

export default BudgetControl;