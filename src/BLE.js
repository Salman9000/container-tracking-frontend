import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { http, localHttp } from "./http-common.js";
import CanvasJSReact from './canvasjs.react';
import { getToken } from "./util";

export default function BLE() {
  const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const location = useLocation();
  console.log(location)
  const [refreshDisabled, setRefreshDisable] = useState(true)
  const [execution, setExecution] = useState(false)
  // const [rssi, setRssi] = useState(measuredPower);
  // const [constantN, setCostantN] = useState(2);
  const [data, setData] = useState([]);

  const cancelSimulationById = async () => {
    setExecution(false)
    try {
      const res = await localHttp.post(`cancelSimulationById/${location.state}`)
      console.log(res.data);
      setRefreshDisable(true)
    } catch(e) {
      console.log(e);
    }
  }
  const executeRepeatFunction = async () => {
    setExecution(true)
    setRefreshDisable(true)
    console.log("here")
    console.log(data)
    setTimeout(() => {
      setRefreshDisable(false)
    }, data.intervalTime);
    try {
      await localHttp.post(`simulateById/${location.state}`)
    } catch(e) {
      console.log(e);
    }
    
  }
  const getBle = async () => {
    try {
      console.log(location.state)
      const res = await http.get(`sensor/get/data/${location.state}`);
      console.log(res.data[res.data.length-1])
      setData(res.data[res.data.length-1]);
    } catch (e) {
      console.log(e);
    }
  }
const getZone = (data) => {
  const x = data?.angleRoll
  const y = data?.anglePitch
  if(x>0 && y>0) {
    return "Zone A"
  } else if(x<0 && y>0) {
    return "Zone B"
  } else if(x<0 && y<0) {
    return "Zone C"
  } else {
    return "Zone D"
  }
}

const refreshData = () => {
  setRefreshDisable(true)
  getBle()
  setTimeout(() => {
      setRefreshDisable(false)
  }, data.intervalTime);
}

  useEffect(() => {   
      getBle()
  }, []);

  let options = {
    theme: "light2",
    // height:1000,
    // width: 1000,
    animationEnabled: true,
    zoomEnabled: true,
    axisX: {
      minimum: -180,
      maximum: 180,
      interval: 10,
      title: "Pitch",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY:{
      minimum: -90,
      maximum: 90,
      interval: 10,
      title: "Roll",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    data: [{
      type: "scatter",
      markerSize: 15,
      toolTipContent: "X: {x} Y: {y}",
      dataPoints: [
        { x: data?.angleRoll, y: data?.anglePitch},
      ]
    }]
  }
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          BLE details
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data?.sensor?.name}
            </dd>
          </div>
          {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Tx Power Level
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data?.powerLevel}
            </dd>
          </div> */}
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Interval Time (ms)
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data?.intervalTime}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Range (m)</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data?.range}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Measured Power
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data?.measuredPower}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Angle Pitch</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data?.anglePitch}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Angle Roll</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data?.angleRoll}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Movement Count</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data?.movementCount}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Battery Voltage</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data?.batteryVoltage}
            </dd>
          </div>
          {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">RSSI</dt>
            <input
              type="text"
              name="password"
              id="password"
              autoComplete="password"
              value={rssi}
              onChange={(e) => {
                setExecution(false);
                setRssi(e.target.value);
              }}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{rssi}</dd>
          </div> */}
        {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Consant N</dt>
            <input
              type="text"
              name="password"
              id="password"
              autoComplete="password"
              value={constantN}
              onChange={(e) => {
                setExecution(false);
                setCostantN(e.target.value);
              }}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
          </div> */}
          {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Distance Caluclator
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              1data.0 ^ ((Measured Power – RSSI)/(10 * N))
            </dd>
          </div> */}
        </dl>

        {/* <div className="p-4">
          {data.length > 0 &&
            data.map((value, index) => {
              const denominator = 10 * constantN;
              const numerator = value.measuredPower - rssi;
              const num = numerator / denominator;
              const distance = Math.pow(10, num);
              return (
                <p key={index}>
                  {++index}). The distance to beacon {value.name} is {distance}m
                </p>
              );
            })}
        </div> */}
         <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Zone</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {getZone(data)}
            </dd>
          </div>
      </div>

      <div className="pt-4 pb-8">
        <div className="flex justify-center items-center">
          <button
            onClick={() => cancelSimulationById()}
            type="button"
            className="bg-white py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={() => executeRepeatFunction()}
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Execute
          </button>
          <button
            onClick={() => refreshData()}
            type="button"
            disabled={refreshDisabled}
            className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${refreshDisabled && "bg-blue-400 hover:cursor-disable disabled:cursor-not-allowed"}`}
          >
            Refresh
          </button>
          {execution && <div className="ml-2 p-2 bg-yellow-200 border border-yellow-500 rounded-lg">Execution in process</div>}
          {!refreshDisabled && <div className="ml-2 p-2 bg-green-200 border border-green-500 rounded-lg">New Data available</div>}
        </div>
      </div>
      <div className="w-3/4">
      <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
        </div>
    </div>
  );
}
