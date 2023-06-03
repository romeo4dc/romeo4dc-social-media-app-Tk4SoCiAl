import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
export const Header = () => {
    const [isPopUp, setIsPopUp] = useState(false)
    const router = useRouter();

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
        
        if(navbar){
        try{
        if (window.pageYOffset >= 70) {
            navbar.style.position = "fixed";
            navbar.style.padding = "1.4em 5em";
            navbar.style.background = "#fff";
            if (container) {
                container.style.paddingTop = "7em";
            }
        } else {
            navbar.style.position = "relative";
            navbar.style.padding = "2em 5em";
            navbar.style.background = "transparent";
            if (container) {
                container.style.paddingTop = "1em";
            }
        }
    }catch(err){
        console.log(err)
    }
}
    }
    useEffect(() => {
        window.addEventListener('click', popUp)
            window.addEventListener('scroll', handleScroll);
    }, [])

    return (
        <nav className="navbar">
            <span>Tk4SoCiAl</span>
            <div className="inputsec">
                <Image src={`/assets/search.svg`} height={20} width={20} alt="" />
                <input type="text" placeholder="Search for creators, inspirations, and projects" />
            </div>
            <div className="login">
                <div className="navsocialicons">
                    <Link href="/">
                        <Image src={`/assets/fb.svg`} height={28} width={28 } alt="randmsmd" />
                    </Link>
                    <Link href="">
                        <Image src={`/assets/twitter.svg`} height={30} width={30} alt="randmsmd" />
                    </Link>
                    <Link href="">
                        <Image src={`/assets/insta.svg`} height={22} width={22} alt="randmsmd" />
                    </Link>
                    <Link href="">
                        <Image src={`/assets/discord.svg`} height={32} width={32} alt="randmsmd" />
                    </Link>
                </div>
                {isPopUp &&
                    <div className="userpopup">
                        <div className="profileuser">
                            <div>
                                <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={60} width={60} alt="" />
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
                            <li>Sign Out</li>
                        </div>
                    </div>}
                <div className="usericon">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={33} width={33} alt="" />
                    <Image src={`/assets/arrow-down.svg`} height={20} width={20} alt="" className="dropdown" onClick={popUp} />
                </div>
            </div>
              <Image src={`assets/notification.svg`}              
                className="headernotification"
                width={25}
                height={25}
                alt="randomIMage"
              />
        </nav>
    )
}