import React, { useRef, useEffect, useState } from "react";

// Utility functions
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function createGaussianDot(size, blur, color) {
  const dotCanvas = document.createElement("canvas");
  const dotCtx = dotCanvas.getContext("2d");
  const canvasSize = size + blur * 4;
  dotCanvas.width = canvasSize;
  dotCanvas.height = canvasSize;

  let rgb;
  if (color && color.indexOf("#") === 0) {
    rgb = hexToRgb(color);
  } else if (color && color.indexOf("rgb") === 0) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      rgb = { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
  }
  // Fallback to black if rgb is undefined or contains NaN
  if (!rgb || isNaN(rgb.r) || isNaN(rgb.g) || isNaN(rgb.b)) {
    rgb = { r: 0, g: 0, b: 0 };
  }
  // Ensure size and blur are finite
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

function ColorExplainer() {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [activeSection, setActiveSection] = useState("intro");

  // Words for each section
  const words = {
    red: {
      love: ["love", "passion", "romance"],
      danger: ["danger", "anger", "warning"],
    },
    blue: {
      calm: ["tranquility", "peace", "serenity"],
      sad: ["sadness", "melancholy", "despair"],
    },
    yellow: {
      joy: ["joy", "happiness", "energy"],
      unease: ["unease", "sickness", "caution"],
    },
  };

  const [currentWords, setCurrentWords] = useState([]);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      wordIndexRef.current = (wordIndexRef.current + 1) % (currentWords.length || 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [currentWords]);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Canvas resize handler
  useEffect(() => {
    function updateCanvasSize() {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Intersection observers for sections
  useEffect(() => {
    const sections = ["intro", "red", "blue", "yellow", "culture"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  // Render effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvasSize;

    ctx.clearRect(0, 0, width, height);

    let dot, dot2;

    switch (activeSection) {
      case "red":
        const blend = Math.min(1, mouse.x / width);
        const softRed = `rgb(255, 105, 180)`; // Pink
        const harshRed = `rgb(220, 20, 60)`; // Crimson
        dot = createGaussianDot(300, 50, softRed);
        dot2 = createGaussianDot(300, 50, harshRed);
        ctx.globalAlpha = 1 - blend;
        ctx.drawImage(dot, width * 0.25 - dot.width / 2, height / 2 - dot.height / 2);
        ctx.globalAlpha = blend;
        ctx.drawImage(dot2, width * 0.75 - dot2.width / 2, height / 2 - dot2.height / 2);
        ctx.globalAlpha = 1;
        setCurrentWords(blend < 0.5 ? words.red.love : words.red.danger);
        break;

      case "blue":
        const blendBlue = Math.min(1, mouse.y / height);
        const lightBlue = `rgb(135, 206, 250)`; // Light Sky Blue
        const darkBlue = `rgb(25, 25, 112)`; // Midnight Blue
        const r = Math.floor(135 * (1 - blendBlue) + 25 * blendBlue);
        const g = Math.floor(206 * (1 - blendBlue) + 25 * blendBlue);
        const b = Math.floor(250 * (1 - blendBlue) + 112 * blendBlue);
        dot = createGaussianDot(400, 60, `rgb(${r}, ${g}, ${b})`);
        ctx.drawImage(dot, width / 2 - dot.width / 2, height / 2 - dot.height / 2);
        setCurrentWords(blendBlue < 0.5 ? words.blue.calm : words.blue.sad);
        break;

      case "yellow":
        const blendYellow = Math.min(1, mouse.x / width);
        const brightYellow = `rgb(255, 255, 0)`; // Yellow
        const sicklyYellow = `rgb(204, 204, 51)`; // Greenish-yellow
        const r_y = Math.floor(255 * (1 - blendYellow) + 204 * blendYellow);
        const g_y = Math.floor(255 * (1 - blendYellow) + 204 * blendYellow);
        const b_y = Math.floor(0 * (1 - blendYellow) + 51 * blendYellow);
        dot = createGaussianDot(350, 55, `rgb(${r_y}, ${g_y}, ${b_y})`);
        ctx.drawImage(dot, width / 2 - dot.width / 2, height / 2 - dot.height / 2);
        setCurrentWords(blendYellow < 0.5 ? words.yellow.joy : words.yellow.unease);
        break;

      default:
        // Intro / Culture
        const time = Date.now() / 2000;
        const hue = (time * 30) % 360;
        dot = createGaussianDot(300, 50, `hsl(${hue}, 80%, 60%)`);
        ctx.drawImage(dot, width / 2 - dot.width / 2, height / 2 - dot.height / 2);
        setCurrentWords([]);
        break;
    }
  }, [canvasSize, mouse, activeSection]);

  const styles = {
    section: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "50%",
      margin: "0 auto",
      fontSize: 24,
      color: "#333",
      textAlign: "center",
      position: "relative",
      zIndex: 2,
    },
    word: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "3em",
      color: "white",
      textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
      pointerEvents: "none",
    },
  };

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
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={styles.word}>
          {currentWords[wordIndexRef.current]}
        </div>
        <section id="intro" style={styles.section}>
          <h2>The Ambiguity of Color Psychology</h2>
          <p>A color is not just a wavelength of light. It's a feeling, a memory, a signal. But its meaning is rarely straightforward.</p>
        </section>
        <section id="red" style={styles.section}>
          <h2>The Duality of Red</h2>
          <p>Move your mouse left and right. Red can be the color of love and passion, or anger and danger. A subtle shift in context changes everything.</p>
        </section>
        <section id="blue" style={styles.section}>
          <h2>The Complexity of Blue</h2>
          <p>Move your mouse up and down. Blue can be serene and calming, or it can be the color of sadness and melancholy.</p>
        </section>
        <section id="yellow" style={styles.section}>
          <h2>The Energy of Yellow</h2>
          <p>Move your mouse left and right. Yellow is the color of sunshine and joy, but it can also be sickly and unsettling.</p>
        </section>
        <section id="culture" style={styles.section}>
          <h2>Color is Cultural</h2>
          <p>The meaning of color is not universal. In some cultures, white is for weddings; in others, it's for funerals. The background will now cycle through colors, showing different cultural interpretations.</p>
        </section>
      </div>
    </>
  );
}

export default ColorExplainer;
