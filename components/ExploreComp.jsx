import React from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export const ExploreComp = () => {
    const [data, setData] = useState();
    const [speaker, setSpeaker] = useState(true);
    const [reelPlayer, setReelPlayer] = useState(false);
    const popUpBox = useSocial();
    const { setPopUp } = popUpBox;
    const fb = useFirebase();
    const { GetPostsData, postsData, mixData, GetMixData, mainBarSrc, exploreData, GetExploreData, docSize } = fb;
  return (
    <>
         {  
        exploreData &&
        exploreData.map((val,ind)=>{ 
            return(    
                <React.Fragment key={val.id}>
                {val.category === 'posts' && (
                    <div className="userpost" key={val.id}>
                <div className="userinfo">
                <div>
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={30} height={30} alt="randomImage" />
                    <div>
                        <span>Lono Rose</span>
                        <span> Dubai, 15 MINUTES AGO</span>
                    </div>
                    </div>
                    <Image src={`assets/more.svg`} width={12} height={12} alt="randomImage" />
                </div>
                <img className="postimg" src={val.file} alt="randomImage" />
 
                <div className="socialicons">
                    <div>
                        <Image src={`assets/like.svg`} width={15} height={15} alt="randomImage" />
                        <Image src={`assets/comments.svg`} width={15} height={15} alt="randomImage" />
                        <Image src={`/assets/share.svg`} width={15} height={15} alt="randomImage" style={{filter:'invert(1)'}}/>
                    </div>
                    <Image src={`assets/bookmark.svg`} width={20} height={20} alt="randomImage" />
                </div>
                <div className="likes">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={13} height={13} alt="randomImage" />
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={13} height={13} alt="randomImage" />
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={13} height={13} alt="randomImage" />
                    <span style={{marginLeft:'.5em'}}><span>Liked by</span><span style={{ color: '#000000', padding:'.3em' }}>Ernest Achiever</span>and <span style={{ color: '#000000'}}>2,323 others</span></span><br />
                    <span><span style={{ color: '#000000'}}>Lana Rose &nbsp;</span>{val.caption}</span><br />
                    <span style={{color:'#A8A8A8', fontSize:'.85rem'}}>View all 277 comments</span>
                </div>
            </div>
                )}
                {val.category === 'videos' && (
                                <div className="reelspost" key={val.id}>
            <div className="reelsinfo">
            <div className="videocont">
                <video src={val.file} autoPlay loop muted onClick={() => reelPlayer ? setReelPlayer(false) : setReelPlayer(true)}></video>
                </div>
                <div className="reelsdescription">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.8em',
                        cursor: 'pointer'
                    }}>
                        <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                            width={32}
                            height={32} alt="randomImage" style={{ filter: 'unset' }} />
                        <span>Neymarjrrr</span>
                        <Image src={`assets/dot.svg`} width={10} height={20} alt="randomImage" style={{
                            transform: 'scale(3)'
                        }} />
                        <span>Follow</span>
                    </div>
                    <div className="caption">
                        <span style={{
                            fontSize: '.9rem',
                            letterSpacing: '.3px'
                        }}>{val.caption}</span><span style={{ color: 'rgb(141 141 141)' }}> ...more</span>
                    </div>
                    <div className="music">
                        <Image src={`assets/music.svg`}
                            width={10}
                            height={20} alt="randomImage" />
                        <div className="musiccontainer">
                            <span>asas dasdasda <Image src={`assets/dot.svg`}
                                width={10}
                                height={20} alt="randomImage" style={{ transform: 'scale(1.2)' }} /> adasdasd</span>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    {
                        speaker ?
                            (<Image src={`assets/speakeron.svg`} width={18} height={18} alt="randomImage" style={{ transform: 'scale(2)' }} onClick={() => setSpeaker(false)} />)
                            :
                            (<Image src={`assets/speakeroff.svg`} width={18} height={18} alt="randomImage" style={{ transform: 'scale(2)' }} onClick={() => setSpeaker(true)} />)
                    }
                </div>
                <div className={reelPlayer ? "play play-reel" : "play pause-reel"}>
                    <Image src={`assets/play.svg`} width={22} height={22} alt="randomImage" onClick={() => setReelPlayer(true)} />
                </div>
            </div>
        </div>
                )}

            </React.Fragment>
            )
        })
    } 
    </>
  )
}

