import { getAuth, signOut } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useFirebase } from "@/firebase/firebase"
const auth = getAuth();

export const Header = ({ exploreData }) => {
    const [isPopUp, setIsPopUp] = useState(false)
    const [inpVal, setInpVal] = useState("");
    const [searchResults, setSearchResults] = useState(null);

    const router = useRouter();
    const fb = useFirebase();

    const popUp = (e) => {
        if (e.target.classList.contains('dropdown')) {
            setIsPopUp(true)
        } else {
            setIsPopUp(false)
        }
    }
    const handleScroll = () => {
        let navbar = document.querySelector(".navbar");
        let container = document.querySelector(".container");
        if (navbar) {
            try {
                if (window.pageYOffset >= 70) {
                    navbar.style.position = "fixed";
                    navbar.style.padding = ".8em 5em";
                    if (container) {
                        container.style.paddingTop = "7em";
                    }
                } else {
                    navbar.style.position = "relative";
                    navbar.style.padding = "1em 5em";
                    if (container) {
                        container.style.paddingTop = "1em";
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
    }


    const fetchData = (value) => {
        if (exploreData) {
            const results = exploreData.filter((user) => {
                if (value && user && user.photographer) {
                    return user.photographer.toLowerCase().includes(value)
                }
                else if (value && user && user.user.name) {
                    return user.user.name.toLowerCase().includes(value)
                }
            });
            setSearchResults(results)
        }
    };
    const handleChange = (value) => {
        setInpVal(value)
        fetchData(value)
    }

    useEffect(() => {
        window.addEventListener('click', popUp)
        window.addEventListener('scroll', handleScroll);
    }, [])

    return (
        <>
            <div className="navbar">
                <span>Tk4SoCiAl</span>
                <div className="inputsec">
                    <Image src={`/assets/search.svg`} height={20} width={20} alt="" />
                    <input type="text" placeholder="Search for creators, inspirations, and projects" onChange={(e) => handleChange(e.target.value)} />
                </div>
                <div className="login">
                    <div className="navsocialicons">
                        <Link href="https://www.facebook.com/profile.php?id=100022499271787" target="_blank">
                            <Image src={`/assets/fb.svg`} height={28} width={28} alt="randmsmd" />
                        </Link>
                        <Link href="https://twitter.com/KumarTusha52403" target="_blank">
                            <Image src={`/assets/twitter.svg`} height={30} width={30} alt="randmsmd" />
                        </Link>
                        <Link href="https://www.instagram.com/tk3tushar/" target="_blank">
                            <Image src={`/assets/insta.svg`} height={22} width={22} alt="randmsmd" />
                        </Link>
                        <Link href="https://discord.com/channels/@me" target="_blank">
                            <Image src={`/assets/discord.svg`} height={32} width={32} alt="randmsmd" />
                        </Link>
                    </div>
                    {isPopUp &&
                        <div className="userpopup">
                            <div className="profileuser">
                                <div>
                                    <img src={`https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={60} width={60} alt="" />
                                    <div>
                                        <span>tushar kumar</span>
                                        <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                                    </div>
                                </div>
                                <button onClick={() => router.push("UserProfile")}>View Profile</button>
                            </div>
                            <div className="manageuser">
                                <li>Help</li>
                                <li onClick={() => router.push("EditProfile")}>Edit Profile</li>
                                <li onClick={() => {
                                    signOut(auth)
                                    router.push("/Login")
                                }}>Sign Out</li>
                            </div>
                        </div>}
                    <div className="usericon">
                        {auth.currentUser ?
                            (
                                <img src={auth.currentUser.photoURL} height={33} width={33} alt="" />
                            ) : (
                                <img src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`} height={33} width={33} alt="" />
                            )
                        }
                        <Image src={`/assets/arrow-down.svg`} height={20} width={20} alt="" className="dropdown" onClick={popUp} />
                    </div>
                </div>
                <Image src={`/assets/notification.svg`}
                    className="headernotification"
                    width={25}
                    height={25}
                    alt="randomIMage"
                    onClick={() => document.querySelector('.notif-wrapper').style.transform = 'translateX(0px)'}
                />
                <div className="searchresults">
                    {
                        exploreData && searchResults && searchResults.map((media) => {
                            return (
                                <>
                                    {media.hasOwnProperty('photographer') && (
                                        <li
                                            data-name={media.id}
                                            username={media.photographer}
                                            image={media.src.tiny}
                                            key={media.id}
                                        >{media.photographer}</li>
                                    )}
                                    {media.hasOwnProperty('video_files') && (
                                        <li
                                            data-name={media.id}
                                            username={media.user.name}
                                            image={media.video_pictures[0].picture}
                                            key={media.id}
                                        >{media.user.name}</li>
                                    )}
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}