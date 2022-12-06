const path = require("path");
const process = require("process");

// configuration variables
module.exports = {
  successMail: "Email sent, will be in touch soon!",
  bookingNotFound:
    "This appointment was not found in calendar, pick a different appointment",
  bookMessage: "Appoinment was created successfully!",
  galleryEmpty: "Url path is empty and is required",
  notFound: "Not found",
  userNotFound: "** User not found **",
  errAlreadyExists: "** A user already exists with that username **",
  notFoundUser: "Couldn't find user with that uid",
  successfulLogout: "Bye, come back soon",
  errServer: "Server is down come back in a bit!",
  errMakeUser: "Couldn't create your account this moment, try again later",
  errCredentrial: "username or password are invalid",
  errMail: "could not send email",
  errLogout: "Unable to log out",
  errCalId: "missing calendar id in header",
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
  isDev: process.env.NODE_ENV === "development",
  dbUrl: process.env.DB_URL,
  cookieName: process.env.COOKIE_NAME,
  accessSecret: process.env.ACCESS_SECRET,
  refreshSecret: process.env.REFRESH_SECRET,
  clientUrl: process.env.CLIENT_URL,
  clientId: process.env.CLIENT_ID,
  port: process.env.PORT,
  uri: process.env.MONGOOSE_URI,
  keyfilePath: path.join(process.cwd(), "google-credentials.json"),
  tokenPath: path.join(process.cwd(), "token.json"),
  assetsPath: path.join(process.cwd(), "assets"),
  filePath: (name) => path.join(process.cwd(), `${name}`),
  lorem: `
   Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe
        culpa nemo voluptate officia facere porro vitae tempore molestias natus
        quam corporis praesentium ut beatae voluptatum pariatur nisi? Natus,
        voluptatibus.
    Quo dolor placeat praesentium, est voluptatem id quae nisi debitis hic
        voluptas minus alias reprehenderit vel at eveniet officiis, enim quos
        odit temporibus mollitia consectetur neque quis eius blanditiis. Quam!
    Eaque dolor atque obcaecati veniam quos quisquam laudantium eum
        explicabo illo minus. Ullam expedita, quos ex accusamus distinctio aut,
        aliquid odit similique dolorem repudiandae aperiam quisquam fugiat iure
        officiis placeat?
    Repudiandae totam voluptatem harum perferendis saepe delectus asperiores
        recusandae debitis, distinctio eius eligendi, fugit consequatur possimus
        est sequi autem voluptates assumenda illum sed itaque aliquid? Quidem
        delectus similique quas facere.
    Mollitia qui iste placeat nesciunt, omnis laudantium, deserunt porro
        quidem quo non dolorem? Ab, veniam illo tenetur minima quasi iusto rerum
        id aliquam sunt laborum blanditiis maiores architecto voluptates fugit!
    `,
  lorem3: `
   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        necessitatibus incidunt sunt rerum. Reprehenderit provident molestias
        modi dicta facere deleniti dignissimos, eveniet delectus nulla voluptas
        omnis repellat quidem ex adipisci!
    Molestiae nulla suscipit illum tempore assumenda culpa dignissimos omnis
        nihil voluptates iure aliquam vero odio atque quo, molestias quae
        possimus quam veritatis enim alias vitae. Maiores doloremque eligendi
        officiis atque!
    Accusantium, nam at perspiciatis ratione soluta a nemo quasi voluptate
        impedit corrupti itaque dolor consequatur porro magnam vel nulla ducimus
        dolorem dolores magni quidem vero molestias numquam aspernatur. Dolorum,
        cumque!
    `,
  lorem2: `
   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        necessitatibus incidunt sunt rerum. Reprehenderit provident molestias
        modi dicta facere deleniti dignissimos, eveniet delectus nulla voluptas
        omnis repellat quidem ex adipisci!
    Molestiae nulla suscipit illum tempore assumenda culpa dignissimos omnis
        nihil voluptates iure aliquam vero odio atque quo, molestias quae
        possimus quam veritatis enim alias vitae. Maiores doloremque eligendi
        officiis atque!
    Accusantium, nam at perspiciatis ratione soluta a nemo quasi voluptate
        impedit corrupti itaque dolor consequatur porro magnam vel nulla ducimus
        dolorem dolores magni quidem vero molestias numquam aspernatur. Dolorum,
        cumque!
    Repellat, tenetur adipisci! Numquam, animi cumque atque odit
        exercitationem iste? Quia odit excepturi sunt cum et doloremque maiores
        debitis nobis temporibus voluptate ut, assumenda sequi. Esse eligendi
        animi sint temporibus.
    `,
};
