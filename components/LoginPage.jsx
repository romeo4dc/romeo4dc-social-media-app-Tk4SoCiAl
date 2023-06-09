import Image from "next/image";
import { useState, useEffect, useLayoutEffect } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "./schemas";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useFirebase } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { useSocial } from "@/context/Context";

const auth = getAuth();

const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
};

export const LoginPage = () => {
    
    const [signInEmail, setSignInEmail] = useState(null);
    const [signInPassword, setSignInPassword] = useState(null);
    const [isMode, setIsMode] = useState(true);
    
    const router = useRouter();
    const fb = useFirebase();
    const{ signInWithGoogle, signInWithGithub } = fb;
    const context = useSocial();

    useLayoutEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((user)=>{
        user && router.push("/")
      })
      return () => {
        unsubscribe();
      };
    },[])

    const signInUser=(e)=>{
        e.preventDefault();
        console.log(signInEmail, signInPassword)
        signInWithEmailAndPassword(auth, signInEmail, signInPassword).then((value)=>console.log("sign in success",value)).catch((err)=>console.log(err));
    }
    
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema : signUpSchema,
        onSubmit: (values) => {
            resetForm()
            console.log("🚀 ~ file: LoginPage.jsx:12 ~ LoginPage ~ values:", values)

            //?SIGNUP WITH EMAIL AND PASSWORD
            createUserWithEmailAndPassword(auth, values.email, values.password, values.username).then((response)=>{
                const user = response.user;
                updateProfile(user, {
                    displayName: values.username,
                    photoURL:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
                })
                router.push("/")
            })
        }
    })

    
    return (
        <div className={isMode ? `loginpage-container` : `loginpage-container sign-up-mode`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={signInUser} className="sign-in-form">
                        <h2 className="title">Sign In</h2>

                        <div className="input-field">
                            <Image src={`/assets/user.svg`} 
                            height={20} 
                            width={20} 
                            alt="user" />
                            <input 
                            type="email" 
                            placeholder="Email" 
                            onChange={(e)=>setSignInEmail(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <Image src={`/assets/lock.svg`} 
                            height={20} 
                            width={20} 
                            alt="lock" />
                            <input 
                            type="password" 
                            placeholder="password" 
                            onChange={(e)=>setSignInPassword(e.target.value)}/>
                        </div>

                        <button type="submit" className="btn solid">login</button>

                        <p className="social-text">Or Sign in with social platform</p>
                        <div className="social-media">
                            <div className="social-icons" onClick={signInWithGoogle}>
                                <Image src={`/assets/google.svg`} 
                                height={30} 
                                width={30} 
                                alt="fb" />
                            </div>
                            <div className="social-icons" onClick={signInWithGithub}>
                                <Image 
                                src={`/assets/github.svg`} 
                                height={30} 
                                width={30} 
                                alt="fb.svg" />
                            </div>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit} className="sign-up-form">
                        <h2 className="title">Sign Up</h2>
                        <div className="input-field">
                            <Image src={`/assets/user.svg`} 
                            height={20} 
                            width={20} 
                            alt="user" />
                            <input
                                type="text"
                                autoComplete="off"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                                { errors.username && touched.username ? <p>{errors.username}</p> : null}
                        </div>
                        <div className="input-field">
                            <Image src={`/assets/email.svg`} height={20} width={20} alt="email" />
                            <input
                                type="email"
                                autoComplete="off"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                                { errors.email && touched.email && <p>{errors.email}</p> }
                        </div>

                        <div className="input-field">
                            <Image src={`/assets/lock.svg`} height={20} width={20} alt="lock" />
                            <input
                                type="password"
                                autoComplete="off"
                                id="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                                { errors.password && touched.password && <p className="password-error">{errors.password}</p> }
                        </div>

                        <div className="input-field">
                            <Image src={`/assets/lock.svg`} height={20} width={20} alt="lock" />
                            <input
                                type="password"
                                autoComplete="off"
                                name="confirm_password"                               
                                id="confirm_password"
                                placeholder="Confirm Password"
                                value={values.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                                { errors.confirm_password && touched.confirm_password && <p>{errors.confirm_password}</p> }
                        </div>

                        <button type="submit" className="btn solid">Sign up</button>
                        <p className="social-text">Or Sign up with social platform</p>
                        <div className="social-media">
                            <div className="social-icons" onClick={signInWithGoogle}>
                                <Image 
                                src={`/assets/google.svg`} 
                                height={30} 
                                width={30} 
                                alt="fb" />
                            </div>
                            <div className="social-icons" onClick={signInWithGithub}>
                                <Image 
                                src={`/assets/github.svg`} 
                                height={30} 
                                width={30} 
                                alt="fb.svg" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>  Ready to join our community? Sign up now to unlock exclusive benefits and access to premium features. By creating an account, you'll be able to personalize your experience, save your preferences, and enjoy a seamless browsing experience.</p>
                        <button 
                        className="btn transparent" 
                        id="sign-up-btn" 
                        onClick={() => setIsMode(false)}>Sign up</button>
                    </div>                    
                    <div className="slideshow">
                    <video src="assets/pcrealvideo.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    alt="" />
                    </div>
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>  Welcome to our website! We are dedicated to providing the best user experience and top-notch services. Our team of experts is here to assist you every step of the way. Whether you have questions, need assistance, or simply want to explore our wide range of products, we've got you covered.</p>
                        <button 
                        className="btn transparent" 
                        id="sign-in-btn" 
                        onClick={() => setIsMode(true)}>Sign in</button>
                    </div>
                    <div 
                    className="slideshow moboslide" 
                    style={{display: !isMode ? "flex" : "none"}}>
                    <video 
                    src="assets/mvideo.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}