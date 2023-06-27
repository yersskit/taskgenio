import { Handle, Position } from 'reactflow';

function Rect() {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default Rect;
