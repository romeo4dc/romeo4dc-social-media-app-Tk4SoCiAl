import { Header } from "@/components/Header";
import { LeftBar } from "@/components/LeftBar";
import { MainBar } from "@/components/MainBar";
import { RightBar } from "@/components/RightBar";
import { Post } from "@/components/Post";
import '@/styles/Home.module.css'
import { useSocial } from "../context/Context"
import { useFirebase } from "@/firebase/firebase";
import { useEffect, useState } from "react";

const Index= ()=>{
   const context = useSocial();
   const { popUp, setCreateBtn } = context;
   const fb = useFirebase();
   const { getGradientData, gradientBackground, getFontsSizeData, getBackgroundImage, getThemesData, getCommentsData} = fb;

   useEffect(()=>{
      getGradientData() 
      getFontsSizeData()
      getBackgroundImage()
      getThemesData()
      getCommentsData()
      setCreateBtn(true)      
   },[])

   return(
      <>
    {popUp && <Post/>}
    <Header/>
    <div className="container" >
    <LeftBar/>
    <MainBar/>
    <RightBar/>
    </div>
    </>
   )
}
export default Index;