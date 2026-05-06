import React, { useRef, useEffect, useState } from "react";
import { hexToRgb, hslToRgb } from "../utils/color";

function createGaussianDot(size, blur, color) {
  const dotCanvas = document.createElement("canvas");
  const dotCtx = dotCanvas.getContext("2d");
  const canvasSize = size + blur * 4;
  dotCanvas.width = canvasSize;
  dotCanvas.height = canvasSize;

  let rgb;
  if (color && color.startsWith("hsl")) {
    const match = color.match(/hsl\((\d+\.?\d*),\s*(\d+\.?\d*)%,\s*(\d+\.?\d*)%\)/);
    if (match) {
      rgb = hslToRgb(parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]));
    }
  } else {
    rgb = hexToRgb(color);
  }

  if (!rgb || isNaN(rgb.r) || isNaN(rgb.g) || isNaN(rgb.b)) {
    rgb = { r: 0, g: 0, b: 0 };
  }

  const safeSize = isFinite(size) ? size : 50;
  const safeBlur = isFinite(blur) ? blur : 10;
  const dotCanvasSize = safeSize + safeBlur * 4;
  dotCanvas.width = dotCanvasSize;
  dotCanvas.height = dotCanvasSize;

  const gradient = dotCtx.createRadialGradient(
    dotCanvasSize / 2,
    dotCanvasSize / 2,
    0,
    dotCanvasSize / 2,
    dotCanvasSize / 2,
    safeSize / 2
  );
  gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`);
  gradient.addColorStop(0.7, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.53)`);
  gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
  dotCtx.fillStyle = gradient;
  dotCtx.fillRect(0, 0, canvasSize, canvasSize);

  dotCtx.filter = `blur(${blur}px)`;
  dotCtx.globalCompositeOperation = "source-over";
  dotCtx.drawImage(dotCanvas, 0, 0);

  return dotCanvas;
}

function discretizeImage(sourceCanvas, gridSize) {
  const discreteCanvas = document.createElement("canvas");
  const discreteCtx = discreteCanvas.getContext("2d");
  discreteCanvas.width = sourceCanvas.width;
  discreteCanvas.height = sourceCanvas.height;

  const tempCtx = document.createElement("canvas").getContext("2d");
  tempCtx.canvas.width = sourceCanvas.width;
  tempCtx.canvas.height = sourceCanvas.height;
  tempCtx.drawImage(sourceCanvas, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
  const data = imageData.data;

  for (let y = 0; y < sourceCanvas.height; y += gridSize) {
    for (let x = 0; x < sourceCanvas.width; x += gridSize) {
      const centerX = Math.min(x + Math.floor(gridSize / 2), sourceCanvas.width - 1);
      const centerY = Math.min(y + Math.floor(gridSize / 2), sourceCanvas.height - 1);
      const centerIndex = (centerY * sourceCanvas.width + centerX) * 4;
      const r = data[centerIndex];
      const g = data[centerIndex + 1];
      const b = data[centerIndex + 2];
      const a = data[centerIndex + 3];
      discreteCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
      discreteCtx.fillRect(x, y, gridSize, gridSize);
    }
  }
  return discreteCanvas;
}

function GaussianDotsContent() {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function updateCanvasSize() {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvasSize;

    let angle = 0;
    const radius = 100;
    const speed = 0.02;

    let dot1 = {
      size: 100,
      blur: 20,
      color: 'hsl(200, 90%, 50%)',
    };

    let dot2 = {
      size: 100,
      blur: 20,
      color: 'hsl(340, 90%, 50%)',
    };

    let animationFrameId;

    const animate = () => {
      angle += speed;

      dot1.x = width / 2 + Math.cos(angle) * radius;
      dot1.y = height / 2 + Math.sin(angle) * radius;

      dot2.x = width / 2 + Math.cos(angle + Math.PI) * radius;
      dot2.y = height / 2 + Math.sin(angle + Math.PI) * radius;

      // Draw
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);

      const dot1Canvas = createGaussianDot(dot1.size, dot1.blur, dot1.color);
      ctx.drawImage(dot1Canvas, dot1.x - dot1Canvas.width / 2, dot1.y - dot1Canvas.height / 2);

      const dot2Canvas = createGaussianDot(dot2.size, dot2.blur, dot2.color);
      ctx.drawImage(dot2Canvas, dot2.x - dot2Canvas.width / 2, dot2.y - dot2Canvas.height / 2);

      // Discretize
      const discreteCanvas = discretizeImage(canvas, 10);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(discreteCanvas, 0, 0);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasSize]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100vw",
          pointerEvents: "none",
        }}
      >
        <section style={{ minHeight: "100vh", display: "flex", width: "50%", margin: "0 auto", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
          <div>A page with a bunch of Gaussian dots.</div>
        </section>
      </div>
    </>
  );
}

export default GaussianDotsContent;
