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

    const delayPara =(index,nextWord)=>{}

    const onSent= async(prompt)=>{
        setResultData("");
        setLoading(true);
        setshowResult(true);
        setrecentPrompt(input);
       const data = await main(input);
  
       setResultData(data);
       setLoading(false);
       setInput("");

    }

    

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