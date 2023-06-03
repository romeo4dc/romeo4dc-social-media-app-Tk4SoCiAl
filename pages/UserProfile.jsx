import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { useFirebase } from '@/firebase/firebase';
import { useSocial } from '@/context/Context';
import { LeftBar } from "@/components/LeftBar";
import { PostPopup } from '@/components/PostPopup';
import { Post } from "@/components/Post";
import { UserPosts } from "@/components/UserDetails/UserPosts";
import { UserSaved } from "@/components/UserDetails/UserSaved";
import { UserTagged } from "@/components/UserDetails/UserTagged";
import { useRouter } from "next/router";
const UserProfile = () => {
    const [isActive, setIsActive] = useState("posts");
    const fb = useFirebase();
    const popUpBox = useSocial();
    const router = useRouter();
    const { GetExploreData, docSize, userData, currentUserData, uploadToFirestore, userDetails, getBackgroundImage, getGradientData, getFontsSizeData, getThemesData } = fb;
    const { setCreateBtn, popUp, explorePopUp, ClickPost, setIsNavbar } = popUpBox;

    useEffect(() => {
        GetExploreData(docSize);
        userData();
        getGradientData();
        getFontsSizeData();
        getBackgroundImage();
        getThemesData();
    }, [])

    return (
        <>
            <div className="user-profile-container" >
                <LeftBar />
                <div className="user-profile-content" >
                    <div className="user-details">
                        <div className="user-bio">
                            <div className="user-img">
                                {userDetails &&
                                    userDetails ?
                                    <img src={userDetails.userimg} alt="" />
                                    :
                                    <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="" />
                                }
                                <label htmlFor="userdata">
                                    <Image src={`/assets/camera.svg`} alt="user" width={20} height={20} /></label>
                            </div>
                            <input type="file" id="userdata" onChange={uploadToFirestore} style={{
                                visibility: 'hidden',
                                pointerEvents: 'none',
                                position: 'absolute'
                            }} />
                            {
                                userDetails &&
                                <>
                                    <span>name</span>
                                    <div>
                                        <span>{userDetails.userbio}</span>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="user-info">
                            {userDetails &&
                                <>
                                    <div>
                                        <span>{userDetails.username}</span>
                                        <button onClick={() => router.push("EditProfile")}>Edit Profile</button>
                                    </div>
                                    <div>
                                        <span>3 posts</span> <span>74 followers</span><span>152 following</span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="user-data">
                    <div className="user-header">
                        <div>
                            <li
                                className={isActive === "posts" ? "userliactive" : undefined}
                                onClick={
                                    () =>
                                        setIsActive("posts")
                                }>
                                <Image src={`/assets/user-post.svg`} className="userProfileImg" alt="user" width={18} height={18} />
                                <span className={isActive === "posts" ? "userspanactive" : undefined}>POSTS</span>
                            </li>

                            <li
                                className={isActive === "saved" ? "userliactive" : undefined}
                                onClick={
                                    () =>
                                        setIsActive("saved")
                                }>
                                <Image src={`/assets/user-saved.svg`} className="userProfileImg" alt="user" width={18} height={18} />
                                <span className={isActive === "saved" ? "userspanactive" : undefined}>SAVED</span></li>

                            <li
                                className={isActive === "tagged" ? "userliactive" : undefined} onClick={
                                    () =>
                                        setIsActive("tagged")
                                }>
                                <Image src={`/assets/user-tagged.svg`} className="userProfileImg" alt="user" width={18} height={18} />
                                <span
                                    className={isActive === "tagged" ? "userspanactive" : undefined}>TAGGED</span>
                            </li>
                        </div>
                    </div>
                    {isActive === "posts" && <UserPosts />}
                    {isActive === "saved" && <UserSaved />}
                    {isActive === "tagged" && <UserTagged />}
                </div>
            </div>
            {popUp && <Post />}
            {explorePopUp && <PostPopup />}
        </>
    )
}
export default UserProfile;