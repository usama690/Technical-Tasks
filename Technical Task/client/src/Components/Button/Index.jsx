import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppButton = ({
  value,
  variant,
  isFullWidth,
  color,
  sx,
  type,
  onClick,
  icon
}) => {
  const navigate = useNavigate();
  return (
    <Button
      type={type}
      startIcon={icon}
      onClick={onClick}
      fullWidth={isFullWidth}
      variant={variant}
      color={color ?? "primary"}
      sx={sx}
    >
      {value}
    </Button>
  );
};

export default AppButton;
