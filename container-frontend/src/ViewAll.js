import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "./http-common.js";

export default function ViewAll() {

  const [bleData, setData] = useState(null);

  const getAll = async () => {
    try {
      const res = await http.get("https://at-backend1.herokuapp.com/sensor/all");
      console.log(res.data)
      setData(res.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAll()
  
  }, []);
  
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {bleData && bleData.map((ble) => (
       
        <li
          key={ble.uuid}
          className="relative bg-gray-100 py-5 px-4 w-1/2  mx-auto hover:bg-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
        >
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
            {ble.description}
            </p>
          </div>
          <div className="flex justify-center">
          <Link to={`/view/edit/${ble.uid}`} state={ble}  key={ble.uid}>
          <button
            // onClick={() => setExecution(false)}
            type="button"
            className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          </Link>
          <Link to={`/view/${ble.uid}`} state={ble.uid}  key={ble.uid}>
          <button
            // onClick={() => setExecution(true)}
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View
          </button>
          </Link>
        </div>
        </li>
      ))}
    </ul>
  );
}
