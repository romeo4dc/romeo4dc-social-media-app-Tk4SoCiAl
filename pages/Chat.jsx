import React, { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, onSnapshot, getFirestore } from "firebase/firestore";
import { SendMessage } from "@/components/SendMessage";
import {getAuth} from "firebase/auth";
import {useFirebase} from "@/firebase/firebase";
const Chat = () => {
  const auth = getAuth();
const db = getFirestore();
const fb = useFirebase();
const { getChatsData, messages } = fb;
useEffect(()=>{
    getChatsData()
    console.log(messages)
},[])
  return (
    <>
    <div>
      { messages &&
        messages.map((val)=>{
          console.log(val)
          const {id, text, photoURL, uid, createdAt} = val;
          return(
          <div key={id} className={uid == auth.currentUser.uid ? 'send' : 'receiver'}>
            <img src={photoURL} alt="" />
            <p>{text}</p>
            <p>{createdAt}</p>
          </div>
          )
        })
      }
    </div>
    <SendMessage/>
    </>
  )
}

export default Chat
