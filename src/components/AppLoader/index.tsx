import { RootState } from '@/stores';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AppLoader = () => {
    const loadingFlags = useSelector<RootState, boolean[]>(state => {
        return [
            state.mainListReducer.isLoading,
            state.singleElementReducer.isLoading
        ]
    });

    const hasSomethingThatIsLoading = loadingFlags.some(flag => flag)
    return (
        <>
            {hasSomethingThatIsLoading && (
                <div className="loading-overlay d-flex justify-content-center align-items-center w-100 h-100 position-absolute top-0 bg-black bg-opacity-75">
                    <div className="spinner-border" role="status" />
                </div>
            )}
        </>
    );
};

export default AppLoader;