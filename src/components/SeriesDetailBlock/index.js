import { Divider, Grid } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const SeriesDetailBlock = ({ series }) => {
    return (
        <div className="mb-5">
            <Grid container alignItems="flex-start" spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Series Information</h3>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Divider /></Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <div className="ml-2">
                        {/* <WebAssetTwoToneIcon fontSize="large" /> */}
                        <span className="text-black-50 text-uppercase font-size-xl font-weight-bold ml-2">
                            URL
                        </span>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <div className="text-black font-weight-regular pr-4 ml-5 text-left">
                        {series.slug}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Divider /></Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <div className="ml-2">
                        {/* <FontDownloadTwoToneIcon fontSize="large" /> */}
                        <span className="text-black-50 text-uppercase font-size-xl font-weight-bold mt-2 ml-2">
                            Subtitle
                        </span>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <div className="text-black font-weight-regular pr-4 ml-5 text-left">
                        {series.subtitle}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Divider /></Grid>

                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <div className="ml-2">
                        {/* <ViewHeadlineTwoToneIcon fontSize="large" /> */}
                        <span className="text-black-50 text-uppercase font-size-xl font-weight-bold mt-2 ml-2">
                            Description
                        </span>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <div className="text-black font-weight-regular pr-4 ml-5 text-left">
                        <ReactMarkdown>{series.description}</ReactMarkdown>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Divider /></Grid>

                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <div className="ml-2">
                        {/* <ViewHeadlineTwoToneIcon fontSize="large" /> */}
                        <span className="text-black-50 text-uppercase font-size-xl font-weight-bold mt-2 ml-2">
                            Cadence
                        </span>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <div className="text-black font-weight-regular pr-4 ml-5 text-left text-capitalize">
                        {series.cadence}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Divider /></Grid>
            </Grid>
            
        </div>
    )
}

export default SeriesDetailBlock;
