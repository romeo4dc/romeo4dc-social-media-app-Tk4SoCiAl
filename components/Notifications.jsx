import { useFirebase } from "@/firebase/firebase";
import Image from "next/image";
import { use, useEffect, useState } from "react";
export const Notifications = ({notificationBtn}) => {
    const followBtn=(e)=>{
      if(e.target.textContent === "Follow"){
        e.target.innerHTML = `<img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="randomImage"  style="filter:drop-shadow(2px 4px 8px black); height:25px; width:25px; "/>`;
         setTimeout(async()=>{
        e.target.innerHTML="Following";
        e.target.style.color="#000";
        e.target.style.background="#fff";
        e.target.style.minWidth="100px";
    },2000)
}
      else if(e.target.textContent === "Following"){
        e.target.innerHTML="Follow";
        e.target.style.color="#fff";
        e.target.style.background="rgb(0, 149, 246)";
        e.target.style.minWidth="85px";
      } 
    }
    useEffect(()=>{
    
    },[])
    return (
        <div className="notif-wrapper">
        <Image src={`assets/cross.svg`} alt="randomImage" height={20} width={20} style={{filter:'invert(1)', position:'absolute',zIndex:'9',right:'0', margin:'.5em', cursor:'pointer'}} onClick={notificationBtn}/>

        <section className="notification-container" onClick={followBtn}>
            <div className="notify-header">
                <span>Notifications</span>
                <span>Filter</span>
            </div>
            <div className="this-month">
                <span>This Month</span>
                <div className="notify-sec" style={{ paddingLeft: '1em' }}>
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" height={30} width={30} />
                    <span style={{ WebkitTextStroke: '.1px', fontWeight: '400' }}>ali_raza_mangat_,tanuj.patwal7 and why._.itzz._.akshuu <span style={{ WebkitTextStroke: '.01px', fontWeight: '400', color: "rgb(255 255 255 / 90%)" }}>liked your photo. <span style={{ color: 'rgb(168,168,168)', fontSize: '.7875rem' }}>1w</span></span></span>
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" height={45} width={45} />
                </div>
                <div className="notify-sec">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" height={47} width={47} style={{ border: '2px solid #ff2d96', padding: '.15em' }} />
                    <span style={{ WebkitTextStroke: '.1px', fontWeight: '400' }}>why._.itzz._.akshuu <span style={{ WebkitTextStroke: '.01px', fontWeight: '400', color: "rgb(255 255 255 / 90%)" }}>liked your photo. <span style={{ color: 'rgb(168,168,168)', fontSize: '.7875rem' }}>1w</span></span></span>
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" height={45} width={45} />
                </div>
                <div className="notify-sec">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" height={47} width={47} />
                    <span style={{ WebkitTextStroke: '.1px', fontWeight: '400' }}>hrithikp999 is on tk4SoCiAl. ritikteja <span style={{ WebkitTextStroke: '.01px', fontWeight: '400', color: "rgb(255 255 255 / 90%)" }}> and 1 other follow them. <span style={{ color: 'rgb(168,168,168)', fontSize: '.7875rem' }}>3w</span></span></span>

                     <button className="follow-btn">
                    Follow
                    </button>
                </div>
            </div>
            <div className="earlier">
            <span>Earlier</span>
                <div className="earlier-notify">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" height={42} width={42} />
                    <span style={{ WebkitTextStroke: '.1px', fontWeight: '400' }}>eloindia, who you might know, <span style={{ WebkitTextStroke: '.01px', fontWeight: '400', color: "rgb(255 255 255 / 90%)" }}>is on instagram. <span style={{ color: 'rgb(168,168,168)', fontSize: '.7875rem' }}>1w</span></span></span>

                    <button className="follow-btn">
                    Follow
                    </button>
                </div>
                <div className="earlier-notify">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" height={42} width={42} />
                    <span style={{ WebkitTextStroke: '.1px', fontWeight: '400' }}>entranador_360_apps <span style={{ WebkitTextStroke: '.01px', fontWeight: '400', color: "rgb(255 255 255 / 90%)" }}>started following you. <span style={{ color: 'rgb(168,168,168)', fontSize: '.7875rem' }}>8w</span></span></span>

                    <button className="follow-btn">
                    Follow
                    </button>
                </div>
                <div className="earlier-notify">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" height={42} width={42} />
                    <span style={{
                        WebkitTextStroke: '.1px',
                        fontWeight: '400'
                    }}>
                    hrithikp999 is on instagram. rajat_547 
                    <span style={{
                        WebkitTextStroke: '.01px',
                        fontWeight: '400',
                        color: "rgb(255 255 255 / 90%)"
                    }}>
                    and 1 other follow them.
                    <span style={{
                        color: 'rgb(168,168,168)',
                        fontSize: '.7875rem'
                    }}>8w</span></span></span>

                    <button className="follow-btn">
                    Follow
                    </button>
                </div>
                <div className="earlier-notify">
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" height={47} width={47} style={{ border: '2px solid #ff2d96', padding: '.15em' }} />
                    <span style={{
                        WebkitTextStroke: '.1px',
                        fontWeight: '400'
                    }}>
                    kunal.vashisht_
                    <span style={{
                        WebkitTextStroke: '.01px',
                        fontWeight: '400',
                        color: "rgb(255 255 255 / 90%)"
                    }}>
                   started follwing you
                    <span style={{
                        color: 'rgb(168,168,168)',
                        fontSize: '.875rem'
                    }}>8w</span></span></span>

                    <button className="follow-btn">
                    Follow
                    </button>
                </div>
            </div>
        </section>
        </div>
    )
}