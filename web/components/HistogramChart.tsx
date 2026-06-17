import { useEffect, useMemo, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { histogram as computeHistogram } from "lena-ts";

interface HistogramData {
  r: number[];
  g: number[];
  b: number[];
}

interface HistogramChartProps {
  canvas: HTMLCanvasElement | null;
  trigger: number;
}

const WIDTH = 300;
const HEIGHT = 280;
const PAD = { top: 10, right: 10, bottom: 30, left: 40 };
const CW = WIDTH - PAD.left - PAD.right;
const CH = HEIGHT - PAD.top - PAD.bottom;

export default function HistogramChart({ canvas, trigger }: HistogramChartProps) {
  const [histogram, setHistogram] = useState<HistogramData | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!canvas) return;
    try {
      const hist = computeHistogram(canvas);
      setHistogram(hist);
    } catch {
      setHistogram(null);
    }
  }, [canvas, trigger]);

  const paths = useMemo(() => {
    if (!histogram) return null;

    let maxVal = 1;
    for (let i = 0; i < 256; i++) {
      maxVal = Math.max(maxVal, histogram.r[i], histogram.g[i], histogram.b[i]);
    }

    const sx = (i: number) => PAD.left + (i / 255) * CW;
    const sy = (v: number) => PAD.top + CH - (v / maxVal) * CH;

    const build = (data: number[]) =>
      data.map((v, i) => `${i === 0 ? "M" : "L"} ${sx(i)} ${sy(v)}`).join(" ");

    const ticks = [0, maxVal / 4, maxVal / 2, (3 * maxVal) / 4, maxVal];

    return {
      pathR: build(histogram.r),
      pathG: build(histogram.g),
      pathB: build(histogram.b),
      ticks: ticks.map((t) => ({ value: Math.round(t), y: sy(t) })),
    };
  }, [histogram]);

  const axisColor = theme.palette.divider;
  const textColor = theme.palette.text.secondary;

  return (
    <Box sx={{ maxWidth: 320, width: "100%" }}>
      <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1 }}>
        Histogram
      </Typography>

      <Box
        component="svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        sx={{ width: "100%", minHeight: 280, display: "block", mt: 1 }}
      >
        {/* Axes */}
        <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + CH} stroke={axisColor} />
        <line
          x1={PAD.left}
          y1={PAD.top + CH}
          x2={PAD.left + CW}
          y2={PAD.top + CH}
          stroke={axisColor}
        />

        {/* Y ticks */}
        {paths?.ticks.map((tick) => (
          <g key={tick.value}>
            <line x1={PAD.left - 4} y1={tick.y} x2={PAD.left} y2={tick.y} stroke={axisColor} />
            <text x={PAD.left - 6} y={tick.y + 4} textAnchor="end" fontSize="10" fill={textColor}>
              {tick.value}
            </text>
          </g>
        ))}

        {/* X label */}
        <text
          x={PAD.left + CW / 2}
          y={HEIGHT - 4}
          textAnchor="middle"
          fontSize="10"
          fill={textColor}
        >
          ColorRGB
        </text>

        {/* Data paths */}
        {paths && (
          <>
            <path d={paths.pathR} fill="none" stroke="rgba(255,0,0,0.8)" strokeWidth={1.5} />
            <path d={paths.pathG} fill="none" stroke="rgba(0,255,0,0.8)" strokeWidth={1.5} />
            <path d={paths.pathB} fill="none" stroke="rgba(0,0,255,0.8)" strokeWidth={1.5} />
          </>
        )}
      </Box>
    </Box>
  );
}
