import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);
    const cartCtxt = useContext(CartContext);
    
    const {items} = cartCtxt
    const numberOfCartItems = items.reduce((curValue, item )=>{
        return curValue + item.amount;
    }, 0);
    const btnClasses = `${classes.button} ${ isButtonHighlighted ? classes.bump : ''}`

    useEffect(()=> {
        if(items.length === 0) {
            return;
        }
        setIsButtonHighlighted(true) 

       const timer = setTimeout(() => {
            setIsButtonHighlighted(false)
        }, 300)

        return () => {
            clearInterval(timer)
        }
    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>
            Your Cart
        </span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
};


export default HeaderCartButton;