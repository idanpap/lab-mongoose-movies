const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose.connect("mongodb://localhost/starter-code", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const celebrities = [
  {
    name: "Kanye West",
    occupation: "Singer",
    catchphrase: "KANYE2020",
  },
  {
    name: "Tom Hardy",
    occupation: "Actor",
    catchphrase: "something mumbled",
  },
  {
    name: "Dj Khaled",
    occupation: "Singer",
    catchphrase: "Another one",
  },
];

Celebrity.insertMany(celebrities)
  .then((data) => {
    console.log(`Success! Added ${data.length} celebrities to the database`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
