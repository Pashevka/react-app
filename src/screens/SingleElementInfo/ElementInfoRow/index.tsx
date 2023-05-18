import { IListElement } from '@/api/elements/types'
import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

interface IElementInfoRowProps {
    name: keyof IListElement
    value: string
    onChangeData: (key: keyof IListElement, value: string) => void
}

export const ElementInfoRow: React.FC<IElementInfoRowProps> = ({ name, onChangeData, value }) => {
    return (
        <Row className="mb-3 align-items-center d-flex text-capitalize">
            <Col xs={12} md={3}>
                <Form.Label data-testid='info-row-name'>{name}:</Form.Label>
            </Col>
            <Col xs={12} md={9}>
                <Form.Control data-testid='info-row-input' type="text" value={value} onChange={(e) => {
                    onChangeData(name, e.target.value)
                }} />
            </Col>
        </Row>
    )
}