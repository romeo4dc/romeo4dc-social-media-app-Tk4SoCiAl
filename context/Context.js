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
    const [isUser, setIsUser] = useState(false);    
    const [isFollowed, setIsFollowed] = useState(false)

    
    const Caption = (e) => {
        setTextAreaValue(e.target.value)
    }


    const ClickPost = (e) => {
        setExplorePopUp(true)
        
        if (e.target.tagName === 'IMG') {            
            setExploreSrc(e.target.src)
            setPopUpSrc(true)
        } else if (e.target.tagName === 'VIDEO') {
            setExploreSrc(e.target.src)
            setPopUpSrc(false)
        }
    }


    const autoResize=()=>{
        const textArea = document.querySelector("#postTextArea")
        textArea.style.height="auto";
        textArea.style.height = textArea.scrollHeight + 'px';
    }


    return (
        <SocialContext.Provider value={{ popUp, setPopUp, textAreaValue, ClickPost, explorePopUp, setExplorePopUp, exploreSrc, popUpSrc, Caption, mainBarSrc, setMainBarSrc, setCreateBtn, setStoryPopup, storyPopup, createBtn, autoResize, setPopUpSrc, isUser, setIsUser, isFollowed, setIsFollowed }}>
            {children}
        </SocialContext.Provider>
    )
}