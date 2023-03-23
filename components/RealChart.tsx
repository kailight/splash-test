import React, { useState } from "react";
import styles from './RealChart.module.scss'

interface ChatProps {
  // onChat: (name:string) => unknown
}

export default function Chat() {

  const doChat = () => {
    console.info('doChat()', name);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.multiplier}>100x</div>
    </div>
  )

}