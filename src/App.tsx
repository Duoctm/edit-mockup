import React, { useState } from "react";
import { Stage, Layer, Image, Text, Group } from "react-konva";
import useImage from "use-image";

import "./App.css";

const DESIGN_OPTIONS = [
  {
    id: "d1",
    url: "/252.WZ8NN690c239fdfb87.preview.webp",
    label: "🎨 Design 1",
  },
  {
    id: "d2",
    url: "/252.JTV2F690c23aac3f28.preview.webp",
    label: "🎨 Design 2",
  },
  {
    id: "d3",
    url: "/252.U08VQ690c23ae2b567.preview.webp",
    label: "🎨 Design 3",
  },
];

const MUG_OPTIONS = [
  { id: "white", url: "/front.png", label: "⚪ Trắng" },
  { id: "black", url: "/mug-black.png", label: "⚫ Đen" },
];

// Canvas dimensions
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;

// Mug design area - centered on the mug face
const MUG_DESIGN_AREA = {
  x: 250,
  y: 140,
  width: 180,
  height: 280,
};

// Component để render hình ảnh
const AssetImage = ({
  url,
  x,
  y,
  width,
  height,
}: {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const [image] = useImage(url, "anonymous");
  return <Image image={image} x={x} y={y} width={width} height={height} />;
};

// Component render mug background
const MugBackground = ({ url }: { url: string }) => {
  const [image] = useImage(url, "anonymous");
  return (
    <Image
      image={image}
      x={0}
      y={0}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
    />
  );
};

const PodDesigner = () => {
  const [selections, setSelections] = useState({
    design: DESIGN_OPTIONS[0],
    mug: MUG_OPTIONS[0],
    userName: "POD Software",
  });

  const stageRef = React.useRef<any>(null);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 3 });
    const link = document.createElement("a");
    link.download = "custom-mug-design.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pod-designer">
      {/* CONTROL PANEL */}
      <div className="control-panel">
        <h2>Mug Designer</h2>
        <p className="subtitle">Tùy chỉnh thiết kế của bạn</p>

        {/* Name Input */}
        <div className="form-group">
          <label>Tên hiển thị</label>
          <input
            type="text"
            value={selections.userName}
            onChange={(e) =>
              setSelections({ ...selections, userName: e.target.value })
            }
            placeholder="Nhập tên của bạn..."
          />
        </div>

        {/* Design Selection */}
        <div className="form-group">
          <label>Chọn Design</label>
          <div className="design-grid">
            {DESIGN_OPTIONS.map((item) => (
              <button
                key={item.id}
                className={`design-btn ${
                  selections.design.id === item.id ? "active" : ""
                }`}
                onClick={() => setSelections({ ...selections, design: item })}
              >
                <img src={item.url} alt={item.label} />
              </button>
            ))}
          </div>
        </div>

        {/* Mug Color Selection */}
        <div className="form-group">
          <label>Màu Mug</label>
          <div className="asset-grid">
            {MUG_OPTIONS.map((item) => (
              <button
                key={item.id}
                className={`asset-btn ${
                  selections.mug.id === item.id ? "active" : ""
                }`}
                onClick={() => setSelections({ ...selections, mug: item })}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Export Button */}
        <button className="export-btn" onClick={handleExport}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Tải File In (300 DPI)
        </button>
      </div>

      {/* CANVAS PREVIEW */}
      <div className="canvas-container">
        <div className="canvas-header">
          <h3>Xem trước thiết kế</h3>
          <span className="canvas-badge">Live Preview</span>
        </div>
        <div className="canvas-wrapper">
          <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={stageRef}>
            <Layer>
              {/* Mug Background */}
              <MugBackground url={selections.mug.url} />

              {/* Design Elements Group - centered on the mug */}
              <Group x={MUG_DESIGN_AREA.x} y={MUG_DESIGN_AREA.y}>
                {/* Main Design - Large and Centered */}
                <AssetImage
                  url={selections.design.url}
                  x={0}
                  y={0}
                  width={MUG_DESIGN_AREA.width}
                  height={MUG_DESIGN_AREA.height - 50}
                />

                {/* Custom Name */}
                <Text
                  text={selections.userName}
                  x={0}
                  y={MUG_DESIGN_AREA.height - 40}
                  width={MUG_DESIGN_AREA.width}
                  align="center"
                  fontSize={24}
                  fontStyle="bold"
                  fontFamily="Inter, sans-serif"
                  fill="#333"
                  shadowColor="rgba(0,0,0,0.1)"
                  shadowBlur={2}
                  shadowOffsetY={1}
                />
              </Group>
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default PodDesigner;
