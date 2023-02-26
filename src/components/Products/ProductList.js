import React from "react";

import Products from "./Products";
import classes from "./ProductList.module.css";

const ProductList = (props) => {

    return (
        <ul className={classes["product-list"]}>
            {props.products.map((product) => (
                <Products
                    key={product.id}
                    id={product.id}
                    name={product.title}
                    description={product.description}
                    price={product.price}
                    thumbnail={product.thumbnail}
                />
            ))}
        </ul>
    );
};

export default ProductList;
