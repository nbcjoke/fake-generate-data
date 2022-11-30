import React, { useState } from "react";

import { TableComponent } from "../src/components/table";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

function App() {
  const [locale, setLocale] = useState("");
  const [seed, setSeed] = useState(1);
  const [error, setError] = useState(0);

  const handleChange = (e) => {
    setLocale(e.target.value || "en");
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <FormControl style={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">locale</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={locale}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="el">Ελληνικά</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
          </Select>
        </FormControl>
        <TextField
          placeholder="Error..."
          type="number"
          inputProps={{ step: 0.25 }}
          style={{ width: 300 }}
          value={error}
          onChange={(e) => setError(e.target.value)}
        />
        <TextField
          placeholder="Seed..."
          type="number"
          style={{ width: 300 }}
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
        />
      </div>
      <TableComponent locale={locale} error={error} seed={seed} />
    </div>
  );
}

export default App;
