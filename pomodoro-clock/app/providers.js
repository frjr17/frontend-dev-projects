'use client';
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store";

export default function Providers({ children }) {

    return (<ChakraProvider>
        <Provider store={store}>
            {children}
        </Provider>
    </ChakraProvider>)
}