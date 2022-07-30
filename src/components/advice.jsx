import React, { useState, useEffect } from "react";

import patternDivider from "../assets/pattern-divider-desktop.svg"
import dice from "../assets/icon-dice.svg"

function Advice(){


    const [advice, setAdvice] = useState({
        id: "",
        advice: ""
    })

    console.log("rendered")

    function fetchingAdvice(){
        fetch("https://api.adviceslip.com/advice")
        .then(response => {
            return response.json()
        }).then(data =>{
            const { id, advice } = data.slip
            setAdvice(function(prev){
                return {
                    id: id,
                    advice: advice
                }
            })
        }).catch(error =>{
            console.log(error)
        })
    }
    
    useEffect(function(){
        fetchingAdvice()
    }, [])

    function handleClick(){
        fetchingAdvice()
    }

    return (
        <main className="advice--card">
           <div className="advice--content">
                <h4>ADVICE #{advice.id}</h4>
                <h1>
                    <q>
                        {advice.advice}
                    </q>
                </h1>
                <div>
                    <img src={patternDivider} alt="pattern divider" />
                </div>
                <button className="generate--button" onClick={handleClick}><img src={dice} alt="Dice" /></button>
           </div>
        </main>
    )
}

export default Advice;