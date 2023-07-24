import React, { useState } from 'react';

function UserList() {
	const [data, setData] = useState([
	{ username: 'jeon', nickname: 'JAEEE', age: 25 },
	{ username: 'lee', nickname: 'LEEEE', age: 20 },
	{ username: 'kim', nickname: 'KIMMM', age: 30 },
	{ username: 'kim', nickname: 'KIMMM', age: 30 },
	{ username: 'kim', nickname: 'KIMMM', age: 30 },
	{ username: 'kim', nickname: 'KIMMM', age: 30 },
	{ username: 'kim', nickname: 'KIMMM', age: 30 },
	{ username: 'kim', nickname: 'KIMMM', age: 30 },
	]);

	// API에서 문자열 하나로 쭉 들어오면 세개씩 끊어서 반복문 돌리기
	const AddData = (dataString:string) => {
		const [username, nickname, age] = dataString.split(' ');

		const newData = {
		  username: username,
		  nickname: nickname,
		  age: parseInt(age),
		};

		const updatedData = [...data, newData];

		setData(updatedData);
	  };

	function clickAdd(){
		const str = "JAE1 JAEEE2 13";
		AddData(str);
	}

	return (
	<div className='friend-wrapper'>
		{/* 배열을 순회하며 요소를 출력 */}
		{data.map((item, index) => (
		<div key={index}>
			<p>{item.username} {item.nickname} {item.age}</p>
			<button onClick={clickAdd}>친구 추가</button> <button>프로필 보기</button> <button>게임 신청</button>
		</div>
		))}
	</div>
	);
};

export default UserList;
