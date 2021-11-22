import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { createFeedback } from "@/lib/db";
import Feedback from "@/components/feedback/Feedback";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const FeedbackPage = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState([]);

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "pending",
    };

    inputEl.current.value = "";
    createFeedback(newFeedback).then((docRef) => {
      setAllFeedback((currentFeedback) => [
        {
          ...newFeedback,
          id: docRef.id,
        },
        ...currentFeedback,
      ]);
    });
  };

  return (
    <DashboardShell>
      <Box
        display="flex"
        mx={4}
        flexDirection="column"
        width="full"
        maxWidth="700px"
      >
        {auth.user && (
          <Box as="form" onSubmit={onSubmit}>
            <FormControl my={8}>
              <FormLabel htmlFor="comment">Comment</FormLabel>
              <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
              <Button mt={4} type="submit" fontWeight="medium">
                Add Comment
              </Button>
            </FormControl>
          </Box>
        )}
        {/* Only render the feedback if it exists */}
        {allFeedback &&
          allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;
