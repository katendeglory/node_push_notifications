const express = require("express");
const webpush = require("web-push");

const app = express();

app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ----------------------- 👇 PUSH NOTIFICATIONS AREAS 👇 ----------------------- */

// Generated from https://vapidkeys.com/
const publicVapidKey = "BJR38iSDBijTfcWD_jqvoSFxu9_w6UxRPrJKXj1oiN8c4qPH-tv6qPcGAp-ZJAzJaMJ8kMKaKJHGWc6LrIAHHAU";
const privateVapidKey = "f_C3ehDj81b7qLU-GO8-9SrlJLG8P3lloPlJayLDDhU";

webpush.setVapidDetails(
  "mailto:test@example.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/notify-sub", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Hey there, this is a cool notification!" });
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.post("/add-sub", (req, res) => {
  // Save it to the database for scheduled notifications
});

// Chron Job notify a whole bunch of people here 👇 ...
// ...

//Test
setTimeout(() => {
  console.log("Ready...");
  const payload = JSON.stringify({ title: "Hey there, this is a cool notification!" });
  let subscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dY1AHZ2frzo:APA91bFNa2AgTSjBx_cMUNq2V6E_DHuFGRbIHMQB6mISP0kmXSonxoOusKUFbkDRk_655QzN0GgjWQaSRWUcuQNe15VTV7UOa5KHz5gJ0CTt99k_0RBGMQoEXWbh78L7wrzmTotXEHlW",
    "expirationTime": null,
    "keys": {
      "p256dh": "BJDIHNVSmGHO8S8y-qn3elqs_RQvjZK_3L3W9DupL8vsQaqQlkQbM8kWGMnwX9-UeBXxW1ebvSYh4ZijRgS_BSk",
      "auth": "A-gXvVz32RVYOYAEB_4UkA"
    }
  }
  webpush.sendNotification(subscription, payload).then(res => console.log("Done!!!")).catch(err => console.log(err));
}, 10000);
//Test

/* ----------------------- 👆 PUSH NOTIFICATIONS AREAS 👆 ----------------------- */



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));