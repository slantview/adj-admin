import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fade, Tooltip } from '@material-ui/core';
import moment from 'moment-timezone';
import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import TournamentActionMenu from 'components/TournamentActionMenu';
import { SiteContext } from 'providers/SiteProvider';

const TournamentsTableRow = (props) => {
    const {
        refreshTournaments,
        setLoading,
        tournament
    } = props;

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();

    const updatedAt = moment(tournament.updated_at).tz(timezone).format("M/DD/YYYY");
    const gameImage = tournament.game ? {
        title: tournament.title,
		cover: tournament.game?.cover?.formats.thumbnail.url
	} : null;
	return (
        <tr>
            <td>
                <Link
                    to={"/tournaments/edit/"+tournament.id}
                    className="font-weight-bold text-black"
                    title={tournament.title}>
                        {tournament.title}
                </Link>
            </td>
            <td className="text-center">
                { gameImage &&
                    <Tooltip
                        // @ts-ignore
                        key={gameImage.title} 
                        TransitionComponent={Fade} 
                        TransitionProps={{ timeout: 600 }} 
                        // @ts-ignore
                        title={gameImage.title}>
                        <div className="avatar-icon-wrapper mr-2">
                            <div className="avatar-icon">
                                {/* @ts-ignore */}
                                <img key={gameImage.title} alt={gameImage.title} src={gameImage.cover} />
                            </div>
                        </div>
                    </Tooltip>
                }
                
            </td>
            <td className="text-left">
                <>
                    { tournament.game_rules.map((r, i) => (
                        <span>
                            <Link
                                to={"/rules/edit/"+r.id}
                                className="font-weight-bold text-black-50 font-size-xs"
                                title={r.title}>
                                    <FontAwesomeIcon
                                        icon={['fas', 'copy']}
                                        className="d-flex align-self-center display-3 font-size-lg"
                                    />
                            </Link>
                        </span>
                    ))}
                </>
            </td>
            <td className="text-left">
                <div className="">{updatedAt}</div>
            </td>
            <td className="text-center">
                <span className={"badge text-uppercase " + (tournament.published_at ? "badge-success" : "badge-first")}>
                    {(tournament.published_at ? "Published" : "Draft")}
                </span>
            </td>
            <td className="text-right">
                <div className="d-flex align-items-center justify-content-end pr-3">
                    <TournamentActionMenu 
                        tournament={tournament} 
                        refreshTournaments={refreshTournaments} 
                        setLoading={setLoading} 
                        iconClassName="text-black-50" 
                    />
                </div>
            </td>
        </tr>
	);
};

export default TournamentsTableRow;

					