import React, { useEffect, useState, useRef } from "react";

/* Leaf SVG component used by the animation */
const LeafSVG = ({ color, size, left, delay, duration, sway }) => {
  return (
    <svg
      className="drop-shadow-sm rounded-[12%_88%_88%_12%_/_50%_30%_70%_50%] opacity-95"
      viewBox="0 0 64 64"
      style={{
        position: "absolute",
        left: `${left}vw`,
        top: "-10vh",
        width: `${size}px`,
        height: `${size}px`,
        fill: color,
        animationName: 'leaf-fall',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: '1',
        transformOrigin: "center",
        pointerEvents: "none",
        zIndex: 0,
        "--sway": `${sway}vw`,
      }}
    >
      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
    </svg>
  );
};

export default function LeafAnimation({ initialCount = 20 }) {
  const [leaves, setLeaves] = useState([]);
  const leavesRef = useRef([]);

  const leafColors = [
    "#D2691E",
    "#FF8C00",
    "#DAA520",
    "#CD853F",
    "#8B4513",
    "#FF6347",
  ];

  const createLeafObj = (id) => {
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];
    const size = 40 + Math.random() * 40;
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 8 + Math.random() * 4;
    const sway = 4 + Math.random() * 6;
    return { id, color, size, left, delay, duration, sway };
  };

  useEffect(() => {
    const initial = Array.from({ length: initialCount }, (_, i) => createLeafObj(i));
    setLeaves(initial);
    leavesRef.current = initial;

    let nextId = initialCount;
    const interval = setInterval(() => {
      const newBatch = Array.from({ length: 3 }, () => createLeafObj(nextId++));
      leavesRef.current = [...leavesRef.current, ...newBatch].slice(-200);
      setLeaves(leavesRef.current);
      setTimeout(() => {
        leavesRef.current = leavesRef.current.slice(newBatch.length);
        setLeaves(leavesRef.current);
      }, 14000);
    }, 2000);

    return () => clearInterval(interval);
  }, [initialCount]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {leaves.map((lf) => (
        <LeafSVG
          key={lf.id}
          color={lf.color}
          size={lf.size}
          left={lf.left}
          delay={lf.delay}
          duration={lf.duration}
          sway={lf.sway}
        />
      ))}
    </div>
  );
}
