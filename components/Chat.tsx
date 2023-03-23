import React, { useState } from "react";
import styles from './Chat.module.scss'

interface ChatProps {
  // onChat: (name:string) => unknown
}

export default function Chat() {

  const doChat = () => {
    console.info('doChat()', name);
  }

  return (
      <div className={styles.wrapper}>
        <div className='section-title'>Chat</div>
        <div>Todo</div>
      </div>
  )

}