import { useState } from "react"
import  {auth } from "@/firebase/firebase";
import {useFirebase} from "@/firebase/firebase";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
export const SendMessage=()=>{
    
    const db = getFirestore();
    const fb = useFirebase();
    const { sendMessage, setMsg, msg } = fb;
    return(
        <div>
                <input type="text" value={msg} onChange={(e)=>{
                    setMsg(e.target.value)
                }} placeholder="Enter Chat"/>
                <button onClick={sendMessage}>Send</button>
        </div>
    )
}
