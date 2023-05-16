import React, { useEffect } from "react";
import { Form, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchNextElements } from "@/api/elements/elements";
import { AppDispatch, RootState } from "@/stores";
import { selectCanDoNextPage, selectShowedElements } from "@/stores/slices/mainListSlice/mainListSelectors";
import { mainListSliceActions } from "@/stores/slices/mainListSlice/mainListSlice";

import { MainListItem } from "./MainListItem";
import { GENDER_FILTERS, STATUS_FILERS } from "@/stores/slices/mainListSlice/constants";
import styles from "./styles.module.css";

import debounce from 'lodash.debounce'

export const MainList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const showedElements = useSelector(selectShowedElements);
  const canDoNextPage = useSelector(selectCanDoNextPage);

  const fetchedPages = useSelector<RootState, number>(
    state => state.mainListReducer.fetchedPages
  );

  const showingPage = useSelector<RootState, number>(
    state => state.mainListReducer.showingPage
  );

  const gender = useSelector<RootState, GENDER_FILTERS>(
    state => state.mainListReducer.selectedGenderFilter
  );

  const status = useSelector<RootState, STATUS_FILERS>(
    state => state.mainListReducer.selectedStatusFilter
  );

  const search = useSelector<RootState, string>(
    state => state.mainListReducer.searchValue
  );

  const isFetching = useSelector<RootState, boolean>(
    state => state.mainListReducer.isAllElementsFetching
  );
  
  useEffect(() => {
    // remove it
    if (fetchedPages !== 0) {
      return;
    }
    dispatch(fetchNextElements({
      page: 1,
    }));
  }, []);

  const onPaginationClick = (value: 1 | -1): void => {
    if (showingPage + value > fetchedPages * 2) {
      dispatch(fetchNextElements({
        page: fetchedPages + 1,
        gender,
        status,
        searchString: search
      }));
    } else {
      dispatch(mainListSliceActions.setShowingPage(showingPage + value));
    }
  };

  const onGenderSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genderFilter = e.target.value as GENDER_FILTERS
    dispatch(mainListSliceActions.setGenderFilter(genderFilter));
    dispatch(fetchNextElements({
      page: 1,
      gender: genderFilter,
      status: status,
      searchString: search
    }));

  }

  const onStatusSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const statusFilter = e.target.value as STATUS_FILERS
    dispatch(mainListSliceActions.setStatusFilter(statusFilter));
    dispatch(fetchNextElements({
      page: 1,
      gender: gender,
      status: statusFilter,
      searchString: search
    }));

  }

  const sendSearchRequest = (searchValue: string) => {
    dispatch(mainListSliceActions.setSearchValue(searchValue));
    dispatch(mainListSliceActions.setShowingPage(0));
    dispatch(mainListSliceActions.setFetchedPage(0));
    dispatch(mainListSliceActions.setAllElements([]));
    dispatch(fetchNextElements({
      page: 1,
      gender: gender,
      status: status,
      searchString: searchValue
    }));
  }
  const debouncedSendSearchRequest = debounce(sendSearchRequest, 500)

  const onInputChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    debouncedSendSearchRequest(e.target.value)
  }

  const shouldShowNoElementsText = !isFetching && !showedElements.length
  return (
    <div className="container w-100 h-100 p-2 justify-content-center d-flex flex-column">
      <div className="row">
        <div className="col flex-grow-0">
          <h1 className="text-secondary text-nowrap">Si1L-still v0.1</h1>
        </div>
        <div className="col">
          <div className="h-100 flex-1">
            <div className="row align-items-center justify-content-center h-100">
              <div className="col-6">
                <Form.Select defaultValue={STATUS_FILERS.empty} aria-label="Default select example" onChange={onStatusSelectChange}>
                  <option value={STATUS_FILERS.empty}>Status</option>
                  <option value={STATUS_FILERS.alive}>Alive</option>
                  <option value={STATUS_FILERS.dead}>Dead</option>
                  <option value={STATUS_FILERS.unknown}>Unknown</option>
                </Form.Select>
              </div>
              <div className="col-6">
                <Form.Select defaultValue={GENDER_FILTERS.empty} aria-label="Default select example" onChange={onGenderSelectChange}>
                  <option value={GENDER_FILTERS.empty}>Gender</option>
                  <option value={GENDER_FILTERS.female}>Female</option>
                  <option value={GENDER_FILTERS.male}>Male</option>
                  <option value={GENDER_FILTERS.genderless}>Genderless</option>
                  <option value={GENDER_FILTERS.unknown}>Unknown</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-12">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Character Name</Form.Label>
            <Form.Control onChange={onInputChange} type="text" placeholder="Enter name" />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        {showedElements.map(dog => {
          return <MainListItem key={dog.id} element={dog} />;
        })}
        {shouldShowNoElementsText && (
          <h2 className='text-danger text-center p-5'>No characters found</h2>
        )}
      </div>
      <div className="row">
        <div className="col-12 w-100 d-flex justify-content-center align-items-center mt-2">
          <span className="text-info p-2">Page: {showingPage}</span>
          <Pagination>
            <Pagination.Prev
              className={styles.paginationItem}
              disabled={showingPage === 1}
              onClick={() => onPaginationClick(-1)}
            />
            <Pagination.Next className={styles.paginationItem} disabled={!canDoNextPage} onClick={() => onPaginationClick(1)} />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

