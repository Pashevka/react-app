import React from "react";
import { Form } from "react-bootstrap";

interface IMainListSearchFiltersProps {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MainListSearchFilters: React.FC<IMainListSearchFiltersProps> = ({
  onInputChange,
}) => {
  return (
    <Form.Group>
      <Form.Control
        data-testid="main-list-search-filter-input"
        type="text"
        placeholder="Enter name"
        onChange={onInputChange}
      />
    </Form.Group>
  );
};
