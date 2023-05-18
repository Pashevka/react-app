import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchNextElements } from "@/api/elements/elements";
import { AppDispatch, RootState } from "@/stores";
import { selectCanDoNextPage, selectShowedElements } from "@/stores/slices/mainListSlice/mainListSelectors";
import { mainListSliceActions } from "@/stores/slices/mainListSlice/mainListSlice";

import { MainListItem } from "./MainListItem";
import { GENDER_FILTERS, STATUS_FILERS } from "@/stores/slices/mainListSlice/constants";
import styles from "./styles.module.css";

import debounce from 'lodash.debounce'
import { MainListSelectFilters } from "./MainListSelectFilters";
import { MainListSearchFilters } from "./MainListSearchFilters";
import { MainListPagination } from "./MainListPagination";

export const MainList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const showedElements = useSelector(selectShowedElements);
  const canDoNextPage = useSelector(selectCanDoNextPage);

  const {
    fetchedPages,
    showingPage,
    selectedGenderFilter,
    selectedStatusFilter,
    searchValue,
    isLoading
  } = useSelector<RootState, RootState['mainListReducer']>(
    state => state.mainListReducer
  );

  useEffect(() => {
    dispatch(fetchNextElements({
      page: 1,
    }));
  }, []);

  const onPaginationClick = (value: 1 | -1): void => {
    if (showingPage + value > fetchedPages * 2) {
      dispatch(fetchNextElements({
        page: fetchedPages + 1,
        gender: selectedGenderFilter,
        status: selectedStatusFilter,
        searchString: searchValue
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
      status: selectedStatusFilter,
      searchString: searchValue
    }));

  }

  const onStatusSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const statusFilter = e.target.value as STATUS_FILERS
    dispatch(mainListSliceActions.setStatusFilter(statusFilter));
    dispatch(fetchNextElements({
      page: 1,
      gender: selectedGenderFilter,
      status: statusFilter,
      searchString: searchValue
    }));

  }

  const sendSearchRequest = (searchValue: string) => {
    dispatch(mainListSliceActions.setSearchValue(searchValue));
    dispatch(mainListSliceActions.setShowingPage(0));
    dispatch(mainListSliceActions.setFetchedPage(0));
    dispatch(mainListSliceActions.setAllElements([]));
    dispatch(fetchNextElements({
      page: 1,
      gender: selectedGenderFilter,
      status: selectedStatusFilter,
      searchString: searchValue
    }));
  }
  const debouncedSendSearchRequest = debounce(sendSearchRequest, 500)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSendSearchRequest(e.target.value)
  }

  const shouldShowNoElementsText = !isLoading && !showedElements.length
  return (
    <Container className="w-100 h-100 p-2 justify-content-center d-flex flex-column">
      <Row>
        <Col xs={12} sm={4}>
          <h1 className="text-secondary text-center">Si1L-still v0.1</h1>
        </Col>
        <Col>
          <MainListSelectFilters onStatusSelectChange={onStatusSelectChange} onGenderSelectChange={onGenderSelectChange} />
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <MainListSearchFilters onInputChange={onInputChange} />
        </Col>
        <Col className="col-auto">
          <MainListPagination canDoNextPage={canDoNextPage} onPaginationClick={onPaginationClick} showingPage={showingPage} />
        </Col>
      </Row>

      <Row>
        {showedElements.map(dog => {
          return <MainListItem key={dog.id} element={dog} />;
        })}
        {shouldShowNoElementsText && (
          <h2 className='text-danger text-center p-5'>No characters found</h2>
        )}
      </Row>
    </Container>
  );
};

