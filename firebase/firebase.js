import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, uploadBytes, } from 'firebase/storage'
import { createContext, useContext, useEffect, useState } from "react";
import { addDoc, collection, getDocs, getFirestore, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSocial } from "@/context/Context";
const firebaseConfig = {
    apiKey: "AIzaSyC8pN9thmcqa9EbLLFaC_iW5FEByLV35bc",
    authDomain: "smapp-aa6ee.firebaseapp.com",
    projectId: "smapp-aa6ee",
    storageBucket: "smapp-aa6ee.appspot.com",
    messagingSenderId: "686473566693",
    appId: "1:686473566693:web:ed19705e1ac6ad5aee370c",
    measurementId: "G-TH8FLFGYNT"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore();
const db = getFirestore()
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext)
export const FirebaseProvider = ({ children }) => {
    const [files, setFiles] = useState(null);
    const [videoFiles, setVideoFiles] = useState(null);
    const [postContent, setPostContent] = useState(null)
    const [uploading, setUploading] = useState(false);
    const [videoData, setVideoData] = useState();
    const [postsData, setPostsData] = useState();
    const [mixData, setMixData] = useState();
    const [docSize, setDocSize] = useState();
    const [exploreData, setExploreData] = useState();

    const HandleFileChange = async (e) => {
        UploadLoading()
        const file = e.target.files[0];
        const filename = file.name;
        setFiles(filename)
        setUploading(true)
        const fp = "postImages";

        // Upload the file to Firebase Storage
        const storageRef = ref(storage, `${fp}/${filename}`);
        await uploadBytes(storageRef, file)
        setUploading(false)
    }
    const HandleVideoChange = async (e) => {
        const fileInput = document.getElementById('video');
        const file = fileInput.files[0];
        const filename = file.name;
        setVideoFiles(filename)

        const fp = "postVideos";

        setUploading(true)
        let postBtn = document.querySelector('.postuploadbutton');
        postBtn.textContent = "Uploading..."
        postBtn.style.background = "#808080";
        postBtn.setAttribute("disabled", "disabled")

        // Upload the file to Firebase Storage
        const storageRef = ref(storage, `${fp}/${filename}`)
        await uploadBytes(storageRef, file)

        postBtn.textContent = 'Post'
        postBtn.style.background = "rgb(111, 6, 191)";
        postBtn.removeAttribute("disabled")
        postBtn.setAttribute("enabled", "enabled")
        setUploading(false)
    }
    const UploadLoading = () => {
        let postBtn = document.querySelector('.postuploadbutton');
        postBtn.textContent = 'Loading...'
        postBtn.style.background = "#808080";
        postBtn.setAttribute("disabled", "disabled")
        setTimeout(() => {
            postBtn.textContent = 'Post'
            postBtn.style.background = "rgb(111, 6, 191)";
            postBtn.removeAttribute("disabled")
            postBtn.setAttribute("enabled", "enabled")
        }, 3000)
        console.log('yes')
    }
    const GetPostsData = () => {
        const db = getFirestore();
        const imagePost = onSnapshot(query(collection(db, 'posts'), orderBy("id", "desc")), (snapshot) => {
            const pData = [];
            snapshot.forEach((data) => {
                pData.push(data.data())
            })
            setPostsData(pData)
        })
        return () => imagePost();
    }
    const GetVideosData = () => {
        const db = getFirestore();
        const videoPost = onSnapshot(query(collection(db, 'videos'), orderBy('id', "desc")), (snapshot) => {
            const vData = [];
            snapshot.forEach((data) => {
                vData.push(data.data())
            })
            setVideoData(vData)
        })
        return () => videoPost();
    }

    const GetMixData=()=>{
        const db = getFirestore();
        const mixPost = onSnapshot(query(collection(db,'mix'),orderBy("id","desc")),(snapshot)=>{
            const mData=[];
            snapshot.forEach((data)=>{
                mData.push(data.data())
            })
            setMixData(mData)
        })
        return () => mixPost();
    }

    const shuffleArrayOfObjects = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const GetExploreData = async (count) => {
        const posts = await getDocs(collection(db, 'posts'));
        const totalPostsCount = posts.size;
        const videos = await getDocs(collection(db, 'videos'))
        const totalVideosCount = videos.size;

        setDocSize(totalPostsCount + totalVideosCount)

        const qPosts = query(collection(db, 'posts'), limit(count));
        const qVideos = query(collection(db, 'videos'), limit(count));
        const snapVid = await getDocs(qPosts);
        const snapPosts = await getDocs(qVideos)

        const shufflePosts = shuffleArrayOfObjects(snapPosts.docs.map(doc => doc.data()));
        const shuffleVideos = shuffleArrayOfObjects( snapVid.docs.map(doc => doc.data()));
        setExploreData(shuffleArrayOfObjects([...shufflePosts, ...shuffleVideos]))
        
    }

    return (
        <FirebaseContext.Provider value={{ HandleFileChange, firestore, files, storage, postContent, db, HandleVideoChange, videoFiles, setUploading, uploading, videoData, GetVideosData, GetPostsData, postsData, GetExploreData, docSize, exploreData, shuffleArrayOfObjects, GetMixData, mixData }}>
            {children}
        </FirebaseContext.Provider>
    )
}

// Initialize Firebase