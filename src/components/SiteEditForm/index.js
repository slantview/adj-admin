import { Collapse, Grid, InputAdornment } from '@material-ui/core';
import ErrorOutlineTwoToneIcon from '@material-ui/icons/ErrorOutlineTwoTone';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useContext, useEffect, useState } from 'react';

import AutocompleteSearchField from 'components/AutocompleteSearchField';
import Loading from 'components/Loading';
import { UserContext } from 'providers/UserProvider';
import { getUsers } from 'utils/api';

const SiteEditForm = (props) => {
    const {
        values,
        setFieldValue
    } = props;

    const userCtx = useContext(UserContext);
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
    const [users, setUsers] = useState([]);
    const [owners, setOwners] = useState(values.owners);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        if (active) {
            getUsers(userCtx.token)
                .then(async response => {
                    const fetchedData = await response.json();
                    setUsers(fetchedData);
                    setLoading(false);
                });
        }
        return () => {
            active = false;
        }
    }, [])

    const toggleAdvancedSettings = (e) => {
        setShowAdvancedSettings(!showAdvancedSettings);
        e.preventDefault();
    }

	const handleOwnersAutocompleteRequest = (request, callback) => {
		filterForCallback(resultsToData(users), request, callback);
	};

    const resultsToData = (results) => {
		if (results === null || typeof results === 'undefined' || results.length === 0) {
			return [];
		}
		return results.map(r => {
            if (r.name) {
                return r;
            }
			return {
				name: `${r.first_name} ${r.last_name} (${r.email})`,
				value: r.id
			};
		})
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

    if (loading) {
        return (<Loading center={true} />);
    }

    return (
		<div className="p-4">
			<Grid container spacing={2}>
            <Grid item md={12} lg={12}>
                    <h3 className="font-size-lg">Details</h3>
                </Grid>
                <Grid item md={12} lg={12}>
                    <Field
                        component={TextField}
                        name="name"
                        fullWidth
                        label="Name"
                        
                    />
                </Grid>
                <Grid item md={12} lg={12}>
                    <Field
                        component={TextField}
                        name="domain"
                        fullWidth
                        label="Domain"
                    />
                </Grid>
                <Grid item md={12} lg={12}>
                    <AutocompleteSearchField
                        name="owners"
                        inputLabel="Site Owners"
                        getOptions={handleOwnersAutocompleteRequest}
                        setFieldValue={setFieldValue}
                        initialOptions={resultsToData(users)}
                        initialValue={resultsToData(values.owners)}
                        multiple
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} className="mt-4">
                <Grid item md={12} lg={12}>
                    <a 
                        href="/#" 
                        onClick={toggleAdvancedSettings}>
                            <span className="text-underline font-weight-bold">
                                {showAdvancedSettings ? "Hide" : "Show"} Danger Zone
                            </span>
                            <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                { showAdvancedSettings ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </span>
                    </a>
                    
                </Grid>
                <Grid item md={12} lg={12}>
                    <Collapse in={showAdvancedSettings}>
                        <Grid container spacing={2}>
                            <Grid item md={12} lg={12}>
                                <p className="text-danger font-weight-bolder text-uppercase">
                                    <ErrorOutlineTwoToneIcon />
                                    Do not touch this unless you are Steve!
                                    <ErrorOutlineTwoToneIcon />
                                </p>
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <Field
                                    component={TextField}
                                    name="url"
                                    fullWidth
                                    label="Site URL"
                                />
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <Field
                                    component={TextField}
                                    name="backend_domain"
                                    fullWidth
                                    label="Backend Domain"
                                />
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <Field
                                    component={TextField}
                                    name="backend_url"
                                    fullWidth
                                    label="Backend URL"
                                />
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <Field
                                    component={TextField}
                                    name="firebase_site"
                                    fullWidth
                                    label="Firebase Site"
                                />
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
			</Grid>
		</div>
    );
  };

  export default SiteEditForm;