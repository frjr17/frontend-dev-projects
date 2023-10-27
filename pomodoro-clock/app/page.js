'use client';
// Import necessary components and icons from Chakra UI, React, and Redux
import { ArrowDownIcon, ArrowUpIcon, RepeatIcon } from "@chakra-ui/icons";
import { Center, HStack, Heading, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { breakLengthDown, breakLengthUp, run, stop as stopR, sessionLengthDown, sessionLengthUp, setTime, reset } from "./store";

// Define the main component
export default function Home() {
  // Get state values from the Redux store using useSelector
  const { breakLength, sessionLength, time, running, interval } = useSelector(state => state.time)

  // Initialize the Redux dispatch function
  const dispatch = useDispatch()

  // Create a Date object from the time
  let timeString = new Date(time)

  // Function to stop the timer
  const stop = () => {
    dispatch(stopR())
  }

  // Function to update the timer value based on the interval
  const intervalFunc = (oldTime) => () => {
    const newTime = oldTime.getTime() + (time) - new Date().getTime();
    dispatch(setTime(newTime))
    if (newTime < 0) {
      stop();
    }
  }

  // Function to start the timer
  const start = () => {
    if (!running) {
      const interval = setInterval(intervalFunc(new Date()), 1000)
      dispatch(run(interval))
    }
  }

  // Render the component
  return (
    <main>
      {/* Centered column layout */}
      <Center flexDir={'column'} gap={10} bg={"gray.900"} textColor={'white'} h={"100vh"}>
        {/* Header */}
        <Heading fontSize={"5xl"}>25+5 Clock</Heading>

        {/* Input controls for Break Length and Session Length */}
        <HStack spacing={'60px'}>
          <VStack fontSize={"xl"}>
            <Text>Break Length</Text>
            <HStack spacing={5}>
              <ArrowDownIcon onClick={() => dispatch(breakLengthDown())} color={"gray.900"} borderRadius={"50%"} background={'white'} boxSize={8} />
              <Text fontWeight={'bold'}>{breakLength}</Text>
              <ArrowUpIcon onClick={() => dispatch(breakLengthUp())} color={"gray.900"} borderRadius={"50%"} background={'white'} boxSize={8} />
            </HStack>
          </VStack>
          <VStack fontSize={"xl"}>
            <Text>Session Length</Text>
            <HStack spacing={5}>
              <ArrowDownIcon onClick={() => dispatch(sessionLengthDown())} color={"gray.900"} borderRadius={"50%"} background={'white'} boxSize={8} />
              <Text fontWeight={'bold'}>{sessionLength}</Text>
              <ArrowUpIcon onClick={() => dispatch(sessionLengthUp())} color={"gray.900"} borderRadius={"50%"} background={'white'} boxSize={8} />
            </HStack>
          </VStack>
        </HStack>

        {/* Clock display */}
        <Center borderRadius={"lg"} flexDir={'column'} border={'5px solid'} padding={5} width={"400px"}>
          <Heading>Session</Heading>
          <Text fontSize={"6xl"}>{`${timeString.getMinutes()}`.length === 1 ? `0${timeString.getMinutes()}` : timeString.getMinutes()}:{`${timeString.getSeconds()}`.length === 1 ? `0${timeString.getSeconds()}` : timeString.getSeconds()}</Text>
        </Center>

        {/* Control buttons */}
        <HStack spacing={10}>
          <Icon as={AiFillPlayCircle} boxSize={10} onClick={start} />
          <Icon as={AiFillPauseCircle} boxSize={10} onClick={stop} />
          <RepeatIcon color={"gray.900"} onClick={() => dispatch(reset())} borderRadius={"50%"} background={'white'} boxSize={8} />
        </HStack>

        {/* Footer (if applicable) */}
        <Text>By <Link href={"https://github.com/frjr17"}>frjr17</Link></Text>
      </Center>
    </main>
  )
}
