import React, { useContext } from "react";
import ProductForm from "./ProductForm";
import CartContext from "../Store/cart-context";
import classes from "./Products.module.css";

const Products = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$ ${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    };

    return (
        <div>
            <li className={classes.product}>
                <h2>{props.name}</h2>
                <h3>{props.description}</h3>
                <p>{price}</p>
                <img src={props.thumbnail} alt={props.name} />
                <ProductForm onAddToCart={addToCartHandler} />
            </li>

        </div>
    );
};

export default Products;
