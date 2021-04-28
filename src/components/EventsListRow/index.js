import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, List, ListItem, Menu } from '@material-ui/core';
import EventActionMenu from 'components/EventActionMenu';
import _ from 'lodash';
import moment from 'moment';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { UPDATE_EVENT, DELETE_EVENT } from 'queries/events';
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import EventCloneDialog from '../EventCloneDialog';

const EventsListRow = (props) => {
    const {
		setLoading,
        event,
        refreshSeries
    } = props;

    const {
        id,
        title,
        subtitle,
        starts_at,
        published_at,
        seriesId,
    } = event;

    const startsAt = moment(starts_at).format("MM/DD/YYYY");
    const isFuture = moment(starts_at).isAfter(moment());

    const notify = useContext(NotificationContext).notify;
    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();

    const [anchorEl, setAnchorEl] = useState(null);
    const [cloneConfirmModal, setCloneConfirmModal] = useState(false);
    const [deleteEvent, eventDeleteData] = useMutation(DELETE_EVENT);
    const [updateEvent, eventUpdateData] = useMutation(UPDATE_EVENT);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
    const handleEdit = () => {
		notify({
			type: 'primary',
			message: "TODO: Allow users to edit."
		});
		handleClose();
    };
    const handleClone = () => {
		setCloneConfirmModal(true);
        handleClose()
    };

    const handlePublish = () => {
        updateEvent({ variables: { 
                id: id, 
                data: { 
                    published_at: moment().tz(timezone).format() 
                }
            }})
            .then(result => {
                const updatedEvent = result.data.updateEvent.event;
                notify({
                    type: 'success',
                    message: `Successfully published event: ${updatedEvent.title}.`
                });
                refreshSeries();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error publishing event: ${e.toString()}`
                });
            });
    };

    const handleUnpublish = () => {
        updateEvent({ variables: {
                id: id,
                data: {
                    published_at: null
                }
            }})
            .then(result => {
                const updatedEvent = result.data.updateEvent.event;
                notify({
                    type: 'success',
                    message: `Successfully unpublished event: ${updatedEvent.title}.`
                });
                refreshSeries();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error deleting event: ${e.toString()}`
                });
            });
    };

    const handleDelete = () => {
        deleteEvent({ variables: { id: id }})
            .then(result => {
                const deletedEvent = result.data.deleteEvent.event;
                notify({
                    type: 'success',
                    message: `Successfully deleted event: ${deletedEvent.title}.`
                });
                refreshSeries();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error deleting event: ${e.toString()}`
                });
            })
		handleClose();
	};

	return (
        <tr >
            <td>
                <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                            <img alt={event.title} src={event.card.formats.thumbnail.url} />
                        </div>
                    </div>
                    <div>
                        <Link
                            to={"/events/" + seriesId + "/" + event.id}
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title={event.title}>
                                {event.title}
                        </Link>
                        <span className="text-black-50 font-weight-light d-block">
                            {moment(event.starts_at).tz(timezone).format("MM/DD/YYYY h:mmA")}
                        </span>
                    </div>
                </div>
            </td>
            <td className="text-center">
                {startsAt}
            </td>
            <td className="text-center">
                { published_at && isFuture &&
                    <span className="badge text-uppercase badge-success">Published</span>
                }
                { !isFuture && published_at &&
                    <span className="badge text-uppercase badge-neutral-success text-black-50">Archived</span>
                }
                { !published_at && isFuture &&
                    <span className="badge text-uppercase badge-neutral-first text-first">Draft</span>
                }
                 { !isFuture && !published_at &&
                    <span className="badge text-uppercase badge-neutral-success text-black-50">Draft</span>
                }
            </td>
            <td className="text-right">
                <div className="d-flex align-items-center justify-content-end pr-3">
                    <EventActionMenu event={event} refreshSeries={refreshSeries} setLoading={setLoading} />
                </div>
            </td>
        </tr>
	);
};

export default EventsListRow;

					