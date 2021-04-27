import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment-timezone';
import _ from 'lodash';

const SeriesHeaderAnalytics = (props) => {
    const {
        analytics,
        timezone
    } = props;

    const getDateArray = () => {
        let dateArray = new Array();
        for (let i = 0; i <= 6; i++) {
            const day = moment().tz(timezone).subtract(i, 'd');
            dateArray[i] = day;
        }
        return dateArray.reverse();
    };

    const extractAnalytics = (dates, type) => {
        if (typeof analytics === 'undefined' || analytics === null || dates.length === 0) {
            return [0,0,0,0,0,0,0];
        }
        let analyticsArray = new Array();
        let i = 0;
        dates.map(d => {
            const currentDayStats = analytics[d.format('YYYY-MM-DD')];
            if (typeof currentDayStats !== 'undefined' && currentDayStats !== null) {
                analyticsArray[i] = currentDayStats[type] ? currentDayStats[type] : 0;
            } else {
                analyticsArray[i] = 0;
            }
            i++;
        });
        return analyticsArray;
    }

    const options = {
        chart: {
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            },
            foreColor: '#ffffff'
        },
        yaxis: [
            {
                labels: {
                    style: {
                        fontFamily: 'Poppins',
                        fontWeight: 'bold'
                    },
                    formatter: (val) => {
                        return val.toFixed(0);
                    }
                }
            }
        ],
        xaxis: {
            labels: {
                style: {
                    fontFamily: 'Poppins',
                    fontWeight: 'bold'
                }
            }
        },
        dataLabels: {
            enabled: false,
            style: {
                fontFamily: 'Poppins',
                fontWeight: 'bold'
            },
            background: {
                enabled: true
            }
        },
        colors: ['rgba(255,255,255,.5)', 'rgba(255,255,255,.9)'],
        fill: {
            opacity: 1.0,
            colors: ['rgba(255,255,255,.5)', 'rgba(255,255,255,.9)'],
        },
        grid: {
            strokeDashArray: '5',
            borderColor: 'rgba(255, 255, 255, 0.3)'
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        legend: {
            show: false,
            position: 'right',
            style: {
                fontFamily: 'Poppins',
                fontWeight: 'bold'

            }
        },
        labels: getDateArray().map(d => d.format('MM/DD'))
    };
    const data = [
        {
            name: 'Sessions',
            data: extractAnalytics(getDateArray(), 'sessions')
        },
        {
            name: 'Pageviews',
            data: extractAnalytics(getDateArray(), 'pageviews')
        }
    ];

    return (
        <div>
            <div>
                <Chart
                    options={options}
                    series={data}
                    type="bar"
                    height={180}
                />
            </div>
        </div>
    )
}

export default SeriesHeaderAnalytics;

