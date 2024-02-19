import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { createStore, applyMiddleware } from 'redux';

// store all states
const store = configureStore({
    reducer: {

    },
});

export default store;
