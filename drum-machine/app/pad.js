'use client';
import { Center, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelected } from "./store";

export default function Pad(props) {
    // Extracting props
    let { bankItem, audio, volume, power } = props;

    // Getting state dispatch
    const dispatch = useDispatch();

    // Setting active for coloring
    const [active, setActive] = useState(false);

    // Converting audio into an Audio class, with its functionality.
    audio = new Audio(audio)
    audio.volume = volume / 100

    /**Function that listens if the pad pressed is this to play the sound. */
    const onKeyDown = (event) => {
        if (power) {
            // Checking if the key pressed was this.
            if (event.key.toUpperCase() === bankItem.keyTrigger) {
                dispatch(setSelected(bankItem))
                setActive(true)
                audio.currentTime = 0;
                audio.play()
            }

            // Reviewing if it's an html event handler. In that case, inhabiliting handle automatically
            if (!event.isTrusted) {
                setTimeout(() => setActive(false), 150)
            }
        }
    }

    /**Function that deactivates the active state when user stops clicking.*/
    const onKeyUp = (event) => {
        if (event.key.toUpperCase() === bankItem.keyTrigger) {
            setActive(false)
        }
    }

    // In this case, the useEffect function serves to initialized and remove the eventListeners of the pads.
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.addEventListener('keyup', onKeyUp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio])

    return <GridItem textColor={"white"} fontWeight={'bold'} onClick={() => onKeyDown({ key: bankItem.keyTrigger })} cursor={"pointer"} h={20} w={20} as={Center} background={active ? 'yellow.500' : 'gray'} rounded={'md'}>
        {bankItem.keyTrigger}
    </GridItem>
}