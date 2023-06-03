import React, { useState } from 'react';
import { useFirebase } from '@/firebase/firebase';
import { useSocial } from '@/context/Context';
import { useEffect } from 'react';
import { getAuth } from "firebase/auth";
export const UserPosts=()=>{
    const fb = useFirebase();
    const { exploreData, GetExploreData, docSize } = fb;
    const { ClickPost } = useSocial();
    const auth = getAuth();

    useEffect(()=>{
     GetExploreData()
    },[])
    return(
        <div className="user-content" onClick={ClickPost}>
        {
            exploreData &&
            exploreData.map((media, index) => {
                return (
                    <React.Fragment key={media.id}>
                        {media.category === 'posts' && media.uid === auth.currentUser.uid &&(
                            <div className="user-posts">
                                <img src={media.file} alt="" />
                            </div>
                        )}
                        {media.category === 'videos' && media.uid === auth.currentUser.uid &&(
                            <div className="video-posts">
                                <video src={media.file} autoPlay muted />
                            </div>
                        )}
                    </React.Fragment>
                )
            })
        }
    </div>
    )
}