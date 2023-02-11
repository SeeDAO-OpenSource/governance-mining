require("dotenv").config()
const fs = require("fs")
const path = require("path")
const { parse } = require("csv-parse")

function countRecur(files, results) {
  return new Promise((resolve, reject) => {
    let votes = results
    fs.createReadStream(
      path.join(__dirname, process.env.FOLDER_SEASON, files[0])
    )
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        const wallet = String(row[2]).toLowerCase()
        if (
          votes.length === 0 ||
          votes.find((v) => v.wallet === wallet) === undefined
        ) {
          votes.push({ wallet: wallet, count: 1 })
        } else {
          const idx = votes.findIndex((v) => v.wallet === wallet)
          votes[idx].count = votes[idx].count + 1
        }
      })
      .on("end", function () {
        files.shift()
        if (files.length === 0) {
          resolve(votes)
        } else {
          resolve(countRecur(files, votes))
        }
      })
      .on("error", function (err) {
        console.log(err.stack)
        reject(err)
      })
  })
}

function main() {
  return new Promise((resolve, reject) => {
    fs.readdir(
      path.join(__dirname, process.env.FOLDER_SEASON),
      async (err, files) => {
        countRecur(files, [])
          .then((votes) => {
            const now = new Date()
            const filename = `./Votes_${
              process.env.FOLDER_SEASON
            }_${now.getUTCFullYear()}-${
              now.getUTCMonth() + 1
            }-${now.getUTCDate()}.csv`
            fs.rmSync(filename, {
              force: true
            })
            const writter = fs.createWriteStream(filename, {
              flags: "a"
            })
            writter.write(`Wallet, Votes\n`)
            votes.forEach((vote) => {
              writter.write(`${vote.wallet},${vote.count}\n`)
            })
            writter.on("finish", function () {
              console.log("Done.")
            })
            writter.on("end", function () {
              writter.end()
              resolve()
            })
            writter.on("error", function (err) {
              reject(err.stack)
            })
          })
          .catch((err) => {
            reject(err)
          })
      }
    )
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
