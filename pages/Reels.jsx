import React from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import { ReelsComp } from '@/components/ReelsComp'
import { ReelsApiComp } from '@/components/ReelsApiComp';
import { Header } from '@/components/Header'
import { LeftBar } from '@/components/LeftBar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const Reels = () => {
  const fb = useFirebase();
  const { getGradientData, gradientBackground, getFontsSizeData, getBackgroundImage, getThemesData, getCommentsData , GetVideosData} = fb;
  const popUpBox = useSocial();
  const { setBtn } = popUpBox;
  useEffect(()=>{
    GetVideosData()
    getGradientData() 
    getFontsSizeData()
    getBackgroundImage()
    getThemesData()
    getCommentsData()

    window.onscroll=()=>{
      if(window.pageYOffset >= 70){
          document.querySelector(".navbar").style.position="fixed";
          document.querySelector(".navbar").style.padding="1.4em 5em";
          document.querySelector(".navbar").style.background="#fff";
          if(document.querySelector('.reels-container')){
            document.querySelector('.reels-container').style.paddingTop="6em";
      }
      }
      else{
          document.querySelector(".navbar").style.position="relative";
          document.querySelector(".navbar").style.padding="2em 5em";
          document.querySelector(".navbar").style.background="transparent";
          if(document.querySelector('.reels-container')){
            document.querySelector('.reels-container').style.paddingTop="2em";
          }
          
      }
  }
  },[])
  return (
    <>
    <Header/>
    <div className="reels-container" >
    <div className="reels-sub-container">
    <ReelsApiComp/>
    </div>
    <LeftBar/>
    </div>
    </>
  )
}
export default Reels;