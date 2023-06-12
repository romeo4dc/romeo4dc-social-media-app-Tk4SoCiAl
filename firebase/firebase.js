import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, uploadBytes, } from 'firebase/storage'
import { createContext, useContext, useEffect, useState } from "react";
import { FieldValue, addDoc, collection, deleteField, doc, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, linkWithCredential, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useSocial } from "@/context/Context";
import { addSyntheticLeadingComment } from "typescript";
import { useRef } from "react";
import { getDatabase } from "firebase/database";

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
export const auth = getAuth();
const firestore = getFirestore();
const db = getFirestore()
export const database = getDatabase();
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext)
export const FirebaseProvider = ({ children }) => {
    const [files, setFiles] = useState(null);
    const [videoFiles, setVideoFiles] = useState(null);
    const [postContent, setPostContent] = useState(null)
    const [uploading, setUploading] = useState(false);
    const [videoData, setVideoData] = useState();
    const [postsData, setPostsData] = useState();
    const [postsId, setPostsId] = useState(null);
    const [mixData, setMixData] = useState();
    const [docSize, setDocSize] = useState();
    const [exploreData, setExploreData] = useState();
    const [audiosData, setAudiosData] = useState();
    const [myStoriesData, setMyStoriesData] = useState();
    const [bookMark, setBookMark] = useState(false);
    const [textAreaCounter, setTextAreaCounter] = useState(0)
    const [nickNameCounter, setNickNameCounter] = useState(0)
    const [textAreaValue, setTextAreaValue] = useState("");
    const [nickNameValue, setNickNameValue] = useState("");
    const [gradientBackground, setGradientBackground] = useState();
    const [userDetails, setUserDetails] = useState(null);
    const [commentsData, setCommentsdata] = useState("");
    const [commentsCollectionName, setCommentsCollectionName] = useState("random");
    const [postCommentsText, setPostCommentText] = useState("");
    const [commentsDocSize, setCommentsDocSize] = useState(null);
    const [commentSend, setCommentSend] = useState(false)
    const [isCommentUser, setIsCommentUser] = useState(true)
    const [isMessageUser, setIsMessageUser] = useState(true);
    const [senderMessageValue, setSenderMessageValue] = useState("");
    const [postCommentTimeStamp, setPostCommentTimeStamp] = useState();
    const [replyCommentsData, setReplyCommentsData] = useState("");
    const [replyPostTimeStamp, setReplyPostTimeStamp] = useState("");
    const [userUid, setUserUid] = useState();
    const [postTime, setPostTime] = useState(null);
    const [replyPostTime, setReplyPostTime] = useState(null);
    const [docId, setDocId] = useState();
    const [selectedPost, setSelectedPost] = useState("");
    const [isPostSelector, setIsPostSelector] = useState(false);
    const [isPostVideo, setIsPostVideo] = useState(false);
    const [messages, setMessages] = useState();
    const [msgDocSize, setMsgDocSize] = useState(null);
    const [lastMessage, setLastMessage] = useState("");
    const [postUsername, setPostUserName] = useState(null);
    const [postImage, setPostImage] = useState(null);
    const [msg, setMsg] = useState('');

    const currentDate = new Date();
    const milliSeconds = currentDate.getTime();
    const currentTime = currentDate.toString();
    const hrs = currentDate.getHours();
    const min = currentDate.getMinutes();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getUTCFullYear();
    let date = `${day}/${month}/${year}`;
    let timeStamp = `${hrs}:${min < 10 ? "0" : ""}${min}` + `${hrs < 12 ? "AM" : "PM"}`;

    const fSizes = [
        '80%',
        '90%',
        '100%',
        '105%',
        "110%"
    ]
    const HandleFileChange = async (e) => {
        setIsPostSelector(true)
        setIsPostVideo(false)
        UploadLoading()

        const file = e.target.files[0];
        setSelectedPost(file);

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
        setIsPostSelector(true)
        setIsPostVideo(true)
        const fileInput = document.getElementById('video');
        const file = fileInput.files[0];
        setSelectedPost(file);

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
                setPostsId(data.id)
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

    const GetAllAudiosData = () => {
        const audioPost = onSnapshot(query(collection(db, 'allaudios')), (snapshot) => {
            const aData = [];
            snapshot.forEach((data) => {
                aData.push(data.data())
            })
            setAudiosData(aData)
        })
        return () => audioPost();
    }
    const GetMixData = () => {
        const db = getFirestore();
        const mixPost = onSnapshot(query(collection(db, 'mix'), orderBy("id", "desc")), (snapshot) => {
            const mData = [];
            snapshot.forEach((data) => {
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

        const shuffleVideos = shuffleArrayOfObjects(snapVid.docs.map(doc => doc.data()));
        setExploreData(shuffleArrayOfObjects([...shufflePosts, ...shuffleVideos]))

    }

    const StoriesData = async () => {
        try {
            const storyData = onSnapshot(query(collection(db, "stories")), (snap) => {

                const sData = [];
                snap.forEach((data) => {
                    sData.push(data.data());
                });
                setMyStoriesData(sData);
            })
        }
        catch (err) {
            console.log(err)
        }
        return () => storyData();
    }

    const userData = () => {
        const user = onSnapshot(query(collection(db, 'userdata')), (snap) => {
            const docRef = doc(collection(db, 'userdata'), 'qERpgwyZma8JLtOYUuwv');
            onSnapshot(docRef, (doc) => {
                setUserDetails(doc.data())
            })
        })
    }

    const savedItems = async () => {
        let post = document.querySelector('.imagePosts')
        const q = query(collection(db, "posts"), where("file", "==", post.src))
        const snap = await getDocs(q)
        const docId = snap.docs[0].id;
        const docRef = doc(db, 'posts', docId);
        await updateDoc(docRef, { preference: "saved" })
        setBookMark(true)
    }

    const postSavedItems = async () =>{
        let post = document.querySelector('.postimg')
        const q = query(collection(db, "posts"), where("file", "==", post.src))
        const snap = await getDocs(q)
        const docId = snap.docs[0].id;
        const docRef = doc(db, 'posts', docId);
        await updateDoc(docRef, { preference: "saved" })
        setBookMark(true)
    }

    const removeSavedItems = async () => {
        let post = document.querySelector('.imagePosts')
        const q = query(collection(db, "posts"), where("file", "==", post.src))
        const snap = await getDocs(q);
        const docId = snap.docs[0].id;
        const docRef = doc(db, 'posts', docId);
        await updateDoc(docRef, { preference: deleteField() })
        setBookMark(false)
    }

    const removePostSavedItems=async()=>{
        let post = document.querySelector('.postimg')
        const q = query(collection(db, "posts"), where("file", "==", post.src))
        const snap = await getDocs(q);
        const docId = snap.docs[0].id;
        const docRef = doc(db, 'posts', docId);
        await updateDoc(docRef, { preference: deleteField() })
        setBookMark(false)
    }

    const postReelsItems = async () =>{
        let post = document.querySelector('.reelsvideo')
        const q = query(collection(db, "videos"), where("file", "==", post.src))
        const snap = await getDocs(q)
        const docId = snap.docs[0].id;
        const docRef = doc(db, 'videos', docId);
        await updateDoc(docRef, { preference: "savedReel" })
        setBookMark(true)
    }
    const removeReelSavedItems=async()=>{
        let post = document.querySelector('..reelsvideo')
        const q = query(collection(db, "videos"), where("file", "==", post.src))
        const snap = await getDocs(q);
        const docId = snap.docs[0].id;
        const docRef = doc(db, 'videos', docId);
        await updateDoc(docRef, { preference: deleteField() })
        setBookMark(false)
    }

    const uploadToFirestore = async (e) => {
        const file = e.target.files[0];
        const filename = file.name;
        const fp = "user";

        // !Upload the file to Firebase Storage
        const storageRef = ref(storage, `${fp}/${filename}`);
        await uploadBytes(storageRef, file)

        //  !Get Document
        try {
            const downloadURL = await getDownloadURL(storageRef)

            //!Update document in the specified collection
            const docRef = doc(firestore, 'userdata', 'qERpgwyZma8JLtOYUuwv')

            await updateDoc(docRef, {
                userimg: downloadURL
            })
        } catch (err) {
            console.log(err)
        }
    }

    const uplaodBgToFirestore = async (e) => {
        const file = e.target.files[0];
        const filename = file.name;
        const fp = "userbg";

        // !Upload the file to Firebase Storage
        const storageRef = ref(storage, `${fp}/${filename}`);
        await uploadBytes(storageRef, file)

        //  !Get Document
        try {
            const downloadURL = await getDownloadURL(storageRef)
            
            //!Update document in the specified collection
            const docRef = doc(firestore, 'userdata', 'user-background')
            await updateDoc(docRef, {
                backgroundImg: `url(${downloadURL})no-repeat center center/cover`
            })
            document.documentElement.style.setProperty('--background-img', `url(${downloadURL})no-repeat center center/cover`);
        } catch (err) {
            console.log(err)
        }
    }
    const getBackgroundImage = async () => {
        const user = onSnapshot(query(collection(db, 'userdata')), (snap) => {
            const docRef = doc(collection(db, 'userdata'), 'user-background');
            onSnapshot(docRef, (doc) => {
                document.documentElement.style.setProperty('--background-img', doc.data().backgroundImg);
            })
        })
    }
    const textArea = (e) => {
        setTextAreaCounter(e.target.value.length)
        setTextAreaValue(e.target.value)
    }

    const setNickName = (e) => {
        setNickNameCounter(e.target.value.length)
        setNickNameValue(e.target.value)
    }

    const updateUserDetails = async () => {
        const docRef = doc(firestore, 'userdata', 'qERpgwyZma8JLtOYUuwv')
        await updateDoc(docRef, {
            username: nickNameValue,
            userbio: textAreaValue
        })
        setNickNameValue('')
        setTextAreaValue('')
    }

    const getGradientData = () => {
        const db = getFirestore();
        const docRef = doc(collection(db, 'userdata'), 'gradients_of_user');
        onSnapshot(docRef, (doc) => {
            document.documentElement.style.setProperty('--button-gradient', `${doc.data().background}`);
            setGradientBackground(doc.data().background)
        })
    }

    const getFontsSizeData = () => {
        const db = getFirestore();
        let html = document.querySelector('html');
        const docRef = doc(collection(db, 'userdata'), 'fontsizes_of_user');
        onSnapshot(docRef, (doc) => {
            html.style.fontSize = doc.data().fontsize;
        })
    }
    // !ColorCircles
    const removeCcircles = () => {
        document.querySelectorAll('.colors-circle').forEach((fcircles) => {
            fcircles.classList.remove('circle-active')
        })
    }

    // !FontSizes
    const removeFcircles = () => {
        document.querySelectorAll('.font-circles').forEach((fcircles) => {
            fcircles.classList.remove('font-active')
        })
    }

    const setColorSizes = (e) => {
        if (e.target.classList.contains('colors-circle')) {
            const docRef = doc(firestore, 'userdata', 'gradients_of_user')
            updateDoc(docRef, {
                background: e.target.style.background
            })
        }
        let colorCircles = document.querySelectorAll('.colors-circle')
        for (let i = 0; i <= colorCircles.length; i++) {
            if (parseInt(e.target.getAttribute("data-name")) === i + 1) {
                removeCcircles()
                colorCircles[i].classList.add('circle-active')
            }
        }
        return getGradientData()
    }

    const setFontSizes = (e) => {
        let fontCircles = document.querySelectorAll('.font-circles');
        if (e.target.classList.contains('font-circles')) {
            for (let i = 0; i < fontCircles.length; i++) {
                if (parseInt(e.target.getAttribute("data-name")) === i + 1) {
                    const docRef = doc(firestore, 'userdata', 'fontsizes_of_user')
                    updateDoc(docRef, {
                        fontsize: fSizes[i]
                    })
                }
            }
        }
        for (let i = 0; i <= fontCircles.length; i++) {
            if (parseInt(e.target.getAttribute("data-name")) === i + 1) {
                removeFcircles()
                fontCircles[i].classList.add('font-active')
            }
        }
        return getFontsSizeData()
    }

    const getThemesData = () => {
        const docRef = doc(collection(db, 'userdata'), 'usercolor');
        onSnapshot(docRef, (doc) => {
            document.documentElement.style.setProperty('--theme-background', doc.data().themeBackground);
            document.documentElement.style.setProperty('--black-color', doc.data().fontColor);
            document.documentElement.style.setProperty('--white-color', doc.data().fontColor);
        })
    }

    const darkTheme = async () => {
        const docRef = doc(firestore, 'userdata', 'usercolor')
        await updateDoc(docRef, {
            themeBackground: '#0D0D0D',
            fontColor: '#fff',
        })
        const bgDocRef = doc(firestore, 'userdata', 'user-background')
        await updateDoc(bgDocRef, {
            backgroundImg: '#0D0D0D'
        })
        document.querySelectorAll('.userProfileImg').forEach((filter) => filter.style.filter = "invert(1)");
    }

    const lightTheme = async () => {
        const docRef = doc(firestore, 'userdata', 'usercolor')
        await updateDoc(docRef, {
            themeBackground: 'rgb(236, 236, 236)',
            fontColor: '#000',
        })
        const bgDocRef = doc(firestore, 'userdata', 'user-background')
        await updateDoc(bgDocRef, {
            backgroundImg: 'rgb(236, 236, 236)'
        })
        document.querySelectorAll('.userProfileImg').forEach((filter) => filter.style.filter = "unset");
    }

    const getCommentsData = () => {
        const commentsData = onSnapshot(query(collection(db, commentsCollectionName), orderBy("id", "asc")), (snapshot) => {
            const cData = [];
            snapshot.forEach((doc) => {
                cData.push(doc.data());
                setPostCommentTimeStamp(doc.data().timeStamp)
            });
            setCommentsdata(cData);
            getCommentPostTiming()
        });
        return () => commentsData();
    }

    const getCommmentsCollectionSize = async () => {
        try {
            const querySnapShot = await getDocs(collection(firestore, commentsCollectionName))
            const count = querySnapShot.size;
            setCommentsDocSize(count + 1);

        } catch (err) {
            console.log(err)
        }
    }
    const commentPostInput = (e) => {
        setPostCommentText(e.target.value);
    }

    const postCommentsBtn = async () => {
        
        setCommentSend(true)
        try {
            setCommentsDocSize(commentsDocSize + 1)
            const docRef = doc(firestore, commentsCollectionName, `user${commentsDocSize}`);
            await setDoc(docRef, {
                comments: postCommentsText,
                likes: '',
                replyComments: '',
                replyUser: '',
                user: 'Random',
                id: milliSeconds,
                timeStamp: currentTime
            })
            setPostCommentText("")
            setCommentSend(false)
        } catch (err) {
            console.log("There is an error while creating a comment", err);
        }

    }

    const [tinyVideoImg, setTinyVideoImg] = useState(null);
    const createPostsCollection = async (e) => {
        let name = e.target.getAttribute('data-name');
        setCommentsCollectionName(`users${name}`)
        let username = e.target.getAttribute('username')
        setPostUserName(username)
        let userImg = e.target.getAttribute('image')        
        setPostImage(userImg)
        let tinyVideoImg = e.target.getAttribute('vidtiny');
        // console.log(tinyVideoImg)
        setTinyVideoImg(tinyVideoImg)
        try {
            collection(db, `users${name}`)
        } catch (err) {
            console.log(err)
        }
    }

    const postReplyCommentBtn = async () => {
        setIsCommentUser(true)
        setCommentSend(true)
        try {
            const docRef = doc(db, commentsCollectionName, docId)

            const subCollectionRef = collection(docRef, "replyUsers")

            const subDocumentRef = doc(subCollectionRef, `user${commentsDocSize}`)

            await setDoc(subDocumentRef, {
                user: 'Random',
                comment: postCommentsText,
                timeStamp: currentTime,
            })
            setPostCommentText("")
            setCommentSend(false)
        } catch (err) {
            console.log(err)
        }
    }


    const replyComment = async (e) => {
        
        setIsCommentUser(false)

        let attr = parseInt(e.target.getAttribute("data-name"));
        

        setPostCommentText("How are you doing!");
        try {
            const querySnapShot = await getDocs(query(collection(db, commentsCollectionName), where("id", "==", attr)))

            setDocId(querySnapShot.docs[0].id);

        } catch (err) {
            console.log(err)
        }
    }


    const getSubCollectionData = async (e) => {
        let attr = parseInt(e.target.getAttribute("data-name"))
        
        try {
            const querySnapShot = await getDocs(query(collection(db, commentsCollectionName), where("id", "==", attr)))

            const docId = querySnapShot.docs[0].id;

            const docRef = doc(db, commentsCollectionName, docId)

            const subCollectionRef = collection(docRef, "replyUsers")

            const q = await getDocs(subCollectionRef);
            const cData = [];
            q.forEach((doc) => {
                cData.push(doc.data());
                setReplyPostTimeStamp(doc.data().timeStamp)
            });
            setReplyCommentsData(cData);
        } catch (err) {
            console.log(err)
        }
    }

    const getCommentPostTiming = () => {
        const currentDate = new Date();
        const previousDate = new Date(postCommentTimeStamp);
        const timeDiff = currentDate.getTime() - previousDate.getTime();
        const sec = Math.floor(timeDiff / 1000);
        const min = Math.floor(sec / 60);
        const hrs = Math.floor(min / 60);
        const days = Math.floor(hrs / 24)
        const weeks = Math.floor(days / 7);

        if (weeks > 0) {
            setPostTime(`${weeks} w${weeks > 1 ? 's' : ''}`)
        } else if (days > 0) {
            setPostTime(`${days} day${days > 1 ? 's' : ''}`)
        } else if (hrs > 0) {
            setPostTime(`${hrs} hr${hrs > 1 ? 's' : ''}`);
        } else if (min > 0) {
            setPostTime(`${min} min${min > 1 ? 's' : ''}`);
        } else {
            setPostTime('now')
        }
    }

    const getReplyPostTiming = () => {
        const currentDate = new Date();
        const previousDate = new Date(replyPostTimeStamp);
        const timeDiff = currentDate.getTime() - previousDate.getTime();
        const sec = Math.floor(timeDiff / 1000);
        const min = Math.floor(sec / 60);
        const hrs = Math.floor(min / 60);
        const days = Math.floor(hrs / 24)
        const weeks = Math.floor(days / 7);

        if (weeks > 0) {
            setReplyPostTime(`${weeks} w${weeks > 1 ? 's' : ''}`)
        } else if (days > 0) {
            setReplyPostTime(`${days} day${days > 1 ? 's' : ''}`)
        } else if (hrs > 0) {
            setReplyPostTime(`${hrs} hr${hrs > 1 ? 's' : ''}`);
        } else if (min > 0) {
            setReplyPostTime(`${min} min${min > 1 ? 's' : ''}`);
        } else {
            setReplyPostTime('now')
        }
        
    }

    //    !Login Items   

    // ?SIGNUP WITH GOOGLE

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
        } catch (error) {
            console.log(error);
        }
    }

    // ?SIGNUP WITH GITHUB

    const signInWithGithub = async () => {
        const provider = new GithubAuthProvider();
        try{
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
          } catch (err) {
            console.error('GitHub login error:', err);
          }        
    }

    const getCurrentUser = () => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
            setUserUid(user.uid)
        }
        })
        return () => {
            unsubscribe();
        };
    }

    const MessageUser = async (e) => {
        getCurrentUser()
        setIsMessageUser(true)
    }

    const getChatsData = async () => {
        const messagesRef = collection(db, 'messages');
        const messageQuery = query(messagesRef, orderBy('createdAt'), limit(50));
        onSnapshot(messageQuery, (snapshot) => {
            const mData = snapshot.docs.map((doc) => doc.data());
            setMessages(mData);            
            let size = parseInt(snapshot.size);
            setMsgDocSize(size)
        })
        const q = await getDocs(messageQuery)
        if(msgDocSize){
        const lastDocument = q.docs[msgDocSize - 1];        
        setLastMessage(lastDocument.data())
     }
    }

    const sendMessage=async(e)=>{
        e.preventDefault();
        const { uid , photoURL } = auth.currentUser;
        
        const messagesRef = collection(db, 'messages');
        await addDoc(messagesRef, {
          text:msg,
          photoURL:photoURL,
          uid,
          createdAt:milliSeconds,
          date:`${date+", "+timeStamp}`     
        });
        setMsg("");
       }

    return (
        <FirebaseContext.Provider value={{ HandleFileChange, firestore, files, storage, postContent, postsId, db, HandleVideoChange, videoFiles, setUploading, uploading, videoData, GetVideosData, GetPostsData, postsData, GetExploreData, docSize, exploreData, shuffleArrayOfObjects, GetMixData, mixData, StoriesData, myStoriesData, savedItems, removeSavedItems, bookMark, GetAllAudiosData, audiosData, userData, updateUserDetails, uploadToFirestore, textArea, setNickName, nickNameValue, textAreaValue, nickNameCounter, textAreaCounter, setColorSizes, setFontSizes, getGradientData, gradientBackground, getFontsSizeData, uplaodBgToFirestore, getBackgroundImage, userDetails, lightTheme, darkTheme, getThemesData, getCommentsData, commentsData, commentPostInput, postCommentsBtn, getCommmentsCollectionSize, postCommentsText, createPostsCollection, commentSend, getCommentPostTiming, postTime, replyComment, isCommentUser, postReplyCommentBtn, getSubCollectionData, replyCommentsData, getReplyPostTiming, replyPostTime, signInWithGoogle, getCurrentUser, MessageUser, isMessageUser, senderMessageValue, setSenderMessageValue, getChatsData, messages, sendMessage, setMsg, msg, selectedPost, setIsPostSelector, isPostSelector, isPostVideo, lastMessage, postUsername, postImage, signInWithGithub, postSavedItems, removePostSavedItems, removeReelSavedItems, postReelsItems, tinyVideoImg
         }}>
            {children}
        </FirebaseContext.Provider>
    )
}

// Initialize Firebase