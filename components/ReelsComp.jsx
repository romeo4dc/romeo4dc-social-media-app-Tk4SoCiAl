import React from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export const ReelsComp = () => {
    const [speaker, setSpeaker] = useState(true);
    const [reelPlayer, setReelPlayer] = useState(false);
    const [margin, setMargin] = useState(true);
    const popUpBox = useSocial();
    const { setPopUp } = popUpBox;
    const fb = useFirebase();
    const { videoData } = fb;
  return (
    <>
         {  
        videoData &&
        videoData.map((val,ind)=>{ 
            return(    
                <React.Fragment key={val.id}>
                {val.category === 'videos' && (
            <div className="reelspost" key={val.id}>
            <div className="reelsinfo">
            <div className="videocont">
                <video src={val.file} autoPlay loop muted onClick={() => reelPlayer ? setReelPlayer(false) : setReelPlayer(true)} onMouseEnter={()=>setMargin(false)}
                onMouseLeave={()=>setMargin(true)}
                >
                </video>
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
                                    <div className="reaction" onMouseEnter={()=>setMargin(false)}>
                <div className="reels like" style={{marginRight:margin ? '-60px' : '0px'}}>
                     <Image src={`assets/like.svg`} width={28} height={28} alt="randomImage"  />
                     <span>300k</span>
                </div>

                <div className="reels comment" style={{marginRight:margin ? '-60px' : '0px'}}>
                     <Image src={`assets/comments.svg`} width={28} height={28} alt="randomImage"  />
                     <span>899</span>
                </div>

                <div className="reels share" style={{filter:'invert(1)',marginRight:margin ? '-60px' : '0px'}}>
                     <Image src={`assets/share.svg`} width={28} height={28} alt="randomImage"  />
                </div>

                <div className="reels bookmark" style={{marginRight:margin ? '-60px' : '0px'}}>
                     <Image src={`assets/bookmark.svg`} width={30} height={30} alt="randomImage"  />
                </div>

                <div className="reels more" style={{marginRight:margin ? '-60px' : '0px'}}>
                     <Image src={`assets/more.svg`} width={18} height={18} alt="randomImage"  />
                </div>

                <div className="reels song-img" style={{marginRight:margin ? '-60px' : '0px'}}>
                     <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={22} height={22} alt="randomImage"  />
                </div>

            </div>
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

