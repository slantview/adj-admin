import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, List, ListItem, Menu } from '@material-ui/core';
import moment from 'moment';
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';

import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { DELETE_EVENT, UPDATE_EVENT } from 'queries/events';

import EventCloneDialog from '../EventCloneDialog';

const EventsTableRow = (props) => {
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
    const timezone = siteCtx.timezone;

    const [anchorEl, setAnchorEl] = useState(null);
    const [cloneConfirmModal, setCloneConfirmModal] = useState(false);
    const [deleteEvent] = useMutation(DELETE_EVENT);
    const [updateEvent] = useMutation(UPDATE_EVENT);

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
        <tr className="p-0 m-0 my-1">
            <td className="p-0 m-0 mb-0">
                <div className="">{startsAt}</div>
            </td>
            <td className="p-0 m-0 mb-0">
                <div>
                    <Link to={"/series/view/"+seriesId+"/"+id}>
                        <span className="text-black" title={title}>
                            {title}
                        </span>
                        <span className="text-black-50 d-block">
                            {subtitle}
                        </span>
                    </Link>
                </div>
            </td>

            <td className="p-0 m-0 mb-0">
                { published_at && isFuture &&
                    <span className="badge text-uppercase badge-success">Published</span>
                }
                { !isFuture &&
                    <span className="badge text-uppercase badge-neutral-success text-black-50">Archived</span>
                }
                { !published_at && isFuture &&
                    <span className="badge text-uppercase badge-neutral-first text-first">Draft</span>
                }
            </td>
            <td className="p-0 m-0 mb-0">
            <div className="d-flex align-items-center justify-content-end pr-3">
                    <Button
                        size="small"
                        onClick={handleClick}
                        className="btn-link d-30 p-0 btn-icon hover-scale-sm">
                        <FontAwesomeIcon
                            icon={['fas', 'ellipsis-h']}
                            className="font-size-lg"
                        />
                    </Button>
                    <Menu
						anchorEl={anchorEl}
						keepMounted
						getContentAnchorEl={null}
						open={Boolean(anchorEl)}
						classes={{ list: 'p-0' }}
						onClose={handleClose}>
						<div className="dropdown-menu-lg overflow-hidden p-0">
							<div className="dropdown-menu-lg overflow-hidden p-0">
								<List component="div" className="nav-neutral-primary font-size-sm text-left">
                                    <ListItem onClick={handleClone} button className="text-left">
										Clone
									</ListItem>
                                    <ListItem 
                                        onClick={published_at === null ? handlePublish : handleUnpublish} 
                                        button 
                                        className="text-left">
										    {published_at === null ? 'Publish' : 'Unpublish'}
									</ListItem>
                                    <ListItem onClick={handleEdit} button className="text-left">
										Edit
									</ListItem>
									<ListItem onClick={handleDelete} button className="text-left">
										Delete
									</ListItem>
								</List>
							</div>
						</div>
					</Menu>
                    <EventCloneDialog
                        event={event}
                        cloneConfirmModal={cloneConfirmModal}
                        setCloneConfirmModal={setCloneConfirmModal}
                        setLoading={setLoading}
                        refreshSeries={refreshSeries}
                    />
                </div>
            </td>
        </tr>
	);
};

export default EventsTableRow;

					