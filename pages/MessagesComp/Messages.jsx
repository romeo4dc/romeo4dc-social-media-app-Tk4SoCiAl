import Image from "next/image";
import React, { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { CldImage } from 'next-cloudinary';
import { useFirebase } from '@/firebase/firebase';
import { useEffect, useState } from "react";
import { useSocial } from '@/context/Context';
import { getAuth } from 'firebase/auth';
import { useDatabase } from "@/firebase/activeUsers/users";
import { child, get, getDatabase, ref } from "firebase/database";
const auth = getAuth();


const Messages = ({ userId }) => {
    const [value, setValue] = useState(null);
    const [isInpValue, setIsInpValue] = useState(true);
    const [displayName, setDisplayName] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const Context = useSocial();
    const {isUser, setIsUser} = Context;
    // const [getUserDetails, setUserGetDetails] = useState(null);

    useLayoutEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{            
            if(user){
                setIsUser(true)
            }else{                
                router.push("/Login")
            }
          })
          return () => {
            unsubscribe();
          };
    },[])

    const db = getDatabase();
    const AllUsers = useDatabase();
    const fb = useFirebase();
    const router = useRouter();

    const { getActiveUsers, activeUsersTracker, activeUsersData } = AllUsers;
    const { signInWithGoogle, getCurrentUser, MessageUser, isMessageUser, sendMessage, getChatsData, messages, msg, setMsg, userData, userDetails, getGradientData, getFontsSizeData, getBackgroundImage, getThemesData } = fb;


    const getAllUserDetails = async () => {
        const db = getDatabase();
        const activeUsersRef = ref(db, 'activeUsers');
        const userRef = child(activeUsersRef, `${userId}`);
        const snapshot = await get(userRef);

        try {
            if (snapshot.exists()) {
                const { displayName, photoURL } = snapshot.val();
                setDisplayName(displayName);
                setPhotoURL(photoURL)
            } else {
                console.log("User not found");
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        auth.currentUser && getAllUserDetails()
        getGradientData()
        getFontsSizeData()
        getBackgroundImage()
        getThemesData()
    }, [userId])

    useEffect(() => {
        getCurrentUser();
        getActiveUsers();
        if(auth.currentUser){
        activeUsersTracker();
        getChatsData();
        userData();
    }
    }, [])

    return (
        <>
        {isUser && <div className="inbox">
            <div className="messages-container">
                <span style={{ paddingLeft: '.8em' }} >
                    <Image style={{ 
                        filter: 'invert(1)', 
                        cursor: 'pointer' 
                        }} 
                        src={`/assets/arrow-left.svg`} 
                        height={20} 
                        width={20} 
                        alt="dsfdf" 
                        onClick={() => router.push("/")} /> Messages</span>
                <div className="messages">
                    {
                        activeUsersData &&
                        activeUsersData.map((users, ind) => {
                            const { photoURL, displayName, uid, id } = users;
                            return (

                                uid !== auth.currentUser.uid && auth.currentUser.displayName &&
                                <div className={ind === value ? "messages-users message-active" : "messages-users"} onClick={(e) => {
                                    router.push(`/MessagesComp/${uid}`)
                                    setValue(ind)
                                    MessageUser(e)
                                    getAllUserDetails()
                                }} key={id}>
                                    <img 
                                    src={`${photoURL}`} 
                                    alt="ramdss" />
                                    <div>
                                        <span data-name={uid}>{displayName}</span>
                                        <span></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="message-box">
                <div className="message-box-wrapper">
                    <div className="message-box-header">
                        <div className="messanger">
                            <Image src={`/assets/arrow-left.svg`}
                                className="message-arrow"
                                width={50}
                                height={50}
                                alt="dfsd"
                                style={{ filter: 'invert(1)' }}
                                onClick={() => router.push("/")}
                            />

                            {photoURL ?
                                (
                                    <img src={`${photoURL}`}
                                        width={50}
                                        height={50}
                                        alt="dfsd"
                                    />
                                ) : (
                                    <img src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                                        width={50}
                                        height={50}
                                        alt="dfsd"
                                    />
                                )
                            }

                            {
                                displayName ?
                                    <span>{displayName}</span>
                                    :
                                    <span>userNickName</span>
                            }
                        </div>

                        <div className="messanger icons">
                            <Image src={`/assets/phone.svg`}
                                height={28}
                                width={28}
                                style={{ filter: 'invert(1)' }}
                                alt="randomImage" />

                            <Image src={`/assets/nvideo.svg`}
                                height={28}
                                width={28}
                                style={{ filter: 'invert(1)' }}
                                alt="randomImage" />

                            <Image src={`/assets/info.svg`}
                                height={30}
                                width={30}
                                style={{ filter: 'invert(1)' }}
                                alt="randomImage" />
                        </div>

                    </div>
                    {!isMessageUser &&
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1em'
                        }}>

                            <Image src={`/assets/chat.svg`}
                                height={120}
                                width={120}
                                alt="randomImage"
                                style={{ filter: 'invert(1)' }} />
                            <span
                                style={{
                                    color: '#fff',
                                    fontSize: '1.5rem'
                                }}>Your Messages
                            </span>
                        </div>}
                    {isMessageUser && <div className="centeruser">
                        {photoURL ?
                            (
                                <img src={`${photoURL}`}
                                    width={50}
                                    height={50}
                                    alt="dfsd"
                                />
                            ) : (
                                <img src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                                    width={50}
                                    height={50}
                                    alt="dfsd"
                                />
                            )
                        }
                        {
                            displayName ?
                                <span>{displayName}</span>
                                :
                                <span>user</span>
                        }
                        <span
                            style={{
                                fontSize: '1rem',
                                color: "rgb(122 121 121)"
                            }}>{userDetails && `@${userDetails.username}`} -&nbsp;
                            <span
                                style={{
                                    fontSize: '1rem',
                                    color: "rgb(122 121 121)"
                                }}>Tk4SoCiAl</span>
                        </span>
                        <button>View Profile</button>
                    </div>}
                </div>

                {isMessageUser &&
                    <>
                        <div className="conversation">
                            {
                                messages &&
                                messages.map((msg) => {
                                    const { id, text, photoURL, uid, date } = msg;
                                    {/* console.log(msg) */ }
                                    return (
                                        <React.Fragment key={id}>
                                            <div className={`message-${uid == auth.currentUser.uid ? 'receiver' : 'sender'}`} key={id}>
                                                <aside>
                                                    <br />
                                                    {
                                                        uid !== auth.currentUser.uid &&
                                                        <img 
                                                        src={`${photoURL}`} 
                                                        width={40} 
                                                        height={40} 
                                                        alt="ramdss" />
                                                    }

                                                    {
                                                        uid === auth.currentUser.uid ? (
                                                            <>
                                                                <span className="message-time">{date}</span>
                                                                <span>{text}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>{text}</span>
                                                                <span className="message-time">{date}</span>
                                                            </>)
                                                    }

                                                </aside>
                                            </div>

                                        </React.Fragment>
                                    )
                                })
                            }



                        </div>

                        <div className="message-input">
                            <Image src={`/assets/msmiley.svg`}
                                height={33}
                                width={33}
                                alt="randomImage"
                                onClick={signInWithGoogle}
                            />

                            <input type="text" value={msg} onChange={(e) => {
                                setMsg(e.target.value)
                                e.target.value.length > 0 ? setIsInpValue(false) : setIsInpValue(true)
                            }} 
                            placeholder="Message..."  
                            onKeyUp={(e)=> e.key ==='Enter' && sendMessage(e)}
                            />
                            {isInpValue ? <div className="chat-options">

                                <Image src={`/assets/gallery.svg`} height={30} width={30} alt="randomImage" />
                                <Image src={`/assets/like.svg`} height={30} width={30} alt="randomImage" />
                            </div>
                                :
                                <span onClick={sendMessage}>Send</span>
                            }
                        </div>
                    </>
                }
            </div>
        </div>}
        </>

    )
}
export default Messages;