import { Autocomplete, Grid, TextField } from '@material-ui/core';
import { OpacityTwoTone } from '@material-ui/icons';
import parse from 'autosuggest-highlight/parse';
import { Field } from 'formik';
import { throttle } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

const AutocompleteSearchField = (props) => {
	const {
		name,
		inputLabel,
		getOptions,
		setFieldValue,
		initialOptions,
		initialValue,
		multiple
	} = props;

	const [value, setValue] = React.useState(initialValue);
	const [options, setOptions] = useState(initialOptions);
	const [inputValue, setInputValue] = useState('');
	
	useEffect(() => {
		setOptions(initialOptions);
		setValue(initialValue);
	}, [initialOptions, initialValue]);

	useEffect(() => {
		let active = true;
	
		getOptions({ input: value }, (results) => {
			if (results) {
				setOptions(results);
			}
		});
	
		return () => {
		  active = false;
		};
	}, [value, inputValue]);

	

	const handleChange = (event, newValue) => {
		setFieldValue(name, newValue);
	};

	const handleInputChange = (event, newInputValue) => {
		setValue(newInputValue);
	}

	const renderInput = (params) => {
		return (
			<TextField
				fullWidth
				name={name}
				label={inputLabel}
				variant="outlined"
				{...params}
			/>
		);
	};

	const renderOption = (option, state) => {
		return (
			<div key={state.value} className="font-size-lg p-2" {...option}>
				{state.name}
			</div>
		);
	};

	const getOptionSelected = (o, v) => {
		if (typeof v === 'string') {
			return v === o.name;
		} else {
			return v.value === o.value;
		};
	}

	return (
		<>
			<Autocomplete
				id={"autocomplete-"+name}
				multiple={multiple}
				getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
				getOptionSelected={getOptionSelected}
				options={options}
				autoComplete
				includeInputInList
				filterSelectedOptions
				value={value}
				onChange={handleChange}
				onInputChange={handleInputChange}
				renderInput={renderInput}
				renderOption={renderOption}
			/>
		</>
	)
}

export default AutocompleteSearchField;
