const axios = require("axios");

let defaultData = [];

const getAll = async (req, res) => {
  try {
    console.log(defaultData);
    return res.status(200).send(defaultData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const get = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  // console.log(defaultData);
  try {
    return res
      .status(200)
      .send(defaultData.filter((item) => id == item.uuid)[0]);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const data = req.body;
  const {
    batteryCountMax,
    name,
    batteryCountMin,
    powerLevel,
    intervalTime,
    range,
    nanoid,
    measuredPower,
    anglePitchMax,
    anglePitchMin,
    angleRollMax,
    angleRollMin,
    movementCountMax,
    movementCountMin,
  } = data;
  try {
    let newData = {
      name,
      intervalTime,
      range,
      measuredPower,
      anglePitchMax,
      anglePitchMin,
      angleRollMax,
      angleRollMin,
      movementCountMax,
      movementCountMin,
      batteryCountMax,
      batteryCountMin,
      anglePitch: 0,
      angleRoll: 0,
      movementCount: 0,
      batteryVoltage: 0,
    };
    // defaultData = [...defaultData, newData];
    // console.log(newData)
    const res = await axios
      .post("https://at-backend1.herokuapp.com/sensor/add", data
      )

      // axios
      // .post("https://at-backend1.herokuapp.com/sensor/add", 
      //   newData,
      // )
      // .then(function (response) {
      //   console.log(response)
      // })
      // .catch(function (error) {
      //   console.log("error11");
      // });

    execute();

    //Add entry to db
    // console.log(newData)
    return res.status(200).send(newData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updateData = async (ble) => {
  // const dataCopy = defaultData;
  // let element = dataCopy.filter((value) => ble.uuid == value.uuid)[0];
  
  let newData = {
    ...ble,
    anglePitch: Math.floor(
      Math.random() * (ble.anglePitchMax - ble.anglePitchMin) +
        ble.anglePitchMin
    ),
    angleRoll: Math.floor(
      Math.random() * (ble.angleRollMax - ble.angleRollMin) + ble.angleRollMin
    ),
    movementCount: Math.floor(
      Math.random() * (ble.movementCountMax - ble.movementCountMin) +
        ble.movementCountMin
    ),
    batteryVoltage: Math.floor(
      Math.random() * (ble.batteryCountMax - ble.batteryCountMin) +
        ble.batteryCountMin
    ),
  };
  const res2 = await axios.patch(`https://at-backend1.herokuapp.com/sensor/update/${ble.uid}`, newData)
  console.log(res2.data)
  return newData;
  // execute()
};
const execute = async () => {
  try {
    const res = await axios.get('https://at-backend1.herokuapp.com/sensor/all')
    res.data.map((ble) => {
      setTimeout(() => {
       updateData(ble);
      }, ble.intervalTime);
      // setTimeout(updateData, ble.intervalTime)
    });
  } catch(e) {
console.log("error")
  }
 

  setTimeout(execute, 6000);
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    defaultData = defaultData.filter((value) => id != value.id);
    return res.status(200).send(defaultData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const {
      name,
      version,
      powerLevel,
      intervalTime,
      range,
      status,
      description,
      measuredPower,
      password,
    } = data;
    const dataCopy = defaultData;
    const element = dataCopy.filter((value) => id == value.uuid)[0];
    (element.name = name),
      (element.description = description),
      (element.version = version),
      (element.powerLevel = powerLevel),
      (element.intervalTime = intervalTime),
      (element.range = range),
      (element.status = status),
      (element.measuredPower = measuredPower),
      (element.password = password);
    // defaultData = dataCopy;
    return res.status(200).send(dataCopy);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const removeAll = async (req, res) => {
  try {
    defaultData = [];
    return res.status(200).send(defaultData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const addAsset = async (req, res) => {
  const data = req.body
  const response = await axios.post("https://at-backend1.herokuapp.com/asset/add", data)

  console.log(response.data)
}

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.addAsset = addAsset;
module.exports.removeAll = removeAll;
