import React, { useContext } from "react";
import { CartState } from "../Context/Context";
import Products from "./Products";
import Filters from "./Filters";

const Home = () => {
  const {
    state: { products },
    prodState: { sort, byStock, byFastDelivery, searchQuery, byRating },
  } = CartState();

  console.log(products);

  const transformProducts = () => {
    let sortedProd = products;

    if (sort) {
      sortedProd = sortedProd.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProd = sortedProd.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProd = sortedProd.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProd = sortedProd.filter((prod) => prod.ratings >= byRating);
    }

    if (searchQuery) {
      sortedProd = sortedProd.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProd;
  };
  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <Products prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
