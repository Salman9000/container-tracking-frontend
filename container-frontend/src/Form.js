import { useState } from "react";
import http from "./http-common.js";
import { nanoid } from "nanoid";
import MultiRangeSlider from "multi-range-slider-react";

export default function Form() {
  const [minValueRoll, setMinValueRoll] = useState(-180);
  const [maxValueRoll, setMaxValueRoll] = useState(180);

  const [minValuePitch, setMinValuePitch] = useState(-90);
  const [maxValuePitch, setMaxValuePitch] = useState(90);

  const [minValueMovement, setMinValueMovement] = useState(0);
  const [maxValueMovement, setMaxValueMovement] = useState(3000);
  const [minValueBattery, setMinValueBattery] = useState(2000);
  const [maxValueBattery, setMaxValueBattery] = useState(3000);

  const [formData, setFormData] = useState({
    name: "",
    powerLevel: "0",
    intervalTime: 5000,
    range: 60,
    measuredPower: -59,
    anglePitchMax: maxValueRoll,
    anglePitchMin: minValueRoll,
    angleRollMax:maxValuePitch,
    angleRollMin: minValuePitch,
    movementCountMax:maxValueMovement,
    movementCountMin: minValueMovement,
    batteryCountMax: maxValueBattery,
    batteryCountMin: minValueBattery,
    nanoid: "",
  });

  const handleInputRoll = (e) => {
    setMinValueRoll(e.minValue);
    setMaxValueRoll(e.maxValue);
  };
  const handleInputPitch = (e) => {
    setMinValuePitch(e.minValue);
    setMaxValuePitch(e.maxValue);
  };
  const handleInputMovement = (e) => {
    setMinValueMovement(e.minValue);
    setMaxValueMovement(e.maxValue);
  };
  const handleInputBattery = (e) => {
    setMinValueBattery(e.minValue);
    setMaxValueBattery(e.maxValue);
  };
  const clearForm = () => {
    setFormData({
      name: "",
      powerLevel: "",
      intervalTime: "",
      range: "",
      measuredPower: "",
      nanoid: "",
    });
  };
  const create = async (data) => {
    try {
      console.log(data);
      clearForm();
      const res = await http.post("sensor/add", {name: data.name});
      const id = res.data.uid
      const res2 = await http.patch("sensor/update/data", {
        sensorid: id,
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
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Angle Pitch
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
              <MultiRangeSlider
                baseClassName=""
                  min={-90}
                  max={90}
                  step={5}
                  preventWheel={false}
                  minValue={minValuePitch}
                  maxValue={maxValuePitch}
                  ruler={false}
                  onInput={(e) => {
                    handleInputPitch(e);
                  }}
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Angle Roll
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
              <MultiRangeSlider
                baseClassName=""
                  min={-180}
                  max={180}
                  step={5}
                  preventWheel={false}
                  minValue={minValueRoll}
                  maxValue={maxValueRoll}
                  ruler={false}
                  onInput={(e) => {
                    handleInputRoll(e);
                  }}
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Movement Count
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
              <MultiRangeSlider
                baseClassName=""
                  min={0}
                  max={3000}
                  step={5}
                  preventWheel={false}
                  minValue={minValueMovement}
                  maxValue={maxValueMovement}
                  ruler={false}
                  onInput={(e) => {
                    handleInputMovement(e);
                  }}
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 text-right">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Battery Voltage
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
              <MultiRangeSlider
                baseClassName=""
                  min={2000}
                  max={3000}
                  step={5}
                  preventWheel={false}
                  minValue={minValueBattery}
                  maxValue={maxValueBattery}
                  ruler={false}
                  onInput={(e) => {
                    handleInputBattery(e);
                  }}
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
            onClick={() => setFormData({ ...formData, nanoid: nanoid() })}
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
