import { Hidden, MenuItem, Select, Collapse } from '@material-ui/core';
import React, { useContext } from 'react';
import { SiteContext } from '../../providers/SiteProvider';
import defaultLogo from '../../assets/images/logo.png';
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
        <div className="">
            { console.log('logo', logo) }
            <Collapse in={!open}>
                <div className="text-center py-2 mr-2" style={{height: "76px"}}>
                    <a onClick={(e) => { setOpen(!open); e.preventDefault(); }} title="Select Site">
                        <img alt="Select Site" src={logo} height={50} />
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
                    value={siteContext.selected}
                    onChange={handleChange}
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