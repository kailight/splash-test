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
  const [rawData, setRawData] = useState([] as Array<any>);
  const [rawValues, setRawValues] = useState([0] as Array<any>);
  const [rawLabels, setRawLabels] = useState([0] as Array<any>);
  const [labels, setLabels] = useState([0] as Array<any>);
  const [counter, setCounter] = useState(0)
  const [mult, setMult] = useState(0)

  socket.connect()

  useEffect(() => {

    function onConnect() {
      console.info('connected');
      const foo = socket.emit("events", "test", (data:any) => {
        console.info(data);
      });
      console.info('foo', foo);
      setIsConnected(true);
    }

    function onDisconnect() {
      console.info('disconnected');
      setIsConnected(false);
    }

    function onSocketDataEvent(value:number) {
      console.info('onSocketDataEvent', value);
      setRawValues((previous:any) => [...previous, value])
      const arr = new Array(rawValues.length).keys()
      // @ts-ignore
      const filler = [...arr] as Array<any>
      setRawLabels( filler )
      // setRawData( (previous:any) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('data', onSocketDataEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('data', onSocketDataEvent);
    };

  })

  let timeout:any
  /*
  useEffect( () => {

    const stop = () => {
      clearTimeout(timeout)
    }

    timeout = setTimeout( () => {
      const nextVal = [0,1,2,3,4,5,6,7,8,9,10].at(counter) as number
      if (nextVal === undefined) {
        stop()
        return
      }
      console.info('nextVal', nextVal);
      setRawValues((previous:any) => [...previous, nextVal])
      console.info('rawValues', rawValues);
      if (counter >= 10) {
        stop()
        return
      }
      setCounter(counter+1)

    }, 1000 )
  }, [counter])
  */

  useEffect( () => {
    setValues(rawValues)
    setLabels(rawLabels)
    setMult((rawValues.at(-1) / 100) || 0)
    console.info(rawValues);
  }, [rawValues,rawLabels] )

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

  const [values, setValues] = useState( [] as Array<any> )

  let interval:any = undefined

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
      <div className={styles.multiplier}>{mult}x</div>
      <LineChart type='line' options={options} data={data}></LineChart>
    </div>
  )

}