/* Previous Code for App.js */

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductList from "./components/Products/ProductList";
// import Header from "./components/Layout/Header";
// import "./App.css";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 10;

//   useEffect(() => {
//     axios.get("https://dummyjson.com/products").then((response) => {
//       const data = response.data;
//       // console.log("data", data);
//       // to convert the every object in the products array to a new object
//       const transformedProducts = data.products.map((productData) => {
//         return {
//           id: productData.id,
//           title: productData.title,
//           description: productData.description,
//           price: productData.price,
//           thumbnail: productData.thumbnail,
//         };
//       });
//       setProducts(transformedProducts);
//     });
//   }, []);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);


//   const nextPage = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   const prevPage = () => {
//     setCurrentPage(currentPage - 1);
//   };

//   return (
//     <React.Fragment>
//       <Header />
//       <section className="body">
//         <ProductList products={currentProducts} />
//         <div className="pagination">
//           {currentPage > 1 && (
//             <button className="prev" onClick={prevPage}>
//               Prev
//             </button>
//           )}
//           {currentPage < totalPages && (
//             <button className="next" onClick={nextPage}>
//               Next
//             </button>
//           )}
//         </div>
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/Products/ProductList";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/Store/CartProvider";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartIsShown, setCartIsShown] = useState(false);
  const productsPerPage = 10;

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      const data = response.data;
      // console.log("data", data);
      // to convert the every object in the products array to a new object
      const transformedProducts = data.products.map((productData) => {
        return {
          id: productData.id,
          title: productData.title,
          description: productData.description,
          price: productData.price,
          thumbnail: productData.thumbnail,
        };
      });
      setProducts(transformedProducts);
    });
  }, []);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);


  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <section className="body">
        <ProductList products={currentProducts} />
        <div className="pagination">
          {currentPage > 1 && (
            <button className="prev" onClick={prevPage}>
              Prev
            </button>
          )}
          {currentPage < totalPages && (
            <button className="next" onClick={nextPage}>
              Next
            </button>
          )}
        </div>
      </section>
    </CartProvider>
  );
}

export default App;

