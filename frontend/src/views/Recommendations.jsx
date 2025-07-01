import React from 'react';
// MUI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

import ProductCard from './Components/ProductCard';
import { useLocation } from 'react-router';

// Lonz Flawls Aura luxury palette
const auraColors = {
  background: "linear-gradient(135deg, #fff1e0 0%, #f9e6f9 100%)",
  sectionTitle: "#6B0F1A",
  sectionSub: "#9b2246",
  card: "rgba(255,255,255,0.82)"
};

const Recommendations = () => {
  const { state } = useLocation();
  const { data } = state || {};
  const { general = {}, makeup = [] } = data || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: auraColors.background,
        paddingTop: "2vh",
        fontFamily: "'DM Sans', 'Poppins', sans-serif"
      }}
    >
      <Container
        sx={{
          background: auraColors.card,
          borderRadius: "28px",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
          padding: { xs: 2, md: 4 },
        }}
        alignitems="center"
        maxWidth="md"
      >
        {/* Skin Care Section */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          textAlign="center"
          sx={{
            color: auraColors.sectionTitle,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            marginTop: "2vh"
          }}
        >
          Skin Care
        </Typography>
        {Object.keys(general).map(type => (
          <div key={type}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={auraColors.sectionSub}
              marginTop="2vh"
              sx={{ fontWeight: 600 }}
            >
              {type}
            </Typography>
            <Grid container spacing={2}>
              {(general[type] || []).slice(0, 4).map((prod, idx) => (
                <Grid item xs={12} sm={6} md={3} key={prod.name + idx}>
                  <ProductCard
                    name={prod.name}
                    brand={prod.brand}
                    image={prod.img}
                    price={prod.price}
                    url={prod.url}
                    concern={prod.concern}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}

        {/* Make Up Section */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          textAlign="center"
          sx={{
            color: auraColors.sectionTitle,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            marginTop: "3vh"
          }}
        >
          Make Up
        </Typography>
        <FormLabel component="legend" sx={{ marginBottom: 2, color: auraColors.sectionSub }}></FormLabel>
        <Grid container spacing={2}>
          {(makeup || []).map((prod, idx) => (
            <Grid item xs={12} sm={6} md={3} key={prod.name + idx}>
              <ProductCard
                name={prod.name}
                brand={prod.brand}
                image={prod.img}
                price={prod.price}
                url={prod.url}
                concern={prod.concern}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Recommendations;