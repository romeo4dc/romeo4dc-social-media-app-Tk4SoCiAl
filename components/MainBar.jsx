import React, { useRef } from 'react';
import useSWR from 'swr';
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import { PostPopup } from '@/components/PostPopup';
import { ExploreComp } from '@/components/ExploreComp';
import { PostsComp } from '@/components/PostsComp';
import { ReelsComp } from '@/components/ReelsComp';
import { StoryComp } from "@/components/StoryComp";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import { FieldPath, FieldValue, addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';

export const MainBar = ({mid}) => {
    const [width, setWidth] = useState(0);
    const [isData, setIsData] = useState("all");
    const [storyPostsData, setStoryPostsData] = useState();
    const popUpBox = useSocial();
    const { setPopUp, setStoryPopup, storyPopup, explorePopUp, setExplorePopUp } = popUpBox;
    const fb = useFirebase();
    const { GetPostsData, GetExploreData, docSize, GetVideosData, StoriesData, myStoriesData, PostStoriesData, setIsPostSelector } = fb;
    const carousel = useRef();
    const db = getFirestore();

    useEffect(() => {
        GetPostsData()
        GetVideosData()
        StoriesData()
        GetExploreData(docSize)
        getStoriesData()
        setWidth(carousel.current.scrollWidth * 1.65 - carousel.current.offsetWidth)
    }, []);

    const getStoriesData = async () => {
        const spostsArrayData = []
        const storiesRef = collection(db, "stories");

        const storiesSnapshot = await getDocs(storiesRef);

        const storiesData = storiesSnapshot.docs.map(async (doc) => {
            const spostsRef = collection(db, "stories", doc.id, "sposts");

            const spostsSnapshot = await getDocs(spostsRef);

            const spostsData = spostsSnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            spostsData.forEach((data) => {
                spostsArrayData.push(data)
            })
            setStoryPostsData(spostsArrayData)
            // console.log(spostsArrayData.forEach((val)=>console.log(val.img)))
        });

    }


    return (
        <>
            <motion.div ref={carousel} className="mainbar" >
                <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="stories">
                    {
                        myStoriesData ?
                            myStoriesData.map((val, ind) => {
                                return (
                                    <div className="story-wrapper" key={val.name}>
                                        <div className='story' onClick={()=> setStoryPopup(true)} style={{ background: `url(${val.coverimg})no-repeat center/cover` }}>
                                            <Image src={`${val.img}`} width={50} height={50} alt="randomImage" className="img-cells" data-name={val.name} />
                                            <span>{val.name}</span>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <>
                                <div className='loading-story'>
                                    <Image src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"} width={90} height={90} alt="randomImage" className="img-cells" />
                                </div>
                                <div className='loading-story'>
                                    <Image src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"} width={90} height={90} alt="randomImage" className="img-cells" />
                                </div>
                                <div className='loading-story'>
                                    <Image src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"} width={90} height={90} alt="randomImage" className="img-cells" />
                                </div>
                                <div className='loading-story'>
                                    <Image src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"} width={90} height={90} alt="randomImage" className="img-cells" />
                                </div>
                                <div className='loading-story'>
                                    <Image src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"} width={90} height={90} alt="randomImage" className="img-cells" />
                                </div>
                            </>
                    }
                </motion.div>
                <div className="post" onClick={() => {
                    setPopUp(true)
                    setIsPostSelector(false)
                }}>
                    <div>
                        <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={30} height={30} alt="randomImage" />
                        <div>What's on your mind, User?</div>
                    </div>
                    <button>Post</button>
                </div>
                <div className="sections">
                    <span onClick={() => {
                        setIsData("all")
                    }} className={isData === "all" ? "content-active" : undefined}>ALL</span>

                    <span onClick={() => {
                        setIsData("posts")
                    }} className={isData === "posts" ? "content-active" : undefined}>MY-POSTS</span>

                    <span onClick={() => {
                        setIsData("reels")
                    }} className={isData === "reels" ? "content-active" : undefined}>MY-VIDEOS</span>

                </div>
                {isData === "posts" && <PostsComp />}
                {isData === "all" && <ExploreComp />}
                {isData === "reels" && <ReelsComp />}
            </motion.div>
            {storyPopup && <StoryComp storyPostsData={storyPostsData} />}
            {explorePopUp && <PostPopup/>}
        </>
    )
}
