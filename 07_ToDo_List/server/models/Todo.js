const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
