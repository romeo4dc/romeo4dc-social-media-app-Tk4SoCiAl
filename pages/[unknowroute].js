import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect } from 'react'
const auth = getAuth();
const Random = () => {
    const router = useRouter();
    useLayoutEffect(()=>{
      router.push("/") 
    },[])
  return (
    <>      
    </>
  )
}

export default Random;
