import { useMutation, useQuery } from '@apollo/client';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

import AutocompleteSearchField from 'components/AutocompleteSearchField';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { GET_ALL_GAMES, UPDATE_GAME } from 'queries/games';

import DialogErrorContent from './DialogErrorContent';

const validationSchema = Yup.object({
    games: Yup.array().min(1, "Must select a game."),
    
});

const GameAddDialog = (props) => {
    const {
        open,
        close,
        refreshGames
    } = props;

    const initialData = {
        games: []
    };

    const notify = useContext(NotificationContext).notify;

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [updateGame] = useMutation(UPDATE_GAME);
    const isLoading = processing && !error;

    const siteCtx = useContext(SiteContext);
    
    const gamesData = useQuery(GET_ALL_GAMES);
	const [games, setGames] = useState([]);

	const resultsToData = (results) => {
		if (results === null || typeof results === 'undefined' || results.length === 0) {
			return [];
		}
		return results.map(r => {
			return {
				name: `${r.title ? r.title : (r.name ? r.name : 'undefined')}`,
				value: r.id
			};
		})
	};

	useEffect(() => {
		if (!gamesData.loading) {
			setGames(resultsToData(gamesData?.data?.games));
		}
		
	}, [gamesData]);

	const handleGameAutocompleteRequest = (request, callback) => {
		filterForCallback(games, request, callback);
	};

    const filterForCallback = (arr, request, callback) => {
        if (arr.length === 0) {
			callback([]);
		}
		if (typeof request?.input === 'string') {
            arr && callback(arr.filter(r => {
				return r.name?.toLowerCase().includes(request.input?.toLowerCase());
			}));
		} else {
			callback(arr);
		}
    }
    
    const handleSubmit = async (values, actions) => {
        setProcessing(true);
        
        values.games?.forEach((game, i) => {
            updateGame({ variables: { id: game.value, game: {enabled: true} }})
                .then((ret) => {
                    const updatedGame = ret.data.updateGame.game;
                    close();
                    setProcessing(false);
                    refreshGames();
                    notify({
                        type: 'success',
                        message: "Successfully added game: " + updatedGame.title
                    });
                }).catch(e  => {
                    setError(e.toString());
                });
        });
    }

    const handleReset = () => {
        setError(null);
        close(false);
    }

    return (
        <Dialog
            open={open}
            maxWidth="md"
            onClose={() => close(false) }
            classes={{ paper: 'shadow-lg rounded modal-size' }}>
                { error && 
                    <DialogErrorContent title="Error" message={error} onCancel={() => handleReset()} />
                }
                { !error &&
                    <Formik
                        initialValues={initialData}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                            {(FormProps) => (
                                
                                <div className="p-2">
                                    { !FormProps.isSubmitting && !isLoading &&
                                        <DialogTitle>
                                            Add Game
                                        </DialogTitle>
                                    }
                                    <DialogContent>
                                        <Form id="organization-add-form"> 
                                            { FormProps.isSubmitting || isLoading ? (
                                                <div className="text-center m-5">
                                                    <Loading center={true} />
                                                    <h3 className="mt-3">Adding Game...</h3>
                                                </div>
                                            ) : (
                                                <AutocompleteSearchField
                                                    name="games"
                                                    inputLabel="Games"
                                                    getOptions={handleGameAutocompleteRequest}
                                                    setFieldValue={FormProps.setFieldValue}
                                                    initialOptions={resultsToData(gamesData?.data?.games)}
                                                    initialValue={FormProps.values.games}
                                                    multiple={true}
                                                />
                                            )}
                                        </Form>
                                    </DialogContent>
                                    { !FormProps.isSubmitting && !isLoading &&
                                        <DialogActions> 
                                            <div className="">
                                                <FormSubmitButton
                                                    onClick={FormProps.handleSubmit}
                                                    showNotificationOnError={true}
                                                    title="Add Game"
                                                    errors={FormProps.errors}
                                                />
                                                <Button
                                                    onClick={() => close(false) }
                                                    className="btn btn-neutral-secondary mx-1">
                                                    <span className="btn-wrapper--label">Cancel</span>
                                                </Button>
                                            </div>
                                        </DialogActions>
                                    }
                                </div>
                            )}
                    </Formik>
                }
        </Dialog>

    )
}

export default GameAddDialog;
