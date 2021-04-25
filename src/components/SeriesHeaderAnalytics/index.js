import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment-timezone';
import _ from 'lodash';

const SeriesHeaderAnalytics = (props) => {
    const {
        analytics,
        timezone
    } = props;

    console.log(analytics);

    const getDateArray = () => {
        let dateArray = new Array();
        for (let i = 0; i <= 6; i++) {
            const day = moment().tz(timezone).subtract(i, 'd');
            dateArray[i] = day;
        }
        return dateArray.reverse();
    };

    const extractAnalytics = (dates, type) => {
        if (typeof analytics === 'undefined' || analytics === null) {
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
        console.log('analyticsArray', analyticsArray);
        return analyticsArray;
    }

    const chartDashboardStatistics2BOptions = {
        chart: {
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            },
            foreColor: '#ffffff'
        },
        dataLabels: {
            enabled: false
        },
        colors: ['rgba(255,255,255,.4)', 'rgba(255,255,255,.8)'],
        fill: {
            opacity: 1.0,
            colors: ['rgba(255,255,255,.4)', 'rgba(255,255,255,.8)'],
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
            show: true,
            position: 'bottom'
        },
        labels: getDateArray().map(d => d.format('MM/DD')),
        yaxis: {
            decimalsInFloat: false
        }
    };
    const chartDashboardStatistics2BData = [
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
                    options={chartDashboardStatistics2BOptions}
                    series={chartDashboardStatistics2BData}
                    type="bar"
                    height={280}
                />
            </div>
            {/* <div className="font-weight-bold font-size-lg text-uppercase text-white text-right mr-2 mt-0">
                Series Stats
            </div> */}
        </div>
    )
}

export default SeriesHeaderAnalytics;

