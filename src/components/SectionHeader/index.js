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
	const bgImage = backgroundImage ? backgroundImage : headerBackground;

	return (
		<>
			<Paper square={true} elevation={2}>
				<CardMedia
					style={{minHeight: realMinHeight}}
					image={bgImage}
					title={title}
				>
					<div className={clsx("pt-1", backgroundStyle)} style={{minHeight: realMinHeight}}>
						<Grid container>
							<Grid item sm={12} lg={12}>
								{ breadcrumbs && breadcrumbs.length > 0 &&
									<Breadcrumbs separator="›" className="text-white text-uppercase">
										{ breadcrumbs.map(b => 
											{ return b.to === null ? (
												<span key={b.title}>{b.title}</span>
											):(
												<RouterLink key={b.title} to={b.to ? b.to : ''} className="text-white-50">
													{b.title}
												</RouterLink>
											)})
										}
									</Breadcrumbs>
								}
							</Grid>
							<Grid item sm={12} lg={10}>
								<div className="app-page-title--heading mt-2">
									<h1 className={clsx(
										"font-size-xxxl", 
										"font-weight-bold", 
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
							<Grid item sm={12} lg={2}>
								{ showLink &&
									<div className="text-right mr-3">
										<Button
											component={RouterLink}
											to={linkTo ? linkTo : ''}
											variant="contained"
											size="small"
											className="p-2 px-3 mr-0 btn btn-primary font-weight-bold"
											onClick={linkOnClick ? linkOnClick : null}>
												<span className="btn-wrapper--icon mr-2">
													<FontAwesomeIcon icon={['fas', linkIconName]} className="opacity-8" />
												</span>
												<span>{linkText}</span>
										</Button>
									</div>
								}
							</Grid>
							<Grid item xs={12} sm={12} lg={12} xl={12}>
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
