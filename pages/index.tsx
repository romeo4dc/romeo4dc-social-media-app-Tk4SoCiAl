import { Header } from "@/components/Header";
import { LeftBar } from "@/components/LeftBar";
import { MainBar } from "@/components/MainBar";
import { RightBar } from "@/components/RightBar";
import { Post } from "@/components/Post";
import '@/styles/Home.module.css'
import { useSocial } from "../context/Context"
import { useEffect } from "react";
import { useFirebase } from "@/firebase/firebase";
const Index= ()=>{
   const popUpBox = useSocial();
   const { popUp } = popUpBox;
   const fb = useFirebase();

   return(
      <>
    {popUp && <Post/>}
    <Header/>
    <div className="container">
    <LeftBar/>
    <MainBar/>
    <RightBar/>
    </div>
    </>
   )
}
export default Index;