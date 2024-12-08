import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import fetch_url from "../../providers/url.provider";

const url: string = fetch_url();


const CustomForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    fetch(url + "/add-suggestion", {
        method: "post",headers: {
            "Content-Type": "application/json" // Ensure the server expects JSON data
        },
        body: JSON.stringify(formData) 

    }).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                console.log(data)
            })
        } else {
            console.log("Eroare la trimitere de raspunsuri")
        }
    })
    // You can add further logic here (e.g., send data to the backend)
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: "800px", // Doubled the width from 400px to 800px
        margin: "auto",
        padding: "2rem",
        borderRadius: "0.5rem",
        backgroundColor: "#d0aba0", // Set the background color to #d0aba0
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginBottom: "5%"
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
        Submit Details
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={3}
      />

      <TextField
        label="Link"
        name="link"
        value={formData.link}
        onChange={handleChange}
        required
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default CustomForm;
