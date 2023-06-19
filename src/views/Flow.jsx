import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import Layout from './../components/Layout/Layout';
import ViewHeader from './../components/Layout/ViewHeader';
import ViewContent from '../components/Layout/ViewContent';
import View from '../components/Layout/View';
import { BsSquare } from 'react-icons/bs';

const Flow = () => {
  const stageRef = useRef();
  const transformerRef = useRef();

  const [newShape, setNewShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [shapeType, setShapeType] = useState(null);
  const [selected, setSelected] = useState(null);

  const onDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 7,
        y: 7
      }
    });
  };

  const onDragEnd = (e) => {
    e.target.to({
      duration: 0.2,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };

  const handleMouseDown = (e) => {
    if (selected) {
      setSelected(null);
    }

    if (!shapeType) return;
    if (e.target._id !== 1) return;

    const pos = e.target.getStage().getPointerPosition();
    let currentRect = {
      type: shapeType,
      props: {
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        fill: 'red',
        draggable: true,
        shadowColor: 'black',
        shadowBlur: 5,
        shadowOpacity: 0.1,
        shadowOffset: {
          x: 3,
          y: 3
        },
        scaleX: 1,
        scaleY: 1,
        cornerRadius: 5,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd,
        id: Math.random().toString(36).substr(2, 9),
        onClick: handleSelect
      }
    };

    setNewShape(currentRect);
    setShapes((shapes) => [...shapes, currentRect]);
  };

  const handleSelect = (e) => {
    setSelected(e.target);
  };

  const handleMouseUp = () => {
    if (!newShape) return;
    if (newShape.props.width === 0 || newShape.props.height === 0) {
      setShapes((shapes) => shapes.slice(0, -1));
    }

    setNewShape(null);
  };

  const handleMouseMove = (e) => {
    if (!newShape) return;

    const pos = e.target.getStage().getPointerPosition();
    let rotate = 0;
    let width = pos.x - newShape.props.x;
    let height = pos.y - newShape.props.y;

    if (width < 0) {
      rotate = 180;
      width = Math.abs(width);
    }

    if (height < 0) {
      rotate = 180;
      height = Math.abs(height);
    }

    newShape.props.rotation = rotate;
    newShape.props.width = width;
    newShape.props.height = height;

    // We need to update the state to force a redraw
    setShapes((shapes) => [...shapes]);
  };

  useEffect(() => {
    console.log('selected: ', selected);

    if (selected) {
      transformerRef.current.nodes([selected]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selected]);

  return (
    <Layout>
      <View>
        <ViewHeader title="Flow">
          <div className="flex flex-row justify-end gap-1">
            <button className="border rounded p-2 " onClick={() => setShapeType('rect')}>
              <BsSquare />
            </button>
          </div>
        </ViewHeader>
        <ViewContent>
          <div className="border rounded p-2 box-border overflow-hidden w-full h-full">
            <Stage
              ref={stageRef}
              width={window.innerWidth}
              height={window.innerHeight}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}>
              <Layer>
                {shapes.map((shape, i) => (
                  <Rect key={i} {...shape.props} />
                ))}
                <Transformer
                  ref={transformerRef}
                  rotateEnabled={true}
                  resizeEnabled={true}
                  borderStroke="#2196f3"
                  anchorStroke="#2196f3"
                  anchorFill="#fff"
                  anchorSize={8}
                  boundBoxFunc={(oldBox, newBox) => {
                    // Limitar el tamaño mínimo del rectángulo
                    if (newBox.width < 10 || newBox.height < 10) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                  visible={!!selected}
                />
              </Layer>
            </Stage>
          </div>
        </ViewContent>
      </View>
    </Layout>
  );
};

export default Flow;
