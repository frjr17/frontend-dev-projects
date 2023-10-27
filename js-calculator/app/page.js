'use client';
import { Center, Flex, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react";
import * as math from "mathjs";
import { useDispatch, useSelector } from "react-redux";
import { addToInput, getResult, reset } from "./store";
import { calculatorPads } from "./data";


export default function Home() {
  let { input, result } = useSelector(state => state.calculator);
  const dispatch = useDispatch();

  /**Function that generates the result. */
  const getPrevResult = (input) => {
    try {
      const evaluate = math.evaluate(input)
      // Throwing error if the function returns an undefined value.
      if (evaluate === undefined) {
        dispatch(reset())
        throw 'error'
      }
      return evaluate
    } catch (error) {
      return false
    }
  }

  /**Function that handles every click on calculator. */
  const handleChange = (keyButton) => {
    let key = keyButton

    // If the current input contains "=" sign, then we have to remove everything.
    if (input.includes("=")) {
      // If the key clicked was an operator, then returning the total as the current input.
      if ('+-*/Xx'.includes(key)) {
        input = result
        // If the key wasn't an equal sign (was just a number), then deleting all input.
      } else if (key !== '=') {

        dispatch(reset())
        input = ''
      } else {
        // If that's not the case, then exit the function
        return
      }

    }

    // Subtituing the mulptiplication "x" symbol for "*"
    if (key.toLowerCase() === 'x') {
      key = '*'
    }

    // Handling key by switch 
    switch (key) {
      case 'AC':
        dispatch(reset());
        return
      case "=":
        const result = getPrevResult(input);
        // If result returns false, then it doesn't save anything
        if (result) {
          dispatch(getResult(result));
          dispatch(addToInput(`${input}=${result}`))
        }
        return

      case "*":
      case "/":
      case "+":
      case "-":
        // If last input item was an operator also, then removing it and putting the new one.
        if ('+-*/Xx'.includes(input[input.length - 1])) {
          let newInput = [...input.split('')];
          newInput = newInput.splice(0, newInput.length - 1)
          newInput.push(key);
          console.log(newInput, newInput.join(""))
          dispatch(addToInput(newInput.join("")))
        } else {
          if (input.length) {
            dispatch(addToInput(input + key));
          }
        }
        break

      default:
        dispatch(addToInput(input + key));
        break;
    }
    dispatch(getResult(key))
  }

  return (
    <main>
      <Center flexDir={'column'} id="container" h={"100vh"} bg={'gray.900'}>
        <VStack mb={10}>
          <Heading textColor={"white"}>Javascript Calculator 🧮</Heading>
          <Text textColor={"white"}>A standard calculator...</Text>
        </VStack>
        <Flex border={"10px solid"} borderColor={'black'} gap={2} flexDir={'column'} textColor={'white'} bg={"black"} w={"350px"} id="calculator">
          <Text id="operations" h={'30px'} width={'100%'} textAlign={"right"}>{input}</Text>
          <Text id="results" h={'30px'} width={'100%'} textAlign={"right"} textColor={'orange'} fontSize={'2xl'}>{result}</Text>
          <Grid templateRows={'repeat(5,1fr)'} gap={'3px'} templateColumns={'repeat(4,1fr)'}>
            {calculatorPads.map(({ text, ...styles }) => {
              return <GridItem _active={{ border: '2px solid white' }} onClick={() => handleChange(text)} as={Center} key={text} {...styles}>{text}</GridItem>
            })}
          </Grid>
        </Flex>
      </Center >
    </main >
  )
}
