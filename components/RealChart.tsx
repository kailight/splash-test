import React, {useEffect, useState} from "react";
import styles from './RealChart.module.scss'

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Chart as LineChart } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement );

interface RealChartProps {
  // onChat: (name:string) => unknown
}

import { socket } from "@/socket";

export default function Chart() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([] as Array<any>);

  socket.connect()

  useEffect(() => {

    function onConnect() {
      console.info('connected');
      socket.emit("events", "test");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.info('disconnected');
      setIsConnected(false);
    }

    function onFooEvent(value:any) {
      setFooEvents( (previous:any) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };

  })

  const labels = [
    0,1,2,3,4,5,6,7,8,9,10
  ]

  /*
  const options = {
    interaction: {
      intersect: false
    },
    plugins: {
      legend: false
    },
    scales: {
      x: {
        type: 'linear'
      }
    }
  }
  */

  const options = {
    animation: false,
    plugins: {
      legend: false
    },
    scales: {
      x: {
        type: 'linear'
      }
    },
  }

  const [values, setValues] = useState( [0,0,0,0,0,0,0,0,0,0] )

  let counter = 1

  let interval:any = undefined

  /*
  interval = setInterval( () => {
    const nextVal = [0,1,2,3,4,5,6,7,8,9,10].at(counter) as number
    console.info('nextVal', nextVal);
    const newVals = [...values]
    newVals[counter] = nextVal
    console.info(newVals);
    // setValues(newVals)
    counter++
    if (counter === 10) {
      stop()
    }
  }, 1000 )
  */

  const stop = () => {
    clearInterval(interval)
  }

  const datasets = [
    {
      label: 'Test',
      data: values,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ]

  const [data,setData] = useState(
    {
      labels,
      datasets
    }
  )

  useEffect(() => {
    setData({
      labels,
      datasets
    })
  }, [values])

  const doChat = () => {
    console.info('doChat()', name);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.multiplier}>100x</div>
      <LineChart type='line' options={options} data={data}></LineChart>
    </div>
  )

}