import React from "react";

export const Error = ({ message }) => {
	if (message) {
		return <div className="error-component">
			{message}
		</div>
	}

	return null;
};

export default Error