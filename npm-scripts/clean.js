const fs = require("fs")
const filePath = "./dist"

fs.rmdir(filePath, { recursive: true }, (err) => {
  if (err) {
    throw err
  }
})
