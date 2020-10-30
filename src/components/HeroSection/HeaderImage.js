import React, { Component } from 'react';

import styles from './HeaderImage.module.css';
import BudgetReview from '../../components/HeroSection/BudgetReview/BudgetReview';
import AppContext from '../../context/App-context';

import HeaderImageContext from '../../context/HeaderImage-context';




class HeroImageComp extends Component {

    static contextType = AppContext;

    state ={
        funcs:{
           handleDesc: this.handleDesc.bind(this),
           handleSelect: this.handleSelect.bind(this),
           handleValue: this.handleValue.bind(this),
           handleAdd:  this.handleAdd.bind(this)
        },
        AddincomeOrExpense: 'income',
        description: '', 
        value: '',
        setInvalidInputStyle: false,
        setDescInvalid: false,
        setValueInvalid: false,
   };
     
        handleSelect(e) {
        
            let whatToAdd = 'income';
            
            if(e.target.value === 'income'){
                this.setState( prevState =>{

                    return {
                        AddincomeOrExpense: prevState.AddincomeOrExpense = whatToAdd
                    } 
                });
            } else {

                    whatToAdd = 'expense';
                    
                    this.setState( prevState => {

                        return{
                            AddincomeOrExpense: prevState.AddincomeOrExpense = whatToAdd
                        } 
                    });
            }
        }

        handleDesc(e) {
            e.persist();
            const value = e.target.value;

                if(!value.startsWith(' ')){
                    this.setState( prevState => {
                        
                        return{
                            setDescInvalid: false,
                            setInvalidInputStyle: false,
                            description: prevState.description = value,
                        }
                    } );
                }else{
                    this.setState( prevState => {

                        return{
                            setDescInvalid: prevState.setDescInvalid = true,
                            setInvalidInputStyle: prevState.setInvalidInputStyle = true,
                        }
                    } );
                }
        }

        handleValue(e) {

            e.persist();
            
            const inputNumber = e.target.value;

            if(!inputNumber.startsWith(' ')){

                if(!isNaN(inputNumber)){

                    this.setState( prevState => {
    
                        return{
                            setValueInvalid: false,
                            setInvalidInputStyle: false,
                            value: prevState.value = inputNumber,
                        } 
                    });
                }else{
                    this.setState( prevState => {
                        return{
                            setValueInvalid: prevState.setValueInvalid = true,
                            setInvalidInputStyle: prevState.setInvalidInputStyle = true
                        }
                    });
                }

            }else{
                this.setState( prevState => {
                    return{
                        setValueInvalid: prevState.setValueInvalid = true,
                        setInvalidInputStyle: prevState.setInvalidInputStyle = true
                    }
                });

            } 
        }

        handleAdd() {

            if(this.state.description !== '' 
            && this.state.value !== ''){

                if(this.state.AddincomeOrExpense === 'income'){

                    const token =  Math.floor(Math.random() * 1000000000000);

                    const incomeObj = {

                        description:  this.state.description,
                        value: this.state.value,
                        id: token,
                        incHoverStyle:{display:'none'}
                    };

                    this.setState( prevState => {
                        return{
                            setInvalidInputStyle: prevState.setInvalidInputStyle = false,
                            setValueInvalid: prevState.setValueInvalid = false,
                            setDescInvalid: prevState.setDescInvalid = false
                        }
                    });
                  
                    this.context.funcs.handleAddIncomeEntries(incomeObj);
                    
                } else{
                
                    const token =  Math.floor(Math.random() * 1000000000000);
                    const perc = this.context.funcs.calcPercentage(Number(this.state.value));

                    const incomeObj = {
                        description:  this.state.description,
                        value: this.state.value,
                        percentage: perc,
                        id: token,
                        expHoverStyle:{display:'none'}
                    };

                    this.setState( prevState => {

                        return{
                            setInvalidInputStyle: prevState.setInvalidInputStyle = false,
                            setValueInvalid: prevState.setValueInvalid = false,
                            setDescInvalid: prevState.setDescInvalid = false
                        }
                    });

                    this.context.funcs.handleAddExpenseEntries(incomeObj);

                }
            
            } else{
                //we'll provide an in component visual cue instead of prompt 
                //when users input nothing and expect app to work. 

                this.setState({
                    setInvalidInputStyle: true,
                }); 

                if(this.state.description === ''){
                    this.setState({
                        setDescInvalid: true,
                    }); 
                }

                if(this.state.value === ''){
                    this.setState({
                        setValueInvalid: true,
                    }); 
                }
            }

            //we want to clear Budgetcontoller's input fields here
            // we want it to clear it input field here
            this.setState( prevState => {
                return{
                    description: prevState.description = '',
                    value: prevState.value = '',
                }
            });
        }

    render(){
        const sharedStateSlice = {

            desc: this.state.funcs.handleDesc,
            selected: this.state.funcs.handleSelect,
            val: this.state.funcs.handleValue,
            add: this.state.funcs.handleAdd,
            incomeOrExpense: this.state.AddincomeOrExpense,
            inputdescription: this.state.description,
            inputvalue: this.state.value,
            setInvalidInput: this.state.setInvalidInputStyle,
            isInvalidDesc: this.state.setDescInvalid,
            isInvalidValue: this.state.setValueInvalid

        };

        return(

        <div className={styles.v}>
            <HeaderImageContext.Provider value={sharedStateSlice}>
            <BudgetReview />
            </HeaderImageContext.Provider>
        </div>
        );
    }
}

export default HeroImageComp;