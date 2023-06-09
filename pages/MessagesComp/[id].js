import React from 'react'
import {useRouter} from 'next/router';
import Messages from '../MessagesComp/Messages';

const Dynamic = () => {
  
  const {query} = useRouter();

  return (
    <>
    <Messages userId={query.id}/>    
    </>
  )
}

export default Dynamic;
