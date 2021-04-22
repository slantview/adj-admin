import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumbs, Button, CardMedia, Grid, Paper } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

const SectionHeader = (props) => {
	const {
		title,
		subtitle,
		titleColor,
		subtitleColor,
		linkText,
		linkIconName,
		linkOnClick,
		linkTo,
		backgroundStyle,
		backgroundImage,
		minHeight,
		breadcrumbs
	} = props;

	const showLink = (linkText || linkIconName) && (linkOnClick || linkTo); 
	const realMinHeight = minHeight ? minHeight : "15vh";

	return (
		<>
			<Paper square={true} elevation={1}>
				<CardMedia
					style={{minHeight: realMinHeight}}
					image={backgroundImage}
					title={title}
				>
					{ breadcrumbs &&
						<Breadcrumbs>
							{ breadcrumbs.map(b => {
								<Link to={b.to}>
									{b.title}
								</Link>
							})}
						</Breadcrumbs>
					}
					<div className={clsx("p-5", backgroundStyle)} style={{minHeight: realMinHeight}}>
						<Grid container>
							<Grid item sm={12} lg={10}>
								<div className="app-page-title--heading">
									<h1 className={clsx(
										"font-size-xxxl", 
										"font-weight-bold", 
										"text-uppercase", 
										titleColor)}>
										{title}
									</h1>
									{ subtitle && (
										<h3 className={clsx("font-size-md", subtitleColor)}>
											{subtitle}
										</h3>
									)}
								</div>
							</Grid>
							<Grid item sm={12} lg={2}>
								{ showLink &&
									<div className="text-center">
										<Button
											component={Link}
											to={linkTo ? linkTo : ''}
											variant="contained"
											size="small"
											className="p-2 px-3 btn btn-primary"
											onClick={linkOnClick ? linkOnClick : null}>
												<span className="btn-wrapper--icon mr-2">
													<FontAwesomeIcon icon={['fas', linkIconName]} className="opacity-8" />
												</span>
												<span>{linkText}</span>
										</Button>
									</div>
								}
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								{props.children}
							</Grid>
						</Grid>
					</div>
				</CardMedia>
			</Paper>
		</>
	);
};


export default SectionHeader;
