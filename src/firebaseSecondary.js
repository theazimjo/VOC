import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import app from "./firebase";

// A second, independent Firebase App instance pointed at the same project.
// Creating a Firebase Auth user with the *primary* `auth` instance signs the
// browser in as that new user, which would kick out whoever (super admin /
// center admin) is currently logged in and performing the creation. Using a
// separate app instance gives us a separate auth session we can create a
// user in and immediately discard, without touching the caller's session.
const SECONDARY_APP_NAME = "voc-corp-secondary";

function getSecondaryApp() {
  const existing = getApps().find((a) => a.name === SECONDARY_APP_NAME);
  if (existing) return existing;
  return initializeApp(app.options, SECONDARY_APP_NAME);
}

export function getSecondaryAuth() {
  return getAuth(getSecondaryApp());
}

export { getApp };
