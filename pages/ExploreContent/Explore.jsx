import React, { useLayoutEffect } from 'react';
import useSWR from 'swr';
import Image from "next/image";
import { useFirebase } from '@/firebase/firebase';
import { useEffect, useRef, useState } from 'react';
import { ExplorePopUp } from '@/components/ExplorePopUp';
import { useSocial } from "@/context/Context";
import { useRouter } from 'next/router';
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
  const { ClickPost, explorePopUp, setExplorePopUp, setIsUser, isUser, MoboClickPost } = Context;
  const router = useRouter();
  const auth = getAuth();

  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(true)
      } else {        
        router.push("/Login")
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])

  const { data: imageApiData, error: imageError } = useSWR(`https://api.pexels.com/v1/curated?page=${page}&per_page=10`, imageFetcher)

  const { data: videoApiData, error: videoError } = useSWR(`https://api.pexels.com/videos/popular?page=${page}&per_page=10`, videoFetcher)

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


  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1
      >= document.documentElement.scrollHeight
    ) {
      setLoading(true)
      setPage(prev => prev + 1)
    }
  }

  const downloadImg=(e)=>{
    if(e.target.classList.contains('download')){
      fetch(e.target.getAttribute('imgurl')).then(res=>res.blob()).then(file=>{
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click()
      }).catch(()=>console.log('err'))
    }
  }

  const downloadVid=(e)=>{
    if(e.target.classList.contains('downloadvid')){
      fetch(e.target.getAttribute('vidurl')).then(res=>res.blob()).then(file=>{
        console.log(file)        
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime() + '.mp4';
        a.click()
      }).catch(()=>console.log('err'))
    }
  }
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <>
      {
        isUser &&
        <>
          <div className="explore-container pc-explore" onClick={ClickPost}>
            {arrExploreData &&
              arrExploreData.map((media, index) => {
                return (
                  <React.Fragment key={media.id + index}>
                    {media.hasOwnProperty('photographer') && (
                      <div className="posts-box"
                        onClick={createPostsCollection}
                        key={media.id + 2}>
                        <img
                          src={media.src.large2x}
                          alt="Random Image"
                          className='main-posts'
                          data-name={media.id}
                          username={media.photographer}
                          image={media.src.tiny}                           
                          />
                          <div className="download" imgurl={media.src.large2x} onClick={downloadImg}>
                            <Image src={`/assets/camera.svg`} height={25} width={25} alt="dfdfd"/>
                            <span>{media.photographer}</span>
                             <Image src={`/assets/download.svg`} height={25} width={25}  alt="dfdf" />
                          </div>
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
                          image={media.video_pictures[0].picture} />

                        <div className="ripple-container">
                        </div>

                        <Image
                          src={`/assets/reels.svg`}
                          height={50}
                          width={50}
                          alt="radimeksa"
                          className="reel" />
                           <div className="downloadvid" vidurl={media.video_files[0].link} onClick={downloadVid}>
                            <Image src={`/assets/camera.svg`} height={25} width={25} alt="dfdfd"/>
                            <span>{media.user.name}</span>
                             <Image src={`/assets/download.svg`} height={25} width={25}  alt="dfdf" />
                          </div>
                      </div>
                    )}
                  </React.Fragment>

                );
              })
            }
            <div className="loading-cards">
              <Image
                src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"}
                width={40}
                height={40}
                alt="randomImage"
              />
            </div>
          </div>

{/* !MoboExplore */}

          <div className="explore-container mobo-explore" onClick={MoboClickPost}>
            {arrExploreData &&
              arrExploreData.map((media, index) => {
                return (
                  <React.Fragment key={media.id + index}>
                    {media.hasOwnProperty('photographer') && (
                      <div className="posts-box"
                        onClick={createPostsCollection}
                        key={media.id + 2}>

                        <img
                          src={media.src.large2x}
                          alt="Random Image"
                          className='main-posts'
                          data-name={media.id}
                          username={media.photographer}
                          image={media.src.tiny} />
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
                          image={media.video_pictures[0].picture} />
                        <div className="ripple-container">
                        </div>

                        <Image
                          src={`/assets/reels.svg`}
                          height={50}
                          width={50}
                          alt="radimeksa"
                          className="reel" />
                      </div>
                    )}
                  </React.Fragment>

                );
              })
            }
            <div className="loading-cards">
            <Image 
            src={`https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp`} 
            height={100} 
            width={100} 
            alt="daasd" 
            style={{
              filter: 'hue-rotate(45deg) drop-shadow(2px -1px 6px black)', 
              margin:'8em auto', 
              transform:'scale(3)'}}/>
            </div>
          </div>
        </>
      }
      {
        explorePopUp &&
        <ExplorePopUp />
      }

    </>
  )
}

export default Explore; 