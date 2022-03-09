import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http, localHttp } from "./http-common.js";

export default function ViewAll() {

  const [bleData, setData] = useState(null);
  const [refreshDisabled, setRefreshDisable] = useState(true)
  const [execution, setExecution] = useState(false)

  const cancelSimulationAll = async () => {
    setExecution(false)
    try {
      const res = await localHttp.post(`cancelSimulationAll`)
      console.log(res.data);
      setRefreshDisable(true)
    } catch(e) {
      console.log(e);
    }
  }

  const executeRepeatFunctionAll = async () => {
    setExecution(true)
    setRefreshDisable(true)
    console.log("here")
    setTimeout(() => {
      setRefreshDisable(false)
    }, 6000);
    try {
      await localHttp.post(`simulateAll`, bleData.filter(item => item.checked == true))
    } catch(e) {
      console.log(e);
    }  
  }


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

  // const refreshData = () => {
  //   setRefreshDisable(true)
  //   getBle()
  //   setTimeout(() => {
  //       setRefreshDisable(false)
  //   }, data.intervalTime);
  // }

  useEffect(() => {
    getAll()
  
  }, []);
  

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
    <div className="flex justify-center items-center">
          <button
            onClick={() => cancelSimulationAll()}
            type="button"
            className="bg-white py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={() => executeRepeatFunctionAll()}
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Execute
          </button>
          {/* <button
            onClick={() => refreshDataAll()}
            type="button"
            disabled={refreshDisabled}
            className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${refreshDisabled && "bg-blue-400 hover:cursor-disable disabled:cursor-not-allowed"}`}
          >
            Refresh
          </button> */}
          {execution && <div className="ml-2 p-2 bg-yellow-200 border border-yellow-500 rounded-lg">Execution in process</div>}
          {/* {!refreshDisabled && <div className="ml-2 p-2 bg-green-200 border border-green-500 rounded-lg">New Data available</div>} */}
        </div>
          </div>
    </div>
  );
}
