import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import { initialEdges, initialNodes } from "./Workflow.constants";
import AlgoNode from "./AlgoNode";
import AddNode from "./AddNode";
import CustomEdge from "./CustomEdge";

const nodeTypes = {
  algoNode: AlgoNode,
  addNode: AddNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        data:{
          flow: 0,
          capacity: 0,
        },
        id: `${edges.length + 1}`,
        type: "customEdge",
      };
      console.log(edge);
      setEdges((prevEdges) => addEdge(edge, prevEdges));
      console.log(edges);
    },
    [edges]
  );

  return (
    <Box height={"100vh"} width="100vw" border="1px solid black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
