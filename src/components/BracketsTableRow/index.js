import { Fade, Tooltip } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment-timezone';
import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import BracketActionMenu from 'components/BracketsActionMenu';
import { SiteContext } from 'providers/SiteProvider';

const BracketsTableRow = (props) => {
    const {
        refreshBrackets,
        setLoading,
        bracket
    } = props;

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();

    const updatedAt = moment(bracket.updated_at).tz(timezone).format("M/DD/YYYY  h:mm A");

	return (
        <tr>
            <td>
                <Link
                    to={"/tournaments/brackets/edit/"+bracket.id}
                    className="font-weight-bold text-black"
                    title={bracket.title}>
                        {bracket.title}
                </Link>
            </td>
            <td className="text-left">
                <div className="">{updatedAt}</div>
            </td>
            <td className="text-right">
                <div className="d-flex align-items-center justify-content-end pr-3">
                    <BracketActionMenu 
                        bracket={bracket} 
                        refreshBrackets={refreshBrackets} 
                        setLoading={setLoading} 
                        iconClassName="text-black-50" 
                    />
                </div>
            </td>
        </tr>
	);
};

export default BracketsTableRow;

					