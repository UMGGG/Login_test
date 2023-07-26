import React, { useState } from 'react';

function UserList() {
	const [showModals, setShowModals] = useState([false, false, false]);
	const [showModalRegister, setShowModalRegister] = useState(false);
	const [userCount, setUserCount] = useState(3);
	const [newNickname, setNickname] = useState('');
	const [myData, setMyData] = useState({myNickname: 'JAE', profileNum:1});
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	// id번호 수정해야함
	const [userData, setData] = useState([
	{ id: 0, nickname: 'JAEEE', profileNum:1, win: 49, lose: 25, isFriend: 1},
	{ id: 1, nickname: 'JAEEE2', profileNum:2, win: 19, lose: 5, isFriend: 1},
	{ id: 2, nickname: 'JAEEE3', profileNum:3, win: 429, lose: 23, isFriend: 0},
	]);

	//useEffect로 뭔가 일어날때마다 새로 API요청해서 myData랑 userData새로고침해줘야함

	// "닉네임 프로필주소 승 패 친구여부|닉네임 프로필주소 승 패 친구여부|닉네임 프로필주소 승 패 친구여부" 형태로 받아오기
	// API에서 문자열 하나로 쭉 들어오면 세개씩 끊어서 반복문 돌리기

	const AddData = (dataString:string) => {
		const [nickname, profileNum, win, lose, isFriend] = dataString.split(' ');

		const newData = {
			id: userCount,
			nickname: nickname,
			profileNum: parseInt(profileNum),
			win: parseInt(win),
			lose: parseInt(lose),
			isFriend: parseInt(isFriend),
		};
		setShowModals([...showModals, false]);
		const updatedData = [...userData, newData];
		setUserCount(userCount + 1);
		setData(updatedData);
	};

	// 임시로 사용
	function clickAdd(){
		const str = "JAE" + userCount + " 2 22 25 0";
		AddData(str);
	}

	function profilePopup(index:number){
		let copiedData = [...showModals];
		copiedData[index] = true;
		setShowModals(copiedData);
	}

	function profilePopdown(index:number){
		let copiedData = [...showModals];
		copiedData[index] = false;
		setShowModals(copiedData);
	}

	function sendGameMatch(index:number){
		//매치신청 보내기
	}

	function follow(index:number){
		//DB에 있는 isFriend 1로 바꿔달라고 하기
		let copiedData = [... userData];
		copiedData[index].isFriend = 1;
		setData(copiedData);
	}

	function unFollow(index:number){
		//DB에 있는 isFriend 0으로 바꿔달라고 하기
		let copiedData = [... userData];
		copiedData[index].isFriend = 0;
		setData(copiedData);
	}

	function fixProfile(){
		//중복된 닉네임이 없는지 검사, 중복이 있으면 팝업띄우기
		//중복된 닉네임이 없다면 이미지 업로드
		if (selectedFile) {
			const formData = new FormData();
			formData.append('file', selectedFile);
			//fetch -> formData를 body로 POST
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// 파일을 선택했을 때 호출
		if (e.target.files && e.target.files.length > 0){
			const file = e.target.files[0];
			setSelectedFile(file);
			setImageUrl(URL.createObjectURL(file));
		}
	};

	return (
	<div className='friend-wrapper'>
			<button onClick={() => setShowModalRegister(true)}>내 프로필</button>
		<button>r</button>
		{/* 배열을 순회하며 요소를 출력 */}
		{userData.map((item, index) => (
		<div key={index}>
			<p className='profile-left'>
				<img src={"img/img" + userData[index].profileNum + ".png"} alt="profile image" width="50" height = "50" />
				{item.nickname}<br />
				승: {item.win} 패:{item.lose}
			</p>
			<p>
				{userData[index].isFriend === 1 && (
					<button onClick={() => {unFollow(index)}}>언팔로우</button>)}
				{userData[index].isFriend === 0 && (
					<button onClick={() => {follow(index)}}>팔로우</button>)}
				<button onClick={() => {sendGameMatch(index)}}>게임 신청</button>
				<button onClick={() => {profilePopup(index)}}>프로필 보기</button>
			</p>
			{showModals[index] && (
			<div className='modal'>
				<div className='modal-content'>
					<p><img src={"img/img" + userData[index].profileNum + ".png"} width="100" height = "100" /></p>
					<h2>
						{userData[index].nickname} 의 프로필
					</h2>
					<p>승: {userData[index].win} 패:{userData[index].lose}</p>
					<p>최근 전적</p>
					<p>
						{/* 전적 받아와서 들어갈곳 */}
					</p>
						{userData[index].isFriend === 1 && (
						<button onClick={() => {unFollow(index)}}>언팔로우</button>)}
						{userData[index].isFriend === 0 && (
						<button onClick={() => {follow(index)}}>팔로우</button>)}
						<button>게임 신청</button>
					<p>
					<button onClick={() => profilePopdown(index)}>닫기</button>
					</p>
				</div>
			</div>
			)}
			{showModalRegister && (
		<div className='modal'>
			<>
				<div className='modal-content'>
					<div className='close-btn'>
						<button onClick={() => setShowModalRegister(false)}>X</button>
					</div>
					<h2>내 프로필</h2>
					<div className='register-inside'>
						<div>
							닉네임 <input className='account' placeholder={myData.myNickname} type="text" value={newNickname} onChange={(e) => setNickname(e.target.value)} />
							<p>
								프로필 사진
								<br />
								<input type="file" accept='image/*' onChange={handleFileChange}></input>
								<br/>
								{imageUrl && <img src={imageUrl} width="100" height = "100" />}
							</p>
							<button onClick={fixProfile}>저장</button>
						</div>
					</div>
				</div>
			</>
		</div>
		)}
		</div>
		))}
	</div>
	);
};

export default UserList;
