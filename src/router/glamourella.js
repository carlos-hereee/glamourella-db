const router = require("express").Router();
const { v4 } = require("uuid");
const { errMail } = require("../../config");

let lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias unde
      iste tempore iure! Debitis magnam, voluptate autem iusto error fuga odio
      soluta doloremque. Dolorum, voluptates! A culpa neque non dolores! Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Nisi nulla voluptatem
      numquam, eum tempore sit quod ut nesciunt. Iste deleniti officia
      blanditiis! Commodi doloremque explicabo illo earum dolorum magni nisi.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eos quas
      hic, facilis quaerat quos velit alias doloribus nisi tempora?`;
const socials = [
  {
    social: "instagram",
    link: "https://www.instagram.com/glamourrella/",
    key: v4(),
  },
];
const about = [
  {
    title: "Why choose Glamourella?",
    description: lorem,
    uid: v4(),
    lines: 5,
  },
  {
    title: "My Story",
    description: lorem,
    uid: v4(),
    lines: 4,
  },
  {
    title: "Who am I?",
    description: lorem,
    uid: v4(),
    lines: 3,
  },
];
router.get("/", async (req, res) => {
  try {
    res.status(200).json({ socials, about });
  } catch {
    res.status(500).json(errMail);
  }
});

module.exports = router;
