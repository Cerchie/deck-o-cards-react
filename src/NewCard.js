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

    const card = res.data.cards[0].value;
    setDeck(card); 
}

const [seconds, setSeconds] = useState(0);
const timerId = useRef();

 useEffect(()=> {
    let counter = 0;
    timerId.current = setInterval(()=>{
        setSeconds(seconds => seconds + 1)
        newCard()
        counter ++;
        console.log(counter)
        if (counter === 52) {
            throw new Error("no cards remaining!");
          }
    }, 1000)
    return () => {
        clearInterval(timerId.current)
    }
}, []);

const stopTimer = ()=>{
    clearInterval(timerId.current)
}
const startTimer = () => {
  let counter = 0;
  return timerId.current = setInterval(()=>{
    setSeconds(seconds => seconds + 1)
    newCard()
    counter ++;
    console.log(counter)
    if (counter === 52) {
        throw new Error("no cards remaining!");
      }
}, 1000)
}
// const stop = <button onClick={newCard ? stopTimer : newCard}>Stop/Start</button>
const stop =  <button onClick={stopTimer}>Stop Drawing</button>
const start = <button onClick={startTimer}>Start Drawing</button>
    return (
        <div>
            {deck ? <h1> Card {deck}</h1> : <h1>Loading...</h1>}
            {stop}
            {start}
          
        </div>
    )
}

export default NewDeck;