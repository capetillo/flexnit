const mongoose = require("mognoose");
var Schema = mongoose.Schema;

var movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Movie", movieSchema);
