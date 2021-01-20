import { Hidden, MenuItem, Select, Collapse } from '@material-ui/core';
import React, { useContext } from 'react';
import { SiteContext } from '../../providers/SiteProvider';
import defaultLogo from '../../assets/images/logo.png';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import _ from 'lodash';

const SiteSelector = () => {
    const siteContext = useContext(SiteContext);
    const [open, setOpen] = React.useState(false);
    const [logo, setLogo] = React.useState(defaultLogo);

    const handleChange = (e) => {
        siteContext.setSite(e.target.value);
        const selectedSite = _.first(siteContext.sites.filter(site => site.id === e.target.value));
        const headerLogo = selectedSite && selectedSite.metadata ? selectedSite.metadata.logo.formats.thumbnail.url : defaultLogo;
        setLogo(headerLogo);
        setOpen(false);
    };

    return (
        <div className="pl-3 pr-2 w-100">
            <Collapse in={!open}>
                <div className="text-center w-100">
                    <a onClick={(e) => { setOpen(!open); e.preventDefault(); }} title="Select Site">
                        <img alt="Select Site" src={logo} height={50} />
                        <span style={{height: "50px"}}>
                            { open ? (
                                <ArrowDropUpIcon />
                            ) : (
                                <ArrowDropDownIcon />
                            )}
                            
                        </span>
                        <div className="app-nav-logo--text m-4" style={{display:"none"}}>
                            <b>Select Site</b>
                        </div>
                    </a>
                </div>
            </Collapse>
           
            <Collapse in={open}>
                <Select
                    name="site"
                    fullWidth
                    autoFocus
                    inputProps={{ autoFocus: true }}
                    value={siteContext.selected}
                    onChange={handleChange}
                    onBlur={() => setOpen(false) }
                    variant="outlined">
                        { siteContext.sites.map(site => (
                            <MenuItem dense={true} className="font-size-sm" value={site.id}>{site.domain}</MenuItem>
                        ))}
                        
                </Select>
            </Collapse>
        </div>
        
    )
};
 
export default SiteSelector