import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartItems: [],
    totalAmout: 0,
    totalQuantity: 0,
    filterCategory: ''
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addItem:(state, action)=>{
            // console.log('action',action)
            const newItem = action.payload
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            state.totalQuantity++
            
            if(!existingItem){
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    thumbnail: newItem.thumbnail,
                    price: newItem.price,
                    quantity: newItem.quantity ? newItem.quantity : 1,
                    totalPrice: newItem.price
                })
            }
            else{
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            }

            state.totalAmout = state.cartItems.reduce(
                (total, item) => total+ Number(item.price) * Number(item.quantity), 0
            );
        },
        deleteItem:(state, action)=>{
            const id = action.payload
            const existingItem = state.cartItems.find(item => item.id === id)
    
            if(existingItem){
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }
    
            state.totalAmout = state.cartItems.reduce(
                (total, item) => total+ Number(item.price) * Number(item.quantity), 0
            );
        }
    },

})

export const cartActions = cartSlice.actions

export default cartSlice.reducer