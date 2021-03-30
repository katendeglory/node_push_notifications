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
  const payload = JSON.stringify({ title: "Your Daily Digest", url: "/index.html", body: "Notified From Svelte App!, This is the content of the notification" });
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
  const payload = JSON.stringify({ title: "Your Daily Digest", url: "/index.html", body: "Notified From Svelte App!, This is the content of the notification" });
  let subscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dXAQb75KBsM:APA91bE0-FnRLIQ-oWNxMTOVHhxUBFiaZBCBn5Ai1_pjbeam8az-XwU8MAfLfpK_93z8R7W73rmL_ugXhADYf2JvuMfroDWRZlHuppxAVa1ol5vPdGm1j3P-EIt66YiJmF20i1vr7A0q",
    "expirationTime": null,
    "keys": {
      "p256dh": "BGO1KfuclSEueipO4UKa-CEJpIvXWQI-HIgaOv7Mg9bxsvq3R9mKVZJupb5nwVV9FBi9VGYKfFnsg1kHgVq-nEc",
      "auth": "-hnH1xt2FM1Wp_MTrN1yCw"
    }
  }
  webpush.sendNotification(subscription, payload).then(res => console.log("Done!!!")).catch(err => console.log(err));
}, 2500);
//Test

/* ----------------------- 👆 PUSH NOTIFICATIONS AREAS 👆 ----------------------- */



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));