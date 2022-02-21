import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "./http-common.js";

export default function ViewAll() {

  const [bleData, setData] = useState(null);
  const handleOnChange = (position) => {
    const updatedCheckedState = bleData.map((item, index) => {
      if(index===position) {
        item.checked = !item.checked
        return item;
      } else {
        return item
      }
    })
    console.log(updatedCheckedState)
    setData(updatedCheckedState);
  }
  const getAll = async () => {
    try {
      const res = await http.get("/sensor/all");
      const modifiedData = res.data.map(item => {return {...item, checked: false}})
      console.log(modifiedData)

      setData(modifiedData)
    } catch (e) {
      console.log(e)
    }
  }

  const repeatFunction = async () => {
    let checkedData = bleData.filter(item => item.checked == true)
    checkedData.map(async ble => {
      const res = await http.get(`/sensor/get/data/${ble.uid}`)
      const data = res.data[res.data.length-1]
      const res2 = await http.patch("sensor/update/data", {
        sensor: ble.uid,
        anglePitch: Math.floor(
          Math.random() * (data.anglePitchMax - data.anglePitchMin) +
            data.anglePitchMin
        ),
        angleRoll: Math.floor(
          Math.random() * (data.angleRollMax - data.angleRollMin) + data.angleRollMin
        ),
        movementCount: Math.floor(
          Math.random() * (data.movementCountMax - data.movementCountMin) +
            data.movementCountMin
        ),
        batteryVoltage: Math.floor(
          Math.random() * (data.batteryCountMax - data.batteryCountMin) +
            data.batteryCountMin
        ),
        intervalTime: data.intervalTime,
        range: data.range,
        measuredPower: data.measuredPower,
        anglePitchMax: data.anglePitchMax,
        anglePitchMin: data.anglePitchMin,
        angleRollMax: data.angleRollMax,
        angleRollMin: data.angleRollMin,
        movementCountMax: data.movementCountMax,
        movementCountMin: data.movementCountMin,
        batteryCountMax: data.batteryCountMax,
        batteryCountMin: data.batteryCountMin,
        timestamp: new Date().toISOString()
      })
      console.log(res2.data)
    })
    
  }
  useEffect(() => {
    getAll()
  
  }, []);
  
  const executeRepeatFunction = async () => {
    console.log("here")
     const intervalTimer  =  setInterval(async () => {
        await repeatFunction()
      }, 5000)
      return () => clearInterval(intervalTimer)
  }

  return (
    <div>
    <ul role="list" className="divide-y divide-gray-200">
      {bleData && bleData.map((ble, index) => (
       
        <li
          key={ble.uid}
          className="relative bg-gray-100 py-5 px-4 w-1/2  mx-auto hover:bg-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:cursor-pointer"
         
        >
          <label htmlFor={`custom-checkbox-${index}`}  className="flex">
            <div className="w-full mr-10">
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">          
                <p className="text-sm font-medium text-gray-900 truncate">
                  {ble.name}
                </p>
               
            </div>
            <time
              dateTime="2021-01-27T16:35"
              className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
            >
              1d ago
            </time>
          </div>
          <div className="mt-1">
            <p className="line-clamp-2 text-sm text-gray-600">
            {ble.uid}
            </p>
          </div>
          
          <div className="flex justify-center">
          <Link to={`/view/edit/${ble.uid}`} state={ble}>
          <button
            // onClick={() => setExecution(false)}
            type="button"
            className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          </Link>
          <Link to={`/view/${ble.uid}`} state={ble.uid}>
          <button
            // onClick={() => setExecution(true)}
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View
          </button>
          </Link>
        </div>
        </div>
        <div className="flex items-center hover:cursor-pointer">
            <input
              id={`custom-checkbox-${index}`}
              aria-describedby="comments-description"
              name={ble.name}
              type="checkbox"
              checked={bleData.checked}
              // value={ble.name}
              onChange={() => handleOnChange(index)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded hover:cursor-pointer"
            />
            
          </div>
        </label>
        </li>
      ))}
    </ul>
    <div className="mx-auto w-1/2 mt-12">
    <button
            onClick={() => executeRepeatFunction()}
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Execute
          </button>
          </div>
    </div>
  );
}
