import React from 'react';
import { useFirebase } from '@/firebase/firebase';
import { useEffect, useRef, useState } from 'react';
import { PostPopup } from '@/components/PostPopup';
import { useSocial } from "@/context/Context";
const Explore = () => {
  const fb = useFirebase();
  const { exploreData, GetExploreData, docSize, shuffleArrayOfObjects } = fb;
  const Context = useSocial();
  const { ClickPost, explorePopUp, setExplorePopUp } = Context;
  useEffect(() => {
    GetExploreData(docSize)
  }, [])

  return (
    <>
    <div className="explore-container" onClick={ClickPost}>
      {exploreData &&
        exploreData.map((media, index) => {
          return (
            <React.Fragment key={media.id}>
              {media.category === 'posts' && (
                <div className="posts-box" >
                  <div className="details">
                    <div>
                      <img src="assets/comments.svg" alt="#" className="comments" />
                      <span>68.5k</span>
                    </div>
                    <div>
                      <img src="assets/like.svg" alt="#" className="likes" />
                      <span>1000</span>
                    </div>
                  </div>
                  <img src={media.file} alt="Random Image" className='main-posts' />
                </div>
              )}
              {media.category === 'videos' && (
                <div className="reels-box" >
                  <div className="details">
                    <div>
                      <img src="assets/comments.svg" alt="#" className="comments" />
                      <span>68.5k</span>
                    </div>
                    <div>
                      <img src="assets/like.svg" alt="#" className="likes" />
                      <span>1000</span>
                    </div>
                  </div>
                  <video src={media.file}  loop muted />
                </div>
              )}
            </React.Fragment>
          );
        })}
    </div>
    {
      explorePopUp && <PostPopup/>
    }
      
    </>
  )
}

export default Explore;