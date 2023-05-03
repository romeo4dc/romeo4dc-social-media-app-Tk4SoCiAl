import React from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import { ReelsComp } from '@/components/ReelsComp'
import { LeftBar } from '@/components/LeftBar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const Reels = () => {
  const fb = useFirebase();
  const { GetVideosData } = fb;
  const popUpBox = useSocial();
  const { setBtn } = popUpBox;
  useEffect(()=>{
    GetVideosData()
    setBtn(false)
  },[])
  return (
    <>
    <div className="reels-container">
    <div className="reels-sub-container">
    <ReelsComp/>
    </div>
    <LeftBar/>
    </div>
    </>
  )
}
export default Reels;