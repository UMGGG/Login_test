import React, { useState } from 'react';

function UserList() {
	const [showModals, setShowModals] = useState([false, false, false]);
	const [userCount, setUserCount] = useState(3);
	// id번호 수정해야함
	const [data, setData] = useState([
	{ id: 0, nickname: 'JAEEE', win: 49, lose: 25, isfriend: 1},
	{ id: 1, nickname: 'JAEEE2', win: 19, lose: 5, isfriend: 1},
	{ id: 2, nickname: 'JAEEE3', win: 429, lose: 23, isfriend: 0},
	]);

	//useEffect로 뭔가 일어날때마다 새로 API요청해서 새로고침해줘야함

	// "닉네임 승 패 친구여부|닉네임 승 패 친구여부|닉네임 승 패 친구여부" 형태로 받아오기
	// API에서 문자열 하나로 쭉 들어오면 세개씩 끊어서 반복문 돌리기
	const AddData = (dataString:string) => {
		const [nickname, win, lose, isfriend] = dataString.split(' ');

		const newData = {
			id: userCount,
			nickname: nickname,
			win: parseInt(win),
			lose: parseInt(lose),
			isfriend: parseInt(isfriend),
		};
		setShowModals([...showModals, false]);
		const updatedData = [...data, newData];
		setUserCount(userCount + 1);
		setData(updatedData);
	};

	// 임시
	function clickAdd(){
		const str = "JAE" + userCount + " 22 25 0";
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
		//DB에 있는 isfriend 1로 바꿔달라고 하기
		let copiedData = [... data];
		copiedData[index].isfriend = 1;
		setData(copiedData);
	}

	function unFollow(index:number){
		//DB에 있는 isfriend 0으로 바꿔달라고 하기
		let copiedData = [... data];
		copiedData[index].isfriend = 0;
		setData(copiedData);
	}
	return (
	<div className='friend-wrapper'>
		<button>r</button>
		{/* 배열을 순회하며 요소를 출력 */}
		{data.map((item, index) => (
		<div key={index}>
			<p className='profile-left'>
				<img src="img/img1.png" alt="profile image" width="50" height = "50" />
				{item.nickname}<br />
				승: {item.win} 패:{item.lose}
			</p>
			<p>
				{data[index].isfriend === 1 && (
					<button onClick={() => {unFollow(index)}}>언팔로우</button>)}
				{data[index].isfriend === 0 && (
					<button onClick={clickAdd}>팔로우</button>)}
				<button onClick={() => {sendGameMatch(index)}}>게임 신청</button>
				<button onClick={() => {profilePopup(index)}}>프로필 보기</button>
			</p>
			{showModals[index] && (
			<div className='modal'>
				<div className='modal-content'>
					<p><img src="img/img1.png" alt="profile image" width="100" height = "100" /></p>
					<h2>
						{data[index].nickname} 의 프로필
					</h2>
					<p>승: {data[index].win} 패:{data[index].lose}</p>
					<p>최근 전적</p>
					<p>
						{/* 전적 들어갈곳 */}
					</p>
						{data[index].isfriend === 1 && (
						<button onClick={() => {unFollow(index)}}>언팔로우</button>)}
						{data[index].isfriend === 0 && (
						<button onClick={clickAdd}>팔로우</button>)}
						<button>게임 신청</button>
					<p>
					<button onClick={() => profilePopdown(index)}>닫기</button>
					</p>
				</div>
			</div>
			)}
		</div>
		))}
	</div>
	);
};

export default UserList;
