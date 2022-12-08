const { v4 } = require("uuid");
const { lorem, lorem2, lorem3, dbUrl } = require("../../config");

module.exports = {
  //   client generated content
  socials: [
    {
      social: "instagram",
      link: "https://www.instagram.com/glamourrella/",
      uid: v4(),
    },
  ],
  about: [
    {
      title: "Why choose Glamourella?",
      description: lorem,
      uid: v4(),
      lines: 5,
      img: {
        src: `${dbUrl}gallery/photo/?path=assets/hair/wig/anthony-smith-chaigneau-unsplash.jpg`,
        uid: v4(),
        fileName: "credit to anthony-smith from unsplash",
      },
    },
    {
      title: "My Story",
      description: lorem2,
      uid: v4(),
      lines: 4,
      img: {
        src: `${dbUrl}gallery/photo/?path=assets/glamourella/jeswin-thomas-unsplash.jpg`,
        uid: v4(),
        fileName: "credit to jeswin-thomas from unsplash",
      },
    },
    {
      title: "Who am I?",
      description: lorem3,
      uid: v4(),
      lines: 3,
      img: {
        src: `${dbUrl}gallery/photo/?path=assets/manicure/bryony-elena-unsplash.jpg`,
        uid: v4(),
        fileName: "credit to bryony-elena from unsplash",
      },
    },
  ],
  services: [
    {
      uid: v4(),
      type: "pedicure",
      src: `${dbUrl}gallery/photo/?path=assets/pedicure/billie-unsplash.jpg`,
      name: "classic ",
      length: "30 minutes",
      cost: 25,
      description:
        "Your feet will be pampered, nails are professionally shaped and filed, cuticle trimmer, callus removed, followed by a hot oil massage and finish with a nail buff or polish.",
    },
    {
      uid: v4(),
      type: "pedicure",
      src: `${dbUrl}gallery/photo/?path=assets/pedicure/billie-unsplash.jpg`,
      name: "REFRESHER ",
      length: "45 minutes",
      cost: 35,
      description:
        "A combination of our Classic Pedicure with an exfoliation pink salt, deep massage with hot stones, warm towel wrap. Finish with a nail buff or polish.",
    },
    {
      uid: v4(),
      type: "manicure",
      src: `${dbUrl}gallery/photo/?path=assets/manicure/rashid-khreiss-unsplash.jpg`,
      name: "classic ",
      length: "20 minutes",
      cost: 15,
      description:
        "Your nail will be professionally shaped and filed,  cuticle trimmer. Followed by lotion massage and finish with a nail buff or polish.",
    },
    {
      uid: v4(),
      type: "manicure",
      src: `${dbUrl}gallery/photo/?path=assets/manicure/bryony-elena-unsplash.jpg`,
      name: "refresher ",
      length: "30 minutes",
      cost: 25,
      description:
        "A combination of Classic Manicure, your hand will be soaked in moisturized lotion gloves and rubbed with an exfoliation pink salt. Follow by a deep massage with hot stones, warm towel wrap and finish with a nail buff or polish.",
    },
    {
      uid: v4(),
      type: "manicure",
      src: `${dbUrl}gallery/photo/?path=assets/manicure/kris-atomic-unsplash.jpg`,
      name: "paris signature ",
      length: "56 minutes",
      cost: 29,
      description:
        "Your nail will be professionally shaped and filed,  cuticle trimmer. Followed by lotion massage and finish with a nail buff or polish.",
    },
  ],
  schedule: [
    { day: "Monday", isOpen: true, hours: "9:30am - 6:30pm", key: v4() },
    { day: "Tuesday", isOpen: true, hours: "9:30am - 6:30pm", key: v4() },
    { day: "Wednesday", isOpen: true, hours: "9:30am - 6:30pm", key: v4() },
    { day: "Thursday", isOpen: true, hours: "9:30am - 6:30pm", key: v4() },
    { day: "Friday", isOpen: true, hours: "9:30am - 6:30pm", key: v4() },
    { day: "Saturday", isOpen: true, hours: "9:30am - 6:30pm", key: v4() },
    { day: "Sunday", isOpen: false, hours: "closed", key: v4() },
  ],
};
