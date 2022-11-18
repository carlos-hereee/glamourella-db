const router = require("express").Router();
const { v4 } = require("uuid");
const { errMail } = require("../../config");
const service = [
  {
    id: v4(),
    type: "pedicure",
    name: "classic ",
    length: "30 minutes",
    cost: 25,
    description:
      "Your feet will be pampered, nails are professionally shaped and filed, cuticle trimmer, callus removed, followed by a hot oil massage and finish with a nail buff or polish.",
  },
  {
    id: v4(),
    type: "pedicure",
    name: "REFRESHER ",
    length: "45 minutes",
    cost: 35,
    description:
      "A combination of our Classic Pedicure with an exfoliation pink salt, deep massage with hot stones, warm towel wrap. Finish with a nail buff or polish.",
  },
  {
    id: v4(),
    type: "manicure",
    name: "classic ",
    length: "20 minutes",
    cost: 15,
    description:
      "Your nail will be professionally shaped and filed,  cuticle trimmer. Followed by lotion massage and finish with a nail buff or polish.",
  },
  {
    id: v4(),
    type: "manicure",
    name: "refresher ",
    length: "30 minutes",
    cost: 25,
    description:
      "A combination of Classic Manicure, your hand will be soaked in moisturized lotion gloves and rubbed with an exfoliation pink salt. Follow by a deep massage with hot stones, warm towel wrap and finish with a nail buff or polish.",
  },
  {
    id: v4(),
    type: "manicure",
    name: "paris signature ",
    length: "56 minutes",
    cost: 29,
    description:
      "Your nail will be professionally shaped and filed,  cuticle trimmer. Followed by lotion massage and finish with a nail buff or polish.",
  },
];

router.get("/", async (req, res) => {
  try {
    res.status(200).json(service);
  } catch {
    res.status(500).json(errMail);
  }
});

module.exports = router;
