import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';

// MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CircularProgress, Fade, Box } from '@mui/material';

// Aura Palette
const aura = {
  bg: "linear-gradient(135deg, #fff1e0 0%, #f9e6f9 100%)",
  card: "rgba(255,255,255,0.89)",
  border: "#f1d5e7",
  accent: "#9b2246",
  text: "#6B0F1A",
  shadow: "0 8px 40px 0 rgba(155,34,70,0.12)",
  ok: "#53c487",
  warn: "#f6a700",
  error: "#d7263d",
};

const aspectRatio = 4 / 3;
const thresholdPercentFace = 0.3;
const thresholdFaceScore = 0.7;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}

const statusAura = {
  "OK": { color: aura.ok, glow: "0 0 14px #53c48766" },
  "Multiple faces detected": { color: aura.warn, glow: "0 0 14px #f6a70055" },
  "Come closer": { color: aura.warn, glow: "0 0 14px #f6a70055" },
  "Blurry or Not enough lighting": { color: aura.warn, glow: "0 0 14px #f6a70055" },
  "no face detected": { color: aura.error, glow: "0 0 16px #d7263d22" },
  "Initialising...": { color: aura.accent, glow: "0 0 14px #9b224644" }
};

const WebcamCapture = ({ setImageSrc }) => {
  // Responsive webcam sizing
  const { height: screenH, width: screenW } = useWindowDimensions();
  let camHeight = screenH, camWidth = screenW;
  if (camHeight > camWidth) {
    camHeight = Math.round(camWidth * aspectRatio);
  } else {
    camHeight = Math.round(camHeight * 0.9);
    camWidth = Math.round(camHeight / aspectRatio);
  }
  const videoConstraints = {
    height: camHeight,
    width: camWidth,
    facingMode: "user"
  };

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef, setImageSrc]);

  // Model loading state
  const [initialising, setInitialising] = useState(false);
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URI = process.env.PUBLIC_URL + '/models';
      setInitialising(true);
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
      ]);
      setInitialising(false);
    };
    loadModels();
  }, []);

  // Face detection & status
  const [faceOK, setFaceOK] = useState("Initialising...");
  useEffect(() => {
    let interval;
    const detect = async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        let detections = await faceapi.detectAllFaces(
          webcamRef.current.video,
          new faceapi.TinyFaceDetectorOptions()
        );
        if (detections.length > 1) setFaceOK("Multiple faces detected");
        else if (detections[0] !== undefined) {
          const boxArea = Math.round(detections[0].box.height) * Math.round(detections[0].box.width);
          const ImageArea = detections[0].imageWidth * detections[0].imageHeight;
          const percentFace = boxArea / ImageArea;
          if (percentFace < thresholdPercentFace) setFaceOK("Come closer");
          else if (detections[0].score < thresholdFaceScore) setFaceOK("Blurry or Not enough lighting");
          else setFaceOK("OK");
        } else setFaceOK("no face detected");
      }
    };
    if (!initialising) interval = setInterval(detect, 500);
    return () => clearInterval(interval);
  }, [initialising]);

  // Animate status
  const statusProps = statusAura[faceOK] || { color: aura.text, glow: aura.shadow };
  const statusLabel = initialising ? "Initialising..." : faceOK;

  return (
    <Box
      sx={{
        minHeight: "85vh",
        width: "100vw",
        background: aura.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', 'DM Sans', sans-serif"
      }}>
      <Fade in timeout={600}>
        <Box
          sx={{
            background: aura.card,
            borderRadius: "32px",
            boxShadow: aura.shadow,
            border: `2px solid ${aura.border}`,
            p: { xs: 2, sm: 4 },
            maxWidth: camWidth,
            transition: "box-shadow 0.4s cubic-bezier(.7,.2,.2,1)",
            position: "relative"
          }}>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                component="div"
                textAlign="center"
                sx={{
                  color: statusProps.color,
                  textShadow: statusProps.glow,
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  fontSize: "1.22rem",
                  mb: 1,
                  transition: "color 0.6s cubic-bezier(.7,.2,.2,1)"
                }}
              >
                {initialising
                  ? <CircularProgress color="inherit" size={32} sx={{ color: aura.accent, mr: 1, verticalAlign: 'middle' }} />
                  : null}
                {statusLabel}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Fade in={!initialising} timeout={1100}>
                <Box sx={{
                  borderRadius: "25px",
                  boxShadow: "0 8px 24px 0 rgba(155,34,70,0.07)",
                  overflow: "hidden",
                  border: `1.5px solid ${aura.border}`,
                  background: "#f9e6f9"
                }}>
                  <Webcam
                    id="webcam"
                    audio={false}
                    height={videoConstraints.height}
                    width={videoConstraints.width}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12}>
              <Fade in={!initialising && faceOK === "OK"} timeout={900}>
                <span>
                  <Button
                    onClick={capture}
                    variant="contained"
                    disabled={initialising || faceOK !== "OK"}
                    fullWidth
                    sx={{
                      background: `linear-gradient(90deg, ${aura.accent} 40%, ${aura.text} 110%)`,
                      color: "#fff",
                      borderRadius: "100px",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      textTransform: "none",
                      px: 3,
                      py: 1,
                      boxShadow: "0 6px 22px rgba(155,34,70,0.09)",
                      transition: "background 0.6s cubic-bezier(.7,.2,.2,1), box-shadow 0.5s",
                      "&:hover": {
                        background: `linear-gradient(90deg, ${aura.text} 60%, ${aura.accent} 120%)`,
                        boxShadow: "0 12px 32px rgba(155,34,70,0.13)",
                      }
                    }}>
                    Capture photo
                  </Button>
                </span>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
};

export default WebcamCapture;