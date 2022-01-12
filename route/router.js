const Contact = require("../model/schema");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    let contacts = await Contact.find();
    res.render("index", { contacts, error: {}, data: {} });
  } catch (error) {
    console.log("router.get ~ error", error);
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone, id } = req.body;
  
  try {
    const error = {};
    if (!name) {
      error.name = "Name is required";
    }
    if (!email) {
      error.email = "Email is required";
    }
    if (!phone) {
      error.phone = "Phone is required";
    }

    const isError = Object.keys(error).length > 0;

    if (isError) {
      let contacts = await Contact.find();
      return res.render("index", {
        contacts,
        error,
        data: req.body,
      });
    }

    if (id) {
      await Contact.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            email,
            phone,
          },
        },
        {
          new: true,
        }
      );

      let contacts = await Contact.find();
      return res.render("index", { contacts, error: {}, data: {} });
    } else {
      let contact = new Contact({
        name,
        email,
        phone,
      });
      await contact.save();
      let contacts = await Contact.find();
      return res.render("index", { contacts, error: {}, data: {} });
    }
  } catch (error) {
    console.log(" router.post ~ error", error);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     let { id } = req.params;

//     let contacts = await Contact.findOne({ _id: id });
//     return res.json({ contacts });
//   } catch (error) {
//     console.log(" router.get ~ error", error);
//   }
// });

router.get("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await Contact.findOneAndDelete({ _id: id });
    res.redirect("/");
  } catch (error) {
    console.log(" router.get ~ error", error);
  }
});

// router.put("/:id");
// router.delete("/:id");
module.exports = router;
