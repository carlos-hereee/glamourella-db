const router = require("express").Router();
const { v4 } = require("uuid");
const { errMail, lorem, lorem2, lorem3 } = require("../../config");

const socials = [
  {
    social: "instagram",
    link: "https://www.instagram.com/glamourrella/",
    uid: v4(),
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
    description: lorem2,
    uid: v4(),
    lines: 4,
  },
  {
    title: "Who am I?",
    description: lorem3,
    uid: v4(),
    lines: 3,
  },
];
const services = [
  {
    uid: v4(),
    type: "pedicure",
    src: "http://localhost:4937/gallery/photo/?path=assets/pedicure/billie-unsplash.jpg",
    name: "classic ",
    length: "30 minutes",
    cost: 25,
    description:
      "Your feet will be pampered, nails are professionally shaped and filed, cuticle trimmer, callus removed, followed by a hot oil massage and finish with a nail buff or polish.",
  },
  {
    uid: v4(),
    type: "pedicure",
    src: "http://localhost:4937/gallery/photo/?path=assets/pedicure/billie-unsplash.jpg",
    name: "REFRESHER ",
    length: "45 minutes",
    cost: 35,
    description:
      "A combination of our Classic Pedicure with an exfoliation pink salt, deep massage with hot stones, warm towel wrap. Finish with a nail buff or polish.",
  },
  {
    uid: v4(),
    type: "manicure",
    src: "http://localhost:4937/gallery/photo/?path=assets/manicure/rashid-khreiss-unsplash.jpg",
    name: "classic ",
    length: "20 minutes",
    cost: 15,
    description:
      "Your nail will be professionally shaped and filed,  cuticle trimmer. Followed by lotion massage and finish with a nail buff or polish.",
  },
  {
    uid: v4(),
    type: "manicure",
    src: "http://localhost:4937/gallery/photo/?path=assets/manicure/bryony-elena-unsplash.jpg",
    name: "refresher ",
    length: "30 minutes",
    cost: 25,
    description:
      "A combination of Classic Manicure, your hand will be soaked in moisturized lotion gloves and rubbed with an exfoliation pink salt. Follow by a deep massage with hot stones, warm towel wrap and finish with a nail buff or polish.",
  },
  {
    uid: v4(),
    type: "manicure",
    src: "http://localhost:4937/gallery/photo/?path=assets/manicure/kris-atomic-unsplash.jpg",
    name: "paris signature ",
    length: "56 minutes",
    cost: 29,
    description:
      "Your nail will be professionally shaped and filed,  cuticle trimmer. Followed by lotion massage and finish with a nail buff or polish.",
  },
];

router.get("/glamourella/services", async (req, res) => {
  try {
    res.status(200).json({ socials, about, services });
  } catch {
    res.status(500).json(errMail);
  }
});

module.exports = router;
