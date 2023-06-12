import Image from "next/image";
import React, { useState } from "react";
import { styled } from "styled-components";
import { useSocial } from "@/context/Context";
import { useFirebase } from '@/firebase/firebase';
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
export const PostPopup = () => {
    const auth = getAuth()

    const [value, setValue] = useState(null);
    const [isPlay, setIsPlay] = useState(true);
    const [isLiked, setIsLiked] = useState(true);
    const [isView, setIsView] = useState(true);    
    const Context = useSocial();
    const { setExplorePopUp, exploreSrc, popUpSrc, isFollowed, setIsFollowed } = Context;
    const fb = useFirebase();
    const { savedItems, removeSavedItems, bookMark, commentsData, getCommentsData, postCommentsBtn, commentPostInput, getCommmentsCollectionSize, postCommentsText, commentSend, postTime, replyComment, isCommentUser, postReplyCommentBtn, getSubCollectionData, replyCommentsData, getCommentPostTiming, getReplyPostTiming, replyPostTime, postUsername, postImage, userDetails, userData, tinyVideoImg  } = fb

    useEffect(() => {
        getCommentPostTiming()        
        getCommentsData()
        getCommmentsCollectionSize()
        getReplyPostTiming()
        userData();
    }, [])

    
    let counter = 0;
    useEffect(()=>{
        counter++;
        if(counter<=4){
            getCommentPostTiming()
            getReplyPostTiming()
            getCommmentsCollectionSize()
            console.log(replyPostTime,postTime)
    }
    if(counter > 4){
        counter = 0;
       }
    },)

    const videoPlayer=(e)=>{
       let video = document.querySelector('.videoPosts')
    if(isPlay){
        setIsPlay(false)
        video.pause()
    }else{
        setIsPlay(true)
        video.play()
    }
   }

   const loader=()=>{
    document.querySelector('.commentuserimg').style.position="relative";
    document.querySelector('.userloader').style.display="none";
    document.querySelector('.commentuserimg').style.visibility="visible";
   }

   const postLoader=()=>{
    document.querySelectorAll('.postloading').forEach((val)=>{
        val.style.display="none";
    })
    document.querySelectorAll('.postvideoloading').forEach((val)=>{
        val.style.display="none";
    })
}

    return (
        <>
        <div className="main-bg explorepopup"> 
            <div className="popup-container">
                <div className="post-left">
                {
                popUpSrc ? (
                            <>
                            <Image 
                            alt="randomImage" 
                            src={`https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp`} 
                            height={35} 
                            width={35} 
                            style={{
                                transform:'scale(.5)', 
                                filter: 'hue-rotate(45deg) drop-shadow(2px -1px 10px #00000094)'}} className='postloading'/>

                            <img 
                            src={postImage} 
                            className="imagePosts" 
                            alt="randomImage" 
                            onLoad={postLoader}/>
                            </>
                            ) : (
                            <>

                            <Image alt="randomImage" 
                            src={`https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp`} 
                            height={35} 
                            width={35} 
                            style={{transform:'scale(.5)'}} 
                            className='postvideoloading'/>

                            <video 
                            width="100%" 
                            height="100%" 
                            src={postImage} 
                            className="videoPosts" 
                            autoPlay 
                            volume={0.5} 
                            onClick={videoPlayer} 
                            onLoadedMetadata={postLoader}/>
                            

                            <Image 
                            alt="randomImage" 
                            src={`/assets/play.svg`} 
                            height={35} 
                            width={35} 
                            className={isPlay ? undefined : "explorePlay"} onClick={videoPlayer}/>     
                            </>
                            )
                    }   
                </div>
                <div className="post-right">
                <div className="comment-header">
                <Image 
                src={`/assets/arrow-left.svg`} 
                height={23} 
                width={23} 
                alt="sadasd" 
                style={{ filter: 'invert(1)', margin: '0' }} 
                onClick={() => setExplorePopUp(false)}/>
                <span>Comments</span>
                </div>
                    <div className="header">
                        <div className="header-left">

                            <Image 
                            alt="randomImage" 
                            src={`https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp`} 
                            height={35} 
                            width={35} 
                            className="userloader"/>
                         {userDetails && <img 
                         alt="randomImage" 
                         src={popUpSrc ? postImage : tinyVideoImg} 
                         onLoad={loader} 
                         className="commentuserimg" 
                         style={{width:'35px', height:'35px'}}/>         }                   
                            <span>{postUsername}</span>
                            <Image 
                            src={`/assets/dot.svg`} 
                            height={25} 
                            width={25} 
                            alt="ASas" 
                            style={{ filter: 'invert(1)', margin: '0' }} />
                            {isFollowed ? 
                            <span style={{color:'#fff'}} onClick={()=>setIsFollowed(false)}>Unfollow</span> 
                            : 
                            <span onClick={()=>setIsFollowed(true)}>Follow</span>}
                        </div>
                        <Image 
                        src={`/assets/more.svg`} 
                        height={15} 
                        width={15} 
                        alt="dsfsd" 
                        style={{ filter: 'invert(1)', margin: '0' }}  />
                    </div>

                    {/* Main User*/}

                    <div className="comments">


                        {/* !Other Users */}

                        {
                            commentsData && userDetails ?
                                commentsData.map((data, ind) => {
                                    return (
                                        <div className="other-users" key={data.id}>
                                            <img 
                                            alt="randomImage" 
                                            src={userDetails.userimg} 
                                            style={{height:'35px', width:'35px'}} />

                                            <div className="users-comment-right">

                                                <User>{userDetails.username}</User>

                                                <Comment> &nbsp;{data.comments}
                                                    <Image 
                                                    alt="randomImage" 
                                                    src={`/assets/like.svg`} 
                                                    height={14} 
                                                    width={14} />
                                                </Comment>

                                                <Timing>
                                                    <span>{postTime}</span>
                                                    <span onClick={replyComment} data-name={data.id}>Reply</span>
                                                </Timing>

                                                <div className="reply">
                                                { value === ind ? isView ? 
                                                    <ViewReply data-name={data.id} onClick={(e)=>{
                                                        setValue(ind)
                                                        getSubCollectionData(e)
                                                         setIsView(false)
                                                    }}>____<span >&nbsp;&nbsp;&nbsp;&nbsp;View &nbsp;replies {ind === value && `(${replyCommentsData.length})`}</span>
                                                    </ViewReply>
                                                       :
                                                       <HideReply onClick={()=>setIsView(true)}> 
                                                        ____<span>&nbsp;&nbsp;&nbsp;&nbsp;Hide &nbsp;replies</span>
                                                       </HideReply>
                                                       :
                                                       <>
                                                       <ViewReply data-name={data.id} onClick={(e)=>{
                                                        setValue(ind)
                                                        getSubCollectionData(e)
                                                         setIsView(false)
                                                    }}>____<span >&nbsp;&nbsp;&nbsp;&nbsp;View &nbsp;replies {ind === value && `(${replyCommentsData.length})`}</span>
                                                    </ViewReply>
                                                       </>
                                                    }
                                                                <div className="replies">
                                                    {
                                                    !isView &&  ind === value &&  replyCommentsData && userDetails &&
                                                        replyCommentsData.map((data) => {
                                                            return (
                                                                <div className="reply-user" key={data.id}>
                                                                <img 
                                                                alt="randomImage" 
                                                                src={userDetails.userimg} 
                                                                style={{height:'35px', width:'35px'}} />
                                                                    <div>
                                                                        <span>{userDetails.username}</span>
                                                                        <span>{data.comment}</span>
                                                                        <div className="react-box">
                                                                            <span>{replyPostTime}</span>
                                                                            <span>{data.likes}</span>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    { isLiked ? 
                                                                    <Image 
                                                                    alt="randomImage" 
                                                                    src={`/assets/like.svg`} 
                                                                    height={14} 
                                                                    width={14} 
                                                                    style={{
                                                                        position: 'absolute',
                                                                        right: '0px',
                                                                        filter: 'invert(1)'
                                                                    }} 
                                                                    onClick={()=>setIsLiked(false)}/>
                                                                    :
                                                                    <Image 
                                                                    alt="randomImage" 
                                                                    src={`/assets/red-heart.svg`} 
                                                                    height={14} 
                                                                    width={14} 
                                                                    style={{
                                                                        position: 'absolute',
                                                                        right: '0px',
                                                                    }} onClick={()=>setIsLiked(true)}/>}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                
                                <Image 
                                src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"} 
                                width={40} 
                                height={40} 
                                alt="randomImage" 
                                className="comments-loading"
                                 />
                        }
                    </div>

                    <div className="likes-box">
                        <div className="socialicons">
                            <div className="lefticons">
                                <Image 
                                alt="randomImage" 
                                src={`/assets/like.svg`} 
                                height={25} 
                                width={25} />
                                <Image 
                                alt="randomImage" 
                                src={`/assets/comments.svg`} 
                                height={25} 
                                width={25} />
                                <Image 
                                alt="randomImage" 
                                src={`/assets/share.svg`} 
                                height={25} 
                                width={25} 
                                style={{ filter: 'unset' }} />
                            </div>
                            {bookMark ? 
                            <Image 
                            alt="randomImage" 
                            src={`/assets/fillbookmark.svg`} 
                            height={27} 
                            width={27} 
                            style={{ filter: 'invert(1)' }} 
                            onClick={removeSavedItems} />
                                :
                                <Image 
                                alt="randomImage" 
                                src={`/assets/bookmark.svg`} 
                                height={27} 
                                width={27} 
                                style={{ filter: 'invert(1)' }} 
                                onClick={savedItems} />}
                        </div>
                        <div className="likes">
                            <span>180,780 likes</span>
                            <span>MARCH 9</span>
                        </div>
                    </div>
                    <div className="post-input">
                        <div className="left-comment">
                            <Image 
                            alt="randomImage" 
                            src={`/assets/smiley.svg`} 
                            height={28} 
                            width={28} 
                            style={{ filter: 'invert(1)' }} />
                            <input 
                            type="text" 
                            placeholder="Add a comment..." 
                            onChange={commentPostInput} 
                            onKeyUp={(e)=>{
                                if(e.key === 'Enter'){
                                    isCommentUser ? postCommentsBtn() : postReplyCommentBtn()
                                }
                            }}
                            value={postCommentsText} />
                        </div>
                        {commentSend && 
                        <Image 
                        src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"} 
                        width={40} 
                        height={40} 
                        alt="randomImage" 
                        style={{ 
                            position: 'absolute', 
                            left: '50%', 
                            filter:'hue-rotate(45deg) drop-shadow(2px -1px 10px #00000094' }} />}
                        <span onClick={isCommentUser ? postCommentsBtn : postReplyCommentBtn} >Post</span>
                    </div>
                </div>
            </div>
            <Image 
            src={`/assets/cross.svg`} 
            height={23} 
            width={23} 
            className="cross" 
            alt="randomImage" 
            onClick={() => setExplorePopUp(false)} />
        </div>
        </>
    )
}

const User = styled.span`
font-size: 1rem!important;
font-weight:600!important;
color: #fff;
`;
const Comment = styled.span`
color:#fff;
font-size: .9rem;
img{
    position:absolute;
    right: 15px;
    top: 5px;
    filter: invert(1);
}
`;
const Timing = styled.div`
display: flex;
gap: 1em;
margin-top: .5em;
margin-bottom: 1em;
span{
    font-weight: 500;
    font-size: .875rem!important;
}
span:last-child{
    font-weight: 600!important;
    cursor: pointer;
}
color: rgb(168, 168, 168);
`;
const ViewReply = styled.span`
cursor: pointer;
span{
    pointer-events: none;
    font-size: .9rem!important;
}
`;
const HideReply = styled.span`
cursor: pointer;
span{
    pointer-events: none;
    font-size: .9rem!important;
}
`;