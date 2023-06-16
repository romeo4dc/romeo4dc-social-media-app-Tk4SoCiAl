import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';

const SocialContext = createContext(null);
export const useSocial = () => useContext(SocialContext);
export const SocialProvider = ({ children }) => {
    const [popUp, setPopUp] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState(" ");
    const [explorePopUp, setExplorePopUp] = useState(false);
    const [exploreSrc, setExploreSrc] = useState(null);
    const [popUpSrc, setPopUpSrc] = useState(false);
    const [mainBarSrc, setMainBarSrc] = useState(false);
    const [createBtn, setCreateBtn] = useState(false);
    const [storyPopup, setStoryPopup] = useState(false)
    const [username, setUserName] = useState(null);
    const [videoImage, setVideoImage] = useState(null);
    const [isUser, setIsUser] = useState(false);    
    const [isFollowed, setIsFollowed] = useState(false)
    const router = useRouter();
    
    const Caption = (e) => {
        setTextAreaValue(e.target.value)
    }

    
    const ClickPost = (e) => {
        if (e.target.tagName === 'IMG') {            
            setExplorePopUp(true)        
            setExploreSrc(e.target.src)
            setPopUpSrc(true)
        } else if (e.target.tagName === 'VIDEO') {
            setExplorePopUp(true)        
            setExploreSrc(e.target.src)
            setVideoImage(e.target.getAttribute('image'))
            setPopUpSrc(false)
        }
    }

    const MoboClickPost=(e)=>{
        router.push("/MoboExplore")
        if (e.target.tagName === 'IMG') {            
            setExploreSrc(e.target.getAttribute('image'))
            setUserName(e.target.getAttribute('username'))
            setPopUpSrc(true)
        } else if (e.target.tagName === 'VIDEO') {
            setExploreSrc(e.target.src)
            setVideoImage(e.target.getAttribute('image'))
            setPopUpSrc(false)
        }
    }


    const autoResize=()=>{
        const textArea = document.querySelector("#postTextArea")
        textArea.style.height="auto";
        textArea.style.height = textArea.scrollHeight + 'px';
    }


    return (
        <SocialContext.Provider value={{ popUp, setPopUp, textAreaValue, ClickPost, explorePopUp, setExplorePopUp, exploreSrc, popUpSrc, Caption, mainBarSrc, setMainBarSrc, setCreateBtn, setStoryPopup, storyPopup, createBtn, autoResize, setPopUpSrc, isUser, setIsUser, isFollowed, setIsFollowed, MoboClickPost, username, videoImage }}>
            {children}
        </SocialContext.Provider>
    )
}