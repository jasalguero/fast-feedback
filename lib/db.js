import {
  setDoc,
  updateDoc,
  doc,
  collection,
  getFirestore,
} from "firebase/firestore";

export function updateUser(uid, data) {
  return updateDoc(doc(getFirestore(), "users", uid), { ...data });
}

export function createUser(uid, data) {
  return setDoc(
    doc(getFirestore(), "users", uid),
    { ...data },
    { merge: true }
  );
}
