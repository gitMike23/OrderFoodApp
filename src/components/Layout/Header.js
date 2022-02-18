import {Fragment} from "react";

import mealsImg from "../../assets/meals.jpeg";
import HeaderCartButton from "./HeaderCartButton";

import classes from "./Header.module.css";


const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>    
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt="a table with food" />
        </div>
    </Fragment>
};


export default Header;