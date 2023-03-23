import React, { useState } from "react";
import styles from './scoreboard.module.scss'

interface ScoreboardProps {
  onStart: (points:number, multiplier:number) => unknown
}

export default function Scoreboard(props:ScoreboardProps) {

  const [points, setPoints] = useState(100)
  const [multiplier, setMultiplier] = useState(1.00)

  const increasePoints = () => {
    const newPoints = points+25;
    setPoints(newPoints);
  }

  const decreasePoints = () => {
    const newPoints = points-1 >= 100 ? points-25 : 100;
    setPoints(newPoints);
  }

  const increaseMultiplier = () => {
    const newMultiplier = multiplier+0.25;
    setMultiplier(newMultiplier);
  }

  const decreaseMultiplier = () => {
    const newMultiplier = multiplier-0.25 >= 1 ? multiplier-0.25 : 1;
    setMultiplier(newMultiplier);
  }

  const startApp = () => {
    console.info('startApp()');
    props.onStart(points, multiplier)
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.pointsWrapper}>
        <div className={styles.points}>
          <div className={styles.incdec} onClick={decreasePoints}>-</div>
          Points: {points}
          <div className={styles.incdec} onClick={increasePoints}>+</div>
        </div>
        <div className={styles.multiplier}>
          <div className={styles.incdec} onClick={decreaseMultiplier}>-</div>
          Multiplier: {multiplier}
          <div className={styles.incdec} onClick={increaseMultiplier}>+</div>
        </div>
      </div>

      <div>
        <button className='hl' onClick={startApp}>START</button>
      </div>

      <div className='section-title'>Current Round</div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td><td>Points</td><td>Multiplier</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td><td>-</td><td>-</td>
          </tr>
        </tbody>
      </table>

      <div className='section-title'>Speed</div>

      <div className={styles.table}>
        ToDo (always 1x)
      </div>

      <div>This is scoreboard</div>
    </div>
  )

}