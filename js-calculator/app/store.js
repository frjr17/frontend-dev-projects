'use client';

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    result: "",
    input: '',
}

const calculator = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        addToInput: (state, input) => ({ ...state, input: input.payload }),
        reset: (state) => ({ ...initialState }),
        getResult: (state, result) => ({ ...state, result: result.payload })
    }
})

export const { addToInput, reset, getResult } = calculator.actions

export default configureStore({
    reducer: {
        calculator: calculator.reducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})