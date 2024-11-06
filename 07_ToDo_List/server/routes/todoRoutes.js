const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Create a new todo
router.post("/todos", async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new todo with the current timestamp (createdAt is added automatically)
    const newTodo = new Todo({
      title,
      description,
      completed: false, // default to false when created
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo); // Return the newly created todo
  } catch (error) {
    res.status(500).json({ error: "Error creating todo" });
  }
});

// Get all todos
router.get("/todos", async (req, res) => {
  try {
    // Fetch all todos, Mongoose will return the createdAt and updatedAt fields
    const todos = await Todo.find();
    res.json(todos); // Send the todos data as a response
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
});

// Update a todo
router.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Find the todo and update it, including the updated timestamp
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed, // You can toggle completed or modify any other field
      },
      { new: true } // This ensures the updated document is returned
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo); // Return the updated todo
  } catch (error) {
    res.status(500).json({ error: "Error updating todo" });
  }
});

// Delete a todo
router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the todo by its ID
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" }); // Success message
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

module.exports = router;
