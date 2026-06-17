import { useRef, useEffect, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { filters } from "lena-ts";

const PLACEHOLDER_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23ddd' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dy='.3em' fill='%23999' font-family='sans-serif' font-size='18' text-anchor='middle'%3ELoad an image%3C/text%3E%3C/svg%3E";

interface ImagePreviewProps {
  imageUrl: string | null;
  activeFilters: string[];
  onImageDrop: (file: File) => void;
  onFilterDrop: (filterName: string) => void;
  onCanvasReady: (canvas: HTMLCanvasElement | null) => void;
}

export default function ImagePreview({
  imageUrl,
  activeFilters,
  onImageDrop,
  onFilterDrop,
  onCanvasReady,
}: ImagePreviewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    onCanvasReady(canvasRef.current);
    return () => onCanvasReady(null);
  }, [onCanvasReady]);

  useEffect(() => {
    setImgLoaded(false);
  }, [imageUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imgLoaded) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = img.naturalWidth || 400;
    const h = img.naturalHeight || 400;
    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(img, 0, 0, w, h);

    if (activeFilters.length === 0) return;

    try {
      const filterMap: Record<string, (pixels: ImageData, amount?: number) => ImageData> = filters;
      for (const filterName of activeFilters) {
        const filterFn = filterMap[filterName];
        if (filterFn) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const result = filterFn(imageData);
          ctx.putImageData(result, 0, 0);
        }
      }
    } catch (err) {
      console.error("Filter application error:", err);
    }
  }, [activeFilters, imgLoaded]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const filterName = e.dataTransfer.getData("text/plain");
      if (filterName) onFilterDrop(filterName);
    },
    [onFilterDrop],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) onImageDrop(file);
    },
    [onImageDrop],
  );

  const src = imageUrl || PLACEHOLDER_URL;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        position: "relative",
        mx: "auto",
      }}
    >
      {/* Base image */}
      <Box
        component="img"
        ref={imgRef}
        src={src}
        alt="Preview"
        draggable={false}
        onLoad={() => setImgLoaded(true)}
        sx={{ width: "100%", display: "block" }}
      />

      {/* Canvas overlay (filter output) */}
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Drop zone overlay */}
      <Box
        onDrop={(e: React.DragEvent) => {
          const filterName = e.dataTransfer.getData("text/plain");
          if (filterName) {
            handleDrop(e);
          } else {
            handleFileDrop(e);
          }
        }}
        onDragOver={handleDragOver}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            textTransform: "uppercase",
            bgcolor: "rgba(0,0,0,0.45)",
            px: 2,
            py: 1,
            borderRadius: 1,
            pointerEvents: "none",
          }}
        >
          {activeFilters.length > 0
            ? `${activeFilters.length} filter(s) applied`
            : "Drag and drop filters here"}
        </Typography>
      </Box>
    </Box>
  );
}
