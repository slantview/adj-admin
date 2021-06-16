import { Grid } from '@material-ui/core';
import React from 'react'

import PageCard from 'components/PageCard';

const PagesList = (props) => {
    const {
        data
    } = props;
   
    return (
        <div>
            <Grid container spacing={4} alignItems="stretch">
                { data?.homePage &&
                    <PageCard name="Home" page={data?.homePage} contentType="home-page" />
                }
                { data?.aboutPage &&
                    <PageCard name="About" page={data.aboutPage} contentType="about-page" />
                }
                { data?.eventsListPage &&
                    <PageCard name="Events List" page={data.eventsListPage} contentType="events-list-page" />
                }
                { data?.gamesListPage &&
                    <PageCard name="Games List" page={data.gamesListPage} contentType="games-list-page" />
                }
            </Grid>
        </div>
    )
}

export default PagesList;
