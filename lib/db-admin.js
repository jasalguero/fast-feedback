import { firestore } from "@/lib/firebase-admin";

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await firestore
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get();
    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  const snapshot = await firestore.collection("sites").get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function getUserSites(uid) {
  const snapshot = await firestore
    .collection("sites")
    .where("authorId", "==", uid)
    .get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { sites };
}

export async function getUserFeedback(uid) {
  const snapshot = await firestore
    .collection("sites")
    .where("authorId", "==", uid)
    .get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { sites };
}

export async function getAllFeedbackForSites(uid) {
  const { sites } = await getUserSites(uid);

  if (!sites.length) {
    return { feedback: [] };
  }

  const siteIds = sites.map((site) => site.id);
  const snapshot = await firestore
    .collection("feedback")
    .where("siteId", "in", siteIds)
    .get();

  const feedbacks = [];

  snapshot.forEach((doc) => {
    feedbacks.push({ id: doc.id, ...doc.data() });
  });

  return { feedbacks };
}
