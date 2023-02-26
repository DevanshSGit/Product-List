// import classes from "./ProductForm.module.css";

// const ProductForm = (props) => {
//     return (
//         <form className={classes.form}>
//             <input />
//             <button>Add to Cart</button>
//         </form>
//     );
// };

// export default ProductForm;

/** Previous Code for ProductForm */
// import { useState, useRef } from 'react';
// import classes from "./ProductForm.module.css";
// import Input from '../Layout/Input';

// const ProductForm = (props) => {
//     const [quantity, setQuantity] = useState();
//     const addToCartHandler = (event) => {
//         event.preventDefault();
//         props.onAddToCart(quantity); // pass quantity to parent component
//         setQuantity('');
//     }
//     const quantityChangeHandler = (event) => {
//         //setQuantity(parseInt(event.target.value)); 
//         const newValue = parseInt(event.target.value);
//         if (newValue > 0 && newValue <= 10) {
//             setQuantity(newValue);
//         }
//         else if (newValue <= 0) {
//             setQuantity('');
//         }
//         else if (newValue > 10) {
//             alert('You cannot add more than 10 items!!');
//             setQuantity(10);
//         }
//     }
//     const clearQuantityHandler = (event) => {
//         if (event.key === "Backspace") {
//             setQuantity('');
//         }
//     }
//     return (
//         <form className={classes.form} onSubmit={quantityChangeHandler}>
//             <input type="number" value={quantity} onChange={quantityChangeHandler} onKeyDown={clearQuantityHandler} />
//             <button onClick={addToCartHandler}>Add to Cart</button>
//         </form>
//     );
// };

// export default ProductForm;

import { useRef, useState } from 'react';
import classes from "./ProductForm.module.css";

const ProductForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 10
        ) {
            setAmountIsValid(false);
            return;
        }
        setAmountIsValid(true);
        props.onAddToCart(enteredAmountNumber);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '0',
                    max: '10',
                    step: '1',
                    defaultValue: '0',
                }}
            />
            <button>Add To Cart</button>
            {!amountIsValid && <p>Please enter a valid amount (1-10).</p>}
        </form>
    );
};

export default ProductForm;