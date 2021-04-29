import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const SeriesDetailBlock = ({ series }) => {
    
    return (
        <div>
            {series.title}
            <Button
                component={Link}
                to={'/series/edit/' + series.id}
            >
                Edit
            </Button>
        </div>
    )
}

export default SeriesDetailBlock;
