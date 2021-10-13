/* 
 en kommentar
 på flera rader
*/

//Kommentar på en rad

//Tilldelning av ett värde till en variabel
let x = 10

// if-else
if (x == 10) {
  console.log("x är 10")
} else {
  console.log("x är inte 10")
}

/// === strikt likhet, jämför även datatyp
if ("5" == 5) {
  console.log("'5' är 5")
}

if ("5" === 5) { // nej, det är inte strikt lika eftersom datatypen skiljer, en sträng är inte ett heltal.
  console.log("'5' är strikt f5")
} else {
  console.log("'5' är inte strikt 5")
}


//Dynamisk typning, en variabel kan byta datatyp utan att det smäller
let y = 7
console.log("y = " + y)
y = "något annat"
console.log("y = " + y)

// arrayer
let arr = [1, 2, 3, 4, "hej"]

// olika sätt att loopa igenom en array
for (let index = 0; index < arr.length; index = index + 1) {
  console.log(arr[index]) //plockar ut värdet på platsen "index" i arrayen
}

// forEach tar en funktion som argument och applicerar den funktionen på varje element. Funktionen får ett element som inparameter.
arr.forEach(function(element) {
  console.log(element)
})

//en funktion som tar två tal som inparametrar och returnerar summan av dem.
function add(tal1, tal2) {
  return tal1 + tal2
}

//objekt i javascript
let obj = {
  age: 45,
  name: "Martin",
  children: ["kalle", "lisa"]
}

// Egenskaper (propertys) på ett objekt accessas med punkt (.) eller namn i array.
console.log(obj)
console.log(obj.name)
console.log(obj["age"])
console.log(obj.children[0])