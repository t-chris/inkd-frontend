import React from "react";
import { Button } from "react-bootstrap";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoadingButton.css";

export default function LoadingButton({
  loadingBool,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      disabled={disabled || loadingBool}
      className={`LoadingButton ${className}`}
      {...props}
    >
      {loadingBool && <BsArrowRepeat className="spinning" />}
      {props.children}
    </Button>
  );
}