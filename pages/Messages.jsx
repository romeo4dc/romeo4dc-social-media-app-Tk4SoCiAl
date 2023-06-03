import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useFirebase } from '@/firebase/firebase';
import { useEffect, useState } from "react";
import { getAuth } from 'firebase/auth';
import { useDatabase } from "@/firebase/activeUsers/users";

const Messages = () => {
    const [value, setValue] = useState(null);
    const [isInpValue, setIsInpValue] = useState(true);

    const auth = getAuth();
    const AllUsers = useDatabase();
    const fb = useFirebase();
    const router = useRouter();

    const { getActiveUsers, activeUsersTracker, activeUsersData } = AllUsers;
    const { signInWithGoogle, getCurrentUser, MessageUser, isMessageUser, sendMessage, getChatsData, messages, msg, setMsg } = fb;

    useEffect(() => {
        getCurrentUser();
        getChatsData()
        activeUsersTracker();
        getActiveUsers();
    }, [])

    return (
        <div className="inbox">
            <div className="messages-container">
                <span style={{ paddingLeft: '.8em' }} >
                    <Image style={{ filter: 'invert(1)', cursor: 'pointer' }} src={`/assets/arrow-left.svg`} height={20} width={20} alt="dsfdf" onClick={() => router.push("/")} /> Messages</span>
                <div className="messages">
                    {
                        activeUsersData &&
                        activeUsersData.map((users, ind) => {
                            const { photoURL, displayName, uid, id } = users;
                            return (

                                uid !== auth.currentUser.uid &&

                                <div className={ind === value ? "messages-users message-active" : "messages-users"} onClick={(e) => {
                                    setValue(ind)
                                    MessageUser(e)
                                }} key={id}>
                                    <Image src={`https://res.cloudinary.com/demo/image/fetch/${photoURL}`} width={40} height={40} alt="ramdss" />
                                    <div>
                                        <span data-name={uid}>{displayName}</span>
                                        <span>shared a story</span>
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
                            <Image src={`assets/arrow-left.svg`} 
                            className="message-arrow"
                            width={50} 
                            height={50} 
                            alt="dfsd" 
                            style={{ filter: 'invert(1)' }}
                            onClick={()=>router.push("/")}
                             />

                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/16271139/pexels-photo-16271139/free-photo-of-people-woman-girl-pet.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`} 
                            width={50} 
                            height={50} 
                            alt="dfsd"                                 
                            />
                            <span>username</span>
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
                        <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/16271139/pexels-photo-16271139/free-photo-of-people-woman-girl-pet.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`}
                            width={120}
                            height={120}
                            alt="sdsdasd" />
                        <span>username user</span>
                        <span
                            style={{
                                fontSize: '1rem',
                                color: "rgb(168,168,168)"
                            }}>usernickname -
                            <span
                                style={{
                                    fontSize: '1rem',
                                    color: "rgb(168,168,168)"
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
                                                        <Image src={`https://res.cloudinary.com/demo/image/fetch/${photoURL}`} width={40} height={40} alt="ramdss" />
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
                            <Image src={`/assets/smiley.svg`} 
                            height={33} 
                            width={33} 
                            alt="randomImage" 
                            onClick={signInWithGoogle}
                             />

                            <input type="text" value={msg} onChange={(e) => {
                                setMsg(e.target.value)
                                e.target.value.length > 0 ? setIsInpValue(false) : setIsInpValue(true)
                            }} placeholder="Message..." />

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
        </div>

    )
}
export default Messages;