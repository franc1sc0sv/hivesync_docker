import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Line, Text, RegularPolygon, Image, Transformer } from 'react-konva';
import { FaSquare, FaCircle, FaPlay, FaPen } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import Konva from 'konva';

type RectangleProps = { x: number; y: number; width: number; height: number; fill: string; opacity: number; stroke: string; strokeWidth: number; id: string; draggable: boolean; };
type CircleProps = { x: number; y: number; radius: number; fill: string; opacity: number; stroke: string; strokeWidth: number; id: string; draggable: boolean; };
type TriangleProps = { x: number; y: number; sides: number; radius: number; fill: string; opacity: number; stroke: string; strokeWidth: number; id: string; draggable: boolean; };
type LineShape = { points: number[]; stroke: string; strokeWidth: number; opacity: number; id: string; draggable: boolean; };
type ImageShape = { image: HTMLImageElement; x: number; y: number; id: string; draggable: boolean; };
type ShapeType = 'rect' | 'circle' | 'triangle' | 'line' | 'text' | 'image';

export const WhiteBoardPage: React.FC = () => {
  const [rectangles, setRectangles] = useState<RectangleProps[]>([]);
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [triangles, setTriangles] = useState<TriangleProps[]>([]);
  const [lines, setLines] = useState<LineShape[]>([]);
  const [texts, setTexts] = useState<any[]>([]);
  const [images, setImages] = useState<ImageShape[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#45156B');
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [textInput, setTextInput] = useState('');
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const [currentLine, setCurrentLine] = useState<LineShape | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stageScale, setStageScale] = useState(1);

  useEffect(() => {
    const updateStageSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - 100;
      const scale = Math.min(width / 800, height / 600);
      setStageScale(scale);
      if (stageRef.current) {
        stageRef.current.width(width);
        stageRef.current.height(height);
        stageRef.current.scale({ x: scale, y: scale });
      }
    };
    updateStageSize();
    window.addEventListener('resize', updateStageSize);
    return () => window.removeEventListener('resize', updateStageSize);
  }, []);

  const addRectangle = () => {
    setRectangles([...rectangles, { x: 50, y: 50, width: 100, height: 100, fill: selectedColor, opacity, stroke: selectedColor, strokeWidth, id: `rect-${rectangles.length}`, draggable: true }]);
  };

  const addCircle = () => {
    setCircles([...circles, { x: 150, y: 150, radius: 50, fill: selectedColor, opacity, stroke: selectedColor, strokeWidth, id: `circle-${circles.length}`, draggable: true }]);
  };

  const addTriangle = () => {
    setTriangles([...triangles, { x: 200, y: 200, sides: 3, radius: 60, fill: selectedColor, opacity, stroke: selectedColor, strokeWidth, id: `triangle-${triangles.length}`, draggable: true }]);
  };

  const addText = () => {
    setTexts([...texts, { x: 200, y: 200, text: textInput, fontSize: 20, fill: selectedColor, id: `text-${texts.length}`, draggable: true }]);
    setTextInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new window.Image();
        image.src = reader.result as string;
        image.onload = () => {
          setImages([...images, { image, x: 100, y: 100, id: `img-${images.length}`, draggable: true }]);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const getRelativePointerPosition = (stage: Konva.Stage) => {
    const transform = stage.getAbsoluteTransform().copy();
    transform.invert();
    const pos = stage.getPointerPosition();
    if (pos) {
      return transform.point(pos);
    }
    return { x: 0, y: 0 };
  };

  const handleMouseDown = (e: any) => {
    if (!isDrawing) return;
    const pos = getRelativePointerPosition(e.target.getStage());
    const newLine: LineShape = { points: [pos.x, pos.y], stroke: selectedColor, strokeWidth, opacity, id: `line-${lines.length}`, draggable: true };
    setLines([...lines, newLine]);
    setCurrentLine(newLine);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || !currentLine) return;
    const stage = e.target.getStage();
    const point = getRelativePointerPosition(stage);
    const updatedLine = { ...currentLine, points: [...currentLine.points, point.x, point.y] };
    setLines((prevLines) => {
      const updatedLines = [...prevLines];
      updatedLines[updatedLines.length - 1] = updatedLine;
      return updatedLines;
    });
    setCurrentLine(updatedLine);
  };

  const handleMouseUp = () => {
    setCurrentLine(null);
  };

  const toggleDrawing = () => {
    setIsDrawing((prev) => !prev);
    setCurrentLine(null);
  };

  const deleteAllObjects = () => {
    setRectangles([]);
    setCircles([]);
    setTriangles([]);
    setLines([]);
    setTexts([]);
    setImages([]);
    setSelectedId(null);
  };

  const deleteSelectedObject = () => {
    if (!selectedId) return;

    setRectangles((prev) => prev.filter((rect) => rect.id !== selectedId));
    setCircles((prev) => prev.filter((circle) => circle.id !== selectedId));
    setTriangles((prev) => prev.filter((triangle) => triangle.id !== selectedId));
    setLines((prev) => prev.filter((line) => line.id !== selectedId));
    setTexts((prev) => prev.filter((text) => text.id !== selectedId));
    setImages((prev) => prev.filter((img) => img.id !== selectedId));

    setSelectedId(null);
  };

  const downloadImage = () => {
    if (!stageRef.current) return;

    if (transformerRef.current) {
      transformerRef.current.nodes([]);
    }

    const layer = stageRef.current.findOne('Layer');
    const bgRect = new Konva.Rect({
      width: stageRef.current.width(),
      height: stageRef.current.height(),
      fill: 'white',
    });

    layer.add(bgRect);
    bgRect.moveToBottom();
    layer.draw();

    const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'Hivesync-Board.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    bgRect.remove();
    layer.draw();
    if (transformerRef.current && selectedId) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
      }
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>, id: string, type: ShapeType) => {
    const { x, y } = e.target.position();
    switch (type) {
      case 'rect':
        setRectangles((prev) => prev.map((rect) => (rect.id === id ? { ...rect, x, y } : rect)));
        break;
      case 'circle':
        setCircles((prev) => prev.map((circle) => (circle.id === id ? { ...circle, x, y } : circle)));
        break;
      case 'triangle':
        setTriangles((prev) => prev.map((triangle) => (triangle.id === id ? { ...triangle, x, y } : triangle)));
        break;
      case 'line':
        setLines((prev) => prev.map((line) => (line.id === id ? { ...line, x, y } : line)));
        break;
      case 'text':
        setTexts((prev) => prev.map((text) => (text.id === id ? { ...text, x, y } : text)));
        break;
      case 'image':
        setImages((prev) => prev.map((img) => (img.id === id ? { ...img, x, y } : img)));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (transformerRef.current && selectedId) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  return (
    <div className="h-full w-full bg-gradient-to-br text-white">
      {/* <header className="bg-[#19161D] p-2 md:p-4 flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">Hivesync Boards</h1>
      </header> */}

      <div className="flex flex-col md:flex-row p-2 md:p-4 space-y-2 md:space-x-4">
        <div className="w-full md:w-72 bg-[#2E2934] rounded-lg p-3 md:p-4 space-y-3 md:space-y-4">
          <h2 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Herramientas de dibujo</h2>
          <div className="grid grid-cols-4 gap-1 md:gap-2">
            <button className="h-8 md:h-10 p-1 md:p-2 border rounded hover:bg-gray-600 transition" onClick={addRectangle}><FaSquare className="w-full h-full" /></button>
            <button className="h-8 md:h-10 p-1 md:p-2 border rounded hover:bg-gray-600 transition" onClick={addCircle}><FaCircle className="w-full h-full" /></button>
            <button className="h-8 md:h-10 p-1 md:p-2 border rounded hover:bg-gray-600 transition" onClick={addTriangle}><FaPlay className="w-full h-full" /></button>
            <button className={`h-8 md:h-10 p-1 md:p-2 border rounded ${isDrawing ? 'bg-purple-700' : ''} hover:bg-gray-600 transition`} onClick={toggleDrawing}><FaPen className="w-full h-full" /></button>
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full mt-2 text-sm text-gray-500" />
          <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Escribe aquí..." className="w-full p-1 mt-2 border rounded text-black" />
          <button className="w-full mt-2 p-1 bg-purple-700 text-white rounded hover:bg-purple-800 transition" onClick={addText}>Enviar Texto</button>
          <div className="flex gap-2 mt-2">
            <button className="w-full p-1 bg-purple-700 text-white rounded hover:bg-purple-800 transition" onClick={downloadImage}>Descargar</button>
            <button className="w-full p-1 bg-red-600 text-white rounded hover:bg-red-700 transition" onClick={deleteSelectedObject} disabled={!selectedId}>
              <AiOutlineDelete className="w-4 h-4 mr-1" />Eliminar Seleccionado
            </button>
          </div>
        </div>

        <div className="flex-grow bg-white rounded-lg overflow-auto drawing-canvas">
          <Stage
            width={800}
            height={600}
            scaleX={stageScale}
            scaleY={stageScale}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <Layer>
              {rectangles.map((rect) => (
                <Rect key={rect.id} {...rect} onClick={() => handleSelect(rect.id)} onTap={() => handleSelect(rect.id)} onDragMove={(e) => handleDragMove(e, rect.id, 'rect')} onDragEnd={(e) => handleDragMove(e, rect.id, 'rect')} />
              ))}
              {circles.map((circle) => (
                <Circle key={circle.id} {...circle} onClick={() => handleSelect(circle.id)} onTap={() => handleSelect(circle.id)} onDragMove={(e) => handleDragMove(e, circle.id, 'circle')} onDragEnd={(e) => handleDragMove(e, circle.id, 'circle')} />
              ))}
              {triangles.map((triangle) => (
                <RegularPolygon key={triangle.id} {...triangle} onClick={() => handleSelect(triangle.id)} onTap={() => handleSelect(triangle.id)} onDragMove={(e) => handleDragMove(e, triangle.id, 'triangle')} onDragEnd={(e) => handleDragMove(e, triangle.id, 'triangle')} />
              ))}
              {lines.map((line) => (
                <Line key={line.id} {...line} onDragMove={(e) => handleDragMove(e, line.id, 'line')} onDragEnd={(e) => handleDragMove(e, line.id, 'line')} />
              ))}
              {texts.map((text) => (
                <Text key={text.id} {...text} onClick={() => handleSelect(text.id)} onTap={() => handleSelect(text.id)} onDragMove={(e) => handleDragMove(e, text.id, 'text')} onDragEnd={(e) => handleDragMove(e, text.id, 'text')} />
              ))}
              {images.map((img) => (
                <Image key={img.id} id={img.id} image={img.image} x={img.x} y={img.y} draggable={img.draggable} onClick={() => handleSelect(img.id)} onTap={() => handleSelect(img.id)} onDragMove={(e) => handleDragMove(e, img.id, 'image')} onDragEnd={(e) => handleDragMove(e, img.id, 'image')} />
              ))}
              {selectedId && <Transformer ref={transformerRef} />}
            </Layer>
          </Stage>
        </div>

        <div className="w-full md:w-72 bg-[#2E2934] rounded-lg p-3 md:p-4 space-y-3 md:space-y-4">
          <h2 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Propiedades</h2>
          <div className="space-y-2 md:space-y-3">
            <div>
              <label className="text-xs md:text-sm">Opacidad</label>
              <input type="range" min="0" max="100" value={opacity * 100} onChange={(e) => setOpacity(Number(e.target.value) / 100)} className="w-full mt-1" />
            </div>
            <div>
              <label className="text-xs md:text-sm">Color</label>
              <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="w-full mt-1" />
            </div>
            <div>
              <label className="text-xs md:text-sm">Grosor del trazo</label>
              <input type="range" min="1" max="20" value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="w-full mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 md:gap-2">
            <button className="h-7 md:h-9 text-xs md:text-sm flex items-center justify-center border rounded hover:bg-gray-600 transition" onClick={deleteAllObjects}><AiOutlineDelete className="w-3 h-3 md:w-4 md:h-4 mr-1" />Eliminar todo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
