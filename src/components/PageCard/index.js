import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardContent, Grid } from '@material-ui/core';
import { DateTime } from 'luxon';
import React from 'react'
import { Link } from 'react-router-dom';

const PageCard = (props) => {
    const {
        name,
        page,
        contentType
    } = props;

    return (
        <Grid item sm={12} md={6} xl={6} lg={6}>
            <Link
                className="card card-box-hover-rise bg-white"
                to={'/pages/edit/' + contentType}>
                    <div className="card-badges text-uppercase">
                        <span className="text-white font-weight-bold">{name}</span>
                    </div>

                    <img alt={page.title} className="card-img-top" src={page.header.formats.small.url} />

                    <CardContent className="px-2">
                        <h3 className="font-size-lg">
                            {page.title}
                        </h3>
                        <h4 className="font-size-md">
                            {page.subtitle}
                        </h4>
                        <div className="card-date text-black-50 mt-2">
                            <FontAwesomeIcon icon={['far', 'clock']} className="mr-1 mt-1 pt-1" />
                            <small><b>Updated:</b> {DateTime.fromISO(page.updated_at).toFormat("MMM dd, yyyy h:mm a")}</small>
                        </div>
                    </CardContent>
            </Link>
        </Grid>
    )
}

export default PageCard;
