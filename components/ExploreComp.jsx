import React from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import Image from 'next/image';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { query, collection, getDocs, getFirestore, docs, limit, onSnapshot, orderBy } from "firebase/firestore";

const videoFetcher = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: 'v57ka443EQ0G2plWF7DhtsDupxFfYa1vVx0s2A0kAiOvqKrhbhglz2Uf',
            },
        });

        const videoApiData = await response.json();
        return videoApiData;
    } catch (error) {
        console.log(error);
    }
};

const imageFetcher = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: 'v57ka443EQ0G2plWF7DhtsDupxFfYa1vVx0s2A0kAiOvqKrhbhglz2Uf',
            },
        });

        const imageApiData = await response.json();
        return imageApiData;
    } catch (error) {
        console.log(error);
    }
};

export const ExploreComp = () => {
    const [page, setPage] = useState(3);
    const [arrExploreData, setArrExploreData] = useState(null);
    const [speaker, setSpeaker] = useState(true);
    const [reelPlayer, setReelPlayer] = useState(false);
    const [reel, setReel] = useState(0);
    const popUpBox = useSocial();
    const { setPopUp, setExplorePopUp, setPopUpSrc } = popUpBox;
    const fb = useFirebase();
    const { createPostsCollection, userDetails, userData, postTime, shuffleArrayOfObjects, exploreData, GetExploreData } = fb;
    const db = getFirestore();

    useEffect(() => {
        GetExploreData()
        userData()
    }, [page])

    const { data: imageApiData, error: imageError } = useSWR(`https://api.pexels.com/v1/curated?page=${page}&per_page=4`, imageFetcher)

    const { data: videoApiData, error: videoError } = useSWR(`https://api.pexels.com/videos/popular?page=${page}&per_page=4`, videoFetcher)

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1
            >= document.documentElement.scrollHeight
        ) {
            setPage(prev => prev + 3)
        }
    }

    useEffect(() => {
        if (imageApiData && videoApiData) {
            let shuffledData = shuffleArrayOfObjects([...imageApiData.photos, ...videoApiData.videos])
            setArrExploreData(prev => prev ? [...prev, ...shuffledData] : [...shuffledData]);
        }
    }, [imageApiData, videoApiData, page]);

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
                arrExploreData ?
                    arrExploreData.map((val, ind) => {
                        return (
                            <React.Fragment key={val.id + ind}>
                                {val.hasOwnProperty('photographer') && (
                                    <div className="userpost">
                                        <div className="userinfo">
                                            <div>
                                                <img src={val.src.tiny}
                                                    alt=""
                                                    style={{ width: '30px', height: '30px' }} />
                                                <div>
                                                    {<span>{val.photographer}</span>}
                                                    <span> {`Dubai, ${postTime} MINUTES AGO`}</span>
                                                </div>
                                            </div>
                                            <Image
                                                src={`/assets/more.svg`}
                                                width={12}
                                                height={12}
                                                alt="randomImage" />
                                        </div>

                                        <img
                                            className="postimg"
                                            src={val.src.large2x}
                                            alt="randomImage" />

                                        <div className="socialicons">
                                            <div>
                                                <Image
                                                    className="posticons"
                                                    src={`/assets/like.svg`}
                                                    width={22}
                                                    height={22}
                                                    alt="randomImage" />

                                                <Image
                                                    className="posticons"
                                                    src={`/assets/comments.svg`}
                                                    width={22}
                                                    height={22}
                                                    alt="randomImage"
                                                    data-name={val.id}
                                                    onClick={
                                                        (e) => {
                                                            createPostsCollection(e)
                                                            setExplorePopUp(true)
                                                            setPopUpSrc(true)
                                                        }}
                                                    username={val.photographer}
                                                    image={val.src.large2x}
                                                />

                                                <Image
                                                    className="posticons share"
                                                    src={`/assets/share.svg`}
                                                    width={22}
                                                    height={22}
                                                    alt="randomImage"
                                                    style={{ filter: 'invert(1)' }} />
                                            </div>

                                            <Image
                                                src={`/assets/bookmark.svg`}
                                                width={20}
                                                height={20}
                                                alt="randomImage" />
                                        </div>

                                        <div className="likes">
                                            <img
                                                src={`https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                width={13}
                                                height={13}
                                                alt="randomImage" />
                                            <img
                                                src={`https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                width={13}
                                                height={13}
                                                alt="randomImage" />
                                            <img
                                                src={`https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                width={13}
                                                height={13}
                                                alt="randomImage" />

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
                                                <span>Lana Rose&nbsp;</span>{`provided by pexels and owner url is ${val.url}`}
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
                                {val.hasOwnProperty('video_files') && (
                                    <div className="reelspost">
                                        <div className="reelsinfo">
                                            <div className="videocont">
                                                <video
                                                    src={val.video_files[0].link}
                                                    id={`video-${ind}`}
                                                    autoPlay={ind === reel && reelPlayer}
                                                    loop
                                                    onClick={() => {
                                                        setReel(ind)
                                                        reelPlayer ?
                                                            setReelPlayer(false) : setReelPlayer(true)
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
                                                    <img
                                                        src={val.video_pictures[0].picture}
                                                        alt=""
                                                        style={{
                                                            width: '30px',
                                                            height: '30px',
                                                            filter: 'unset'
                                                        }}

                                                    />

                                                    <span>{val.user.name}</span>

                                                    <Image src={`/assets/dot.svg`}
                                                        width={10}
                                                        height={20} alt="randomImage"
                                                        style={{
                                                            transform: 'scale(3)'
                                                        }} />
                                                    <span>Follow</span>
                                                </div>
                                                <div className="caption">
                                                    <span style={{
                                                        fontSize: '.86rem',
                                                        letterSpacing: '.3px'
                                                    }}>{`creator url is ${val.url}`}
                                                    </span>
                                                    <span style={{ color: 'rgb(141 141 141)' }}> ...more</span>
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
                                                                alt="randomImage"
                                                                data-name={val.id}
                                                                username={val.user.name}
                                                                image={val.video_files[0].link}
                                                                vidtiny={val.video_pictures[0].picture}
                                                                onClick={
                                                                    (e) => {
                                                                        createPostsCollection(e)
                                                                        setExplorePopUp(true)
                                                                        setPopUpSrc(false)
                                                                    }} />
                                                            <span>899</span>
                                                        </div>

                                                        <div className="reels share" >
                                                            <Image
                                                                src={`/assets/share.svg`}
                                                                width={28}
                                                                height={28}
                                                                alt="randomImage" />
                                                        </div>

                                                        <div className="reels bookmark" >
                                                            <Image
                                                                src={`/assets/bookmark.svg`}
                                                                width={30}
                                                                height={30}
                                                                alt="randomImage" />
                                                        </div>

                                                        <div className="reels more" >
                                                            <Image
                                                                src={`/assets/more.svg`}
                                                                width={18}
                                                                height={18}
                                                                alt="randomImage" />
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
                                                    <Image
                                                        src={`/assets/music.svg`}
                                                        width={10}
                                                        height={20}
                                                        alt="randomImage" />
                                                    <div className="musiccontainer">
                                                        <span>asas dasdasda <Image src={`/assets/dot.svg`}
                                                            width={10}
                                                            height={20}
                                                            alt="randomImage" style={{ transform: 'scale(1.2)' }} /> adasdasd</span>
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
                                            <div className={ind === reel && reelPlayer ?
                                                "play pause-reel" : "play play-reel"}>
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
                    }
                    )
                    :
                    <div className="loading-container"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <img
                            src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"
                            alt="randomImage"
                            style={{
                                height: "200px",
                                width: "200px",
                                filter: "hue-rotate(45deg) drop-shadow(0px 0px .5px black"
                            }} />
                    </div>
            }

                    <img 
                    src={`https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp`} 
                    height={100} 
                    width={100} 
                    alt="daasd" 
                    style={{
                        filter: 'hue-rotate(45deg) drop-shadow(2px -1px 6px black)', 
                        margin:'0 auto'}}/>
        </>
    )
}

