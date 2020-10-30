import React from 'react';
import styles from './FourOFour.module.css';
import img404 from '../../assets/4041.svg';
import { Link } from 'react-router-dom';

const FourOFour = () =>{

    return(
        <div className={styles.wrapper}> 

        <div className={styles.error}><img src={img404} alt='404 page svg'></img></div>
        <h4 className={styles.four}><Link to='/'>TAKE ME HOME</Link></h4>
        

        </div>
    );
}

export default FourOFour;