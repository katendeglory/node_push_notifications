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
    "endpoint": "https://fcm.googleapis.com/fcm/send/fhywbvYd4Qg:APA91bG1tS2pqgBdVCb57GW9_Oj4t53TkdLBbxs5axbxUx-RZpoZTsXqySI5IZrpw3RoC-FtFkRB8einBf-WhsWS23xo8s8vThDDxEr9pZY90jvBVJbxV0hcdDMzb9RGE9Rh7GMaWj8Y",
    "expirationTime": null,
    "keys": {
      "p256dh": "BEdWT8BzBSpdeSoNK3NvG2m7uY1WL-oaeQYRcFTfXmV06nR93OfhV10C9RTK_HuU4iHWrxhi5IqyGpSgkBE3bFo",
      "auth": "dGEUCBRC2QRC7BUyEBsQZw"
    }
  }
  webpush.sendNotification(subscription, payload).then(res => console.log("Done!!!")).catch(err => console.log(err));
}, 2500);
//Test

/* ----------------------- 👆 PUSH NOTIFICATIONS AREAS 👆 ----------------------- */



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));