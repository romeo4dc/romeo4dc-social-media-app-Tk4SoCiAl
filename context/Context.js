import { createContext, useContext, useState } from 'react';
const SocialContext = createContext(null);
export const useSocial = () => useContext(SocialContext);
export const SocialProvider = ({ children }) => {
    const [popUp, setPopUp] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState();
    const [explorePopUp, setExplorePopUp] = useState(false);
    const [exploreSrc, setExploreSrc] = useState(null);
    const [popUpSrc, setPopUpSrc] = useState(false);
    const [mainBarSrc, setMainBarSrc] = useState(false);
    const [btn, setBtn] = useState(true);

    const Caption=(e)=>{
        setTextAreaValue(e.target.value)
    }

    
    const ClickPost = (e) => {
        setExplorePopUp(true)
        if(e.target.tagName === 'IMG'){            
            setExploreSrc(e.target.src) 
            setPopUpSrc(true)
            console.log('yes')
        }else if(e.target.tagName === 'VIDEO'){
            setExploreSrc(e.target.src)
            setPopUpSrc(false)
            console.log('no')
        }
    }


    return (
        <SocialContext.Provider value={{ popUp, setPopUp, textAreaValue, ClickPost, explorePopUp, setExplorePopUp, exploreSrc, popUpSrc, Caption, mainBarSrc, setMainBarSrc, setBtn }}>
            {children}
        </SocialContext.Provider>
    )
}