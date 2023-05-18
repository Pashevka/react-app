import { fetchCharacter } from "@/api/elements/elements";
import { IListElement } from "@/api/elements/types";
import { AppDispatch, RootState } from "@/stores";
import { selectAllInfoElements } from "@/stores/slices/singleElementSlice/singleElementSelectors";
import { singleElementSliceActions } from "@/stores/slices/singleElementSlice/singleElementSlice";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import './styles.css';
import { ElementInfoRow } from "./ElementInfoRow";

export const SingleElementInfo: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>();

  const element = useSelector<RootState, IListElement | null>(state => state.singleElementReducer.element)
  const hasErrors = useSelector<RootState, boolean>(state => state.singleElementReducer.hasErrors)
  const infoElements = useSelector(selectAllInfoElements);

  useEffect(() => {
    if (!params.id) {
      return navigate('/not-found')
    }
    dispatch(fetchCharacter(params.id))

    return () => {
      dispatch(singleElementSliceActions.clear())
    }
  }, [])

  useEffect(() => {
    if (hasErrors) {
      return navigate('/not-found')
    }
  }, [hasErrors])

  const onChangeData = (key: keyof IListElement, value: string) => {
    dispatch(singleElementSliceActions.setNewData({
      key: key,
      value: value
    }))
  }

  if (!element) {
    return null
  }


  return (
    <Container className='character-container'>
      <Card className="my-3 character-card">
        <div className="character-image-container">
          <Card.Img className="character-image" variant="top" src={element.image} />
        </div>
        <Card.Body>
          <h3 className="mb-3 text-center">{element.name}</h3>
          {infoElements.map(({ key, value }) => {
            return (
              <ElementInfoRow key={key} name={key} value={value} onChangeData={onChangeData} />
            )
          })}
        </Card.Body>
        <Card.Footer className="justify-content-end d-flex">
          <Button variant="primary" onClick={() => navigate('/list')}>
            Back to list
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};
