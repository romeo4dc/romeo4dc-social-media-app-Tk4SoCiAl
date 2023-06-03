import React from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export const ExploreComp = () => {
    const [data, setData] = useState();
    const [speaker, setSpeaker] = useState(true);
    const [reelPlayer, setReelPlayer] = useState(false);
    const [reel, setReel] = useState(0);
    const popUpBox = useSocial();
    const { setPopUp } = popUpBox;
    const fb = useFirebase();
    const { exploreData } = fb;
    return (
        <>
            {
                exploreData ?
                    exploreData.map((val, ind) => {
                        return (
                            <React.Fragment key={val.id}>
                                {val.category === 'posts' && (
                                    <div className="userpost" >
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
                                        {
                                            val.file ?
                                                <img className="postimg" src={val.file} alt="randomImage" />
                                                :
                                                <div style = {{ 
                                                    height: '400px', 
                                                    width: '570px', 
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center' 
                                                    }}>
                                                    <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="randomImage" style={{ height: "200px", width: "200px" }} />
                                                </div>
                                        }

                                        <div className="socialicons">
                                            <div>
                                                <Image className="posticons" src={`assets/like.svg`} width={22} height={22} alt="randomImage" />
                                                <Image className="posticons" src={`assets/comments.svg`} width={22} height={22} alt="randomImage" />
                                                <Image className="posticons share" src={`/assets/share.svg`} width={22} height={22} alt="randomImage" style={{ filter: 'invert(1)'}} />
                                            </div>
                                            <Image src={`assets/bookmark.svg`} width={20} height={20} alt="randomImage" />
                                        </div>
                                        <div className="likes">
                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={13} height={13} alt="randomImage" />
                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={13} height={13} alt="randomImage" />
                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={13} height={13} alt="randomImage" />

                                            <span style={{ marginLeft: '.5em' }}>
                                                <span>Liked by</span>
                                                <span style={{
                                                    color: '#000000',
                                                    padding: '.3em'
                                                }}>Ernest Achiever</span> and
                                                <span style={{ color: '#000000' }}> 2,323 others</span>
                                            </span>
                                            <br />
                                            <span className='postcolor'>
                                                <span>Lana Rose &nbsp;</span>{val.caption}
                                            </span>
                                            <br />
                                            <span style={{
                                                color: '#A8A8A8',
                                                fontSize: '.85rem'
                                            }}>View all 277 comments
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {val.category === 'videos' && (
                                    <div className="reelspost">
                                        <div className="reelsinfo">
                                            <div className="videocont">
                                                <video src={val.file} id={`video-${ind}`} autoPlay={ind === reel && reelPlayer} loop onClick={() => {
                                                    setReel(ind)
                                                    reelPlayer ? setReelPlayer(false) : setReelPlayer(true)
                                                    ind === reel && reelPlayer ? document.getElementById(`video-${ind}`).play() : document.querySelectorAll('video').forEach((vide) => vide.pause())
                                                }
                                                }
                                                />
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
                                                        height={32} alt="randomImage"
                                                        style={{ filter: 'unset' }} />

                                                    <span>Neymarjrrr</span>
                                                    
                                                    <Image src={`assets/dot.svg`}
                                                        width={10}
                                                        height={20} alt="randomImage"
                                                        style={{
                                                            transform: 'scale(3)'
                                                        }} />
                                                    <span>Follow</span>
                                                </div>
                                                <div className="caption">
                                                    <span style={{
                                                        fontSize: '.9rem',
                                                        letterSpacing: '.3px'
                                                    }}>{val.caption}
                                                    </span>
                                                    <span style={{ color: 'rgb(141 141 141)' }}> ...more</span>
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
                                            <div className={ind === reel && reelPlayer ? "play pause-reel" : "play play-reel"}>
                                                <Image src={`assets/play.svg`} width={22} height={22} alt="randomImage" onClick={() => {
                                                    setReelPlayer(false)
                                                    ind === reel && reelPlayer ? document.getElementById(`video-${ind}`).play() : document.querySelectorAll('video').forEach((vide) => vide.pause())
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </React.Fragment>
                        )
                    })
                    :
                    <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="randomImage" style={{ height: "200px", width: "200px", filter: "hue-rotate(45deg) drop-shadow(0px 0px .5px black" }} />
                    </div>
            }
        </>
    )
}

