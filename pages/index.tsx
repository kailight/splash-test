import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import stylesLayout from '@/styles/Layout.module.scss'
import {useState} from "react";

import Login from "@/components/Login";
import Scoreboard from "@/components/Scoreboard";
import Ranking from "@/components/Ranking";
import Chat from "@/components/Chat";
import Chart from "@/components/Chart";

const inter = Inter({ subsets: ['latin'] })


interface User {
  name: string,
  loggedIn: boolean
}

export default function Home() {

  const [user, setUser] = useState<User>({ name: '', loggedIn: false })

  const preSetUser = (name:string) => {
    if (name.length < 3) {
      alert('Name is too short')
      return
    }
    setUser({ loggedIn: true, name })
  }

  const preStartApp = (points:number, multiplier:number) => {
    console.info('preStartApp()', points, multiplier);
  }

  function LoginOrScoreboard() {
    if (user.loggedIn) {
      return (
        <Scoreboard onStart={preStartApp}></Scoreboard>
      )
    }
    return (
      <Login onLogin={(name:string) => preSetUser(name)}></Login>
    )
  }

  return (
    <>
      <Head>
        <title>Splash Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={stylesLayout.main}>
        <div className={stylesLayout.topLeft}>
          <LoginOrScoreboard></LoginOrScoreboard>
        </div>
        <div className={stylesLayout.topRight}>
          <Chart></Chart>
        </div>
        <div className={stylesLayout.bottomLeft}>
          <Ranking></Ranking>
        </div>
        <div className={stylesLayout.bottomRight}>
          <Chat></Chat>
        </div>
      </main>
    </>
  )
}
