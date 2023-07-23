import React from "react";
import { Link } from "react-router-dom";

function NAV(){
	return(
		<>
			<Link to="/">
				<button>메인 화면</button>
			</Link>
			<Link to ="/about">
				<button>설명</button>
			</Link>
		</>
	);
}

export default NAV
