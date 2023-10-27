import { configureStore, createSlice } from "@reduxjs/toolkit";
import { banks } from "./data";


const initialState = {
    bankIndex: 0,
    bank: banks[0],
    volume: 50,
    selected: undefined,
    power: true,
}

const drumReducer = createSlice({
    name: "drum",
    initialState,
    reducers: {
        toggleBank: state => ({ ...state, bank: banks[state.bankIndex === 0 ? 1 : 0], bankIndex: state.bankIndex === 0 ? 1 : 0 }),
        setVolume: (state, { payload: volume }) => ({ ...state, volume }),
        setSelected: (state, { payload: selected }) => {
            return { ...state, selected }
        },
        togglePower: (state) => ({ ...state, power: !state.power })
    }
})

export const { toggleBank, setVolume, setSelected, togglePower } = drumReducer.actions


export default configureStore({
    reducer: {
        drumReducer: drumReducer.reducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})