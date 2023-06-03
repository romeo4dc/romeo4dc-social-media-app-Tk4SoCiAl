import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import { useSocial } from "@/context/Context";
import { useFirebase } from '@/firebase/firebase';
import { useEffect } from "react";
export const ExplorePopUp = () => {
    const [value, setValue] = useState(null);
    const [isPlay, setIsPlay] = useState(true);
    const [isLiked, setIsLiked] = useState(true);
    const [isView, setIsView] = useState(true);
    const [loading, setLoading] = useState(true);
    const Context = useSocial();
    const { setExplorePopUp, exploreSrc, popUpSrc } = Context;
    const fb = useFirebase();
    const { savedItems, removeSavedItems, bookMark, commentsData, getCommentsData, postCommentsBtn, commentPostInput, getCommmentsCollectionSize, postCommentsText, commentSend, postTime, replyComment, isCommentUser, postReplyCommentBtn, getSubCollectionData, replyCommentsData, getCommentPostTiming, getReplyPostTiming, replyPostTime, postUsername, postImage } = fb

    useEffect(() => {
        getCommentPostTiming()        
        getCommentsData()
        getCommmentsCollectionSize()
        getReplyPostTiming()
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
                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp`} height={35} width={35} style={{transform:'scale(.5)', filter: 'hue-rotate(45deg) drop-shadow(2px -1px 10px #00000094)'}} className='postloading'/>

                            <img src={exploreSrc} className="imagePosts" alt="randomImage" onLoad={postLoader}/>
                            </>
                            ) : (
                            <>

                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp`} height={35} width={35} style={{transform:'scale(.5)'}} className='postvideoloading'/>

                            <video width="100%" height="100%" src={exploreSrc} className="videoPosts" autoPlay volume={0.5} onClick={videoPlayer} onLoadedMetadata={postLoader}/>
                            

                            <Image alt="randomImage" src={`/assets/play.svg`} height={35} width={35} className={isPlay ? undefined : "explorePlay"} onClick={videoPlayer}/>     
                            </>
                            )
                    }   
                </div>
                <div className="post-right">
                <div className="comment-header expch">
                <Image src={`/assets/arrow-left.svg`} height={23} width={23} alt="" style={{ filter: 'invert(1)', margin: '0' }} onClick={() => setExplorePopUp(false)}/>
                <span>Comments</span>
                </div>
                    <div className="header exph">
                        <div className="header-left exphl">
                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp`} height={35} width={35} className="userloader"/>
                         <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/${postImage}`} height={35} width={35} onLoad={loader} className="commentuserimg"/>                            
                            <span>{postUsername}</span>
                            <Image src={`/assets/dot.svg`} height={25} width={25} alt="" style={{ filter: 'invert(1)', margin: '0' }} />
                            <span>Follow</span>
                        </div>
                        <Image src={`/assets/more.svg`} height={15} width={15} alt="" style={{ filter: 'invert(1)', margin: '0' }}  />
                    </div>

                    {/* Main User*/}

                    <div className="comments expc">
                        <div className="comment-users expcu">
                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                            <div className="right-comments">
                                <div className="mainuser expmain">
                                    <span style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        color: '#fff'
                                    }}>
                                    score90 
                                    </span>

                                    <span style={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        color: '#fff'
                                    }}>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, est saepe iure illo exercitationem laboriosam, reiciendis quisquam consectetur voluptatibus praesentium cum quas fuga, neque reprehenderit vitae! Rerum porro sit voluptas.</span>
                                    <div className="react-box">
                                        <span>2w</span>
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* !Other Users */}

                        {
                            commentsData ?
                                commentsData.map((data, ind) => {
                                    return (
                                        <div className="other-users expou" key={data.id}>
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />

                                            <div className="users-comment-right expucr">

                                                <User>{data.user}</User>

                                                <Comment> &nbsp;{data.comments}
                                                    <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} />
                                                </Comment>

                                                <Timing>
                                                    <span>{postTime}</span>
                                                    <span onClick={replyComment} data-name={data.id} >Reply</span>
                                                </Timing>

                                                <div className="reply">
                                                    { isView ? 
                                                    <ViewReply data-name={data.id} onClick={(e)=>{
                                                        setValue(ind)
                                                        getSubCollectionData(e)
                                                        setIsView(false)
                                                    }}>____<span >&nbsp;&nbsp;&nbsp;&nbsp;View &nbsp;replies ({replyCommentsData.length})</span>
                                                    </ViewReply>
                                                       :
                                                       <HideReply onClick={()=>setIsView(true)}> 
                                                        ____<span>&nbsp;&nbsp;&nbsp;&nbsp;Hide &nbsp;replies</span>
                                                       </HideReply>
                                                    }
                                                                <div className="replies">
                                                    {
                                                     ind === value &&  replyCommentsData &&
                                                        replyCommentsData.map((data) => {
                                                            return (
                                                                <div className="reply-user" key={data.id}>
                                                                    <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                                                    <div>
                                                                        <span>{data.user}</span>
                                                                        <span>{data.comment}</span>
                                                                        <div className="react-box">
                                                                            <span>{replyPostTime}</span>
                                                                            <span>{data.likes}</span>
                                                                        </div>
                                                                    </div>
                                                                    { isLiked ? <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                                        position: 'absolute',
                                                                        right: '0px',
                                                                        filter: 'invert(1)'
                                                                    }} onClick={()=>setIsLiked(false)}/>
                                                                    :
                                                                    <Image alt="randomImage" src={`/assets/red-heart.svg`} height={14} width={14} style={{
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
                                
                                <Image src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"} width={40} height={40} alt="randomImage" style={{ position: 'absolute', right: '23%', top:'38%', filter:'hue-rotate(45deg) drop-shadow(0px -1px 4px rgba(0, 0, 0, 0.523))'}} />
                        }
                    </div>

                    <div className="likes-box lbexp">
                        <div className="socialicons sexp">
                            <div className="lefticons liexp">
                                <Image alt="randomImage" src={`/assets/like.svg`} height={25} width={25} />
                                <Image alt="randomImage" src={`/assets/comments.svg`} height={25} width={25} />
                                <Image alt="randomImage" src={`/assets/share.svg`} height={25} width={25} style={{ filter: 'unset' }} />
                            </div>
                            {bookMark ? <Image alt="randomImage" src={`/assets/fillbookmark.svg`} height={27} width={27} style={{ filter: 'invert(1)' }} onClick={removeSavedItems} />
                                :
                                <Image alt="randomImage" src={`/assets/bookmark.svg`} height={27} width={27} style={{ filter: 'invert(1)' }}  onClick={savedItems} />}
                        </div>
                        <div className="likes lexp">
                            <span>180,780 likes</span>
                            <span>MARCH 9</span>
                        </div>
                    </div>
                    <div className="post-input">
                        <div className="left-comment explc">
                            <Image alt="randomImage" src={`/assets/smiley.svg`} height={28} width={28} style={{ filter: 'invert(1)' }} className="expsmiley"/>
                            <input type="text" placeholder="Add a comment..." onChange={commentPostInput} value={postCommentsText} className="expinput"/>
                        </div>
                        {commentSend && <Image src={"https://res.cloudinary.com/demo/image/fetch/https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp"} width={40} height={40} alt="randomImage" style={{ position: 'absolute', left: '50%', filter:'hue-rotate(45deg) drop-shadow(2px -1px 10px #00000094' }} />}
                        <span onClick={isCommentUser ? postCommentsBtn : postReplyCommentBtn} className="exppost">Post</span>
                    </div>
                </div>
            </div>
            <Image src={`/assets/cross.svg`} height={23} width={23} className="cross" alt="randomImage" onClick={() => setExplorePopUp(false)} />
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