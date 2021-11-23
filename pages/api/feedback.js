import { auth } from "@/lib/firebase-admin";
import { getAllFeedbackForSites } from "@/lib/db-admin";

const fetchUserFeedback = async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token2);
    const { feedbacks } = await getAllFeedbackForSites(uid);

    res.status(200).json({ feedbacks });
  } catch (error) {
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message
    );

    res.status(500).json({ error });
  }
};

export default fetchUserFeedback;
