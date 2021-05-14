import moment from 'moment-timezone';
import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import BracketActionMenu from 'components/BracketsActionMenu';
import ServiceAreaActionMenu from 'components/ServiceAreaActionMenu';
import { SiteContext } from 'providers/SiteProvider';

const ServiceAreaTableRow = (props) => {
    const {
        refreshServiceAreas,
        setLoading,
        region
    } = props;

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();

    const updatedAt = moment(region.updated_at).tz(timezone).format("M/DD/YYYY  h:mm A");

	return (
        <tr>
            <td>
                <Link
                    to={"/service-areas/edit/"+region.id}
                    className="font-weight-bold text-black"
                    title={region.title}>
                        {region.title}
                </Link>
            </td>
            <td className="text-left">
                <div className="">{updatedAt}</div>
            </td>
            <td className="text-right">
                <div className="d-flex align-items-center justify-content-end pr-3">
                    <ServiceAreaActionMenu 
                        region={region} 
                        refreshServiceAreas={refreshServiceAreas} 
                        setLoading={setLoading} 
                        iconClassName="text-black-50" 
                    />
                </div>
            </td>
        </tr>
	);
};

export default ServiceAreaTableRow;

					