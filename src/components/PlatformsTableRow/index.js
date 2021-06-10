import { Fade, Tooltip } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment-timezone';
import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import PlatformActionMenu from 'components/PlatformsActionMenu';
import { SiteContext } from 'providers/SiteProvider';

const PlatformsTableRow = (props) => {
    const {
        refreshModes,
        setLoading,
        platform
    } = props;

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();

    const updatedAt = moment(platform.updated_at).tz(timezone).format("M/DD/YYYY  h:mm A");
    const gameImages = _.uniqBy(platform.games?.map(g => {
		return {
			title: g.title,
			cover: g.cover.formats.thumbnail.url
		};
	}), 'cover');

	return (
        <tr>
            <td>
                <Link
                    to={"/games/platforms/edit/"+platform.id}
                    className="font-weight-bold text-black"
                    title={platform.name}>
                        {platform.name}
                </Link>
            </td>
            <td>
                { gameImages && gameImages.length > 0 && gameImages.map(i => ( 
                    <Tooltip
                        // @ts-ignore
                        key={i.title} 
                        TransitionComponent={Fade} 
                        TransitionProps={{ timeout: 600 }} 
                        // @ts-ignore
                        title={i.title}>
                        <div className="avatar-icon-wrapper mr-2">
                            <div className="avatar-icon">
                                {/* @ts-ignore */}
                                <img key={i.title} alt={i.title} src={i.cover} />
                            </div>
                        </div>
                    </Tooltip>
                ))}
            </td>
            <td className="text-left">
                <div className="">{updatedAt}</div>
            </td>
            <td className="text-right">
                <div className="d-flex align-items-center justify-content-end pr-3">
                    <PlatformActionMenu 
                        platform={platform} 
                        refreshModes={refreshModes} 
                        setLoading={setLoading} 
                        iconClassName="text-black-50" 
                    />
                </div>
            </td>
        </tr>
	);
};

export default PlatformsTableRow;
