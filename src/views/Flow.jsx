import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Layout from './../components/Layout/Layout';
import ViewHeader from './../components/Layout/ViewHeader';
import ViewContent from '../components/Layout/ViewContent';
import View from '../components/Layout/View';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import Rect from '../components/Flow/RectShape';

const flowKey = 'example-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes = [
  {
    id: '1',
    type: 'Rect',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 }
  },
  {
    id: '2',
    data: { label: 'Another Node' },
    position: { x: 100, y: 125 }
  }
];

const initialEdges = [];

function Flow() {
  const nodeTypes = useMemo(() => ({ Rect: Rect }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight
      }
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
      nodeTypes={nodeTypes}>
      <Panel position="top-right">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
        <button onClick={onAdd}>add node</button>
      </Panel>
      <Controls />
      <Background />
    </ReactFlow>
  );
}

const FlowParent = () => {
  return (
    <Layout>
      <View>
        <ViewHeader title="Flow"></ViewHeader>
        <ViewContent>
          <div className="border w-full h-full overflow-hidden">
            <ReactFlowProvider>
              <Flow />
            </ReactFlowProvider>
          </div>
        </ViewContent>
      </View>
    </Layout>
  );
};

export default FlowParent;
