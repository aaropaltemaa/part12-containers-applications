const express = require("express");
const { getAsync } = require("../redis");

const router = express.Router();

router.get("/", async (_, res) => {
  const addedTodos = Number(await getAsync("added_todos")) || 0;
  res.json({ added_todos: addedTodos });
});

module.exports = router;
