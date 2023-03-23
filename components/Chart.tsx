import React, { useState } from "react";
import styles from './chart.module.scss'
import RealChart from './RealChart'

interface ChartProps {
  // onChart: (name:string) => unknown
}

export default function Chart() {

  const doChart = () => {
    console.info('doChart()', name);
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.statsWrapper}>
          <div>
            900
          </div>
          <div>
            Thomas
          </div>
          <div>
            10:30
          </div>
        </div>
        <div className={styles.chartWrapper}>
          <RealChart></RealChart>
        </div>
      </div>
  )

}