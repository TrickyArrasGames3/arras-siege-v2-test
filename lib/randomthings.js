const ran = require("random.js")
let A = 10
let i = Math.floor(Math.random() * 6)
let LET0, LET1, LET2, LET3, LET4, LET5 = ran.choose([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const con = () => {
  if (A**i == 10) {
    console.log(LET0)
  } else if (A**i == 20) {
    console.log(LET1)
  } else if (A**i == 30) {
    console.log(LET2)
  } else if (A**i == 40) {
    console.log(LET3)
  } else if (A**i == 50) {
    console.log(LET4)
  } else if (A**i == 60) {
    console.log(LET5)
  }
}
console.log(con)