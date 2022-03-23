import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css"

import CartItem from "./CartItem";
import Checkout from "./Checkout";


const Cart = props =>{
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const onAddItemHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };
    const onRemoveItemHandler = id => {
        cartCtx.removeItem(id);
    };

    const orderHandler =() => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-4c995-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }


    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item =>(
        <CartItem 
        key={item.id} 
        name={item.name}  
        amount={item.amount} 
        price={item.price}
        onAdd={onAddItemHandler.bind(null, item)}
        onRemove={onRemoveItemHandler.bind(null, item.id)}
        />
    ))}
    </ul>;

    const modalActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <>
        {cartItems}
        <div className={classes.total}>
            <span>Total amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
    </>

    const isSubmittingModalContent = <p>Submitting order...</p>;
    const didSubmitModalContent = <p>Order has been sent!</p>

    return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
    )

};

export default Cart;