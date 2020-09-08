const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      //   console.log(celebritiesFromDB);
      res.render("celebrities", { celebritiesList: celebritiesFromDB });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/celebrities/new", (req, res) => {
  console.log("what is going on");
  res.render("celebrities/new");
});

router.get("/celebrities/:id", (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrityFromDB) => {
      //   console.log(celebrityFromDB);
      res.render("celebrities/show", { celebrity: celebrityFromDB });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/celebrities", (req, res) => {
  const { name, occupation, catchphrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchphrase: catchphrase,
  })
    .then((celebrity) => {
      console.log(`New celebrity was created: ${celebrity}`);
      res.redirect(`/celebrities/`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrityFromDBA) => {
      //   console.log(celebrityFromDB);
      res.render("celebrities/edit", { celebrity: celebrityFromDBA });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  const id = req.params.id;
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/celebrities/:id", (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;
  const id = req.params.id;
  Celebrity.findByIdAndUpdate(id, {
    name: name,
    occupation: occupation,
    catchphrase: catchphrase,
  })
    .then(() => {
      console.log("hot spuds");
      res.redirect(`/celebrities`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
