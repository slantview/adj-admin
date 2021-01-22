import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  LinearProgress,
  Card,
  CardContent,
  Button
} from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function UsersGraph() {
  

    const chartDashboardStatistics2BOptions = {
        chart: {
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#3c44b1', 'rgba(60, 68, 177, 0.27)'],
        fill: {
            opacity: 0.85,
            colors: ['#3c44b1', 'rgba(60, 68, 177, 0.27)']
        },
        grid: {
            strokeDashArray: '5',
            borderColor: 'rgba(125, 138, 156, 0.3)'
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        legend: {
            show: true
        },
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    };
    const chartDashboardStatistics2BData = [
        {
            name: 'Active',
            data: [90.0, 90.0, 90.0, 92.0, 92.0, 92.0, 92.0]
        },
        {
            name: 'Suspended',
            data: [10.0, 10.0, 10.0, 8.0, 8.0, 8.0, 8.0]
        }
    ];

    return (
        <>
            <div className="mb-spacing-6">
                <Grid item lg={12} xl={12}>
                    <Card className="card-box">
                    <div className="card-header">
                        <div className="card-header--title">
                            <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
                                Sites
                            </h4>
                        </div>
                        <div className="card-header--actions">
                        {/* <Button size="small" className="btn-neutral-first">
                            <span className="btn-wrapper--label">Actions</span>
                            <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                                icon={['fas', 'chevron-down']}
                                className="opacity-8 font-size-xs"
                            />
                            </span>
                        </Button> */}
                        </div>
                    </div>
                    <CardContent>
                        <div>
                        <Chart
                            options={chartDashboardStatistics2BOptions}
                            series={chartDashboardStatistics2BData}
                            type="bar"
                            height={280}
                        />
                        </div>
                        <Grid container spacing={0}>
                        <Grid item md={6}>
                            <div className="p-3">
                            <div className="mb-1 font-weight-bold">Active</div>
                            <LinearProgress
                                variant="determinate"
                                className="progress-animated-alt progress-xs progress-bar-primary"
                                value={90}
                            />
                            <div className="align-box-row progress-bar--label mt-1 text-muted">
                                <small className="text-dark">0</small>
                                <div className="ml-auto">100%</div>
                            </div>
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="p-3">
                            <div className="mb-1 font-weight-bold">Suspended</div>
                            <LinearProgress
                                variant="determinate"
                                className="progress-animated-alt progress-xs progress-bar-success"
                                value={10}
                            />
                            <div className="align-box-row progress-bar--label mt-1 text-muted">
                                <small className="text-dark">0</small>
                                <div className="ml-auto">100%</div>
                            </div>
                            </div>
                        </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Grid>
            </div>
        </>
    );
}
