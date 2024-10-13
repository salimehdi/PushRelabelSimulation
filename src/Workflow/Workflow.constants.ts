import { Edge, Node } from "reactflow";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
  {
    id: "sr",
    position: { x: 0, y: 200 },
    data: { name: "Source", height:0, excess: 0 },
    type: "algoNode",
  },
  {
    id: "2",
    data: { name: "First", height:0, excess: 0 },
    position: { x:150 , y: 300 },
    type: "algoNode",
  },
  {
    id: "sn",
    data: { name: "Sink", height:0, excess: 0 },
    position: { x: 300, y: 200 },
    type: "algoNode",
  },
  {
    id: "op",
    data: { },
    position: { x: 0, y: 0 },
    type: "addNode",
  }
];
