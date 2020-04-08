const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

// Export. Name = posts
// model("name", schema to use)
module.exports = mongoose.model("Posts", PostSchema);
