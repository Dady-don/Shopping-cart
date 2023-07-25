import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import Rating from "./Rating";
import { CartState } from "../Context/Context";

const Filters = () => {
  const {
    prodState: { byStock, byRating, sort, byFastDelivery },
    prodDispatch,
  } = CartState();

  console.log(byStock, byRating, sort, byFastDelivery)

  // const [rate,setRate] =useState(0)
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() => {
            prodDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            });
          }}
          checked={sort === "lowToHigh" ? true : false}
        />
        {/**Form.Check for radio button */}
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={"inline-2"}
          onChange={() => {
            prodDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            });
          }}
          checked={sort === "highToLow" ? true : false}
        />
        {/**Both are kept in the same group group1 so that at once either the ascending gets selected or the descending gets selected. */}
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={"inline-3"}
          onChange={()=>{
            prodDispatch({
              type:'FILTER_BY_STOCK',
            })
          }}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={"inline-4"}
          onChange={()=>{
            prodDispatch({
              type:'FILTER_BY_DELIVERY'
            })
          }}
          checked={byFastDelivery}
        />
      </span>

      <span>
        <label style={{ paddingRight: 10 }}>Rating:</label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            prodDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button onClick={()=>{
        prodDispatch({
          type:'CLEAR_FILTERS'
        })
      }} variant="light">Clear Filters</Button>
    </div>
  );
};

export default Filters;
