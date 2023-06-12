import React, { useEffect, useLayoutEffect } from 'react'
import Image from 'next/image';
import { useSocial } from '@/context/Context';
import { useFirebase } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { useState } from 'react';
import useSWR from "swr";
import { PostPopup } from '@/components/PostPopup';
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
const auth = getAuth();
const MoboExplore = () => {
  const [page, setPage] = useState(1);
  const [arrExploreData, setArrExploreData] = useState(null);  
  const [isFollowed, setIsFollowed] = useState(false)

  const context = useSocial();
  const { popUpSrc, exploreSrc, username, setExplorePopUp, explorePopUp, setPopUpSrc, isUser, setIsUser, videoImage } = context;
  const fb = useFirebase();
  const { shuffleArrayOfObjects, createPostsCollection } = fb;

  const router = useRouter();

  const { data: imageApiData, error: imageError } = useSWR(`https://api.pexels.com/v1/curated?page=${page}&per_page=2`, imageFetcher)

  const { data: videoApiData, error: videoError } = useSWR(`https://api.pexels.com/videos/popular?page=${page}&per_page=2`, videoFetcher)

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

  useEffect(() => {
    if (imageApiData && videoApiData) {
      let shuffledData = shuffleArrayOfObjects([...imageApiData.photos, ...videoApiData.videos])
      setArrExploreData(prev => prev ? [...prev, ...shuffledData] : [...shuffledData]);
    }
  }, [imageApiData, videoApiData, page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1
      >= document.documentElement.scrollHeight
    ) {
      setPage(prev => prev + 1)
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
      isUser && 
      <div className="mobo-explore-container">
        <div className="mobo-explore-header">
          <Image
            src={`/assets/arrow-left.svg`}
            height={25}
            width={25}
            alt="shsladda"
            onClick={() => router.push("ExploreContent/Explore")} />
          <span>Explore</span>
        </div>
        <div className="mobo-explore-posts">
          <div className="mobo-explore-user">
            <div>
              <Image
                src={`https://res.cloudinary.com/demo/image/fetch/${popUpSrc ? exploreSrc : videoImage}`}
                height={35}
                width={35}
                alt="shsladda" />
              <span>{username}</span>
              <Image
                src={`/assets/dot.svg`}
                height={30}
                width={30}
                alt="shsladda"
                style={{ filter: 'invert(1)' }} />
              <span>Follow</span>
            </div>
            <Image
              src={`/assets/more.svg`}
              height={20}
              width={20}
              alt="shsladda" />
          </div>
          {
            popUpSrc ?
              <div className="mobo-explore-image">
                <img
                  src={exploreSrc}
                  alt="" />
              </div>
              :
              <div className="mobo-explore-video">
                <video src={exploreSrc} loop autoPlay={false}/>                
              </div>
          }
          <div className="mobo-explore-content">
            <div className="mobo-explore-socialicons">
              <div onClick={Reaction}>
                <Image src={`/assets/like.svg`}
                  height={28}
                  width={28}
                  alt="shsladda"
                  className='reels-likes'
                />
                <Image src={`/assets/comments.svg`}
                  height={28}
                  width={28}
                  alt="shsladda"
                  data-name={username}
                  onClick={(e)=>{
                    createPostsCollection(e)
                    setExplorePopUp(true)                    
                  }}
                  image={exploreSrc}
                  username={username}
                   />
                <Image src={`/assets/share.svg`}
                  height={28}
                  width={28}
                  alt="shsladda" />
              </div>
              <Image
                style={{ marginRight: '-1em' }}
                src={`/assets/bookmark.svg`}
                height={34}
                width={34}
                alt="shsladda" />
            </div>
            <span style={{
              fontWeight: '600',
              letterSpacing: '.7px',
              lineHeight: '2em'
            }}>20,101 likes</span><br />
            <span>
              <span style={{
                fontWeight: '600',
                fontSize: '1.1rem',
                letterSpacing: '.6px'
              }}>osjdnasads </span>
              <span style={{
                fontWeight: '400!important',
                lineHeight: '1.1em',
                letterSpacing: '.5px'
              }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium debitis ipsa iusto repellat veritatis facere quo dolor enim. Cupiditate blanditiis, quas perspiciatis alias corporis sed recusandae? Voluptatibus non maiores doloribus.</span></span>

            <br />
            <span style={{
              color: "#808080",
              lineHeight: '1.5em'
            }}>View all 220 comments</span>
            <br />
            <span style={{
              color: "#808080",
              fontSize: '.9rem'
            }}>JUNE 2</span>
          </div>
        </div>
        {
          arrExploreData &&
            arrExploreData.map((media, ind) => {
              return (
                <React.Fragment key={media.id + ind}>
                  {media.hasOwnProperty('photographer') && (
                    <div className="mobo-explore-posts" key={media.id}>
                      <div className="mobo-explore-user">
                        <div>
                          <Image
                            src={`https://res.cloudinary.com/demo/image/fetch/${media.src.tiny}`}
                            height={35}
                            width={35}
                            alt="shsladda" />
                          <span>{media.photographer}</span>
                          <Image
                            src={`/assets/dot.svg`}
                            height={30}
                            width={30}
                            alt="shsladda"
                            style={{ filter: 'invert(1)' }} />
                          <span>Follow</span>
                        </div>
                        <Image
                          src={`/assets/more.svg`}
                          height={20}
                          width={20}
                          alt="shsladda" />
                      </div>
                      <div className="mobo-explore-image">
                        <img
                          src={media.src.large2x}
                          alt="" />
                      </div>
                      <div className="mobo-explore-content">
                        <div className="mobo-explore-socialicons">
                          <div onClick={Reaction}>
                            <Image src={`/assets/like.svg`}
                              height={28}
                              width={28}
                              alt="shsladda"
                              className='reels-likes'
                            />
                            <Image src={`/assets/comments.svg`}
                              height={28}
                              width={28}
                              alt="shsladda"
                              data-name={media.id}
                              onClick={(e) => {
                                createPostsCollection(e)
                                setExplorePopUp(true)
                                setPopUpSrc(true)
                              }}
                              image={media.src.tiny}
                              username={media.photographer}
                            />
                            <Image src={`/assets/share.svg`}
                              height={28}
                              width={28}
                              alt="shsladda" />
                          </div>
                          <Image
                            style={{ marginRight: '-1em' }}
                            src={`/assets/bookmark.svg`}
                            height={34}
                            width={34}
                            alt="shsladda" />
                        </div>
                        <span style={{
                          fontWeight: '600',
                          letterSpacing: '.7px',
                          lineHeight: '2em'
                        }}>20,101 likes</span><br />
                        <span>
                          <span style={{
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            letterSpacing: '.6px'
                          }}>{media.photographer} </span>
                          <span style={{
                            fontWeight: '400!important',
                            lineHeight: '1.1em',
                            letterSpacing: '.5px'
                          }}>{`This post video is created and managed by (${media.photographer}) and it's url is=${media.url}`}</span></span>

                        <br />
                        <span style={{
                          color: "#808080",
                          lineHeight: '1.5em'
                        }}>View all 220 comments</span>
                        <br />
                        <span style={{
                          color: "#808080",
                          fontSize: '.9rem'
                        }}>JUNE 2</span>
                      </div>
                    </div>
                  )}

                  {media.hasOwnProperty('video_files') && (
                    <div className="mobo-explore-posts" key={media.id + ind*3}>
                      <div className="mobo-explore-user">
                        <div>
                          <Image
                            src={`https://res.cloudinary.com/demo/image/fetch/${media.video_pictures[0].picture}`}
                            height={35}
                            width={35}
                            alt="shsladda" />
                          <span>{media.user.name}</span>
                          <Image
                            src={`/assets/dot.svg`}
                            height={30}
                            width={30}
                            alt="shsladda"
                            style={{ filter: 'invert(1)' }} />
                          {isFollowed ? 
                            <span style={{color:'#fff'}} onClick={()=>setIsFollowed(false)}>Unfollow</span> 
                            : 
                            <span onClick={()=>setIsFollowed(true)}>Follow</span>}
                        </div>
                        <Image
                          src={`/assets/more.svg`}
                          height={20}
                          width={20}
                          alt="shsladda" />
                      </div>
                      <div className="mobo-explore-video">
                        <video src={media.video_files[0].link} loop muted autoPlay />
                      </div>
                      <div className="mobo-explore-content">
                        <div className="mobo-explore-socialicons">
                          <div onClick={Reaction}>
                            <Image src={`/assets/like.svg`}
                              height={28}
                              width={28}
                              alt="shsladda"
                              className='reels-likes'
                            />
                            <Image src={`/assets/comments.svg`}
                              height={28}
                              width={28}
                              alt="shsladda"
                              data-name={media.id}
                              onClick={(e)=>{
                                createPostsCollection(e)
                                setExplorePopUp(true)
                              }}
                              image={media.video_pictures[0].picture}
                              username={media.user.name}
                               />
                            <Image src={`/assets/share.svg`}
                              height={28}
                              width={28}
                              alt="shsladda" />
                          </div>
                          <Image
                            style={{ marginRight: '-1em' }}
                            src={`/assets/bookmark.svg`}
                            height={34}
                            width={34}
                            alt="shsladda" />
                        </div>
                        <span style={{
                          fontWeight: '600',
                          letterSpacing: '.7px',
                          lineHeight: '2em'
                        }}>20,101 likes</span><br />
                        <span>
                          <span style={{
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            letterSpacing: '.6px'
                          }}>{media.user.name} </span>
                          <span style={{
                            fontWeight: '400!important',
                            lineHeight: '1.1em',
                            letterSpacing: '.5px'
                          }}>{`This post video is created and managed by (${media.user.name}) and it's url is=${media.url}`}</span></span>

                        <br />
                        <span style={{
                          color: "#808080",
                          lineHeight: '1.5em'
                        }}>View all 220 comments</span>
                        <br />
                        <span style={{
                          color: "#808080",
                          fontSize: '.9rem'
                        }}>JUNE 2</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )
            })
        }
      </div>
    }
      {explorePopUp && <PostPopup/>}
    </>
  )
}

export default MoboExplore;
