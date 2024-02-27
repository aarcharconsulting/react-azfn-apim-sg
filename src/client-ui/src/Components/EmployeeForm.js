import React, { useState, useEffect } from "react";
import { Box, TextField, Button} from "@mui/material";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../Constants";

const EmployeeForm = ({ employee, onSave, serverError}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    interests: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        interests: "",
      });
    }
  }, [employee]);

  useEffect(()=>{
    toast.error(serverError, TOAST_CONFIG);
  },[serverError])

  const validate = () => {
    let tempErrors = {};

    tempErrors.name =
      formData.name.length >= 5 && /^[a-zA-Z0-9' ]+$/.test(formData.name)
        ? ""
        : "Name must be at least 5 characters long and contain no special characters other than an apostrophe.";

    tempErrors.address = /^[a-zA-Z0-9, ]+$/.test(formData.address)
      ? ""
      : "Address can only contain letters, numbers, commas, and spaces.";

    tempErrors.phone = formData.phone ? "" : "This field is required.";

    tempErrors.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
      ? ""
      : "Please enter a valid email address.";

    tempErrors.interests = /^[a-zA-Z0-9, ]+$/.test(formData.interests)
      ? ""
      : "Interests can only contain letters, numbers, commas, and spaces.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >


      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        name="address"
        label="Address"
        value={formData.address}
        onChange={handleChange}
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        name="phone"
        label="Phone"
        value={formData.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        name="interests"
        label="Interests"
        value={formData.interests}
        onChange={handleChange}
        error={!!errors.interests}
        helperText={errors.interests}
      />

      <Button
        style={{
          position: "absolute",
          bottom: "0",
          marginBottom: ".5rem",
          marginRight: "5rem",
          right: "0",
        }}
        variant="contained"
        color="success"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Box>
  );
};

export default EmployeeForm;
