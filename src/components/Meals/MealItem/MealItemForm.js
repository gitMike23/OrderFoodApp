import {useRef, useState} from 'react';
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";



const MealItemForm = props => {

    const [amountIsVaLid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim() === 0 || enteredAmountNumber < 1 || enteredAmountNumber>5)  {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    };

    return <form onSubmit={submitHandler} className={classes.form}>
        <Input ref={amountInputRef} label='Amount' input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max : '5',
            step: '1',
            defaultValue: '1'
        }}/>
        <button>+ Add</button>
        {!amountIsVaLid && <p>please enter a valid amount (1-5).</p>}
    </form>
};

export default MealItemForm;