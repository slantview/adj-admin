import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const RegionRow = (props) => {
    const {
        rowId,
        name,
        type,
        onRemove,
        onChange
    } = props;

    const [nameValue, setName] = useState(name);
    const [typeValue, setType] = useState(type);

    useEffect(() => {
        let active = true;

        if (active) {
            setName(name);
            setType(type);
        }
        return () => {
            active = false;
        }
    }, [name, type]);

    const handleNameChange = (e) => {
        const newName = e.currentTarget.value;
        setName(newName);
        onChange !== null && onChange(rowId, newName, typeValue);
    }

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setType(newType);
        onChange !== null && onChange(rowId, nameValue, newType);
    }

    return (
        <Grid container spacing={2} alignItems="center" className="mt-1">
            <Grid item md={7} lg={7}>
                <TextField
                    fullWidth
                    name={"row-"+rowId}
                    label="Name"
                    type="text"
                    value={nameValue}
                    onChange={handleNameChange}
                    variant="outlined"
                />
            </Grid>
            <Grid item md={4} lg={4}>
                <Select
                    fullWidth
                    name="region-0-type"
                    label="Type"
                    type="text"
                    value={typeValue}
                    onChange={handleTypeChange}
                    variant="outlined"
                >
                    <MenuItem dense={true} className="font-size-sm" value="City">City</MenuItem>
                    <MenuItem dense={true} className="font-size-sm" value="State">State</MenuItem>
                    <MenuItem dense={true} className="font-size-sm" value="Country">Country</MenuItem>
                </Select>
            </Grid>
            <Grid item md={1} lg={1}>
                <div className="text-center">
                    <Button
                        disableElevation={true}
                        variant="contained"
                        size="small"
                        aria-label="remove"
                        onClick={() => onRemove(rowId)}
                        className="p-2 px-3 mr-0 btn-neutral-primary font-weight-bold">
                            <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['fas', 'minus']} className="opacity-8" />
                            </span>
                    </Button>
                </div>
            </Grid>
        </Grid>
    )
}

export default RegionRow
