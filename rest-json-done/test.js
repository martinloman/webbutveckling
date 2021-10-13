let r2 = 0.135
let r1 = 0.075

function invertedK(r2Value) {
  return (1 / (200 * r1)) + ((1 / 0.04) * Math.log(r2Value / r1)) + (1 / (10 * r2Value))
}

for (let i = r2; i < 1; i += 0.01) {
  let ik = invertedK(i)
  console.log(ik)
}