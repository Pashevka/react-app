import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SingleElementInfo: React.FC = () => {
  const navigation = useNavigate();
  return (
    <div>
      DogInfo
      <Button onClick={() => navigation("/list")}>dog</Button>
    </div>
  );
};
