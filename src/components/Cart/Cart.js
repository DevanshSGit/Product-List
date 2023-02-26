import React from 'react';
import { useContext, useState } from 'react';
import Modal from '../Modal/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../Store/cart-context';

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const [error, setError] = useState('');

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        if (cartCtx.items.length >= 20) {
            setError('Cart cannot exceed 20 items!!');
            return;
        }
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const clearCartHandler = () => {
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
            ))}
        </ul>
    );

    const closeModalHandler = () => {
        setError('');
    }


    return (
        <React.Fragment>
            <Modal onClose={props.onClose}>
                {error && (
                    <div className={classes.overlay} onClick={closeModalHandler}>
                        <div className={classes['error-message']}>{error}</div>
                    </div>
                )}
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                    {hasItems && (<button className={classes['button--alt']} onClick={clearCartHandler}>Clear Cart</button>)}
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default Cart;