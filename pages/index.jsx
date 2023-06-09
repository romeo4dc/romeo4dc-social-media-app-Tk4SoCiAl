import { Header } from "@/components/Header";
import { LeftBar } from "@/components/LeftBar";
import { MainBar } from "@/components/MainBar";
import { RightBar } from "@/components/RightBar";
import { Post } from "@/components/Post";
import '@/styles/Home.module.css'
import { useSocial } from "../context/Context"
import { useFirebase } from "@/firebase/firebase";
import { useEffect, useLayoutEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const Index = () => {
   const context = useSocial();
   const { popUp, setCreateBtn } = context;
   const fb = useFirebase();
   const { getGradientData, gradientBackground, getFontsSizeData, getBackgroundImage, getThemesData, getCommentsData } = fb;

   const auth = getAuth();
   const router = useRouter();

   useLayoutEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((user)=>{
          user  ? router.push("/") : router.push("Login")
        })
        return () => {
          unsubscribe();
        };
  },[])

   useEffect(() => {      
      getGradientData()
      getFontsSizeData()
      getBackgroundImage()
      getThemesData()
      getCommentsData()
      setCreateBtn(true)
   }, [])

   return (
      <>
         {auth.currentUser ?
            <>
               {popUp && <Post />}
               <Header />
               <div className="container" >
                  <LeftBar />
                  <MainBar />
                  <RightBar />
               </div>
            </>
            :
            <div className="loading-home">
               <img src="/assets/tk4.svg" alt="" />
            </div>
         }
      </>
   )
}
export default Index;