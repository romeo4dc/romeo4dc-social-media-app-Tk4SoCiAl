import React from 'react';
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import { ExploreComp } from '@/components/ExploreComp';
import { PostsComp } from '@/components/PostsComp';
import { ReelsComp } from '@/components/ReelsComp';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
export const MainBar = () => {
    const [isData, setIsData] = useState("all");
    const [vData, setVdata] = useState(false);
    const popUpBox = useSocial();
    const { setPopUp } = popUpBox;
    const fb = useFirebase();
    const { GetPostsData, postsData, mixData, GetMixData, mainBarSrc, exploreData, GetExploreData, docSize, GetVideosData } = fb;

    useEffect(() => {
        GetPostsData()
        GetVideosData()
        // GetMixData()
        GetExploreData(docSize)
    }, [])

    return (
        <div className="mainbar">
            <div className="stories">
                <div className="story">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={50} height={50} alt="randomImage" />
                    <span>Daniel Bale</span>
                </div>
                <div className="story">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={50} height={50} alt="randomImage" />
                    <span>Daniel Bale</span>
                </div>
                <div className="story">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={50} height={50} alt="randomImage" />
                    <span>Daniel Bale</span>
                </div>
                <div className="story">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={50} height={50} alt="randomImage" />
                    <span>Daniel Bale</span>
                </div>
                <div className="story">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={50} height={50} alt="randomImage" />
                    <span>Daniel Bale</span>
                </div>
            </div>
            <div className="post" onClick={() => setPopUp(true)}>
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
                }} className={isData === "posts" ? "content-active" : undefined}>POSTS</span>

                <span onClick={() => {
                    setIsData("reels")
                }} className={isData === "reels" ? "content-active" : undefined}>VIDEOS</span>

            </div>
            {isData === "posts" && <PostsComp />}
            {isData === "all" && <ExploreComp />}
            {isData === "reels" && <ReelsComp />}
        </div>
    )
}

