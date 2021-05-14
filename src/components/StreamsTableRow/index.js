import { Fade, Tooltip } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment-timezone';
import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import StreamActionMenu from 'components/StreamsActionMenu';
import { SiteContext } from 'providers/SiteProvider';

const StreamsTableRow = (props) => {
    const {
        refreshStreams,
        setLoading,
        stream
    } = props;

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();

    const updatedAt = moment(stream.updated_at).tz(timezone).format("M/DD/YYYY  h:mm A");
    const gameImages = _.uniqBy(stream.games?.map(g => {
		return {
			title: g.name,
			cover: g.cover.formats.thumbnail.url
		};
	}), 'cover');

	return (
        <tr>
            <td>
                <Link
                    to={"/streams/edit/"+stream.id}
                    className="font-weight-bold text-black"
                    title={stream.name}>
                        {stream.name}
                </Link>
            </td>
            <td className="text-left">
                <div className="">{updatedAt}</div>
            </td>
            <td className="text-right">
                <div className="d-flex align-items-center justify-content-end pr-3">
                    <StreamActionMenu 
                        stream={stream} 
                        refreshStreams={refreshStreams} 
                        setLoading={setLoading} 
                        iconClassName="text-black-50" 
                    />
                </div>
            </td>
        </tr>
	);
};

export default StreamsTableRow;

					