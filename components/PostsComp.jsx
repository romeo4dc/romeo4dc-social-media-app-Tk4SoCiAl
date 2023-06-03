import React from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const PostsComp = () => {
    const [Data, setData] = useState()
    const popUpBox = useSocial();
    const { setPopUp, explorePopUp, setExplorePopUp } = popUpBox;
    const fb = useFirebase();
    const { postsData, createPostsCollection } = fb;
    return (
        <>
            {
                postsData ?
                    postsData.map((val, ind) => {
                        return (
                            <React.Fragment key={val.id}>
                                {val.category === 'posts' && (
                                    <div className="userpost" key={val.id}>
                                        <div className="userinfo">
                                            <div>
                                                <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={30} height={30} alt="randomImage" />
                                                <div>
                                                    <span>Lono Rose</span>
                                                    <span> Dubai, 22 MINUTES AGO</span>
                                                </div>
                                            </div>
                                            <Image src={`assets/more.svg`} width={12} height={12} alt="randomImage" />
                                        </div>
                                        <img className="postimg" src={val.file} alt="randomImage" />
                                        <div className="socialicons">
                                            <div>
                                                <Image className='posticons' src={`assets/like.svg`} width={22} height={22} alt="randomImage" />
                                                <Image className='posticons' src={`assets/comments.svg`} width={22} height={22} alt="randomImage" data-name={val.id} onClick={
                                                    (e)=>{
                                                        setExplorePopUp(true)
                                                        createPostsCollection(e)
                                                        }}/>
                                                <Image className='posticons share' src={`/assets/share.svg`} width={22} height={22} alt="randomImage" style={{ filter: 'invert(1)' }} />
                                            </div>
                                            <Image src={`assets/bookmark.svg`} width={20} height={20} alt="randomImage" />
                                        </div>
                                        <div className="likes">
                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                width={13}
                                                height={13}
                                                alt="randomImage" />

                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                width={13}
                                                height={13}
                                                alt="randomImage" />

                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                                width={13}
                                                height={13} alt="randomImage" />

                                            <span style={{ marginLeft: '.5em' }}>
                                                <span>Liked by</span>
                                                <span> Ernest Achiever</span> and
                                                &nbsp;<span>2,323 others</span>
                                            </span>
                                            <br />
                                            <span className='postcolor'>
                                                <span>Lana Rose &nbsp;</span>{val.caption}
                                            </span>
                                            <br />
                                            <span style={{
                                                color: '#A8A8A8',
                                                fontSize: '.85rem'
                                            }}>View all 277 comments</span>
                                        </div>
                                    </div>
                                )}

                            </React.Fragment>
                        )
                    })
                    :
                    <div className="loading-container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        filter:'hue-rotate(45deg) drop-shadow(2px -1px 6px black)'
                    }}>
                        <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="randomImage" style={{
                            height: "200px",
                            width: "200px"
                        }} />
                    </div>
            }
        </>
    )
}

