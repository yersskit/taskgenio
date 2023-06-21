import React, { useState } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import Layout from './../components/Layout/Layout';
import ViewHeader from './../components/Layout/ViewHeader';
import ViewContent from '../components/Layout/ViewContent';
import View from '../components/Layout/View';
import { BsSquare } from 'react-icons/bs';

const Flow = () => {
  const [newShape, setNewShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [shapeType, setShapeType] = useState(null);
  const [selected, setSelected] = useState(null);

  const onDragStart = (e) => {
    e.target.setAttrs({
      ...e.target.attrs,
      shadowOffset: {
        x: 7,
        y: 7
      }
    });
  };

  const onDragEnd = (e) => {
    e.target.to({
      duration: 0.5
    });
  };

  const handleMouseDown = (e) => {
    if (e.target.id() === 'stage') {
      setSelected(null);
    }

    if (e.target.id() && e.target.id() !== selected?.id()) {
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
    } else {
      let newShapes = [...shapes];
      let lastShape = newShapes[shapes.length - 1];
      let currentRotation = newShape.props.rotation;

      if (lastShape.type === 'rect') {
        lastShape.props.rotation = 0;
        if (currentRotation === 90) {
          newShape.props.x = newShape.props.x - newShape.props.height;
        } else if (currentRotation === 180) {
          newShape.props.x = newShape.props.x - newShape.props.width;
          newShape.props.y = newShape.props.y - newShape.props.height;
        } else if (currentRotation === 270) {
          newShape.props.y = newShape.props.y - newShape.props.width;
        }
      }

      newShapes[shapes.length - 1] = lastShape;

      setShapes(newShapes);
    }

    setNewShape(null);
  };

  const handleMouseMove = (e) => {
    if (!newShape) return;

    const pos = e.target.getStage().getPointerPosition();
    let rotate = 0;
    let width = pos.x - newShape.props.x;
    let height = pos.y - newShape.props.y;

    if (width <= 0 && height <= 0) {
      rotate = 180;
      width = Math.abs(width);
      height = Math.abs(height);
    } else if (width <= 0 && height >= 0) {
      rotate = 90;
      width = Math.abs(height);
      height = Math.abs(width);
    } else if (width >= 0 && height <= 0) {
      rotate = 270;
      width = Math.abs(height);
      height = Math.abs(width);
    }

    newShape.props.rotation = rotate;
    newShape.props.width = width;
    newShape.props.height = height;

    // We need to update the state to force a redraw
    setShapes((shapes) => [...shapes]);
  };

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
          <div className="border rounded box-border overflow-hidden w-full h-full">
            <Stage
              id="stage"
              className="w-full h-full"
              width={window.innerWidth}
              height={window.innerHeight}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}>
              <Layer>
                {shapes.map((shape, i) => (
                  <Rect key={i} {...shape.props} />
                ))}
                {selected && (
                  <Transformer
                    rotateEnabled={true}
                    resizeEnabled={true}
                    borderStroke="#2196f3"
                    anchorStroke="#2196f3"
                    anchorFill="#fff"
                    anchorSize={8}
                    boundBoxFunc={(oldBox, newBox) => {
                      if (newBox.width < 10 || newBox.height < 10) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                    visible={true}
                    nodes={[selected]}
                    onTransform={(e) => {
                      //
                      const { x, y, width, height, scaleX, scaleY } = e.target.attrs;

                      selected.setAttrs({
                        // width: width * scaleX,
                        // height: height * scaleY
                        scaleX: scaleX,
                        scaleY: scaleY
                      });
                    }}
                  />
                )}
              </Layer>
            </Stage>
          </div>
        </ViewContent>
      </View>
    </Layout>
  );
};

export default Flow;
