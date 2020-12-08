import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'

const NewDeck = () =>{
    const [deck, setDeck] = useState(null)
const [data, setData] = useState(null);
const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
useEffect(()=> {
    
    async function loadCard(){
        const res = await axios.get(url);
        console.log(res.data.cards[0].value)
        
        const card = res.data.cards[0].value;

        setDeck(card)
    } loadCard();
}, [setData])

async function newCard() {
   
    const res = await axios.get(url);
    if (res.data.remaining === 0) {
        throw new Error("no cards remaining!");
      }
    const card = res.data.cards[0].value;
    setDeck(card);
}

const [seconds, setSeconds] = useState(0);
const timerId = useRef();

useEffect(()=> {
    timerId.current = setInterval(()=>{
        setSeconds(seconds => seconds + 1)
        newCard()
    }, 1000)
    return () => {
        clearInterval(timerId.current)
    }
}, []);

const stopTimer = ()=>{
    clearInterval(timerId.current)
}

const stop = <button onClick={stopTimer}>Stop Drawing</button>
const start =  <button onClick={newCard}>Start Drawing</button>
    return (
        <div>
            {deck ? <h1> Card {deck}</h1> : <h1>Loading...</h1>}
            {stop ? stop : start}
        </div>
    )
}

export default NewDeck;