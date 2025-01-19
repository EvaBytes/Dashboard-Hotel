import React from "react";
import { Button } from "../../styles/ButtonStyles";

const GenericButton = ({ children, variant = "default", onClick }) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};

export { GenericButton };
