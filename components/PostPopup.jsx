import Image from "next/image";
import { useSocial } from "@/context/Context";
export const PostPopup = () => {
    const Context = useSocial();
    const { setExplorePopUp, exploreSrc, popUpSrc } = Context;
    console.log(popUpSrc)
    return (
        <div className="main-bg explorepopup">
            <div className="popup-container">
                <div className="post-left">
                {
                    popUpSrc ?
                    <img src={exploreSrc} alt="randomImage" />
                    :
                    <video width="100%" height="100%" src={exploreSrc} autoPlay muted/>

                }
                </div>
                <div className="post-right">
                    <div className="header">
                        <div className="header-left">
                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                            <span>forblaugrana</span>
                            <Image src={`/assets/dot.svg`} height={25} width={25} alt="" style={{ filter: 'invert(1)', margin: '0' }} />
                            <span>Follow</span>
                        </div>
                        <Image src={`/assets/more.svg`} height={15} width={15} alt="" style={{ filter: 'invert(1)', margin: '0' }} />
                    </div>

                    {/* Main User*/}

                    <div className="comments">
                        <div className="comment-users">
                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                            <div className="right-comments">
                                <div className="mainuser">
                                    <span style={{ fontSize: '.875rem', fontWeight: '600' }}>score90 </span><span style={{ fontSize: '14px', fontWeight: '400' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, est saepe iure illo exercitationem laboriosam, reiciendis quisquam consectetur voluptatibus praesentium cum quas fuga, neque reprehenderit vitae! Rerum porro sit voluptas.</span>
                                    <div className="react-box">
                                        <span>2&nbsp;w</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* !Other Users */}

                        <div className="other-users">
                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                            <div className="users-comment-right">
                                <span style={{ fontSize: '.875rem', fontWeight: '600' }}>diadkisas </span><span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, est saepe iure illo exercitationem laboriosam,est saepe iure illo exercitationem laboriosam, <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                    position: 'absolute',
                                    right: '15px',
                                    top: '5px',
                                    filter: 'invert(1)'
                                }} /></span>

                                <div className="reply">
                                    <span>____<span>&nbsp;&nbsp;&nbsp;&nbsp;View &nbsp;replies (20)</span></span>
                                    <div className="replies">
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="other-users">
                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                            <div className="users-comment-right">
                                <span style={{ fontSize: '.875rem', fontWeight: '600' }}>diadkisas </span><span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, est saepe iure illo exercitationem laboriosam,est saepe iure illo exercitationem laboriosam, <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                    position: 'absolute',
                                    right: '15px',
                                    top: '5px',
                                    filter: 'invert(1)'
                                }} /></span>
                                <div className="react-box">
                                    <span>2&nbsp;w</span>
                                    <span>200 likes</span>
                                    <span>Reply</span>
                                </div>
                                <div className="reply">
                                    <span>____<span>&nbsp;&nbsp;&nbsp;&nbsp;View &nbsp;replies (20)</span></span>
                                    <div className="replies">
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="other-users">
                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                            <div className="users-comment-right">
                                <span style={{ fontSize: '.875rem', fontWeight: '600' }}>diadkisas </span><span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, est saepe iure illo exercitationem laboriosam,est saepe iure illo exercitationem laboriosam, <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                    position: 'absolute',
                                    right: '15px',
                                    top: '5px',
                                    filter: 'invert(1)'
                                }} /></span>

                                <div className="reply">
                                    <span>____<span>&nbsp;&nbsp;&nbsp;&nbsp;View &nbsp;replies (20)</span></span>
                                    <div className="replies">
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                        <div className="reply-user">
                                            <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`} height={35} width={35} />
                                            <div>
                                                <span>dsasdasda</span>
                                                <div className="react-box">
                                                    <span>2w</span>
                                                    <span>200 likes</span>
                                                    <span>Reply</span>
                                                </div>
                                            </div>
                                            <Image alt="randomImage" src={`/assets/like.svg`} height={14} width={14} style={{
                                                position: 'absolute',
                                                right: '0px',
                                                filter: 'invert(1)'
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="likes-box">
                        <div className="socialicons">
                            <div className="lefticons">
                                <Image alt="randomImage" src={`/assets/like.svg`} height={25} width={25} />
                                <Image alt="randomImage" src={`/assets/comments.svg`} height={25} width={25} />
                                <Image alt="randomImage" src={`/assets/share.svg`} height={25} width={25} />
                            </div>
                            <Image alt="randomImage" src={`/assets/bookmark.svg`} height={27} width={27} style={{ filter: 'invert(1)' }} />
                        </div>
                        <div className="likes">
                            <span>180,780 likes</span>
                            <span>MARCH 9</span>
                        </div>
                    </div>
                    <div className="post-input">
                        <div className="left-comment">
                            <Image alt="randomImage" src={`/assets/smiley.svg`} height={28} width={28} style={{ filter: 'invert(1)' }} />
                            <input type="text" placeholder="Add a comment..." />
                        </div>
                        <span>Post</span>
                    </div>
                </div>
            </div>
            <Image alt="randomImage" src={`/assets/cross.svg`} height={23} width={23} className="cross" onClick={() => setExplorePopUp(false)} />
        </div>
    )
}