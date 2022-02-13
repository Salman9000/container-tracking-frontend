const bleRouter =   require("./routes/ble");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

let todolist = [
  { id: 0, text: "Get Eggs" },
  { id: 1, text: "Get Bread" },
  { id: 2, text: "Go for a walk walking" },
];


app.use('/api', bleRouter )

let todoId = 3;
app.get("/", async (req, res) => {
  res.status(200).send("Welcome");
});

app.get("/api/todoList", async (req, res) => {
  try {
    res.status(200).send(todolist);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Refresh the page" });
  }
});

app.post("/api/addtodo", async (req, res) => {
  try {
    // throw new Error('Something broke yet again! 😱')
    todoId += 1;
    todolist = [...todolist, { id: todoId, text: req.body.text }];
    res.status(200).send(todolist);
  } catch (e) {
    return res.status(404).json({ message: "Something went wrong. Refresh the page" });
  }
});

app.delete("/api/deletetodo/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    todolist = todolist.filter((todo) => parseInt(todoId) !== todo.id);
    res.status(200).send(todolist);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Refresh the page" });
  }
});

app.put("/api/updatetodo/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const { text } = req.body;
    const todoArrayCopy = [...todolist];
    const todoElement = todoArrayCopy.filter((todo) => todoId == todo.id)[0];
    todoElement.text = text;
    todolist = todoArrayCopy;
    res.status(200).send(todolist);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Refresh the page" });
  }
});
const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
