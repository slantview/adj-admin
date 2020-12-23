import React, { useState } from 'react';
import Login from '../../components/Login';

export default function LoginPage() {
	const [checked1, setChecked1] = useState(true);

	const handleChange1 = (event) => {
		setChecked1(event.target.checked);
	};

	return (
			<>
				<Login />
			</>
	);
}
