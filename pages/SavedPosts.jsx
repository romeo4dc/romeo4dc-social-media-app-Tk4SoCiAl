import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFirebase } from '@/firebase/firebase';
import { PostPopup } from '@/components/PostPopup';
import { LeftBar } from "@/components/LeftBar";
import { useSocial } from "@/context/Context";
const SavedPosts = () => {
    const router = useRouter();
    const fb = useFirebase();
    const { exploreData, GetExploreData, docSize, shuffleArrayOfObjects } = fb;
    const Context = useSocial();
    const { ClickPost, explorePopUp, setExplorePopUp } = Context;
    useEffect(() => {
        GetExploreData(docSize)
    }, [])
    return (
        <>
            <div style={{ marginLeft: '1em', cursor: 'pointer' }}>

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
            {/* <div className="saved-explore-container"> */}
                <div className="explore-container">
                    {
                        exploreData &&
                        exploreData.map((media, index) => {
                            return (
                                <React.Fragment key={media.id}>
                                    {media.preference === "saved" && (
                                        <div className="posts-box" >
                                            <img src={media.file} alt="Random Image" className='main-posts' />
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            {/* </div> */}
        </>
    )
}
export default SavedPosts;