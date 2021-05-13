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
        rule
    } = props;

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();

    const updatedAt = moment(rule.updated_at).tz(timezone).format("M/DD/YYYY  h:mm A");
    const gameImages = _.uniqBy(rule.games?.map(g => {
		return {
			title: g.title,
			cover: g.cover.formats.thumbnail.url
		};
	}), 'cover');

	return (
        <tr>
            <td>
                <Link
                    to={"/brackets/edit/"+rule.id}
                    className="font-weight-bold text-black"
                    title={rule.title}>
                        {rule.title}
                </Link>
            </td>
            <td className="text-left">
                <div className="">{updatedAt}</div>
            </td>
            <td className="text-right">
                <div className="d-flex align-items-center justify-content-end pr-3">
                    <BracketActionMenu 
                        rule={rule} 
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

					