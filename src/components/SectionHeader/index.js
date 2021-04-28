import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumbs, Button, CardMedia, Grid, Paper, Link } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import headerBackground from 'assets/images/header-bg.jpg';

const SectionHeader = (props) => {
	const {
		title,
		subtitle,
		titleColor,
		subtitleColor,
		backgroundStyle,
		backgroundImage,
		minHeight,
		breadcrumbs
	} = props;

	const realMinHeight = minHeight ? minHeight : "15vh";
	const bgImage = backgroundImage ? backgroundImage : headerBackground;

	return (
		<div className="mb-1">
			<Paper square={true} elevation={2}>
				<CardMedia
					style={{minHeight: realMinHeight}}
					image={bgImage}
					title={title}
				>
					<div className={clsx("pt-1", backgroundStyle)} style={{minHeight: realMinHeight}}>
						<Grid container>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<div className="app-page-title--heading mt-2">
									<h1 className={clsx(
										"font-size-xxxl", 
										"font-weight-bolder", 
										"text-uppercase", 
										titleColor)}>
										{title}
									</h1>
									{ subtitle && (
										<h3 className={clsx("font-size-lg", subtitleColor)}>
											{subtitle}
										</h3>
									)}
								</div>
							</Grid>
							
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								{props.children}
							</Grid>
						</Grid>
					</div>
				</CardMedia>
			</Paper>
			
			<div className="mx-4 mt-2">
				<Grid container>
					<Grid item md={12} lg={12} xl={12}>
						{ breadcrumbs && breadcrumbs.length > 0 &&
							<>
								<Breadcrumbs separator="›" className="text-black-50 font-weight-regular">
									{ breadcrumbs.map(b => 
										{ return b.to === null ? (
											<span className="font-weight-bold" key={b.title}>{b.title}</span>
										):(
											<RouterLink 
												key={b.title} 
												to={b.to ? b.to : ''} 
												className="text-first text-underline font-weight-bold"
												style={{textDecoration: "underline"}}>
													{b.title}
											</RouterLink>
										)})
									}
								</Breadcrumbs>
							</>
						}
					</Grid>
				</Grid>
			</div>
		</div>
	);
};


export default SectionHeader;
