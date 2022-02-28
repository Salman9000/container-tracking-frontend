import { useState } from "react";
import { http } from "./http-common.js";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";

export default function EditBle() {
    const location = useLocation();
    const {
      name,
      description,
      powerLevel,
      intervalTime,
      range,
      measuredPower,
      uuid,
    } = location.state;
  const [formData, setFormData] = useState({
    name,
    description,
    powerLevel,
    intervalTime,
    range,
    measuredPower,
    nanoid: uuid,
  });

  const update = async (data) => {
    try {
      console.log(data);
      await http.put(`/api/update/${uuid}`, data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={(e) => {
        e.preventDefault();
        update(formData);
      }}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-xl leading-6 font-medium text-gray-900 text-center">
              Bluetooth Low Energy Beacons Information
            </h3>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>


            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="power-level"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Tx Power Level (dbm)
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="power-level"
                  name="power-level"
                  type="number"
                  autoComplete="power-level"
                  value={formData.powerLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, powerLevel: e.target.value })
                  }
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="interval"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Interval Time (ms)
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="interval"
                  id="interval"
                  autoComplete="interval"
                  value={formData.intervalTime}
                  onChange={(e) =>
                    setFormData({ ...formData, intervalTime: e.target.value })
                  }
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="range"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Range (m) 
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="range"
                  id="range"
                  autoComplete="range"
                  value={formData.range}
                  onChange={(e) =>
                    setFormData({ ...formData, range: e.target.value })
                  }
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Measured Power
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="measured-power"
                  id="measured-power"
                  autoComplete="measured-power"
                  value={formData.measuredPower}
                  onChange={(e) =>
                    setFormData({ ...formData, measuredPower: e.target.value })
                  }
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-center">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
}
