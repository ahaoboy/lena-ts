import { useState, useCallback } from "react";
import { Box, Chip, Stack, Typography, Divider, Button } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

export const FILTER_GROUPS: { label: string; filters: string[] }[] = [
  {
    label: "Pixel to Pixel",
    filters: [
      "grayscale",
      "sepia",
      "thresholding",
      "invert",
      "saturation",
      "red",
      "green",
      "blue",
      "mirror",
    ],
  },
  {
    label: "Edge / Line Detection",
    filters: [
      "roberts",
      "sharpen",
      "sobelVertical",
      "sobelHorizontal",
      "highpass",
      "lowpass3",
      "lowpass5",
      "laplacian",
      "gaussian",
      "bigGaussian",
      "prewittVertical",
      "prewittHorizontal",
      "canny",
    ],
  },
];

interface FilterPanelProps {
  onFilterSelect: (filterName: string) => void;
  onReset: () => void;
  activeFilters: string[];
}

export default function FilterPanel({ onFilterSelect, onReset, activeFilters }: FilterPanelProps) {
  const [dragging, setDragging] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, filterName: string) => {
    e.dataTransfer.setData("text/plain", filterName);
    e.dataTransfer.effectAllowed = "copy";
    setDragging(filterName);
  }, []);

  const handleDragEnd = useCallback(() => setDragging(null), []);

  return (
    <Box sx={{ minWidth: 200 }}>
      {FILTER_GROUPS.map((group) => (
        <Box key={group.label} sx={{ mb: 2 }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            {group.label}
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
            {group.filters.map((name) => {
              const isActive = activeFilters.includes(name);
              return (
                <Chip
                  key={name}
                  label={name}
                  size="small"
                  color={isActive ? "primary" : "default"}
                  variant={isActive ? "filled" : "outlined"}
                  clickable
                  draggable
                  onDragStart={(e) => handleDragStart(e, name)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onFilterSelect(name)}
                  sx={{
                    opacity: dragging === name ? 0.4 : 1,
                    cursor: "grab",
                    "&:active": { cursor: "grabbing" },
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Button
        variant="outlined"
        color="error"
        size="small"
        startIcon={<DeleteSweepIcon />}
        onClick={onReset}
        disabled={activeFilters.length === 0}
        sx={{ textTransform: "uppercase", fontWeight: 700 }}
      >
        Remove All ({activeFilters.length})
      </Button>
    </Box>
  );
}
