import '@/styles/globals.css'
import '@/styles/Home.module.css'
import '@/styles/header.scss';
import '@/styles/leftbar.scss';
import '@/styles/mainbar.scss';
import '@/styles/rightbar.scss';
import '@/styles/post.scss';
import '@/styles/reels.scss';
import '@/styles/explore.scss';
import '@/styles/postpopup.scss';
import { SocialProvider } from '@/context/Context';
import type { AppProps } from 'next/app'
import { FirebaseProvider } from '@/firebase/firebase';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocialProvider>
      <FirebaseProvider>
  <Component {...pageProps} />
  </FirebaseProvider>
  </SocialProvider>
  )
}
