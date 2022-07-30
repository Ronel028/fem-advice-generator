import React, { useState, useEffect } from "react";

import patternDivider from "../assets/pattern-divider-desktop.svg"
import dice from "../assets/icon-dice.svg"

function Advice(){


    const [advice, setAdvice] = useState({
        id: "",
        advice: ""
    })
    const [loading, setLoading] = useState(false)

    async function fetchingAdvice(){
        setLoading(true)
        const adviceSlip = await fetch("https://api.adviceslip.com/advice")
        const response = await adviceSlip.json();
        const { id, advice } = response.slip
        setAdvice(function(prev){
            return {
                id: id,
                advice: advice
            }
        })
        setLoading(false)
    }
    
    useEffect(function(){
        fetchingAdvice()
    }, [])

    function handleClick(){
        fetchingAdvice()
    }

    let loadingDice = loading ? "spin-image" : ""

    return (
        <main className="advice--card">
            <div className="advice--content">
                <h4>ADVICE #{advice.id}</h4>
                <h1>
                    <q>
                        {advice.advice}
                    </q>
                </h1>
                
                <div className="pattern">
                    {/* <img src={patternDivider} alt="pattern divider" /> */}
                </div>
                <button className="generate--button" onClick={handleClick}>
                    <img className={loadingDice} src={dice} alt="Dice" />
                </button>
            </div>
        </main>
    )
}

export default Advice;