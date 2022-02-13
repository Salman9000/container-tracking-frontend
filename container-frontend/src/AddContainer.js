import { useEffect, useState } from "react";
import http from "./http-common.js";
import { nanoid } from "nanoid";
import axios from "axios";

export default function AddContainer() {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
  });


  const clearForm = () => {
    setFormData({
      type: "",
      location: "",
    });
  };

  useEffect(() => {
    const getAll = async () => {
      const res = await axios.get("https://at-backend1.herokuapp.com/asset/all", 
      // {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //   }
      // }
      )
      console.log(res.data)
    }
   getAll()
  }, []);
  
  
  const create = async (data) => {
    try {
      console.log(data);
      clearForm();
      // const res = await axios.post("https://at-backend1.herokuapp.com/asset/add", 
      // // {
      // //   headers: {
      // //     'Access-Control-Allow-Origin': '*',
      // //   }
      // // },
      // data,
      // )
      const res = http.post("/api/addAsset", data)
      
      console.log(res.data)
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={(e) => {
        e.preventDefault();
        create(formData);
      }}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-xl leading-6 font-medium text-gray-900 text-center">
              Add asset
            </h3>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Type
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="type"
                  id="type"
                  autoComplete="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Location
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>         
 </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-center">
          <button
            onClick={() => clearForm()}
            type="button"
            className="bg-white py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
