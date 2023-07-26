import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

function Log() {
	const [showModal, setShowModal] = useState(false);
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	const [data, setData] = useState<string | null> (null);
	const [isImage, setIsImage] = useState<boolean> (false);
	const [verCode, setVerCode] = useState('');

  // 이미 로그인되었는지 확인
	useEffect(() => {
		// 예시로 sessionStorage에 isLoggedIn 상태를 저장한 것으로 가정합니다.
		const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
		if (storedIsLoggedIn === 'true') {
			setIsLoggedIn(true);}
		}, [navigate]
	);

	function handleLogin() {
		let isValid = 1;
		if (isValid) {
			// 로그인 성공 시 sessionStorage에 isLoggedIn 상태를 저장
			sessionStorage.setItem('isLoggedIn', 'true');
			setIsLoggedIn(true);
			navigate('/Home');
		} else {
			// 적합하지 않은 경우 경고 모달 띄우기
			setShowModal(true);
		}
	};

	const authLogin = async () => {
		try {
			const response = await fetch('URL');
			const contentType = response.headers.get('content-type');
			setIsImage(!!contentType && contentType.startsWith('image/'));

			if (contentType && contentType.startsWith('image/')){
				const blobData = await response.blob();
				setData(URL.createObjectURL(blobData));
			}
			else { // 이미지가 아니라면 text로 가져와서 저장
				const textData = await response.text();
				setData(textData);
			}
			setShowModal(true);
		}
		catch(error) {
			const textData = "Error at fetch data";
			setData(textData);
			console.error("Error at fetch data.", error);
		}
	};

	function authSecondLogin() {

	}

	return (
	<div className = 'wrapper'>
		{isLoggedIn ? (
		<div>
			<p>이미 로그인되었습니다. /Home 페이지로 이동합니다.</p>
			<button onClick={() => navigate('/Home')}>Go to Home</button>
		</div>
		) : (
		<div className = 'main'>
			<h1 className = 'logo'>로그인</h1>
			<button className='my_btn' onClick={authLogin}>Intra login</button>
			{/* authLogin으로 대체해야함 */}
		</div>
		)}
		{showModal && (
		<div className='modal'>
			<div className='close-btn'>
			<button onClick={() => setShowModal(false)}>X</button>
			</ div>
			<div>
			{isImage ? (
				<img src={data as string} alt="QR code" />
			) : (
				<p>{data}</p>
			)
			}
			<input placeholder= "verify code" type="text" value={verCode} onChange={(e) => setVerCode(e.target.value)} />
			<button>인증</button>
			</div>
		</div>
		)}
	</div>
	);
	};

	export default Log;
