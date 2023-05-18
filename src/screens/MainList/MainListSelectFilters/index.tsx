import React from "react";
import { Form } from "react-bootstrap";

import {
  GENDER_FILTERS,
  STATUS_FILERS,
} from "@/stores/slices/mainListSlice/constants";

interface IMainListSelectFilters {
  onStatusSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onGenderSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const MainListSelectFilters: React.FC<IMainListSelectFilters> = ({
  onGenderSelectChange,
  onStatusSelectChange,
}) => {
  return (
    <div className="row align-items-center justify-content-center h-100">
      <div className="col-6">
        <Form.Select
          data-testid="main-list-status-select"
          defaultValue={STATUS_FILERS.empty}
          aria-label="Default select example"
          onChange={onStatusSelectChange}
        >
          <option value={STATUS_FILERS.empty}>Status</option>
          <option value={STATUS_FILERS.alive}>Alive</option>
          <option value={STATUS_FILERS.dead}>Dead</option>
          <option value={STATUS_FILERS.unknown}>Unknown</option>
        </Form.Select>
      </div>
      <div className="col-6">
        <Form.Select
          data-testid="main-list-status-gender"
          defaultValue={GENDER_FILTERS.empty}
          aria-label="Default select example"
          onChange={onGenderSelectChange}
        >
          <option value={GENDER_FILTERS.empty}>Gender</option>
          <option value={GENDER_FILTERS.female}>Female</option>
          <option value={GENDER_FILTERS.male}>Male</option>
          <option value={GENDER_FILTERS.genderless}>Genderless</option>
          <option value={GENDER_FILTERS.unknown}>Unknown</option>
        </Form.Select>
      </div>
    </div>
  );
};
