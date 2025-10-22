import React, { createContext, useState } from 'react'
import main from '../config/gemini';

export const Context = createContext();

const ContextProvider =(props)=>{

    const [input, setInput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompts, setprevPrompts] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara =(index,nextWord)=>{
        setTimeout(() => {
            setResultData(prev=>prev+nextWord)
            
        }, 75*index);
    }

  
    const onSent= async(prompt)=>{
        setResultData("");
        setLoading(true);
        setshowResult(true);

        try {
           
             let response;
            if (prompt !== undefined) {
                response = await main(prompt);
                setrecentPrompt(prompt);
                // only add if not already in history
                setprevPrompts(prev => prev.includes(prompt) ? prev : [...prev, prompt]);
            } else {
                setprevPrompts(prev => prev.includes(input) ? prev : [...prev, input]);
                setrecentPrompt(input);
                response = await main(input);
            }
            if (!response) {
              setResultData("");
              return;
            }

            const responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
              if (i % 2 === 1) {
                newResponse += "<b>" + responseArray[i] + "</b>";
              } else {
                newResponse += responseArray[i];
              }
            }

            const newResponse2 = newResponse.split("*").join("<br/>");

            const newResopnseArray = newResponse2.split(" ");
            for (let i = 0; i < newResopnseArray.length; i++) {
              const nextWord = newResopnseArray[i];
              delayPara(i, nextWord + " ");
            }
        } catch (err) {
            console.error("onSent error:", err);
            setResultData("Service unavailable. Please try again later.");
        } finally {
            setLoading(false);
            setInput("");
        }
    }
// ...existing code...

    

    const contextValue ={
       input,
       setInput,
       recentPrompt,
       setrecentPrompt,
       prevPrompts,
       setprevPrompts,
       showResult,
       setshowResult,
       loading,
       resultData,
       onSent

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;