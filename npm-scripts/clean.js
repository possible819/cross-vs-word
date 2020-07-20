const fs = require("fs")
const DISTRIBUTE_PATH = "./dist"

fs.rmdir(DISTRIBUTE_PATH, { recursive: true }, (err) => {
  if (err) {
    throw err
  }
})
