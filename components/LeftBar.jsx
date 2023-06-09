import Image from 'next/image';
import React from 'react';
import { category } from '../data';
import { useEffect, useState } from 'react';
import { useSocial } from '@/context/Context';
import { Themes } from "@/components/Themes";
import { Notifications } from "@/components/Notifications";
import { Router, useRouter } from 'next/router';
import { useFirebase } from '@/firebase/firebase';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export const LeftBar = () => {
  const [data, setData] = useState(category)
  const [value, setValue] = useState(0)
  const [themePopUp, setThemePopUp] = useState(false);
  const popUpBox = useSocial();
  const fb = useFirebase();
  const router = useRouter();  
  const { userDetails, userData } = fb;
  const { setPopUp, createBtn } = popUpBox;

  useEffect(()=>{
    userData();
  },[])

  const notificationBar=(e)=>{
    if(e.target.textContent === 'Notifications'){
      document.querySelector('.notif-wrapper').style.marginLeft="0%";
    }
  }
  const notificationBtn=()=>{
    document.querySelector('.notif-wrapper').style.marginLeft='-30%';
  }
  const routerFunc = (e) =>{
    if(e.target.textContent === 'Explore'){
        router.push("/ExploreContent/Explore");
    }
    else if(e.target.textContent === 'Home'){
      router.push("/");
    }
    else if(e.target.textContent === 'Theme'){
    setThemePopUp(true);
  }
  else if(e.target.textContent === 'Messages'){
    router.push("/MessagesComp/Messages");
  }
  else if(e.target.textContent === 'Settings'){
    router.push("UserProfile");
  }
  else if(e.target.textContent === 'Create'){
    setPopUp(true)
  }
  else if(e.target.textContent === 'Reels'){
    router.push("Reels")
  }
  }
  return (
    <>
    <Notifications notificationBtn={notificationBtn}/>
    <div className="leftbarcontainer" onClick={notificationBar}>
      <div className="leftbaruser">
      { auth.currentUser ? 
      userDetails && 
        ( 
        <img src={userDetails.userimg} alt="randomImage" 
        width={43} 
        height={43}   
        style={{cursor:'pointer'}}
        onClick={()=>router.push("/")}                     
        /> 
        ) : (
          <Image src={`https://res.cloudinary.com/demo/image/fetch/https://cdn-icons-png.flaticon.com/512/149/149071.png`}
        alt="randomImage" 
        width={43} 
        height={43}       
        style={{cursor:'pointer'}}
        onClick={()=>router.push("/")}                 
        />
        )
        }

        <Image src={`/assets/tk4.svg`} alt="randomImage" 
        width={35} 
        height={35}
        style={{cursor:'pointer'}}
        onClick={()=>router.push("/")}                
        />

       { auth.currentUser ? 
        userDetails &&  ( 
        <img src={userDetails.userimg} alt="randomImage" 
        width={43} 
        height={43}        
        onClick={()=>router.push("/")}
        /> 
        ) : (
          <Image src={`https://res.cloudinary.com/demo/image/fetch/https://cdn-icons-png.flaticon.com/512/149/149071.png`} 
        alt="randomImage" 
        width={43} 
        height={43}        
        style={{cursor:'pointer'}}
        onClick={()=>router.push("/")}
        />
        )
        }

        <div>
          { userDetails &&
          <>
          {auth.currentUser ? 
          <span>{auth.currentUser.displayName}</span> : <span>User</span>}
          <span>{`@${userDetails.username}`}</span>
          </>
          }
        </div>
      </div>
      <div className="leftbarmenu" onClick={routerFunc}>
        {
          data.map((val, ind) => {
            return (
              
              <li 
              key={ind} 
              onClick={()=> setValue(ind)} 
              className={value === ind ? "active": undefined}>
              <Image src={`${val.img}`}
              alt="randomImage"
              width={22} 
              height={22} />
              <span>{val.name}</span>
              </li>
            )
          })
        }
              <li className='mobouserimg' onClick={()=>router.push("UserProfile")}>
              <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" 
              width={30} 
              height={30}
              />
              </li>
      </div>
     { createBtn && 
      <button className='createpost'  onClick={()=>setPopUp(true)}>Create Post</button>
      }
    </div>
    {themePopUp && <Themes setThemePopUp={setThemePopUp}/>}
    </>
  )
}

