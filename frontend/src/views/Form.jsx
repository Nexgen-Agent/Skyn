import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

// MUI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// controllers
import { putForm } from '../controllers/actions';
import { useLocation } from 'react-router';

// Lonz Flawls Aura luxury palette
const auraColors = {
  background: "linear-gradient(135deg, #fff1e0 0%, #f9e6f9 100%)",
  card: "rgba(255,255,255,0.67)",
  border: "rgba(155,34,70,0.10)",
  accent: "#9b2246",
  primary: "#6B0F1A",
  label: "#7c2d4a",
  toneSwatchBorder: "#e7b2d6"
};

const skinToneValues = [1, 2, 3, 4, 5, 6];
const skinToneColors = [
  "#F9F5EC", "#FAF5EA", "#F0E3AB", "#CEAC68", "#693B29", "#211C28"
];
const skinTypes = ["All", "Oily", "Normal", "Dry"];
const acnes = ['Low', 'Moderate', 'Severe'];
const otherConcerns = [
  'sensitive', 'fine lines', 'wrinkles', 'redness', 'pore', 'pigmentation', 'blackheads', 'whiteheads',
  'blemishes', 'dark circles', 'eye bags', 'dark spots'
];

const defaultData = {
  tone: 5,
  type: "Oily",
  acne: "Moderate"
};

const Form = () => {
  const { state } = useLocation();
  const data = state && state.data ? state.data : defaultData;
  const { type, tone, acne } = data;

  const [currType, setCurrType] = useState(type);
  const [currTone, setCurrTone] = useState(parseInt(tone));
  const [currAcne, setAcne] = useState(acne);
  const [features, setFeatures] = useState({
    "normal": false, "dry": false, "oily": false, "combination": false,
    "acne": false, "sensitive": false, "fine lines": false, "wrinkles": false,
    "redness": false, "dull": false, "pore": false, "pigmentation": false,
    "blackheads": false, "whiteheads": false, "blemishes": false, "dark circles": false,
    "eye bags": false, "dark spots": false
  });

  const handleChange = (event) => {
    setFeatures({
      ...features,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTone = (e) => setCurrTone(Number(e.target.value));
  const handleType = (e) => setCurrType(e.target.value);
  const handleAcne = (e) => setAcne(e.target.value);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // FIX: Don't mutate state directly! Work on a new object.
    let updatedFeatures = { ...features };

    if (currType === 'All') {
      updatedFeatures['normal'] = true;
      updatedFeatures['dry'] = true;
      updatedFeatures['oily'] = true;
      updatedFeatures['combination'] = true;
    } else {
      updatedFeatures[currType.toLowerCase()] = true;
    }
    if (currAcne !== "Low") {
      updatedFeatures['acne'] = true;
    }
    for (const key in updatedFeatures) {
      updatedFeatures[key] = updatedFeatures[key] ? 1 : 0;
    }
    putForm(updatedFeatures, currType, currTone, navigate);
  };

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
          borderRadius: "32px",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
          border: `1px solid ${auraColors.border}`,
          padding: "3rem 2rem",
        }}
        alignitems="center"
      >
        <Typography
          variant="h5"
          component="div"
          textAlign="center"
          sx={{
            fontFamily: "'Poppins', 'DM Sans', sans-serif",
            fontWeight: 700,
            color: auraColors.primary,
            letterSpacing: "-0.5px",
            marginBottom: "2vh"
          }}
        >
          Your Aura Results
        </Typography>

        <FormControl component="fieldset" sx={{ marginTop: "3vh", width: "100%" }}>
          {/* Tone Selection */}
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={9}>
              <InputLabel
                id="tone-label"
                sx={{ color: auraColors.label, fontWeight: 600, marginBottom: "0.4em" }}
              >
                Tone
              </InputLabel>
              <Select
                labelId="tone-label"
                id="tone-select"
                value={currTone}
                onChange={handleTone}
                fullWidth
                sx={{
                  borderRadius: "18px",
                  background: "#fff8f6"
                }}
              >
                {skinToneValues.map((value) => (
                  <MenuItem value={value} key={value}>{value}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: skinToneColors[currTone - 1],
                  margin: "0 auto",
                  borderRadius: "50%",
                  border: `2.5px solid ${auraColors.toneSwatchBorder}`,
                  boxShadow: "0 2px 10px rgba(155,34,70,0.08)",
                }}
              ></div>
            </Grid>
          </Grid>

          {/* Type Selection */}
          <Grid marginTop="2vh">
            <FormLabel component="legend" sx={{ color: auraColors.label, fontWeight: 600 }}>
              Type
            </FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              onChange={handleType}
              value={currType}
              sx={{ marginTop: "0.5em" }}
            >
              <Grid container>
                {skinTypes.map((stype) => (
                  <Grid item xs={6} key={stype}>
                    <FormControlLabel
                      value={stype}
                      control={<Radio
                        sx={{
                          color: auraColors.accent,
                          '&.Mui-checked': { color: auraColors.primary }
                        }}
                      />}
                      label={stype}
                      sx={{ fontWeight: 500 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Grid>

          {/* Acne Selection */}
          <Grid marginTop="2vh">
            <FormLabel component="legend" sx={{ color: auraColors.label, fontWeight: 600 }}>
              Acne
            </FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              onChange={handleAcne}
              value={currAcne}
              sx={{ marginTop: "0.5em" }}
            >
              <Grid container>
                {acnes.map((ac) => (
                  <Grid item key={ac}>
                    <FormControlLabel
                      value={ac}
                      control={<Radio
                        sx={{
                          color: auraColors.accent,
                          '&.Mui-checked': { color: auraColors.primary }
                        }}
                      />}
                      label={ac}
                      sx={{ fontWeight: 500 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Grid>

          {/* Other Concerns */}
          <Grid marginTop="2vh">
            <FormLabel component="legend" sx={{ color: auraColors.label, fontWeight: 600 }}>
              Specify other skin concerns
            </FormLabel>
            <Grid container>
              {otherConcerns.map((concern) => (
                <Grid item xs={6} key={concern}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={features[concern]}
                        onChange={handleChange}
                        name={concern}
                        sx={{
                          color: auraColors.accent,
                          '&.Mui-checked': { color: auraColors.primary }
                        }}
                      />
                    }
                    value={concern}
                    label={concern.charAt(0).toUpperCase() + concern.slice(1)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid marginTop="2vh" item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{
                background: `linear-gradient(90deg, ${auraColors.primary} 70%, ${auraColors.accent})`,
                color: "#fff",
                borderRadius: "100px",
                fontWeight: 600,
                fontSize: "1.1rem",
                boxShadow: "0 3px 14px rgba(155,34,70,0.08)",
                textTransform: "none",
                '&:hover': {
                  background: `linear-gradient(90deg, ${auraColors.accent} 70%, ${auraColors.primary})`,
                  boxShadow: "0 6px 24px rgba(155,34,70,0.13)",
                }
              }}
            >
              Submit
            </Button>
          </Grid>
        </FormControl>
      </Container>
    </div>
  );
};

export default Form;