import React, { useState } from "react";
import styles from './ranking.module.scss'

interface RankingProps {
  // onRanking: (name:string) => unknown
}

export default function Ranking() {

  const doRanking = () => {
    console.info('doRanking()', name);
  }

  return (
      <div className={styles.wrapper}>
        <div className='section-title'>Current Round</div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>No.</th><th>Name</th><th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td><td>-</td><td>-</td>
            </tr>
            <tr>
              <td>2</td><td>-</td><td>-</td>
            </tr>
            <tr>
              <td>3</td><td>-</td><td>-</td>
            </tr>
            <tr>
              <td>4</td><td>-</td><td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
  )

}