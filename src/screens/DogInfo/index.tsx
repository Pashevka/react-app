import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const DogInfo: React.FC = () => {
  const navigation = useNavigate();
  return (
    <div>
      DogInfo
      <Button onClick={() => navigation("/list")}>dog</Button>
    </div>
  );
};
