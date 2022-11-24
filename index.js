const fs = require("fs");
const { parse } = require("csv-parse");

const new_fields = [];

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const lettercodes = new Map();

let count = 0;
for(i=0;i<letters.length;i++){
  for(j=0;j<letters.length;j++){
    for(k=0;k<letters.length;k++){
      const letter_code = `${letters[i]}${letters[j]}${letters[k]}`;
      lettercodes.set(count,letter_code);
      count++;
    }
  }
}

console.log(lettercodes);

fs.createReadStream("./data.csv")
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (row) {
    // 👇 push the object row into the array
    new_fields.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    // 👇 log the result array

    //get params.json
    
    try {
      const params = fs.readFileSync('params.json', 'utf8');
      const params_obj = JSON.parse(params);
      console.log(params_obj);
    } catch (err) {
      console.error(err);
    }




  });
