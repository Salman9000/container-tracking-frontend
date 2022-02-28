import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "./http-common.js";


export default function Canvas() {

  const [bleData, setData] = useState(null);

  const getAll = async () => {
    try {
      const res = await http.get("/api/getAll");
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
    <div>
      {bleData && bleData.map((ble) => (
       <div key={ble.uuid} className="bg-red-400 rounded-full h-5 w-5 relative"></div>
      ))}
    </div>
  );
}
