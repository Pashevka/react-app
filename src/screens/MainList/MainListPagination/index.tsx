import React from 'react'
import { Pagination } from 'react-bootstrap'
import styles from "./styles.module.css";

interface IMainListPaginationProps {
    showingPage: number
    canDoNextPage: boolean
    onPaginationClick: (value: -1 | 1) => void
}

export const MainListPagination: React.FC<IMainListPaginationProps> = ({ canDoNextPage, onPaginationClick, showingPage }) => {
    return (
        <Pagination>
            <Pagination.Prev
                data-testid="pagination-prev"
                className={styles.paginationItem}
                disabled={showingPage === 1}
                onClick={() => onPaginationClick(-1)}
            />
            <Pagination.Item>{showingPage}</Pagination.Item>
            <Pagination.Next
                data-testid="pagination-next"
                className={styles.paginationItem}
                disabled={!canDoNextPage}
                onClick={() => onPaginationClick(1)}
            />
        </Pagination>
    )
}