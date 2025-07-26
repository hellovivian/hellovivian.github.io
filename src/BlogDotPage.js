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

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return { r, g, b };
}

function getMouseColor(x, y, canvasWidth, canvasHeight) {
  const normalizedX = x / canvasWidth;
  const normalizedY = y / canvasHeight;
  const hue = Math.floor(normalizedX * 360);
  const saturation = Math.floor(50 + normalizedY * 50);
  const lightness = Math.floor(60 + (1 - normalizedY) * 30);
  const rgb = hslToRgb(hue, saturation, lightness);
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
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

function drawGrid(ctx, width, height, gridSize, color, opacity) {
  const rgb = hexToRgb(color);
  ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity / 100})`;
  ctx.lineWidth = 1;
  ctx.globalCompositeOperation = "source-over";
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
    ctx.stroke();
  }
}

function BlogDotPage() {
  const canvasRef = useRef(null);

  // Track if color wheel section is in view
  const [showColorWheel, setShowColorWheel] = useState(false);
  // Fade-in alpha for color wheel
  const colorWheelAlphaRef = useRef(0);
  const [colorWheelFadeTick, setColorWheelFadeTick] = useState(0);

  // Track if discrete RGB bands section is in view
  const [showRGBBands, setShowRGBBands] = useState(false);

  // Rotation ref for spinning color wheel (for smooth animation)
  const rotationRef = useRef(0);
  const animationRef = useRef();

  // Trail of previous blob positions for motion trails
  const trailRef = useRef([]);

  // Scroll progress (0 = top, 1 = bottom)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fixed canvas size: always 100vw x 100vh
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Controls state
  const [dotSize, setDotSize] = useState(330);
  const [blurAmount, setBlurAmount] = useState(20);
  const [gridSize, setGridSize] = useState(12);
  const [gridOpacity, setGridOpacity] = useState(30);
  const [dotColor, setDotColor] = useState("#FFE066");
  const [gridColor, setGridColor] = useState("#FFFFFF");

  // Mouse state
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    useMouseColor: false,
  });

  // Blob scale state for jelly effect
  const [blobScale, setBlobScale] = useState(1);
  const [blobSquish, setBlobSquish] = useState({ x: 1, y: 1 });
  const jellyRef = useRef({ animating: false });

  // Value display state
  const [dotSizeValue, setDotSizeValue] = useState(dotSize);
  const [blurAmountValue, setBlurAmountValue] = useState(blurAmount);
  const [gridSizeValue, setGridSizeValue] = useState(gridSize);
  const [gridOpacityValue, setGridOpacityValue] = useState(gridOpacity);

  // Handlers for controls
  const handleDotSize = (e) => {
    setDotSize(Number(e.target.value));
    setDotSizeValue(e.target.value);
  };
  const handleBlurAmount = (e) => {
    setBlurAmount(Number(e.target.value));
    setBlurAmountValue(e.target.value);
  };
  const handleGridSize = (e) => {
    setGridSize(Number(e.target.value));
    setGridSizeValue(e.target.value);
  };
  const handleGridOpacity = (e) => {
    setGridOpacity(Number(e.target.value));
    setGridOpacityValue(e.target.value);
  };
  const handleDotColor = (e) => setDotColor(e.target.value);
  const handleGridColor = (e) => setGridColor(e.target.value);

  // Mouse events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        useMouseColor: true,
      });
    };
    const handleMouseLeave = () => {
      setMouse((m) => ({
        ...m,
        useMouseColor: false,
      }));
    };
    const handleClick = (e) => {
      // Jelly effect: squish x/y scales with phase offset
      if (jellyRef.current.animating) return;
      jellyRef.current.animating = true;
      const duration = 400; // ms
      const squishAmount = 0.22; // how much to squish/stretch
      const t0 = performance.now();

      function animate(now) {
        const t = (now - t0) / duration;
        if (t < 1) {
          // Use a damped sine for jelly wobble
          // x squishes first, then y, then both settle to 1
          const phase = Math.PI * 2 * t;
          const decay = Math.exp(-3 * t);
          const scaleX = 1 + Math.sin(phase) * squishAmount * decay;
          const scaleY = 1 - Math.sin(phase) * squishAmount * decay;
          setBlobSquish({ x: scaleX, y: scaleY });
          requestAnimationFrame(animate);
        } else {
          setBlobSquish({ x: 1, y: 1 });
          jellyRef.current.animating = false;
        }
      }
      requestAnimationFrame(animate);
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mousedown", handleClick);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mousedown", handleClick);
    };
  }, [canvasSize]);

  // Always keep canvas size at 100vw x 100vh
  useEffect(() => {
    function updateCanvasSize() {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setMouse((m) => ({
        ...m,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }));
    }
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Scroll event for parallax effect
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Render effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvasSize;

    function drawColorWheel(rotation) {
      ctx.clearRect(0, 0, width, height);
      const maxRadius = Math.min(width, height) / 4;
      for (let y = 0; y < height; y += gridSize) {
        for (let x = 0; x < width; x += gridSize) {
          const dx = x + gridSize / 2 - width / 2;
          const dy = y + gridSize / 2 - height / 2;
          const angle = Math.atan2(dy, dx) + rotation; // -PI to PI, add rotation for spin
          const hue = ((angle * 180 / Math.PI) + 360) % 360;
          const radius = Math.sqrt(dx * dx + dy * dy);
          const sat = Math.min(90);
          // Alpha fades from 1 at center to 0 at edge
          const alpha = Math.max(0, 1 - (radius / maxRadius));
          ctx.fillStyle = `hsla(${hue}, ${sat}%, 50%, ${alpha})`;
          ctx.fillRect(x, y, gridSize, gridSize);
        }
      }
      drawGrid(ctx, width, height, gridSize, gridColor, gridOpacity);
    }

    if (showColorWheel) {
      // Animate fade-in alpha
      if (colorWheelAlphaRef.current < 1) {
        colorWheelAlphaRef.current = Math.min(1, colorWheelAlphaRef.current + 0.04);
        requestAnimationFrame(() => {
          if (typeof window._colorWheelForceUpdate === "function") {
            window._colorWheelForceUpdate((v) => v + 1);
          }
        });
      }
      // Draw color wheel with fade-in alpha
      ctx.save();
      ctx.globalAlpha = colorWheelAlphaRef.current;
      drawColorWheel(rotationRef.current);
      ctx.restore();
      return;
    }

    if (showRGBBands) {
      ctx.clearRect(0, 0, width, height);
      // 24-pack Crayola colors (hex values)
      const crayolaColors = [
        "#FFB653", "#FF7538", "#FF2B2B", "#FD5E53", "#EA7E5D", "#B4674D", "#A5694F", "#714B23",
        "#FCD975", "#FDFC74", "#FFFF99", "#B2EC5D", "#1DF914", "#76FF7A", "#1CAC78", "#199EBD",
        "#1F75FE", "#1974D2", "#926EAE", "#C364C5", "#FC89AC", "#F75394", "#C23B22", "#000000"
      ];
      const bandCount = crayolaColors.length;
      const bandWidth = width / bandCount;
      const blobRadius = Math.max(80, height / 8);

      // Waterfall animation: use a time-based offset
      if (!window._crayolaWaterfallTimeRef) window._crayolaWaterfallTimeRef = { t: 0 };
      window._crayolaWaterfallTimeRef.t += 1;

      // Reset trail if just entered this section
      if (trailRef.current.length === 0 || !showColorWheel) {
        trailRef.current = [];
      }

      // Maintain a trail of mouse positions for the motion trail
      const trail = trailRef.current;
      trail.push({ x: mouse.x, y: mouse.y });
      if (trail.length > 15) trail.shift();

      for (let i = 0; i < bandCount; i++) {
        const bandX = i * bandWidth;
        // Parse hex color to rgb
        const hex = crayolaColors[i];
        const rgb = hexToRgb(hex);
        // Waterfall offset for this band (each band has a phase offset)
        const waterfallOffset = 40 * Math.sin(window._crayolaWaterfallTimeRef.t / 30 + i * 0.3);
        // Draw motion trail for this band
        for (let t = 0; t < trail.length; t++) {
          const pos = trail[t];
          const progress = (t + 1) / trail.length;
          const alphaTrail = progress * 0.5; // fade out
          const shrink = 0.3 + 0.7 * progress; // 0.3 (oldest) to 1 (newest)
          // Waterfall: y position is offset by time-based sine wave
          const blobCenter = { x: pos.x, y: pos.y + waterfallOffset };
          for (let x = bandX; x < bandX + bandWidth; x += gridSize) {
            for (let y = 0; y < height; y += gridSize) {
              const dx = x + gridSize / 2 - blobCenter.x;
              const dy = y + gridSize / 2 - blobCenter.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const alpha = Math.max(0, (1 - dist / (blobRadius * shrink)) * alphaTrail);
              if (alpha > 0.01 && rgb) {
                ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
                ctx.fillRect(x, y, gridSize, gridSize);
              }
            }
          }
        }
      }
      drawGrid(ctx, width, height, gridSize, gridColor, gridOpacity);
      // Trigger next animation frame for continuous waterfall
      if (!window._crayolaWaterfallRAF) {
        window._crayolaWaterfallRAF = requestAnimationFrame(() => {
          window._crayolaWaterfallRAF = null;
          // Force a React state update to trigger the effect again
          if (typeof window._crayolaWaterfallForceUpdate === "function") {
            window._crayolaWaterfallForceUpdate((v) => v + 1);
          }
        });
      }
      return;
    }

    // Use mouse color if active, else picker
    const color =
      mouse.useMouseColor
        ? getMouseColor(mouse.x, mouse.y, width, height)
        : dotColor;

    // 3D/Parallax mappings
    const parallaxScale = 0.7 + 0.6 * scrollProgress;
    const parallaxX = 60 * (scrollProgress - 0.5);
    const parallaxY = 40 * (scrollProgress - 0.5);

    // Combine with jelly effect
    const scaledDotSize = dotSize * blobScale * parallaxScale;
    const dotCanvas = createGaussianDot(scaledDotSize, blurAmount, color);

    // Position dot (center + parallax offset)
    let dotX, dotY;
    if (mouse.useMouseColor) {
      dotX = mouse.x - dotCanvas.width / 2 + parallaxX;
      dotY = mouse.y - dotCanvas.height / 2 + parallaxY;
    } else {
      dotX = (width - dotCanvas.width) / 2 + parallaxX;
      dotY = (height - dotCanvas.height) / 2 + parallaxY;
    }

    // --- TRAIL LOGIC ---
    // Add current position to trail
    const trail = trailRef.current;
    trail.push({
      x: dotX,
      y: dotY,
      scaleX: blobSquish.x,
      scaleY: blobSquish.y,
      size: scaledDotSize,
      color,
      blur: blurAmount,
    });
    if (trail.length > 15) trail.shift();

    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    // Draw faded, shrinking trail blobs
    for (let i = 0; i < trail.length - 1; i++) {
      const t = trail[i];
      const progress = (i + 1) / trail.length;
      const alpha = progress * 0.35; // fade out
      const shrink = 0.3 + 0.7 * progress; // 0.3 (oldest) to 1 (newest)
      const trailDot = createGaussianDot(t.size * shrink, t.blur, t.color);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(t.x + trailDot.width / 2, t.y + trailDot.height / 2);
      ctx.scale(t.scaleX, t.scaleY);
      ctx.drawImage(trailDot, -trailDot.width / 2, -trailDot.height / 2);
      ctx.restore();
    }

    // Draw current blob
    ctx.save();
    ctx.translate(dotX + dotCanvas.width / 2, dotY + dotCanvas.height / 2);
    ctx.scale(blobSquish.x, blobSquish.y);
    ctx.drawImage(dotCanvas, -dotCanvas.width / 2, -dotCanvas.height / 2);
    ctx.restore();

    // Discretize
    const discreteCanvas = discretizeImage(canvas, gridSize);

    // Clear and draw discretized
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(discreteCanvas, 0, 0);

    // Draw grid
    drawGrid(ctx, width, height, gridSize, gridColor, gridOpacity);
  }, [
    dotSize,
    blurAmount,
    gridSize,
    gridOpacity,
    dotColor,
    gridColor,
    mouse,
    canvasSize,
    blobScale,
    blobSquish,
    showColorWheel,
  ]);

  // Observe color wheel section
  useEffect(() => {
    const colorWheelSection = document.getElementById("color_wheel");
    if (colorWheelSection) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          setShowColorWheel(entry.intersectionRatio > 0.7);
          if (entry.intersectionRatio > 0.7) {
            colorWheelAlphaRef.current = 0; // Reset fade-in on enter
          }
        },
        { threshold: 0.7 }
      );
      observer.observe(colorWheelSection);
      return () => observer.disconnect();
    }
  }, [canvasSize]);

  // Animate color wheel fade-in with requestAnimationFrame and local state
  useEffect(() => {
    let raf;
    function animateFade() {
      if (showColorWheel && colorWheelAlphaRef.current < 1) {
        colorWheelAlphaRef.current = Math.min(1, colorWheelAlphaRef.current + 0.04);
        setColorWheelFadeTick((v) => v + 1);
        raf = requestAnimationFrame(animateFade);
      }
    }
    if (showColorWheel) {
      raf = requestAnimationFrame(animateFade);
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [showColorWheel]);

  // Observe discrete RGB bands section
  useEffect(() => {
    const discreteSection = document.getElementById("discrete_colors");
    if (discreteSection) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          setShowRGBBands(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(discreteSection);
      return () => observer.disconnect();
    }
  }, [canvasSize]);

  // Animate color wheel spin when in view (smooth, direct canvas draw)
  useEffect(() => {
    if (!showColorWheel) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvasSize;
    let lastTime = performance.now();
    function animate(now) {
      const delta = now - lastTime;
      lastTime = now;
      rotationRef.current += 0.01 * (delta / 16.67); // ~0.01 radians per frame at 60fps
      // Redraw color wheel with new rotation
      ctx.clearRect(0, 0, width, height);
      const maxRadius = Math.min(width, height) / 4;
      for (let y = 0; y < height; y += gridSize) {
        for (let x = 0; x < width; x += gridSize) {
          const dx = x + gridSize / 2 - width / 2;
          const dy = y + gridSize / 2 - height / 2;
          const angle = Math.atan2(dy, dx) + rotationRef.current;
          const hue = ((angle * 180 / Math.PI) + 360) % 360;
          const radius = Math.sqrt(dx * dx + dy * dy);
          const sat = Math.min(90);
          const alpha = Math.max(0, 1 - (radius / maxRadius));
          ctx.fillStyle = `hsla(${hue}, ${sat}%, 50%, ${alpha})`;
          ctx.fillRect(x, y, gridSize, gridSize);
        }
      }
      drawGrid(ctx, width, height, gridSize, gridColor, gridOpacity);
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [showColorWheel, canvasSize, gridSize, gridColor, gridOpacity]);

  // Styles
  const styles = {
    page: {
      margin: 0,
      padding: 20,
      background: "white",
      color: "white",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
    },
    canvas: {
      border: "1px solid black",
      background: "white",
      margin: "20px 0",
      display: "block",
    },
    controls: {
      display: "flex",
      gap: 20,
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: 20,
    },
    controlGroup: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
    },
    label: {
      fontSize: 12,
      color: "#ccc",
    },
    range: {
      width: 100,
    },
    colorInput: {
      width: 50,
      height: 30,
      border: "none",
      cursor: "pointer",
    },
    valueDisplay: {
      fontSize: 11,
      color: "#888",
    },
    h1: {
      marginTop: 0,
    },
    p: {
      color: "#888",
      fontSize: 14,
      marginBottom: 10,
    },
  };

  return (
    <>
      {/* <div style={styles.page}>
        <h1 style={styles.h1}>Gaussian Blurred Dot with Grid Effect</h1>
        <p style={styles.p}>
          Move your mouse over the canvas to change the dot color and position dynamically!<br />
          Scroll down to see the blob move in 3D space.
        </p>
        <div style={styles.controls}>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Dot Size</label>
            <input
              type="range"
              min={20}
              max={400}
              value={dotSize}
              onChange={handleDotSize}
              style={styles.range}
            />
            <span style={styles.valueDisplay}>{dotSizeValue}</span>
          </div>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Blur Amount</label>
            <input
              type="range"
              min={5}
              max={100}
              value={blurAmount}
              onChange={handleBlurAmount}
              style={styles.range}
            />
            <span style={styles.valueDisplay}>{blurAmountValue}</span>
          </div>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Grid Size</label>
            <input
              type="range"
              min={5}
              max={30}
              value={gridSize}
              onChange={handleGridSize}
              style={styles.range}
            />
            <span style={styles.valueDisplay}>{gridSizeValue}</span>
          </div>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Grid Opacity</label>
            <input
              type="range"
              min={0}
              max={100}
              value={gridOpacity}
              onChange={handleGridOpacity}
              style={styles.range}
            />
            <span style={styles.valueDisplay}>{gridOpacityValue}%</span>
          </div>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Dot Color</label>
            <input
              type="color"
              value={dotColor}
              onChange={handleDotColor}
              style={styles.colorInput}
            />
          </div>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Grid Color</label>
            <input
              type="color"
              value={gridColor}
              onChange={handleGridColor}
              style={styles.colorInput}
            />
          </div>
        </div>
      </div> */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          display: "block",
          pointerEvents: "auto",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100vw",
          pointerEvents: "none", // Allow pointer events to pass through to the canvas
        }}
      >
        {/* Example scrollable story content */}
        <section id="color_intro" style={{ minHeight: "100vh", display: "flex", width: "50%", margin: "0 auto", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
          <div>I vibe coded this page because I thought about color. Color is cool -- it's abstract and intertwined with emotion, and it has a multiplicity of representations.</div>
        </section>
       

        <section id="discrete_colors" style={{ minHeight: "100vh", display: "flex", width: "50%", margin: "0 auto", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
          <div>In language, we often have discrete labels for colors (categories like red, blue, green).  </div>
        </section>

        <section id="color_wheel" style={{ minHeight: "100vh", display: "flex", width: "50%", margin: "0 auto", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
          <div> Yet, in code, we can draw colors from a color wheel, a space representable by math and triangulation between parameters like hue, saturation, and value.  </div>
        </section>

        <section style={{ minHeight: "100vh", display: "flex", width: "50%", margin: "0 auto", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
          <div> And of course there is color that comes to us visually, in continuous combinations of light. :) 

 </div>
        </section>


        

        <section style={{ minHeight: "100vh", display: "flex", width: "50%", margin: "0 auto",  alignItems: "center", justifyContent: "center", fontSize: 24 }}>
          <div>So I thought that was cool and I spent a nice bit of my Friday to make this page.</div>
        </section>
  
      </div>
    </>
  );
}

export default BlogDotPage;
