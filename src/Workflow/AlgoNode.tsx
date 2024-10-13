import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import CustomHandle from "./CustomHandle";

export default function PaymentInit({
  data: { name, height, excess },
}: NodeProps<{ name: string, height: number, excess: number }>) {
  return (
    <Box overflow="hidden" borderRadius="100px" height="100px" width="100px" bg="white" border="1px solid #aa1fff" display="flex" justifyContent="between" alignItems="center" flexDirection="column">
      <Box bg={`${excess !== 0 ?"red":"#222222"}`} width="100%" lineHeight="30px" height="30px">
        <Text fontSize="small" textAlign="center" color="white">
          {name}
        </Text>
      </Box>
      <Box p={2}>
        <Text fontSize="small" textAlign="center" color="blue.600">
          <p>Height: {height}</p>
          <p>Excess: {excess}</p>
        </Text>
      </Box>
      {
        name !== "Sink" &&
        <CustomHandle type="source" position={Position.Right} />
      }
      {
        name !== "Source" &&
        <CustomHandle type="target" position={Position.Left} />
      }
    </Box>
  );
}
