import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useFirebase } from '@/firebase/firebase';
const SavedAudio = () => {
    const [isPlay, setIsPlay] = useState(false);
    const [isIndex, setIsIndex] = useState(0);
    const router = useRouter();
    const fb = useFirebase();
    const { GetAllAudiosData, audiosData } = fb;
    useEffect(() => {
        GetAllAudiosData();
    }, []);
    const handle=()=>{
     if(!isPlay){   
        document.querySelector(`#audio-${isIndex}`).play();
     }else{
        document.querySelectorAll('audio').forEach((val)=>val.pause());
        document.querySelector(`#audio-${isIndex}`).pause();
     }
    }
    return (
        <div className="saved-audio-container">
            <div style={{ cursor: 'pointer' }}>

                <span style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: '1.1rem',
                    color: "#000",
                    fontWeight: "600"
                }} onClick={
                    () => router.push("/UserProfile")
                }>
                    <Image src={`/assets/arrow-left.svg`} height={20} width={20} alt="rdmImagE" />Saved<span style={{
                        fontSize: '1.5rem',
                        marginLeft: '-2.3em',
                        marginTop: "1.5em"
                    }}><br />Audio</span>
                </span>
            </div>
            <div className="audios">
                {
                    audiosData &&
                    audiosData.map((media, ind) => {
                        return (
                            <React.Fragment key={ind}>
                                <div className="audio">
                                    <div>
                                        <Image src={media.img} height={50} width={50} alt="rdmImagE" />
                                        <div><span style={{ fontSize: "1.2rem", fontWeight: "600" }}>{media.name}</span><span>{media.user} -<span> {media.duration}</span></span></div>
                                    </div>

                                     <audio src={media.file} id={`audio-${ind}`}/>
                                    {isIndex === ind && isPlay ? <Image src={`/assets/pause.svg`} height={14} width={14} alt="rdmImagE" onClick={(e) => {
                                        handle()
                                        setIsIndex(ind)
                                        setIsPlay(false)
                                    }} />
                                        :
                                        <Image src={`/assets/play.svg`} height={12} width={12} alt="rdmImagE" onClick={() => {
                                            handle()
                                            setIsIndex(ind)
                                            setIsPlay(true)     
                                        }} />}

                                </div>
                            </React.Fragment>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default SavedAudio;