var fs = require("fs")

fs.rmdir("./dist", { recursive: true }, (err) => {
  if (err) {
    console.log(err)
  }
})
