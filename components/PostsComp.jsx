import React from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export const PostsComp = () => {
    const popUpBox = useSocial();
    const { setPopUp } = popUpBox;
    const fb = useFirebase();
    const { postsData,} = fb;
  return (
    <>
         {  
        postsData &&
        postsData.map((val,ind)=>{ 
            return(    
                <React.Fragment key={val.id}>
                {val.category === 'posts' && (
                    <div className="userpost" key={val.id}>
                <div className="userinfo">
                <div>
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={30} height={30} alt="randomImage" />
                    <div>
                        <span>Lono Rose</span>
                        <span> Dubai, 15 MINUTES AGO</span>
                    </div>
                    </div>
                    <Image src={`assets/more.svg`} width={12} height={12} alt="randomImage" />
                </div>
                <img className="postimg" src={val.file} alt="randomImage" />
 
                <div className="socialicons">
                    <div>
                        <Image src={`assets/like.svg`} width={15} height={15} alt="randomImage" />
                        <Image src={`assets/comments.svg`} width={15} height={15} alt="randomImage" />
                        <Image src={`/assets/share.svg`} width={15} height={15} alt="randomImage" style={{filter:'invert(1)'}}/>
                    </div>
                    <Image src={`assets/bookmark.svg`} width={20} height={20} alt="randomImage" />
                </div>
                <div className="likes">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={13} height={13} alt="randomImage" />
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={13} height={13} alt="randomImage" />
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={13} height={13} alt="randomImage" />
                    <span style={{marginLeft:'.5em'}}><span>Liked by</span><span style={{ color: '#000000', padding:'.3em' }}>Ernest Achiever</span>and <span style={{ color: '#000000'}}>2,323 others</span></span><br />
                    <span><span style={{ color: '#000000'}}>Lana Rose &nbsp;</span>{val.caption}</span><br />
                    <span style={{color:'#A8A8A8', fontSize:'.85rem'}}>View all 277 comments</span>
                </div>
            </div>
                )}

            </React.Fragment>
            )
        })
    } 
    </>
  )
}

