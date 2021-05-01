import { Autocomplete, Grid, TextField as MTextField } from '@material-ui/core';
import parse from 'autosuggest-highlight/parse';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { throttle } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

const AutocompleteSearchField = (props) => {
	const {
		name,
		inputLabel,
		getOptions,
		setFieldValue,
		initialOptions
	} = props;

	const [value, setValue] = React.useState();
	const [options, setOptions] = useState(initialOptions);
	const [inputValue, setInputValue] = useState('');
	
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
	}, [value, inputValue, initialOptions]);

	

	const handleChange = (event, newValue) => {
		setFieldValue(name, newValue);
	};

	const handleInputChange = (event, newInputValue) => {
		setValue(newInputValue);
	}

	const renderInput = (params) => {
		return (
			<Field
				component={TextField}
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

	console.log('options', options);
	return (
		<>
			<Autocomplete
				id={"autocomplete-"+name}
				multiple
				getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
				filterOptions={(x) => x}
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
