import React, { useState, useEffect } from 'react';
import { UploadImage } from '../controllers/actions';
import { useNavigate } from 'react-router-dom';

import WebcamCapture from './Components/webCam';

// MUI
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';

// Lonz Flawls Aura luxury palette
const auraColors = {
  background: "linear-gradient(135deg, #fff1e0 0%, #f9e6f9 100%)",
  card: "rgba(255,255,255,0.78)",
  border: "rgba(155,34,70,0.10)",
  accent: "#9b2246",
  primary: "#6B0F1A"
};

function ImageInput() {
  const [landingPage, setLandingPage] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

  // FIX: Move side effect out of render
  useEffect(() => {
    if (imageSrc !== null) {
      UploadImage(imageSrc, navigate);
    }
  }, [imageSrc, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: auraColors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', 'Poppins', sans-serif"
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          background: auraColors.card,
          borderRadius: "28px",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
          border: `1px solid ${auraColors.border}`,
          padding: "3rem 2rem",
        }}
        alignitems="center"
      >
        <Grid container justifyContent="center" sx={{ minHeight: "70vh" }} spacing={1}>
          {landingPage ? (
            <Grid item xs={12} textAlign="center" sx={{ margin: "20vh auto" }}>
              <PhotoCameraIcon sx={{ fontSize: "5em", color: auraColors.primary, marginBottom: 2 }} />
              <Button
                onClick={() => setLandingPage(false)}
                variant="contained"
                fullWidth
                sx={{
                  background: `linear-gradient(90deg, ${auraColors.primary} 70%, ${auraColors.accent})`,
                  color: "#fff",
                  borderRadius: "100px",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  boxShadow: "0 3px 14px rgba(155,34,70,0.08)",
                  '&:hover': {
                    background: `linear-gradient(90deg, ${auraColors.accent} 70%, ${auraColors.primary})`,
                    boxShadow: "0 6px 24px rgba(155,34,70,0.13)",
                  }
                }}
              >
                Take a photo
              </Button>
            </Grid>
          ) : (
            <WebcamCapture setImageSrc={setImageSrc} />
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default ImageInput;
