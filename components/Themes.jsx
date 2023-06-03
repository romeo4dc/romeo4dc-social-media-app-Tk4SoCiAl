import Image from "next/image";
import { useState } from "react";
import { useSocial } from "@/context/Context";
import { useFirebase } from "@/firebase/firebase";
export const Themes=({setThemePopUp})=>{
    const context = useSocial();    
    const fb = useFirebase();
    const { setColorSizes, setFontSizes, uplaodBgToFirestore, darkTheme, lightTheme } = fb;
    
    return(
        <>
        <div className="themes-container">  
            <div className="themes-box">
        <Image src={`/assets/cross.svg`} alt="randomImage" width={25} height={25} onClick={()=>setThemePopUp(false)}/>
                <div className="manage">
                    <span>Customize your view</span>    
                    <span>Manage your font size, color and background</span>
                </div>
                <div className="fontsize">
                    <span>Font Size</span>
                    <div className="font-sec">
                       <span style={{fontSize:'.8rem'}}>Aa</span>
                       <div className="font-btns" onClick={setFontSizes}>
                        <span className="font-circles" data-name="1" ></span>
                        <span className="font-circles" data-name="2" ></span>
                        <span className="font-circles font-active" data-name="3" ></span>
                        <span className="font-circles" data-name="4" ></span>
                        <span className="font-circles" data-name="5" ></span>
                       </div>
                       <span style={{WebkitTextStroke:'.7px'}}>Aa</span>
                    </div>
                </div>
                <div className="choose-color">
                    <span>Color</span>
                    <div className="colors-sec" onClick={setColorSizes}>
                        <span className="colors-circle circle-active" data-name="1" style={{background:'linear-gradient(to right, red 0%, #00dbde  51%, blue  100%)'}}></span>
                        <span className="colors-circle" data-name="2" style={{background:'linear-gradient(to right, #007991 0%, #78ffd6  51% )'}}></span>
                        <span className="colors-circle" data-name="3" style={{background:'linear-gradient(to right, #000046 0%, #1CB5E0  51%, #000046  100%)'}}></span>
                        <span className="colors-circle" data-name="4" style={{background:'linear-gradient(to right, #ff00cc 0%, #333399  51%, #ff00cc  100%)'}}></span>
                        <span className="colors-circle" data-name="5" style={{background:'linear-gradient(to right, #8E0E00 0%, #1F1C18  51%, #8E0E00  100%)'}}></span>
                    </div>
                </div>
                <div className="choose-background">
                 <div className="light" onClick={lightTheme}>
                    <span></span>
                    <span>Light</span>
                 </div>
                 <div className="dark" onClick={darkTheme}>
                    <span></span>
                    <span>Dim</span>
                 </div>
                 <label htmlFor="choose-bg">
                 <div className="choose-bg" >
                 <Image src={`/assets/edit.svg`} alt="randomImage" width={25} height={25} />
                    <span></span>
                 </div>
                 </label>
                </div>
            </div>            
        </div>
  <input type="file" id="choose-bg" onChange={uplaodBgToFirestore} style={{visibility:'hidden',pointerEvents:'none'}}/>
        </>
    )
}