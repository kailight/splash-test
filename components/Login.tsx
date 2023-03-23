import React, { useState } from "react";
import styles from './login.module.scss'

interface LoginProps {
  onLogin: (name:string) => unknown
}

export default function Login(props:LoginProps) {

  const [name, setName] = useState('');

  const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const doLogin = () => {
    console.info('doLogin()', name);
    props.onLogin(name)
  }

  return (
      <div className={styles.wrapper}>
        <h3 className={styles.welcome}>Welcome</h3>
        <form className={styles.form} onSubmit={(event)=>event.preventDefault()}>
          <div className={styles.title}>Please Enter Your Name</div>
          <input value={name} onChange={handleChange}/>
          <button onClick={() => doLogin()}>Accept</button>
        </form>
      </div>
  )

}