import React, { useEffect } from "react";
import { Form, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchNextDogs } from "@/api/dogs/dogs";
import { AppDispatch, RootState } from "@/stores";
import { selectShowedDogs } from "@/stores/slices/mainListSlice/mainListSelectors";
import { mainListSliceActions } from "@/stores/slices/mainListSlice/mainListSlice";

import { MainListItem } from "./MainListItem";

export const MainList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allDogs = useSelector(selectShowedDogs);
  const fetchedPages = useSelector<RootState, number>(
    state => state.mainListReducer.fetchedPages
  );

  const showingPage = useSelector<RootState, number>(
    state => state.mainListReducer.showingPage
  );

  useEffect(() => {
    // remove it
    if (fetchedPages !== 0) {
      return;
    }
    dispatch(fetchNextDogs(0));
  }, []);

  const onPaginationClick = (value: 1 | -1): void => {
    if (showingPage + value > fetchedPages) {
      dispatch(fetchNextDogs(fetchedPages));
    } else {
      dispatch(mainListSliceActions.setShowingPage(showingPage + value));
    }
  };

  return (
    <div className="container w-100 h-100 p-2 justify-content-center d-flex flex-column">
      <div className="row p-4">
        <div className="col flex-grow-0">
          <h1 className="text-secondary text-nowrap">DOGS v0.1</h1>
        </div>
        <div className="col">
          <div className="h-100 flex-1">
            <div className="row align-items-center justify-content-center h-100">
              <div className="col-4">
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
              <div className="col-4">
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
              <div className="col-4">
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-4">
        {allDogs.map(dog => {
          return <MainListItem key={dog.id} element={dog} />;
        })}
      </div>
      <div className="row">
        <div className="col-12 w-100 d-flex justify-content-center align-items-center mt-2">
          <span className="text-info p-2">Page: {showingPage}</span>
          <Pagination>
            <Pagination.Prev
              disabled={showingPage === 1}
              onClick={() => onPaginationClick(-1)}
            />
            <Pagination.Next onClick={() => onPaginationClick(1)} />
          </Pagination>
        </div>
      </div>
    </div>
  );
};
