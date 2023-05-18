import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MainListSearchFilters } from '.';

describe('MainListSearchFilters', () => {
    it('should render the input field', () => {
        const { getByTestId } = render(<MainListSearchFilters onInputChange={() => { }} />);
        const input = getByTestId("main-list-search-filter-input");
        expect(input).toBeInTheDocument();
    });

    it('should call onInputChange when input value changes', () => {
        const onInputChange = jest.fn();
        const { getByTestId } = render(<MainListSearchFilters onInputChange={onInputChange} />);
        const input = getByTestId("main-list-search-filter-input");
        fireEvent.change(input, { target: { value: 'test' } });
        expect(onInputChange).toHaveBeenCalled();
    });
});