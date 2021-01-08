
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import BusinessIcon from '@material-ui/icons/Business';
import ChatIcon from '@material-ui/icons/Chat';
import DateRangeIcon from '@material-ui/icons/DateRange';

const StepIcon = (props) => {
    const { active, completed } = props;
    
    const icons = {
        1: <BusinessIcon />,
        2: <ChatIcon />,
        3: <DateRangeIcon />
    };

	return (
		<div
			className={clsx(
				'd-50 transition-base d-flex align-items-center bg-gray-400 justify-content-center rounded',
				{
				'd-80 bg-primary text-white shadow-primary-sm': active,
				'd-50 bg-success text-white shadow-success-sm': completed
				}
			)}>
			{completed ? <Check className="completed" /> : icons[String(props.icon)]}
		</div>
	);
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

export default StepIcon;