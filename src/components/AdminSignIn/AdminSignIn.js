import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import styles from './AdminSignIn.module.css';
// import AppContext from '../../context/App-context';


class AdminSignIn extends Component  {
    state = {
        password: '',
        email: '',
        redirect: false
    }


 handleEmail(e){
     e.persist();
     const email = e.target.value;
     this.setState({email: email});
 }

 handlePass(e){
    e.persist();
    const pass = e.target.value;
    this.setState({password: pass});
 }

 signInHandle(){
  
    //  const email = this.state.email;
    //  const pass = this.state.password;

    //  appContext.funcs.handleSignIn(email, pass);
 }

 handleRedirect = () => {
    this.setState(prevState =>{
        return{
            redirect: prevState.redirect = true
        }
    })
 }

 render(){

    const cls = [styles.input, styles.input1].join(' '); 
    let rdt = null

    if(this.state.redirect){
        rdt = <Redirect to='/'/>
    }

    return(
        
        <div className={styles.wrapper}>
            {rdt}
                <form method='post'
                 onSubmit={ this.signInHandle } 
                 className={styles.signIn}>

                <div className={styles.inpWrap}>  
                <h4 className={styles.header}>LOG IN</h4>
                <div className={styles.label}>
                    <label>Email</label>
                </div>
                
                <div className={cls}>
                    <input className={styles.inp} type='email' name='email' 
                    placeholder='Your e-mail here'
                    onChange={(e)=> this.handleEmail(e)}
                    required></input>
                    
                </div>
                
                <div className={styles.label}>
                    <label>Password</label>
                </div>
                
                <div className={styles.input}>
                    <input className={styles.inp} type='password' name='password'
                     placeholder='Password here please' 
                     onChange={(e)=> this.handlePass(e)}
                     required></input>
                    
                </div>

                <input className={styles.submit} type='submit'
                 value='log-in' 
                 onClick={this.handleRedirect}/> 

                </div>   
                </form>
          
        </div>
    );

    }
}

export default AdminSignIn;