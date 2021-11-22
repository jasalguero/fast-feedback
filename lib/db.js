import {
  setDoc,
  updateDoc,
  doc,
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
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

export function createFeedback(data) {
  return addDoc(collection(getFirestore(), "feedback"), {
    ...data,
  });
}

export function createSite(data) {
  const site = addDoc(collection(getFirestore(), "sites"), {
    ...data,
  });

  return site;
}

export function deleteFeedback(id) {
  return deleteDoc(doc(getFirestore(), "feedback", id));
}

export function deleteSite(id) {
  return deleteDoc(doc(getFirestore(), "sites", id));
}

export function updateFeedback(id, data) {
  return setDoc(
    doc(getFirestore(), "feedback", id),
    { ...data },
    { merge: true }
  );
}
