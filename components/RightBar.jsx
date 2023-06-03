import Image from "next/image";
import { rightBar } from "@/data";
import { useEffect, useState } from "react";
import { useFirebase } from '@/firebase/firebase';
import { useDatabase } from "@/firebase/activeUsers/users";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
export const RightBar = () => {
    const [value, setValue] = useState(0);
    const fb = useFirebase();
    const auth = getAuth();
    const router = useRouter();
    const { lastMessage, getChatsData } = fb;
    const AllUsers = useDatabase();
    const { getActiveUsers, activeUsersTracker, activeUsersData } = AllUsers;

    useEffect(()=>{
        getActiveUsers();
        getChatsData();
    }, [])
    
   

  return (
    <>
    <div className='rightbar'>
    <div className="top">
    <span style={{
        color:"#808080",
        fontWeight:'600',
        padding:'0em .5em'
        }}>Messages</span>
      <div className="searchsec">
        <Image src={`assets/search.svg`} height={15} width={15} alt="" />
        <input type="text" placeholder="Search messages" />
      </div>
      <div className="categories">
      <div className="category">
      { rightBar.map((val, ind)=>{
        return(
          <li className={value === ind ? "rightbarliactive" : undefined} onClick={()=>setValue(ind)} key={ind}>{val}</li>
        )
      })
      }
        </div>
        <div className="users" onClick={()=>router.push('/Messages')}>
        {
            activeUsersData &&
            activeUsersData.map((users,ind)=>{
                const { photoURL, displayName, uid, id } = users;
                return(
                    uid !== auth.currentUser.uid &&
                    <div className="user" key={ind}> 
                <Image src={`https://res.cloudinary.com/demo/image/fetch/${photoURL}`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>{displayName}</span>
                    <span>{lastMessage.text}</span>
                </div>
            </div>
                )
            })
        }
        </div>
      </div>
      </div>
      <span style={{fontWeight:'600', color:'#808080', marginLeft:'.5em'}}>Requests</span>
      <div className="requests">
        <div className="req">
            <div className="user">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Chantel Msiza</span>
                    <span>Birthday Tomorrow!</span>
                </div>
            </div>
            <div className="choice">
                <button>Accept</button>
                <button>Cancel</button>
            </div>
        </div>
        <div className="req">
            <div className="user">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Chantel Msiza</span>
                    <span>Birthday Tomorrow!</span>
                </div>
            </div>
            <div className="choice">
                <button>Accept</button>
                <button>Cancel</button>
            </div>
        </div>
        <div className="req">
            <div className="user">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Chantel Msiza</span>
                    <span>Birthday Tomorrow!</span>
                </div>
            </div>
            <div className="choice">
                <button>Accept</button>
                <button>Cancel</button>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}