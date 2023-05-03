import { useState } from 'react';
import Image from 'next/image';
import { useSocial } from "../context/Context";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useFirebase } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const Post = () => {
    const [isPost, setIsPost] = useState(false);
    const popUpBox = useSocial()
    const { setPopUp, Caption, textAreaValue } = popUpBox;
    const fb = useFirebase()
    const { HandleFileChange, HandleVideoChange, files, firestore, storage, videoFiles, setUploading, uploading } = fb;

    const currentDate = new Date();
    const milliSeconds = currentDate.getTime()

    const UploadToFirestore = async () => {
        try {
            setUploading(true)
            //!Upload Document
            //  const storageRef = ref(storage, files);
            const fp = "postImages";
            const storageRef = ref(storage, `${fp}/${files}`);
            const downloadURL = await getDownloadURL(storageRef)

            //!Create new document in the specified collection
            await addDoc(collection(firestore, 'posts'), {
                caption: textAreaValue,
                file: downloadURL,
                date: currentDate,
                id: milliSeconds,
                category:"posts"
            })

            await addDoc(collection(firestore, 'mix'), {
                caption: textAreaValue,
                file: downloadURL,
                date: currentDate,
                id: milliSeconds,
                category:"mix"
            })
            
        } catch (err) {
            console.log(err)
        } finally {
            setUploading(false)
            setPopUp(false)
        }
        console.log('yesss')
    }

    const UploadVideoToFirestore = async () => {
        try{
            setUploading(true)
            
            
            //!Upload Document
            const fp = "postVideos";
            const storageRef = ref(storage, `${fp}/${videoFiles}`);
            const downloadURL = await getDownloadURL(storageRef)
            console.log(videoFiles)

            //!Create new document in the specified collection
            await addDoc(collection(firestore,'videos'),{
                caption: textAreaValue,
                file: downloadURL,
                date: currentDate,
                id: milliSeconds,
                category:"videos"
            })
            await addDoc(collection(firestore, 'mix'), {
                caption: textAreaValue,
                file: downloadURL,
                date: currentDate,
                id: milliSeconds,
                category:"mix"
            })

        } catch(err){
            console.log(err)
        } finally{
            setUploading(false)
            setPopUp(false)
        }
        console.log('yes')
    }


    return (
        <div className="wrapper">
            { uploading && (
                <div className="loading-container">
                <img src="assets/pinkdots.gif" alt="randomImage" />
            </div>
            )}
            <div className="pcontainer">
                <div className="header">
                    <span>Create a Post</span>
                    <Image alt="randomImage" src={`assets/cross.svg`} height={25} width={25} onClick={() => setPopUp(false)} style={{ cursor: 'pointer' }} />
                </div>
                <div className="userheader">
                    <Image alt="randomImage" src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={40} width={40} />
                    <span>Tushar Kumar</span>
                </div>
                <div className="text" placeholder='What do you want to post?'>
                    <textarea onChange={Caption} placeholder='Enter Your Words' />
                </div>
                <div className="senditems">
                    <div className="postitems">
                        <label htmlFor="gallery"><Image alt="randomImage" src={`assets/gallery.svg`} height={20} width={20} onClick={()=>setIsPost(true)}/></label>
                        <label htmlFor="video"><Image alt="randomImage" src={`assets/video.svg`} height={20} width={20} onClick={()=>setIsPost(false)}/></label>
                        <label htmlFor=""><Image alt="randomImage" src={`assets/doc.svg`} height={20} width={20} /></label>
                    </div>
                    <button onClick={isPost ? UploadToFirestore : UploadVideoToFirestore} className='postuploadbutton'>Post</button>
                    <input type="file" id='gallery' onChange={HandleFileChange}/>
                    <input type="file" id="video" accept="video/*" onChange={HandleVideoChange} />
                </div>
            </div>
        </div>
    )
}