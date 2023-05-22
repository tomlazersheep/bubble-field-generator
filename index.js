const fs = require("fs");
const { parse } = require("csv-parse");

const new_fields = [];

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const lettercodes = new Map();

let count = 0;
for (i = 0; i < letters.length; i++) {
  for (j = 0; j < letters.length; j++) {
    for (k = 0; k < letters.length; k++) {
      const letter_code = `${letters[i]}${letters[j]}${letters[k]}`;
      lettercodes.set(count, letter_code);
      count++;
    }
  }
}


let row_number = 40;
fs.createReadStream("./data.csv")
.pipe(
  parse({
    delimiter: ",",
    columns: false,
    trim: true,
  })
)
.on("data", function (row) {
  // 👇 push the object row into the array

  new_fields.push({
    property_name: row[0],
    description: row[1],
    index: row_number,
    lettercode: lettercodes.get(row_number)

  });
  row_number++;
})
.on("error", function (error) {
  console.log(error.message);
})
.on("end", function () {
  // 👇 log the result array
  let styles = '';
  new_fields.forEach(field => {
    styles += 
    `target.style.setProperty("${field.property_name}", properties.${field.property_name.replaceAll("-", "_").slice(2)});\n`;
  })
  console.log(styles);
  const new_fields_to_print = new_fields.map(field => {
    return {
      ...field,
      property_name: field.property_name.replaceAll("-", "_").slice(2)
    }
  })

  console.log(new_fields_to_print);
  
});

