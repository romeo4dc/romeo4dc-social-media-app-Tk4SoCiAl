import React from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, onSnapshot, collection, orderBy, query, limit } from "firebase/firestore";

export const PostsComp = () => {
    const [page, setPage] = useState(3);
    const [postsData, setPostsData] = useState();
    const popUpBox = useSocial();
    const router = useRouter();
    const { setPopUp, explorePopUp, setExplorePopUp, setPopUpSrc } = popUpBox;
    const fb = useFirebase();
    const { createPostsCollection, userDetails, userData, postTime, bookMark, postSavedItems, removePostSavedItems } = fb;

    useEffect(() => {
        GetMyPostsData();
        userData();
        setPopUpSrc(true);
    }, [page])

    const GetMyPostsData = () => {
        const db = getFirestore();
        const imagePost = onSnapshot(
            query(collection(db, 'posts'), orderBy("id", "desc"), limit(page)),
            (snapshot) => {
                const pData = [];
                snapshot.forEach((data) => {
                    pData.push(data.data())
                })
                setPostsData(pData)
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

    const postLoader = () => {
        document.querySelectorAll('.postloading').forEach((val) => {
            val.style.display = "none";
        })
    }

    return (
        <>
            {
                postsData ?
                    postsData.map((val, ind) => {
                        return (
                            <React.Fragment key={val.id}>
                                {val.category === 'posts' && (
                                    <div className="userpost" key={val.id}>
                                        <div className="userinfo">
                                            <div>
                                                <img src={userDetails.userimg} alt="" style={{ width: '30px', height: '30px' }} />
                                                <div>
                                                    <span>{userDetails.username}</span>
                                                    <span> {`Dubai, ${postTime} MINUTES AGO`}</span>
                                                </div>
                                            </div>
                                            <Image src={`/assets/more.svg`} width={12} height={12} alt="randomImage" />
                                        </div>
                                        <img className="postloading" src="https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="randomImage" style={{ transform: 'scale(.5)', filter: 'hue-rotate(45deg) drop-shadow(2px -1px 10px #00000094)' }} />

                                        <img className="postimg" src={val.file} alt="randomImage" onLoad={postLoader} />
                                        <div className="socialicons">
                                            <div>
                                                <Image className='posticons' src={`/assets/like.svg`} width={22} height={22} alt="randomImage" />
                                                <Image className='posticons' src={`/assets/comments.svg`} width={22} height={22} alt="randomImage" data-name={val.id} onClick={
                                                    (e) => {
                                                        createPostsCollection(e)
                                                        setExplorePopUp(true)
                                                    }} image={val.file} username={userDetails.username}/>
                                                <Image className='posticons share' src={`/assets/share.svg`} width={22} height={22} alt="randomImage" style={{ filter: 'invert(1)' }} />
                                            </div>
                                            {bookMark ? <Image alt="randomImage" src={`/assets/fillbookmark.svg`} height={27} width={27} onClick={removePostSavedItems} />
                                                :
                                                <Image alt="randomImage" src={`/assets/bookmark.svg`} height={27} width={27} onClick={postSavedItems} />}
                                        </div>
                                        <div className="likes">
                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                width={13}
                                                height={13}
                                                alt="randomImage" />

                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                width={13}
                                                height={13}
                                                alt="randomImage" />

                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                width={13}
                                                height={13} alt="randomImage" />

                                            <span style={{ marginLeft: '.5em' }}>
                                                <span>Liked by</span>
                                                <span> Ernest Achiever</span> and
                                                &nbsp;<span>2,323 others</span>
                                            </span>
                                            <br />
                                            <span className='postcolor'>
                                                <span>Lana Rose &nbsp;</span>{val.caption}
                                            </span>
                                            <br />
                                            <span style={{
                                                color: '#A8A8A8',
                                                fontSize: '.85rem'
                                            }}>View all 277 comments</span>
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
            <div className="loading-cards">
                <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="" />
            </div>
        </>
    )
}

