import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import Layout from './../components/Layout/Layout';
import ViewHeader from './../components/Layout/ViewHeader';
import ViewContent from '../components/Layout/ViewContent';
import View from '../components/Layout/View';
import { HexColorPicker } from 'react-colorful';
import { BsArrowsMove, BsPaintBucket } from 'react-icons/bs';
import { IoSquareOutline } from 'react-icons/io5';

const Flow = () => {
  const colorPopoverRef = useRef();

  const [newShape, setNewShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [shapeType, setShapeType] = useState(null);
  const [selected, setSelected] = useState(null);
  const [color, setColor] = useState('#aabbcc');
  const [isOpen, setIsOpen] = useState(false);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageDragging, setStageDragging] = useState(false);

  const onDragStart = (e) => {
    e.target.setAttrs({
      ...e.target.attrs
    });
  };

  const onDragEnd = (e) => {
    e.target.to({
      duration: 0.5
    });
  };

  const handleClickOutsideColorPicker = (event) => {
    if (colorPopoverRef.current && !colorPopoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutsideColorPicker);
    return () => {
      document.removeEventListener('mouseup', handleClickOutsideColorPicker);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.id() === 'stage') {
      setSelected(null);
    }

    if (e.target.id() && e.target.id() !== selected?.id()) {
      setSelected(null);
    }

    if (!shapeType) return;
    if (e.target._id !== 1) return;

    const pos = e.target.getStage().getRelativePointerPosition();
    let currentRect = {
      type: shapeType,
      props: {
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        fill: color,
        draggable: true,
        scaleX: 1,
        scaleY: 1,
        cornerRadius: 0,
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

    const pos = e.target.getStage().getRelativePointerPosition();
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
          <div className="flex justify-end w-full gap-10">
            <IoSquareOutline
              className="text-lg"
              onClick={() => {
                setStageDragging(false);
                setShapeType('rect');
              }}
              style={{ color: shapeType === 'rect' ? '#2196f3' : '#000' }}
            />
            <button
              style={{ backgroundColor: color }}
              className="h-[35px] w-[35px] cursor-pointer border-2 z-[999] flex items-center justify-center"
              onClick={() => setShapeType('rect')}></button>
            <BsArrowsMove
              className="text-lg"
              onClick={() => {
                setStageDragging(true);
                setShapeType(null);
              }}
            />
            <div
              className="flex items-center justify-between gap-1 px-2 border-2 rounded-full relative z-20 cursor-pointer"
              onClick={() => setIsOpen(true)}
              style={{ borderColor: color }}>
              <BsPaintBucket className="text-lg text-neutral" />
              <div className="w-[20px] h-[20px] rounded-full" style={{ backgroundColor: color }} />
              {isOpen && (
                <div
                  className="absolute top-[calc(100%+5px)] right-0 rounded-xl drop-shadow-lg"
                  ref={colorPopoverRef}>
                  <HexColorPicker color={color} onChange={setColor} />
                </div>
              )}
            </div>
          </div>
        </ViewHeader>
        <ViewContent>
          <div className="z-0 border rounded box-border overflow-hidden w-full h-full">
            <Stage
              draggable={stageDragging}
              x={stagePos.x}
              y={stagePos.y}
              id="stage"
              className="w-full h-full"
              width={window.innerWidth}
              height={window.innerHeight}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onDragEnd={(e) => setStagePos(e.currentTarget.position())}>
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
                      const { scaleX, scaleY } = e.target.attrs;

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
