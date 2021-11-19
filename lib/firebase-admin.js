import { getApps, initializeApp, applicationDefault } from "firebase-admin/app";

let app;

if (!getApps().length) {
  app = initializeApp({
    credential: applicationDefault(),
    databaseURL: "https://fast-feedback-1.firebaseio.com",
  });
}

console.log(app);
export default app;
