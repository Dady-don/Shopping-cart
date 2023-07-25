import React, { createContext, useContext, useReducer } from 'react'
import {faker} from '@faker-js/faker'
import { reducer } from './Reducer'
import { productReducer } from './Reducer'

const Cart=createContext()
faker.seed(99) //gives the same data everytime the component refreshes

const Context = ({children}) => {

   const products=[...Array(20)].map(()=>({
    id:faker.string.uuid(),
    name:faker.commerce.productName(),
    price:faker.commerce.price(),
    image:faker.image.url(), // givea a random image.
    inStock:faker.helpers.arrayElement([0,3,5,6,7]),
    fastDelivery:faker.datatype.boolean(),
    ratings:faker.helpers.arrayElement([1,2,3,4,5])
   })) //Storing the json data generated using faker.

   const [state,dispatch]=useReducer(reducer, {
    products:products,
    cart:[] //initial value of state.
   })

   const[prodState,prodDispatch]=useReducer(productReducer,{
    byStock:false,
    byFastDelivery:false,
    byRating:0,
    searchQuery:'',
   })


//    console.log(products)
  return (
    <Cart.Provider value={{state,dispatch,prodDispatch,prodState}}>
      {children}
    </Cart.Provider>
  )
}

export default Context

export const CartState=()=>{
    return useContext(Cart)
}