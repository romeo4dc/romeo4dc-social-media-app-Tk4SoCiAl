import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFirebase } from '@/firebase/firebase';
import { PostPopup } from '@/components/PostPopup';
import { LeftBar } from "@/components/LeftBar";
import { useSocial } from "@/context/Context";
import { PostPopUp } from '@/components/PostPopUp';
import { getAuth } from "firebase/auth";

const auth = getAuth();

const SavedPosts = () => {
    const router = useRouter();
    const fb = useFirebase();
    const { exploreData, GetExploreData, docSize, shuffleArrayOfObjects, createPostsCollection } = fb;
    const Context = useSocial();
    const { ClickPost, explorePopUp, setExplorePopUp, setIsUser, isUser } = Context;
    
    useLayoutEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            user  ? setIsUser(true) : router.push("Login")
        })
        return () => {
            unsubscribe();
        };
    },[])

    useEffect(() => {
        GetExploreData(docSize)
    }, [])
    return (
        <>
           { isUser && 
           <>
           <div className="saved-header">

                <span style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: '1.1rem',
                    color: "#000",
                    fontWeight: "600"
                }}
                    onClick={() => router.push("/UserProfile")}>
                    <Image src={`/assets/arrow-left.svg`}
                        height={20}
                        width={20}
                        alt="rdmImagE"
                    />Saved
                    <span
                        style={{
                            fontSize: '1.5rem',
                            marginLeft: '-2.3em',
                            marginTop: "1.5em"
                        }}>
                        <br />
                        All Posts
                    </span>
                </span>
            </div>
            <div className="explore-container" onClick={ClickPost}>
                {
                    exploreData &&
                    exploreData.map((media, index) => {
                        return (
                            <React.Fragment key={media.id}>
                                {media.preference === "saved" && (
                                    <div className="posts-box" onClick={createPostsCollection} >
                                        <img src={media.file} alt="Random Image" className='main-posts' image={media.file} data-name={media.id}/>
                                    </div>
                                )}
                                {media.preference === "savedReel" && (
                                    <div className="reels-box"  key={media.id} onClick={createPostsCollection}>
                                        <video src={media.file} loop data-name={media.id} image={media.file}/>
                                        <div className="ripple-container">
                                        </div>
                                        <Image src={`/assets/reels.svg`} height={50} width={50} alt="radimeksa" className="reel" />
                                    </div>
                                )}
                            </React.Fragment>
                        )
                    })
                }
            </div>
            </>
            }            
            {
        explorePopUp && <PostPopup />
      }
        </>
    )
}
export default SavedPosts;