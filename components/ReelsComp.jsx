import React, { useLayoutEffect } from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getFirestore, onSnapshot, collection, orderBy, query, limit } from "firebase/firestore";

export const ReelsComp = () => {
    const [page, setPage] = useState(3);
    const [videosData, setVideosData] = useState();
    const [speaker, setSpeaker] = useState(true);
    const [reelPlayer, setReelPlayer] = useState(true);
    const [reel, setReel] = useState();
    const [isLike, setIsLike] = useState(false)
    const popUpBox = useSocial();
    const { setPopUp, setExplorePopUp, setPopUpSrc } = popUpBox;
    const fb = useFirebase();
    const { userDetails, userData, createPostsCollection, bookMark, removeReelSavedItems, postReelsItems } = fb;

    useEffect(() => {
        setPopUpSrc(false)
        GetMyReelsData()
        userData();
    }, [page])

    const GetMyReelsData = () => {
        const db = getFirestore();
        const imagePost = onSnapshot(
            query(collection(db, 'videos'), orderBy("id", "desc"), limit(page)),
            (snapshot) => {
                const pData = [];
                snapshot.forEach((data) => {
                    pData.push(data.data())
                })
                setVideosData(pData)
            }
        );
        return () => imagePost();
    }

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1
            >= document.documentElement.scrollHeight
        ) {
            setPage(prev => prev + 3)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const Reaction = (e) => {

        if (e.target.classList.contains('reels-likes')) {
            e.target.src = "/assets/red-heart.svg";
            e.target.style.filter = "unset";
            e.target.classList.remove('reels-likes')
            e.target.classList.add('reels-dislike')
        }
        else if (e.target.classList.contains('reels-dislike')) {
            e.target.src = "/assets/like.svg";
            e.target.style.filter = "invert(1)";
            e.target.classList.remove('reels-dislike')
            e.target.classList.add('reels-likes')
        }
    }

    return (
        <>
            {
                videosData ?
                    videosData.map((val, ind) => {
                        return (
                            <React.Fragment key={val.id}>
                                {val.category === 'videos' && (
                                    <div className="reelspost" key={val.id}>
                                        <div className="reelsinfo">
                                            <div className="videocont">
                                                <video src={val.file} id={`video-${ind}`} className="reelsvideo" autoPlay={ind === reel && reelPlayer} loop onClick={() => {
                                                    setReel(ind)
                                                    reelPlayer ? setReelPlayer(false) : setReelPlayer(true)
                                                    ind === reel && reelPlayer ?
                                                        document.getElementById(`video-${ind}`).play()
                                                        :
                                                        document.querySelectorAll('video').forEach((vide) => vide.pause())
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
                                                    <img src={userDetails && userDetails.userimg}
                                                        alt=""
                                                        style={{
                                                            width: '30px',
                                                            height: '30px',
                                                            filter: 'unset'
                                                        }} />
                                                    <span>{userDetails && userDetails.username}</span>

                                                    <Image
                                                        src={`assets/dot.svg`}
                                                        width={10}
                                                        height={20}
                                                        alt="randomImage" style={{
                                                            transform: 'scale(3)'
                                                        }} />
                                                    <span>Follow</span>
                                                </div>
                                                <div className="caption">
                                                    <span style={{
                                                        fontSize: '.9rem',
                                                        letterSpacing: '.3px'
                                                    }}>{val.caption}</span><span style={{ color: 'rgb(141 141 141)' }}> ...more</span>
                                                    <div className="reaction" onClick={Reaction}>
                                                        <div className="reels like">
                                                            <Image
                                                                src={`/assets/like.svg`}
                                                                width={28}
                                                                height={28}
                                                                alt="randomImage"
                                                                className='reels-likes' />
                                                            <span>300k</span>
                                                        </div>

                                                        <div className="reels comment" >
                                                            <Image
                                                                src={`/assets/comments.svg`}
                                                                width={28}
                                                                height={28}
                                                                alt="randomImage" onClick={
                                                                    (e) => {
                                                                        createPostsCollection(e)
                                                                        setExplorePopUp(true)
                                                                    }} image={val.file} />
                                                            <span>899</span>
                                                        </div>

                                                        <div className="reels share" >
                                                            <Image src={`/assets/share.svg`} width={28} height={28} alt="randomImage" />
                                                        </div>

                                                        <div className="reels bookmark" >
                                                            {bookMark ?
                                                                <Image
                                                                    alt="randomImage"
                                                                    src={`/assets/fillbookmark.svg`}
                                                                    height={27}
                                                                    width={27}
                                                                    onClick={removeReelSavedItems} />
                                                                :
                                                                <Image
                                                                    alt="randomImage"
                                                                    src={`/assets/bookmark.svg`}
                                                                    height={27}
                                                                    width={27}
                                                                    onClick={postReelsItems} />}
                                                        </div>

                                                        <div className="reels more" >
                                                            <Image src={`/assets/more.svg`} width={18} height={18} alt="randomImage" />
                                                        </div>

                                                        <div className="reels song-img" >
                                                            <Image
                                                                src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                                width={22}
                                                                height={22}
                                                                alt="randomImage" />
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
                                                            height={20}
                                                            alt="randomImage"
                                                            style={{ transform: 'scale(1.2)' }} /> adasdasd</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="buttons">
                                                {
                                                    speaker ?
                                                        (<Image
                                                            src={`/assets/speakeron.svg`}
                                                            width={18}
                                                            height={18}
                                                            alt="randomImage"
                                                            style={{ transform: 'scale(2)' }}
                                                            onClick={() => setSpeaker(false)} />)
                                                        :
                                                        (<Image
                                                            src={`/assets/speakeroff.svg`}
                                                            width={18}
                                                            height={18}
                                                            alt="randomImage"
                                                            style={{ transform: 'scale(2)' }}
                                                            onClick={() => setSpeaker(true)} />)
                                                }
                                            </div>
                                            <div className={ind === reel && reelPlayer ? "play pause-reel" : "play play-reel"}>
                                                <Image
                                                    src={`/assets/play.svg`}
                                                    width={22}
                                                    height={22}
                                                    alt="randomImage"
                                                    onClick={() => {
                                                        setReelPlayer(false)
                                                        ind === reel && reelPlayer ?
                                                            document.getElementById(`video-${ind}`).play()
                                                            :
                                                            document.querySelectorAll('video').forEach((vide) => vide.pause())
                                                    }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </React.Fragment>
                        )
                    })
                    :
                    <div className="loading-container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        filter: 'hue-rotate(45deg) drop-shadow(2px -1px 6px black)'
                    }}>
                        <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="randomImage" style={{
                            height: "200px",
                            width: "200px"
                        }} />
                    </div>
            }

            <Image 
            src={`https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp`} 
            height={100} 
            width={100} 
            alt="daasd" 
            style={{
                filter: 'hue-rotate(45deg) drop-shadow(2px -1px 6px black)', 
                margin:'0 auto'}}/>
        </>
    )
}

