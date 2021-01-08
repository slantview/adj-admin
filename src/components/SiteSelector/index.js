import { MenuItem, Select } from '@material-ui/core';
import React, { useContext } from 'react';
import { SiteContext } from '../../providers/SiteProvider';

const SiteSelector = () => {
    const siteContext = useContext(SiteContext);
    
    const handleChange = (e) => {
        siteContext.setSite(e.target.value);
    };

    return (
        <div className="ml-5">
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
        </div>
        
    )
};

export default SiteSelector