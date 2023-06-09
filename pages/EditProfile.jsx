import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { useSocial } from '@/context/Context';
import { LeftBar } from '@/components/Leftbar';
import { useFirebase } from '@/firebase/firebase';
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
const auth = getAuth();

const EditProfile=()=>{
    const Context = useSocial();
    const {isUser, setIsUser} = Context;
    const router = useRouter();
    const fb = useFirebase();
    const { nickNameValue,textAreaValue, userData,  textArea, textAreaCounter, setNickName, nickNameCounter, updateUserDetails, getBackgroundImage, userDetails, getGradientData, getFontsSizeData, getThemesData } = fb;

    useLayoutEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            user  ? setIsUser(true) : router.push("Login")
          })
          return () => {
            unsubscribe();
          };
    },[])

    useEffect(()=>{
        userData();
        getGradientData()
        getBackgroundImage();
        getFontsSizeData()
        getThemesData()
    },[]) 

    const Check=()=>{
        let checkbox = document.querySelector('.checkbox img');
        let btn = document.querySelector('.submit-btn');
        if(checkbox.style.filter === "blur(4px)"){
        checkbox.style.filter="contrast(0)";
        btn.style.cursor='pointer';
        btn.style.background='#0095f6';
        btn.style.pointerEvents='all';
    }else{
        checkbox.style.filter = "blur(4px)";
        btn.style.cursor='not-allowed';
        btn.style.background='#004d7f';
        btn.style.pointerEvents='none';
        }
    }
    return(
        <>
    { isUser && <div className="edit-profile-container">
        <nav>
            <Image 
                src={`/assets/arrow-left.svg`}
                height={23}
                width={23}
                onClick={()=>router.push("/")}
                alt="eruowebrew"
            />

            <span>Edit Profile</span>
        </nav>
        <LeftBar/>
        <div className="edit-profile-wrapper">

            <h2>Edit Profile</h2>
          {  <div className="edit-section" >
                <div className="edit-user-img">   
                { userDetails ?              
                <img src={userDetails.userimg} alt="" /> 
                :
                <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="" /> }
                <div>
                    <span>{userDetails && userDetails.username}</span>
                    <span>Change profile photo</span>
                </div>                            
                </div>
                <div className="edit-user-nickname">
                    <span>Name</span>
                    <input 
                    type="text" 
                    maxLength={8} 
                    placeholder="Enter Your Nickname" 
                    value={nickNameValue} 
                    onChange={setNickName}/>
                    <span className="counter"><span>{nickNameCounter}</span>/<span>8</span></span>
                </div>
                <div className="edit-user-bio">
                    <span>Bio</span>
                    <textarea  
                    maxLength={150} 
                    required 
                    onChange={textArea} 
                    placeholder="Enter Your Bio" 
                    value={textAreaValue}>

                    </textarea>
                    <span className="counter"><span>{textAreaCounter}</span>/<span>150</span></span>
                </div>
                <div className="edit-user-gender">
                    <span>Gender</span>
                    <div>
                    <select>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Custom</option>
                    </select>
                    </div>

                </div>
                <div className="edit-user-tos">
                    <span>Terms <br/>and<br/> services</span>
                    <div>
                        <div className="checkbox">
                        <Image 
                        src={`/assets/tick.svg`} 
                        alt="user" 
                        width={12} 
                        height={12} 
                        onClick={Check}/>
                         </div>
                        <span>You are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.</span>
                    </div>
                </div>
                <button onClick={updateUserDetails} className="submit-btn">Submit</button>
            </div>}
        </div>
        </div> }
        
        </>
    )
}
export default EditProfile;