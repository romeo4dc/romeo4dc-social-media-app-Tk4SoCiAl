import React, { useLayoutEffect } from 'react';
import useSWR from 'swr';
import Image from "next/image";
import axios from "axios";
import { useFirebase } from '@/firebase/firebase';
import { useEffect, useRef, useState } from 'react';
import { PostPopup } from '@/components/PostPopup';
import { ExplorePopUp } from '@/components/ExplorePopUp';
import { LeftBar } from "@/components/LeftBar";
import { useSocial } from "@/context/Context";
import { useRouter } from 'next/router';
import { ExploreComp } from '@/components/ExploreComp';
import { getAuth } from 'firebase/auth';

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

const Explore = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [arrExploreData, setArrExploreData] = useState(null);
  const fb = useFirebase();
  const { exploreData, GetExploreData, docSize, shuffleArrayOfObjects, createPostsCollection, getCommentPostTiming } = fb;
  const Context = useSocial();
  const { ClickPost, explorePopUp, setExplorePopUp, setIsUser, isUser } = Context;
  const router = useRouter();
  const auth = getAuth();

  useLayoutEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      if(user){
        setIsUser(true)
    }else{
        location.pathname = "/"
        router.push("Login")
    }
    })
    return () => {
      unsubscribe();
    }
  },[])

  const { data: imageApiData, error:imageError } = useSWR(`https://api.pexels.com/v1/curated?page=${page}&per_page=10`,imageFetcher)

  const { data: videoApiData, error: videoError } = useSWR(`https://api.pexels.com/videos/popular?page=${page}&per_page=10`,videoFetcher)

  
  useEffect(() => {
    GetExploreData(docSize)
    getCommentPostTiming()
  }, [])
  
  useEffect(() => {
    setLoading(true)
    if (imageApiData && videoApiData) {
      let shuffledData = shuffleArrayOfObjects([...imageApiData.photos, ...videoApiData.videos])
      setArrExploreData(prev => prev ? [...prev, ...shuffledData] : [...shuffledData]);
    }
    setLoading(false)
  }, [imageApiData, videoApiData, page]);


  const handleScroll=()=>{
    if(window.innerHeight + document.documentElement.scrollTop + 1 
      >= document.documentElement.scrollHeight
      ){
        setLoading(true)
      setPage(prev => prev + 1)
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
    return ()=>window.removeEventListener('scroll', handleScroll)
  },[])
  

  return (
    <>
      { isUser && <div className="explore-container" onClick={ClickPost}>
        { arrExploreData &&
          arrExploreData.map((media, index) => {                        
            return (
              <React.Fragment key={media.id + index}>
                {media.hasOwnProperty('photographer') && (
                  <div className="posts-box" 
                  onClick={createPostsCollection} 
                  key={media.id+2}>
                  
                      <img 
                      src={media.src.large2x}  
                      alt="Random Image" 
                      className='main-posts' 
                      data-name={media.id} 
                      username={media.photographer} 
                      image={media.src.tiny}/>    
                  </div>
                )}

                {media.hasOwnProperty('video_files') && (
                  <div className="reels-box" 
                  onClick={createPostsCollection} 
                  key={media.id}>
                    <video 
                    src={media.video_files[0].link} 
                    loop  
                    data-name={media.id} 
                    username={media.user.name} 
                    image={media.video_pictures[0].picture}/>

                    <div className="ripple-container">
                    </div>

                    <Image 
                    src={`/assets/reels.svg`} 
                    height={50} 
                    width={50} 
                    alt="radimeksa" 
                    className="reel"/>
                  </div>
                )}
              </React.Fragment>
            );
          })          
          }
          
      </div>
      }
              
          {
        explorePopUp &&
          <ExplorePopUp />
      }     
      <div className="loading-cards">          
        <div className="loading-card"></div>
        <div className="loading-card"></div>
        <div className="loading-card"></div>        
          <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="" />                   
          </div>         
    </>
  )
}

export default Explore;