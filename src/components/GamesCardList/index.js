import { Grid } from '@material-ui/core';
import React from 'react'

import GameCard from 'components/GameCard';

const GamesCardList = (props) => {
    const {
        games
    } = props;
    
    return (
        <div>
            <Grid container spacing={2} alignItems="stretch">
                { games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </Grid>
        </div>
    )
}

export default GamesCardList;
