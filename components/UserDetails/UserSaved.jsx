import React from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import { useFirebase } from '@/firebase/firebase';
import { useEffect } from 'react';
export const UserSaved = () => {
  const fb = useFirebase();
  const { exploreData, GetExploreData, docSize } = fb;
  const router = useRouter();
  useEffect(() => {
    GetExploreData(docSize)
  },[])
  return (
    <div className="user-saved-container">
      <div className="all-posts" onClick={()=>router.push("/SavedPosts")}>
        <span>All Posts</span>
        {
          exploreData ?
          exploreData.map((media, index) => {
            return (
              <React.Fragment key={media.id}>
                {media.preference === "saved" && (
                  <div className="all-posts-items">
                    <img src={media.file} alt="" />
                  </div>
                )}
              </React.Fragment>
            )
          })
          :
          <>
          <div className='all-posts-items'>
          <img src="assets/pinkdots.gif" alt="" />
          </div>
          <div className='all-posts-items'>
          <img src="assets/pinkdots.gif" alt="" />
          </div>
          <div className='all-posts-items'>
          <img src="assets/pinkdots.gif" alt="" />
          </div>
          <div className='all-posts-items'>
          <img src="assets/pinkdots.gif" alt="" />
          </div>
          </>
        }

      </div>
      <div className="all-audios" onClick={()=>router.push("/SavedAudio")}>
        <span>Audio</span>
        <div className="all-audios-items">
          <img src="https://images.pexels.com/photos/4407688/pexels-photo-4407688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="user"  />
        </div>
        <div className="all-audios-items">
          <img src="https://images.pexels.com/photos/3771813/pexels-photo-3771813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="user"  />
        </div>
        <div className="all-audios-items">
          <img src="https://images.pexels.com/photos/3776557/pexels-photo-3776557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="user"  />
        </div>
        <div className="all-audios-items">
          <img src="https://images.pexels.com/photos/3990842/pexels-photo-3990842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="user"  />
        </div>
      </div>
    </div>
  )
}