import React, { Component, lazy, Suspense } from 'react';
import { Switch, Route, Link } from "react-router-dom";

import styles from './App.module.css';
import HeadSection from '../components/HeroSection/HeaderImage';
import IncomeDisplay from './IncomeDisplay/IncomeDisplay';
import ExpenseDisplay from './ExpenseDisplay/ExpenseDisplay';
import Spinner from './Spinner/Spinner';
import FourOFourPage from './FourOFour/FourOFour';
import AppContext from '../context/App-context';


const AboutPage = lazy( () => import('./About/About') );
const AdminSignIn = lazy ( () => import('./AdminSignIn/AdminSignIn') );

class App extends Component{

 
    state = {
      funcs: {
        handleHover: (e) => this.handleHover(e),
        handleHover2: (e) => this.handleHover2(e),
        handleAddIncomeEntries: (e) => this.handleAddIncomeEntries.call(this, e),
        handleAddExpenseEntries: (e) => this.handleAddExpenseEntries.call(this, e),
        calcPercentage: (e) => this.calcPercentage.call(this, e),
        deleteIncomeEntry: (id) => this.deleteIncomeEntry.call(this, id),
        deleteExpenseEntry: (id) => this.deleteExpenseEntry.call(this, id),
        handleSignIn: (e, p) =>  this.handleSignIn(e, p)
      },

      incomeEntries: [], //[{description:'Salary', value:'4444', id:'34536456567', incHoverStyle: {display: 'none'}}, 
                    // {description:'Gift', value:'2564.30', id:'5536678786567', incHoverStyle:{display:'none'}}
                    // ],//fetch buget items to fill array from database on load
      expenseEntries:[], //[{description:'Rent', value:'444.67', id:'345364565097', percentage:null, expHoverStyle: {display: 'none'}},
                        //{description:'Game', value:'344.87', id:'3655636456567', percentage:null, expHoverStyle: {display: 'none'},}
                      //],
      totalIncome: '',
      totalExpense: '',
      totalExpensePercentage: '',
      month: '',
  }


  componentDidMount(){
    this.month();
    this.totalIncome();
    this.totalExpense();
    const val = this.state.totalExpense;
    const v = val.replace(',', '');
    const totalExpensePercentage = this.calcPercentage(v);

    this.setState(prevState => {
        return{
           totalExpensePercentage: prevState.totalExpensePercentage = totalExpensePercentage
       }
    });
    window.addEventListener( 'beforeunload', this.beforeHandler );
  }

  componentDidUpdate(prevProps, prevState, snapshot){ 
   
    if(this.state.incomeEntries.length > prevState.incomeEntries.length){
      this.totalIncome();
      this.totalExpense();

      setTimeout( () => {
        const val = this.state.totalExpense;
        const v = val.replace(',', '');
        const totalExpensePercentage = this.calcPercentage(v);
      
        this.setState(prevState => {
          return{
            totalExpensePercentage: prevState.totalExpensePercentage = totalExpensePercentage
          }
        });

      }, 1000);
    }

    if(this.state.expenseEntries.length > prevState.expenseEntries.length){
      this.totalIncome();
      this.totalExpense();

      setTimeout( () => {
        const val = this.state.totalExpense;
        const v = val.replace(',', '');
        const totalExpensePercentage = this.calcPercentage(v);
      
        this.setState(prevState => {
          return{
            totalExpensePercentage: prevState.totalExpensePercentage = totalExpensePercentage
          }
        });
      }, 1000);
    }

  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.beforeHandler);
  }

  beforeHandler(e){
    e.preventDefault();

    const message = 'Your budget data may not be Saved!';
    e.returnValue = message;
    return message;
  }
  handleSignIn(e, p){

    
  }
  
  handleHover = (e) => {
    const evt = e.target.className;
    const hoverItem = e.target.getAttribute('data');

    if(evt.includes('Income')){
      //any object in incomeEntries array whose id property match the id passed 
      //in this fuction from incomeDisplay component, is the object whose incHoverstyle property
      //we want to change from an {display: 'none'} to {}
      const inE = this.state.incomeEntries;
      
      inE.forEach( (entry_obj, index) => {

        if(entry_obj.id == hoverItem){

          const entri = {
            ...entry_obj,
            incHoverStyle: entry_obj.incHoverStyle = {}
          } 
          
          this.setState( prevState => {

            return{ 
              incomeEntries: prevState.incomeEntries.filter( (entry, indexx) => {

                if(indexx === index){
                  return entri;
                }
                return entry
              })
          } 
          });

        }

      });

    }
    
    if (evt.includes('Expense')){
      const inE = this.state.expenseEntries;

      inE.forEach( (entry_obj, index) => {

        if(entry_obj.id == hoverItem){
         
          const entri = {
            ...entry_obj,
            expHoverStyle: entry_obj.expHoverStyle = {}
          } 

          this.setState( prevState => {

            return{
              expenseEntries: prevState.expenseEntries.filter( (entry, indexx) => {

                if(indexx === index){
                  return entri;
                }
                return entry
              })
          } 
          });
        }

      });
    }

    
  }

  handleHover2 = (e) => {
    const evt = e.target.className;
    const hoverItem = e.target.getAttribute('data');

    if(evt.includes('Income')){
      const inE = this.state.incomeEntries;

      inE.forEach( (entry_obj, index) => {

        if(entry_obj.id == hoverItem){

          const entri = {
            ...entry_obj,
            incHoverStyle: entry_obj.incHoverStyle = {display: 'none'}
          }
          
          this.setState( prevState => {
          
            return{ 
              incomeEntries: prevState.incomeEntries.filter( (entry, indexx) => {

                if(indexx === index){
                  return entri;
                }
                return entry
              })
          }  
          });
        }

      });

    }
    
    if(evt.includes('Expense')){
      const inE = this.state.expenseEntries;

      inE.forEach( (entry_obj, index) => {

        if(entry_obj.id == hoverItem){

          const entri = {
            ...entry_obj,
            expHoverStyle: entry_obj.expHoverStyle = {display: 'none'}
          }
          
          this.setState( prevState => {
          
            return{ 
              expenseEntries: prevState.expenseEntries.filter( (entry, indexx) => {

                if(indexx === index){
                  return entri;
                }
                return entry
              })
          } 
          });
        }

      });

      
    }
    
  }
 
  handleAddIncomeEntries(e){
    // //include an id to 'e' object
    // const e_evaluated = e;
    // e_evaluated.id =  this.state.incomeId_Unique;

    this.setState( prevState => {
      return{
        incomeEntries: prevState.incomeEntries.concat(e),
      }
    });
   
  }

  handleAddExpenseEntries(e){
    // //include an id to 'e' object
    // const e_evaluated = e;
    // e_evaluated.id =  this.state.expenseId_Unique;

    this.setState( prevState => {
      return{
        expenseEntries: prevState.expenseEntries.concat(e),
      }


    });
  }

  calcPercentage = (c) => {
    //calculate the percentage of this expense in relation to income
    const inE = this.state.incomeEntries;
    let totalincome = [];
    
    inE.filter( entry => totalincome.push(Number(entry.value)) );

    let acumulator = 0;

    for (let i = 0; i < totalincome.length; i++){

      acumulator += totalincome[i];
    }

    const percentage = parseFloat(c) / acumulator; 
    
    const perc = `${Math.floor(percentage * 100)}%`;

    return perc;//'perc' is what we want to return
  }

  formatValue = (v) => {
    //https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    const valueFomarted = Number(v).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return valueFomarted;
  }

  totalIncome = () => {
    const inE = this.state.incomeEntries;
    let totalincome = [];
    
    inE.filter( entry => totalincome.push(Number(entry.value)) );

    let acumulator = 0;

    for (let i = 0; i < totalincome.length; i++){

      acumulator += totalincome[i];
    }

    let valueFomarted = acumulator.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    this.setState(prevState => {

      return{
        totalIncome: prevState.totalIncome = valueFomarted
      }
    });

  }

  month(){
  this.setState(prevState => {
    let day = new Date();

    let options = {month: 'long'};
    const month = new Intl.DateTimeFormat('en-US', options).format(day);
    
    return{
      month: prevState.month = month
    }
  });
  }

  totalExpense = () =>{
    const inE = this.state.expenseEntries;
    let totalexpense = [];
    
    inE.filter( entry => totalexpense.push(Number(entry.value)) );

    let acumulator = 0;

    for (let i = 0; i < totalexpense.length; i++){

      acumulator += totalexpense[i];
    }

    let valueFomarted = acumulator.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    this.setState(prevState => {

      return{
        totalExpense: prevState.totalExpense = valueFomarted
      }
    });
  }

  deleteIncomeEntry(id){
    const incomeEntries = this.state.incomeEntries;

   const updatedIncomEntries1 = [];

   const updatedIncomEntries = incomeEntries.filter( entry => {

      if(entry.id == id){

        return;
      }
      updatedIncomEntries1.push(Number(entry.value));

      return entry;
    });

    this.setState( prevState => {
      return{
        incomeEntries: prevState.incomeEntries = updatedIncomEntries
      }
    });

    //update total icome and percentage here
    setTimeout(() => {
      this.totalIncome();
    }, 2000);

    setTimeout(() =>{
      
      const val = this.state.totalExpense;
        const v = val.replace(',', '');
        const totalExpensePercentage = this.calcPercentage(v);
      
        this.setState(prevState => {
          return{
            totalExpensePercentage: prevState.totalExpensePercentage = totalExpensePercentage
          }
        });

      }, 3500);


  }

  deleteExpenseEntry(id){

    const expenseEntries = this.state.expenseEntries;
    const updatedExpenseEntries1 = [];

   const updatedExpenseEntries = expenseEntries.filter( entry => {

      if(entry.id == id){

        return;
      }
      updatedExpenseEntries1.push(Number(entry.value));

      return entry;
    });

    this.setState( prevState => {
      return{
        expenseEntries: prevState.expenseEntries = updatedExpenseEntries
      }
    });
    //update total icome and percentage here
    setTimeout(() => {
      this.totalExpense();
    }, 2000);

    setTimeout(() =>{
      
      const val = this.state.totalExpense;
        const v = val.replace(',', '');
        const totalExpensePercentage = this.calcPercentage(v);
      
        this.setState(prevState => {
          return{
            totalExpensePercentage: prevState.totalExpensePercentage = totalExpensePercentage
          }
        });

      }, 3500);

  }

  render(){
    
    let incomeDisplay; 
    let incomeDisplayHeader; 

    let expenseDisplay;
    let expenseDisplayHeader;
    let nothingAddedStyle = 

      <div className={styles.nt}>

      <div className={styles.nothingAdded}></div>

      <h4 className={styles.nothingAddedE}>START ADDING BUDGET ITEMS</h4>
      <h6 className={styles.about}> <Link to='/about'>About</Link></h6> <h6 className={styles.admin}> <Link to='/sign-in'>Go to Admin Sign-In</Link></h6>
      </div>;
    

              if(this.state.incomeEntries.length !== 0){
                incomeDisplayHeader = <h4>INCOME</h4>;
                  incomeDisplay = this.state.incomeEntries.map( (incomeEntry, index) => {
                    const val = incomeEntry.value;

                    return <IncomeDisplay
                    desc={incomeEntry.description}
                    value={this.formatValue(val)} id={incomeEntry.id}
                    display={incomeEntry.incHoverStyle}
                    key={incomeEntry.id}/>;
                  }
                  
                  );
              }else{
                incomeDisplayHeader = null;
                incomeDisplay = null;    
              }
              
              if(this.state.expenseEntries.length !== 0){
                expenseDisplayHeader =  <h4>EXPENSE</h4>;
                expenseDisplay = this.state.expenseEntries.map( (expEntry, index) =>{
                  const arg = expEntry.value;

                  return <ExpenseDisplay 
                  desc={expEntry.description}  
                  value={this.formatValue(arg)} 
                  id={expEntry.id}
                  perc={ this.calcPercentage(arg) }
                  display={expEntry.expHoverStyle}
                  key={expEntry.id}/>
                } );
              }else{
                expenseDisplayHeader = null;
                expenseDisplay = null;
              }

            if(incomeDisplay){

              nothingAddedStyle = null; 

            }
            if(expenseDisplay){
              nothingAddedStyle = null; 
            }



    return (
      <Switch>

      <Route exact path='/'>

      <div className={styles.App}>

        <AppContext.Provider value={this.state}>
        <HeadSection />
        {nothingAddedStyle}
        <div className={styles.budgetView}>

           
            <div className={styles.incomeDisplay}>

            {incomeDisplayHeader}
            {incomeDisplay}

            </div>

            <div className={styles.expenseDisplay}>

            {expenseDisplayHeader}
            {expenseDisplay}

            </div>

        </div>
        </AppContext.Provider>

      </div>

      </Route>

      <Route exact path='/about' render={ () => { 
        return <Suspense fallback={Spinner}>

          <AboutPage />

        </Suspense>
      }} />
      

      <Route exact path='/sign-in' render={ () => {
          return  <Suspense fallback={Spinner}>
                      <AdminSignIn />
                  </Suspense>

        }
      }/>

      {/* this should alawys stay at the bottom */}
      <Route component={FourOFourPage}/>

      </Switch>      
    );

  }
}

export default App;
