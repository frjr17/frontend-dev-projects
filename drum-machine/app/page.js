'use client'
import { Box, Center, FormControl, FormLabel, Grid, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Switch, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setVolume, toggleBank, togglePower } from "./store";
import dynamic from "next/dynamic";
// I had to import pad dynamically because of the Audio class(it only serves in client side.)
const Pad = dynamic(() => import('./pad'), { ssr: false })

export default function Home() {
  const state = useSelector(state => state.drumReducer)
  const dispatch = useDispatch();

  const setBank = () => {
    dispatch(toggleBank())
  }

  return (
    <Center flexDir={'column'} id="main" bg={'gray.900'} h={'100vh'}>
      <VStack mb={"10"}>
        <Heading textColor={"white"}>Drum Machine 🥁🥁</Heading>
        <Text fontSize={'2xl'} fontStyle={"italic"} textColor={'white'}>Feel the vibe...</Text>
      </VStack>
      <Stack direction={['column', 'row']} rounded={"md"} width={{ base: "90%", md: "70%" }} height={{ base: "fit-content", md: "400px" }} py={{ base: 5, md: 0 }} align={"center"} bg={"gray.700"} justify={'space-around'}>
        <Grid templateRows={'repeat(3,1fr)'} gap={3} templateColumns={'repeat(3,1fr)'}>
          {state.bank.map(bankItem => {
            return <Box key={bankItem.id} cursor={state.power ? 'pointer' : "not-allowed"}>
              <Pad power={state.power} volume={state.volume} audio={bankItem.url} bankItem={bankItem} />
            </Box>
          })}
        </Grid>
        <VStack spacing={5} width={"40%"} id="buttons">
          <FormControl display='flex' alignItems='center'>
            <FormLabel textColor={"white"} htmlFor='email-alerts' mb='0'>
              Power
            </FormLabel>
            <Switch onChange={() => { dispatch(togglePower()) }} isChecked={state.power} id='email-alerts' />
          </FormControl>
          <Box background={"gray"} textColor={"white"} width={'100%'} textAlign={"center"} py={5} fontWeight={'bold'}>{state.selected && state.selected.id}</Box>
          <Slider aria-label='slider-ex-1' value={state.volume} onChange={(value) => dispatch(setVolume(value))}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <FormControl display='flex' alignItems='center'>
            <FormLabel textColor={"white"} htmlFor='email-alerts' mb='0'>
              Bank
            </FormLabel>
            <Switch isChecked={Boolean(state.bankIndex)} onChange={setBank} id='email-alerts' />
          </FormControl>
        </VStack>
      </Stack>
    </Center>

  )
}
