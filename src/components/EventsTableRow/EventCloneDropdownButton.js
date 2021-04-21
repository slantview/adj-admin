import {
	Button,
	ButtonGroup,
	Menu,
	MenuItem
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useState } from 'react';

const EventCloneDropdownButtons = (props) => {
	const {
		handleSubmit,
		isSubmitting,
		setFieldValue,
		isValid
	} = props;

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSaveDraft = (v, a) => {
		if (isValid) {
			setFieldValue('save_as_draft', true);
			handleSubmit(v, a);
		}
	}

	return (
		<>
			{ !isSubmitting &&
				<span>
					<ButtonGroup
						variant="contained"
						className="btn-second m-2 mx-3"
						color="primary"
						aria-label="split button">
							<Button
								type="submit"
								disabled={isSubmitting}
								onClick={handleSubmit}
								className="btn-transition-none">
								Clone
							</Button>
							<Button
								disabled={isSubmitting}
								className="btn-transition-none px-2"
								color="primary"
								size="small"
								aria-haspopup="true"
								aria-controls={Boolean(anchorEl) ? 'menu-list-grow' : undefined}
								onClick={handleClick}>
									<ArrowDropDownIcon />
							</Button>
					</ButtonGroup>
					<Menu
						id="clone-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 0
						}}
						transformOrigin={{
							vertical: -30,
							horizontal: 78
						}}
						classes={{ list: 'p-0' }}>
							<div className="p-0">
								<MenuItem className="p-1 text-black-50 font-size-xs" onClick={handleSaveDraft}>
									Save Draft &amp; Edit
								</MenuItem>
							</div>
					</Menu>	
				</span>	
			}
		</>
	);
}

export default EventCloneDropdownButtons;