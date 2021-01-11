import React from "react";
import { Button } from "react-bootstrap";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoadingButton.css";

export default function LoadingButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoadingButton ${className}`}
      {...props}
    >
      {isLoading && <BsArrowRepeat className="spinning" />}
      {props.children}
    </Button>
  );
}