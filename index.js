import { parse } from "csv-parse";
import fs from "fs";

// Initiate an array to store the data
const dataset = [];

// Filter function.
const filterData = (data) => {
  return data.filter((d) => d.age < 30);
};

// Read data using the file system module
fs.createReadStream("database.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    dataset.push(data);
  })
  .on("error", (err) => {
    console.log("Something happened", err);
  })
  .on("end", () => {
    console.log(filterData(dataset));
    console.log("Finished succesfully");
  });
