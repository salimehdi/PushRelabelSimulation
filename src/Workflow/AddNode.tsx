import { useState } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";
import { useReactFlow } from "reactflow";

export default function AddNode() {
  const { setNodes, getEdges } = useReactFlow();
  const [nodeName, setNodeName] = useState("");

  // Function to start the simulation , in this source height = number of node and excess = 0 and all other nodes height = 0 and excess = 0
    const startSimulation = () => {
        const allEdges = getEdges();
        let excessOfSource = 0;
        allEdges.map((e:any)=>{
            if(e.source === "sr"){
                excessOfSource += parseInt(e.data.flow);
            }
        })
        setNodes((prev)=>{
            console.log(prev);
            return prev.map((node)=>{
                if(node.type === "algoNode" && node.data.name === "Source"){
                    return {
                        ...node,
                        data: {
                            name: "Source",
                            height: prev.length - 1,
                            excess: excessOfSource
                        }
                    }
                }else{
                    return {
                        ...node,
                        data: {
                            name: node.data.name,
                            height: 0,
                            excess: 0
                        }
                    }
                }
        });
        });
    }

  const onProviderClick = ({ name }: { name: string; code: string }) => {
    const location = Math.random() * 500;

    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `${prevNodes.length + 1}`,
        data: { name, height: 0 , excess: 0 },
        type: "algoNode",
        position: { x: 0, y: 0},
      },
    ]);
  };

  return (
    <>
        <div style={{height:"55px", width:"240px",borderRadius:"10px",  backgroundColor:"lightskyblue", padding:"10px", display:"flex", justifyContent:"center",     alignItems:"center", gap:"10px"}} >
            <input 
            type="text" 
            value={nodeName}
            placeholder="Enter name.." 
            onChange={(e: any)=>{
                console.log(e.target.value);
                setNodeName(e.target.value);
            }}
            style={{
                borderRadius:"5px",
                padding:"2px"
            }}
            />
            <button onClick={() => onProviderClick({ name: nodeName, code: "St" })}>
                <PlusCircleFill color="blue" size={25} />
            </button>
        </div>
        <div style={{height:"55px", width:"240px",borderRadius:"10px",  backgroundColor:"lightskyblue",marginTop:"5px", padding:"10px", display:"flex", justifyContent:"center",     alignItems:"center", gap:"15px"}} >
            {/* Start Simulation button and Reset button */}
            <button onClick={startSimulation} style={{padding:"2px 6px", backgroundColor:"white", borderRadius:"4px"}}>
                Start Simulation
            </button>
            <button style={{padding:"2px 6px", backgroundColor:"white", borderRadius:"4px"}}>
                Reset
            </button>
        </div>
    </>
  );
}
