const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis");

/* GET all todos */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST new todo */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  // Increment Redis counter
  const addedCount = Number(await getAsync("added_todos")) || 0;
  await setAsync("added_todos", addedCount + 1);

  res.send(todo);
});

const singleRouter = express.Router({ mergeParams: true });

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.sendStatus(404);
    req.todo = todo;
    next();
  } catch (err) {
    return res.sendStatus(400); // bad ID format
  }
};

/* GET single todo */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT update todo */
singleRouter.put("/", async (req, res) => {
  const { text, done } = req.body;
  if (text !== undefined) req.todo.text = text;
  if (done !== undefined) req.todo.done = done;
  const updated = await req.todo.save();
  res.send(updated);
});

/* DELETE todo */
singleRouter.delete("/", async (req, res) => {
  await req.todo.deleteOne();
  res.sendStatus(200);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
