import { Button, Menu, MenuItem } from '@material-ui/core';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import defaultLogo from '../../assets/images/logo.png';
import { SiteContext } from '../../providers/SiteProvider';


const SiteSelector = () => {
    const siteCtx = useContext(SiteContext);
    const history = useHistory();
    const [logo, setLogo] = useState(defaultLogo);
	const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSite, setSelectedSite] = useState(null)
    const selectorDisabled = siteCtx.sites.length === 1;
    const loading = siteCtx.sites.length === 0;

    const handleClick = (event) => {
        if (selectorDisabled) {
            return event.preventDefault();
        }
        setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
        setAnchorEl(null);
	};

    useEffect(() => {
        siteCtx.onSiteChanged(async () => {
			return new Promise((resolve, reject) => {
                const currentSite = _.first(siteCtx.sites.filter(s => s.id === siteCtx.selected));
				setSelectedSite(currentSite);
                setLogo(currentSite?.metadata?.logo.formats.thumbnail.url ? currentSite?.metadata?.logo.formats.thumbnail.url : defaultLogo );
				resolve();
			});
		});
    }, [])

    const handleChange = (siteId) => {
        siteCtx.setSite(siteId);
        handleClose();
        history.push('/');
    };

    if (loading) {
        return (<span>Loading...</span>);
    }

    return (
        <div className="px-3 w-100">
                <div className="text-center w-100">
                    <a title="Select Site">
                        <img alt="Select Site" src={logo} height={50} />
                        <span>
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                elevation={1}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                }}
                                open={Boolean(anchorEl)}
                                classes={{ list: 'p-0' }}
                                onClose={handleClose}
                                onBlur={handleClose}>
                                    <div className="dropdown-menu-lg text-center overflow-hidden p-0">
                                        <div className="app-nav-logo--text  text-primary m-1">
                                            <b className="text-uppercase font-size-sm">Select Site</b>
                                        </div>
                                        <span className="divider mb-1" />
                                        { siteCtx.sites?.map(site => (
                                            <MenuItem
                                                id={site.id}
                                                key={site.id}
                                                onClick={() => handleChange(site.id)} 
                                                dense={false} 
                                                className="font-size-sm text-left" >
                                                {site.domain}
                                            </MenuItem>
                                        ))}
                                    </div>
                            </Menu>
                        </span>
                        <div className="app-nav-logo--text m-4" style={{display:"none"}}>
                            <b>Select Site</b>
                        </div>
                    </a>
                </div>
                <div className="mt-2">
                    { selectorDisabled ? (
                        <span className="text-uppercase border-0 bg-primary opacity-4 text-hover-white text-white px-4">
                                {selectedSite?.domain}
                        </span>
                    ) : (
                        <Button
                            onClick={handleClick} 
                            className="border-0 btn-neutral-primary text-hover-white text-white-50 px-3"
                            disableRipple>
                                {selectedSite?.domain}
                        </Button>
                    )

                    }
                    
                </div>
        </div>
        
    )
};
 
export default SiteSelector