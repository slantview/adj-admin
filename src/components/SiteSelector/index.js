import { Menu, Divider, Collapse, List, ListItem, MenuItem } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { SiteContext } from '../../providers/SiteProvider';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import defaultLogo from '../../assets/images/logo.png';

const SiteSelector = () => {
    const siteContext = useContext(SiteContext);
    const [logo, setLogo] = useState(defaultLogo);
	const [anchorEl, setAnchorEl] = useState(false);
	const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
        setAnchorEl(null);
	};
  
    const handleChange = (siteId) => {
        const selectedSite = _.first(siteContext.sites.filter(site => site.id === siteId));
        const headerLogo = selectedSite && selectedSite.metadata ? selectedSite.metadata.logo.formats.thumbnail.url : defaultLogo;
        setLogo(headerLogo);
        siteContext.setSite(selectedSite.id);
        handleClose()
    };

    return (
        <div className="pl-3 pr-2 w-100">
                <div className="text-center w-100">
                    <a title="Select Site">
                        <img alt="Select Site" src={logo} height={50} />
                        <span>
                            <Button
                                variant="text"
                                onClick={handleClick} 
                                className="ml-2 p-0 d-30 border-0 btn-transition-none text-white-50"
                                disableRipple
                                style={{position:"absolute", right: 10, top: 20}}
                                >
                                <FontAwesomeIcon
                                    icon={['fas', 'ellipsis-h']}
                                    className="font-size-lg"
                                />
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                elevation={1}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: -16
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
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
                                        { siteContext.sites.map(site => (
                                            <MenuItem
                                                id={site.id}
                                                fullWidth
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
           
            {/* <Collapse in={open}>
                <div className="dropdown-menu-lg overflow-hidden p-0">
                    <ul
                        component="div"
                        className="nav-neutral-primary text-left d-flex align-items-center flex-column">
                        { siteContext.sites.map(site => (
                            <li><a onClick={() => handleChange(site.id)} dense={true} className="font-size-sm" >{site.domain}</a></li>
                        ))}
                    </ul>
                </div>
            </Collapse>  */}
            {/* 
                <Select
                    name="site"
                    fullWidth
                    autoFocus
                    inputProps={{ autoFocus: true }}
                    value={siteContext.selected}
                    onChange={handleChange}
                    onBlur={() => setOpen(false) }
                    variant="filled">
                        { siteContext.sites.map(site => (
                            <MenuItem dense={true} className="font-size-sm" value={site.id}>{site.domain}</MenuItem>
                        ))}
                        
                </Select>
            */}
        </div>
        
    )
};
 
export default SiteSelector