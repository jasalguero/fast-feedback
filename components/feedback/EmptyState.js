import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

const EmptyState = () => {
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="lg" mb={2}>
        There is not any feedback.
      </Heading>
      <Text mb={4}>Share your sites!</Text>
    </Flex>
  );
};

export default EmptyState;
