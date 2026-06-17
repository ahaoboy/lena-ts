import { useState, useCallback, useRef } from "react";
import {
  Container,
  Box,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useColorScheme,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ImageIcon from "@mui/icons-material/Image";
import FilterPanel from "./components/FilterPanel";
import ImagePreview from "./components/ImagePreview";
import HistogramChart from "./components/HistogramChart";
import lenaJpg from "./assets/lena.jpg";

export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [histTrigger, setHistTrigger] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mode, setMode } = useColorScheme();

  const toggleFilter = useCallback((filterName: string) => {
    setActiveFilters((prev) => {
      const idx = prev.indexOf(filterName);
      const next = idx === -1 ? [...prev, filterName] : prev.filter((_, i) => i !== idx);
      setTimeout(() => setHistTrigger((t) => t + 1), 50);
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setActiveFilters([]);
    setTimeout(() => setHistTrigger((t) => t + 1), 50);
  }, []);

  const handleImageDrop = useCallback((file: File) => {
    setImageUrl(URL.createObjectURL(file));
    setActiveFilters([]);
    setTimeout(() => setHistTrigger((t) => t + 1), 50);
  }, []);

  const loadDefaultImage = useCallback(() => {
    setImageUrl(lenaJpg);
    setActiveFilters([]);
    setTimeout(() => setHistTrigger((t) => t + 1), 50);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 900, letterSpacing: 2 }}>
            lena-ts
          </Typography>

          <IconButton
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            color="inherit"
            aria-label="Toggle theme"
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main 3-column layout */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ justifyContent: "center", alignItems: { xs: "center", md: "flex-start" } }}
        >
          {/* Column 1: Filters */}
          <Box sx={{ flex: "0 0 260px", width: { xs: "100%", md: "auto" } }}>
            <FilterPanel
              onFilterSelect={toggleFilter}
              onReset={resetFilters}
              activeFilters={activeFilters}
            />
          </Box>

          {/* Column 2: Image preview + upload controls */}
          <Box
            sx={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ImagePreview
              imageUrl={imageUrl}
              activeFilters={activeFilters}
              onImageDrop={handleImageDrop}
              onFilterDrop={toggleFilter}
              onCanvasReady={setCanvas}
            />

            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
              <Button
                size="small"
                variant={imageUrl === lenaJpg ? "contained" : "outlined"}
                startIcon={<ImageIcon />}
                onClick={loadDefaultImage}
              >
                Lena
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageDrop(file);
                }}
              />
              <Button
                size="small"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload
              </Button>
            </Stack>
          </Box>

          {/* Column 3: Histogram */}
          <Box sx={{ flex: "0 0 300px", width: { xs: "100%", md: "auto" } }}>
            <HistogramChart canvas={canvas} trigger={histTrigger} />
          </Box>
        </Stack>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Made with{" "}
          <Box
            component="span"
            color="primary.main"
            sx={{
              animation: "heartbeat 0.6s infinite alternate",
              "@keyframes heartbeat": { to: { transform: "scale(1.2)" } },
              display: "inline-block",
            }}
          >
            ♥
          </Box>{" "}
          by{" "}
          <a href="https://github.com/ahaoboy/" style={{ color: "inherit" }}>
            Davidson Fellipe
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
