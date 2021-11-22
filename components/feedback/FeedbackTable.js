import React from "react";
import { Box } from "@chakra-ui/react";

import { Table, Tr, Th } from "@/components/Table";
import FeedbackRow from "@/components/feedback/FeedbackRow";

const FeedbackTable = ({ feedbacks }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th minW="150px">Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <FeedbackRow key={feedback.id} {...feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
