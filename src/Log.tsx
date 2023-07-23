import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

function Log() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

  // 이미 로그인되었는지 확인
	useEffect(() => {
	// 예시로 sessionStorage isLoggedIn 상태를 저장한 것으로 가정합니다.
	const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
	if (storedIsLoggedIn === 'true') {
		setIsLoggedIn(true);
	}
	}, [navigate]);

	function handleLogin() {
	// 여기에서 아이디와 비밀번호를 적합한지 검증
	// 적합한 경우 '/Home' 페이지로 이동
	if (username === 'JAE' && password === '1q2w3e') {
		// 예시로 로그인 성공 시 sessionStorage에 isLoggedIn 상태를 저장한 것으로 가정
		localStorage.setItem('isLoggedIn', 'true');
		setIsLoggedIn(true);
		navigate('/Home');
	} else {
		// 적합하지 않은 경우 경고 모달 띄우기
		setShowModal(true);
	}
	};

	return (
	<div>
		{isLoggedIn ? (
		<div>
			<p>이미 로그인되었습니다. /Home 페이지로 이동합니다.</p>
			<button onClick={() => navigate('/Home')}>Go to Home</button>
		</div>
		) : (
		<div>
			<h1>로그인</h1>
			<div>
			<label>
				Username :
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
			</label>
			</div>
			<div>
			<label>
				Password :
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</label>
			</div>
			<button onClick={handleLogin}>Login</button>

			{showModal && (
			<div>
				<p>아이디와 비밀번호가 적합하지 않습니다.</p>
				<button onClick={() => setShowModal(false)}>닫기</button>
			</div>
			)}
		</div>
		)}
	</div>
	);
	};

	export default Log;
