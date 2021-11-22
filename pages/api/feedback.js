import { auth } from "@/lib/firebase-admin";
import { getAllFeedbackForSites } from "@/lib/db-admin";

const fetchUserFeedback = async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { feedbacks } = await getAllFeedbackForSites(uid);

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default fetchUserFeedback;
