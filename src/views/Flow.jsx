import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import Layout from './../components/Layout/Layout';

const ShapeComponent = ({ shape }) => {
  switch (shape.type) {
    case 'rectangle':
      return <Rect {...shape.props} />;
    case 'circle':
      return <Circle {...shape.props} />;
    case 'line':
      return <Line {...shape.props} />;
    // Aquí puedes añadir más casos para otros tipos de figuras
    default:
      return null;
  }
};

const App = () => {
  const newShape = useRef();

  const [shapes, setShapes] = useState([]);
  const [shapeType, setShapeType] = useState(null);

  const onDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };
  const onDragEnd = (e) => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };

  const handleMouseDown = (e) => {
    console.log('e: ', e.target);

    if (!shapeType) {
      return;
    }

    if (e.target._id !== 1) return;

    const pos = e.target.getStage().getPointerPosition();
    newShape.current = {
      type: shapeType,
      props: {
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        fill: 'red',
        draggable: true,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOpacity: 0.6,
        shadowOffset: {
          x: 5,
          y: 5
        },
        scaleX: 1,
        scaleY: 1,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd
      }
    };
    setShapes((shapes) => [...shapes, newShape.current]);
  };

  const handleMouseUp = () => {
    newShape.current = null;
  };

  const handleMouseMove = (e) => {
    if (!newShape.current) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();

    newShape.current.props.width = pos.x - newShape.current.props.x;
    newShape.current.props.height = pos.y - newShape.current.props.y;

    // We need to update the state to force a redraw
    setShapes((shapes) => [...shapes]);
  };

  return (
    <Layout>
      <div className="border overflow-auto">
        <button onClick={() => setShapeType('rectangle')}>Rectangle</button>
        <button onClick={() => setShapeType('circle')}>Circle</button>
        <button onClick={() => setShapeType('line')}>Line</button>
        {/* Añade más botones para otras figuras aquí */}

        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}>
          <Layer>
            {shapes.map((shape, i) => (
              <ShapeComponent key={i} shape={shape} />
            ))}
          </Layer>
        </Stage>
      </div>
    </Layout>
  );
};

export default App;
