import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@material-ui/core';

const LoginButton = (props) => {
	const { loginWithRedirect } = useAuth0();

	return (
		<div>
			<Button
				size={props.size}
				className="btn-first font-weight-bold text-uppercase"
				onClick={() => loginWithRedirect({
					scope: "openid profile email user_metadata"
				})}>
					Login
			</Button>
		</div>
		
	);
};

export default LoginButton;