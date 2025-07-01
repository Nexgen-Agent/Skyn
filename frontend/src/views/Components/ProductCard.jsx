import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Lonz Flawls Aura luxury palette
const auraColors = {
  card: "rgba(255,255,255,0.86)",
  border: "rgba(155,34,70,0.12)",
  accent: "#9b2246",
  primary: "#6B0F1A",
  title: "#6B0F1A",
  brand: "#9b2246",
  shadow: "0 4px 24px 0 rgba(31,38,135,0.08)",
  price: "#9b2246",
};

const ProductCard = ({ name, brand, image, price, url, concern }) => (
  <Card
    sx={{
      borderRadius: "22px",
      background: auraColors.card,
      border: `1px solid ${auraColors.border}`,
      boxShadow: auraColors.shadow,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "box-shadow 0.2s",
      minHeight: 360,
      '&:hover': {
        boxShadow: "0 8px 32px 0 rgba(155,34,70,0.18)",
        transform: "translateY(-3px) scale(1.03)",
      },
    }}
    tabIndex={0}
    aria-label={`Product: ${name} by ${brand}`}
  >
    <CardMedia
      component="img"
      height="160"
      image={image}
      alt={`${name} by ${brand}`}
      sx={{
        borderRadius: "18px",
        objectFit: "cover",
        marginTop: 2,
        maxWidth: "85%",
        background: "#f9e6f9"
      }}
    />
    <CardContent sx={{ width: "100%", textAlign: "center", p: 2 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: auraColors.title,
          fontWeight: 700,
          fontFamily: "'Poppins', 'DM Sans', sans-serif",
          mb: 0.5,
          fontSize: "1.1rem"
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: auraColors.brand,
          fontWeight: 500,
          fontFamily: "'DM Sans', 'Poppins', sans-serif"
        }}
      >
        {brand}
      </Typography>
      {concern && (
        <Typography
          variant="body2"
          sx={{
            color: auraColors.accent,
            fontWeight: 500,
            fontFamily: "'DM Sans', 'Poppins', sans-serif",
            mt: 0.5,
            fontSize: "0.95rem"
          }}
        >
          Concern: {concern}
        </Typography>
      )}
      {price && (
        <Typography
          variant="body2"
          sx={{
            color: auraColors.price,
            fontWeight: 600,
            mt: 0.7,
            fontSize: "1.02rem"
          }}
        >
          {typeof price === "string" && price.match(/^\$\d/)
            ? price
            : `₹${price}`}
        </Typography>
      )}
      <Box mt={2}>
        <Button
          variant="contained"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewIcon />}
          sx={{
            background: `linear-gradient(90deg, ${auraColors.primary} 70%, ${auraColors.accent})`,
            color: "#fff",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "none",
            px: 3,
            boxShadow: "0 3px 14px rgba(155,34,70,0.09)",
            '&:hover': {
              background: `linear-gradient(90deg, ${auraColors.accent} 70%, ${auraColors.primary})`,
              boxShadow: "0 6px 24px rgba(155,34,70,0.13)",
            }
          }}
          aria-label={`View ${name} on seller site`}
        >
          View
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default ProductCard;