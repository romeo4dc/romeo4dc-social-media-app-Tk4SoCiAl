import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSocial } from '@/context/Context';
export const StoryComp = ({ storyPostsData }) => {
    const [value, setValue] = useState(0);
    const [storySliderAxis, setStorySliderAxis] = useState(35);
    const [counter, setCounter] = useState(0)
    const Context = useSocial();
    const { setStoryPopup } = Context;

    useEffect(()=>{
    document.querySelector('.cross').style.display="block";
    },[])

    const rightArrow = () => {
        value <= storyPostsData.length - 1 ? setValue(value + 1) : setValue(0)
        value <= storyPostsData.length - 1 ? setStorySliderAxis(storySliderAxis - 15.5) : setStorySliderAxis(35)
    }
    const leftArrow = () => {
        value >= 0 ? setValue(value - 1) : setValue(0)
        value >= 0 ? setStorySliderAxis(storySliderAxis + 15.5) : setStorySliderAxis(35);
    }

    return (
        <div className="stories-container">
            <div className="stories-sub-container">
                <div className="slider-wrapper" style={{ transform: `translateX(${storySliderAxis}%)` }}>
                    {storyPostsData &&
                        storyPostsData.map((val, ind) => {
                            return (
                                <React.Fragment key={val.id}>
                                    <div
                                        className={value === ind ? "stories-items story-items-display" : "stories-items"} 
                                        style={{ background: `url(${val.posts})no-repeat center/cover` }} >
                                        <div className="stories-bar">
                                            <div className="bar"></div>
                                            <div className="bar"></div>
                                            <div className="bar"></div>
                                            <div className="bar"></div>
                                        </div>
                                        <div className="storyuserdetails">
                                            <div className="storyuserinfo">
                                                <Image src={`${val.img}`}
                                                    width={33}
                                                    height={33}
                                                    alt="icons"
                                                    style={{ borderRadius: '50%' }} />
                                                <span>{val.name}</span>
                                                <Image src={`/assets/bluetick.svg`}
                                                    width={20}
                                                    height={20}
                                                    alt="icons"
                                                    style={{ borderRadius: '50%' }} />
                                                <span style={{ color: "grey" }}>20 h</span>
                                            </div>
                                            <div className="story-controls">
                                                <Image src={`/assets/pause.svg`}
                                                    width={20}
                                                    height={20}
                                                    alt="icons" />
                                                <Image src={`/assets/speakeroff.svg`}
                                                    width={20}
                                                    height={20}
                                                    alt="icons" />
                                                <Image src={`/assets/more.svg`}
                                                    width={20}
                                                    height={20}
                                                    alt="icons" />
                                            </div>
                                        </div>
                                    </div>



                                    <div className={value === ind ? 
                                        "story-small-items-display" 
                                        : 
                                        "small-stories"} 
                                        style={{ 
                                            background: `url(${val.posts})no-repeat center/cover` 
                                            }} >
                                        <div className="small-posts">
                                            <div className="small-user-info">
                                                <Image src={val.img} width={52} height={52} alt="icons" style={{ borderRadius: '50%' }} />
                                                <span>{val.name}</span>
                                                <span>18 h</span>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                <Image src={`/assets/cross.svg`} 
                width={30} 
                height={30} 
                alt="icons" 
                className="cross storycross" 
                onClick={() => setStoryPopup(false)} />

                <span className="storylogo">Tk4SoCiAl</span>

                <div className="arrows" >
                    <Image src={`/assets/right-arrow.svg`} 
                    width={30} 
                    height={30} 
                    alt="icons" 
                    className="arrow right" 
                    onClick={rightArrow} />

                    <div className="arrow left divleft" onClick={rightArrow}></div>

                    <Image src={`/assets/right-arrow.svg`} 
                    width={30} 
                    height={30} 
                    alt="icons" 
                    className="arrow left" 
                    onClick={leftArrow} />
                    <div className="arrow right divright" onClick={leftArrow}></div>


                </div>
            </div>
        </div>
    )
}