import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { Check, Pen, X } from "react-bootstrap-icons";
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "reactflow";

export default function CustomEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data
  } = props;

  const { setEdges, getEdges } = useReactFlow();
  const [onHover, setOnHover] = React.useState(false);
  const [editFlowDetails, setEditFlowDetails] = React.useState(false);
  const [flowNew, setFlowNew] = React.useState(data.flow);
  const [capacityNew, setCapacityNew] = React.useState(data.capacity);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <IconButton
          aria-label="Delete Edge"
          pos="absolute"
          icon={
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", padding:"5px"}}>
              {
                onHover &&
                <div style={{display:"flex", justifyContent:"center", alignItems:"center",  gap:"5px"}}>
                <X 
                  style={{backgroundColor:"lightskyblue", padding:"2px", borderRadius:"5px"}} size={18}
                  onClick={() =>
                    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id))
                  } 
                />
                <Pen onClick={()=>setEditFlowDetails(true)} style={{backgroundColor:"lightskyblue", padding:"5px", borderRadius:"5px"}} size={18}/>
                </div>
              }
              {
                editFlowDetails &&
                <div style={{display:"flex", margin:"5px"}}>
                  <input 
                    type="text" 
                    value={flowNew}
                    placeholder="Enter name.." 
                    onChange={(e: any)=>{
                        setFlowNew(e.target.value);
                    }}
                    style={{
                        borderRadius:"5px",
                        padding:"4px",
                        width:"20px",
                        fontSize:"10px"
                    }}
                  />
                  /
                  <input 
                    type="text" 
                    value={capacityNew}
                    placeholder="Enter name.." 
                    onChange={(e: any)=>{
                        setCapacityNew(e.target.value);
                    }}
                    style={{
                        borderRadius:"5px",
                        padding:"4px",
                        width:"20px",
                        fontSize:"10px"
                    }}
                  />
                  <div style={{backgroundColor:"lightcyan", color:"blue", margin:"2px", borderRadius:"1px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Check
                      onClick={()=>{
                        console.log(getEdges())
                        setEdges((prev: any)=>{
                          console.log(flowNew, capacityNew)
                          let flowToUpdate = flowNew;
                          let capacityToUpdate = capacityNew;
                          if (flowNew > capacityNew) flowToUpdate = capacityNew;
                          return prev.map((e: any)=>{
                            if(e.id === id){
                              return {
                                ...e,
                                data:{
                                  flow: flowToUpdate,
                                  capacity: capacityToUpdate,
                                }
                              }
                            } else {
                              return e;
                            }
                          })
                        })
                        setEditFlowDetails(false)
                      }}
                    />
                  </div>
                </div>
              }
              <p>{data.flow}/{data.capacity}</p>
            </div>
          }
          color="red"
          transform={`translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`}
          pointerEvents="all"
          bg="transparent"
          size="small"
          onMouseEnter={() => {
            setOnHover(true)
            setTimeout(() => {
              setOnHover(false);
            }, 2000);
          }}
        />
      </EdgeLabelRenderer>
    </>
  );
}
