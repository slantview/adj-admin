import { Button, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

function SeriesListItem(props) {
	const { 
		id, 
		title,
		subtitle,
		header
	} = props;

	const history = useHistory();
	
	const handleClick = () => {
		history.push('/series/' + id);
	};
	
    return (
        <Card className="mb-5" raised={true} onClick={handleClick}>
			<CardMedia
				image={header.formats.large.url}
				title={title}>
					<div className="py-0 bg-beacons-black-to-transparent w-100">
						<CardContent className="">	
							<Grid container spacing={0} alignItems="flex-start" className="mb-4" style={{minHeight: "200px"}}>
								<Grid item sm={9} lg={9}>
									<h2 className="text-white text-shadow font-weight-bold text-uppercase">{title}</h2>
									<h3 className="text-white-50 font-size-lg font-weight-bold ">{subtitle}</h3>
								</Grid>
								<Grid item sm={3} lg={3}>
									<Grid alignItems="center">
										<div className=" text-right">
											<Button
												size="large"
												className="p-3 btn btn-rounded btn-neutral-second text-white text-uppercase font-weight-bold">
													Manage Series
											</Button>
										</div>
									</Grid>
									
									
								</Grid>
							</Grid>
							<Grid container alignItems="flex-end">
								<Grid item sm={12} lg={12}>
									<span className="text-uppercase font-weight-bold text-white">Next Event: </span>
									<span className="text-white-50">April 24th, 2021</span>
									<span className="text-uppercase font-weight-bold text-white ml-3">Upcoming Events: </span>
									<span className="text-white-50">4</span>
									<span className="text-uppercase font-weight-bold text-white ml-3">Completed Events: </span>
									<span className="text-white-50">69420</span>
								</Grid>
								
							</Grid>
						</CardContent>
					</div>
			</CardMedia>
        </Card>
    )
}

export default SeriesListItem;
 