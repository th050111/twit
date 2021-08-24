import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

export default ({ userObj }) => {
  //작성중인 twit
  const [name, setName] = useState("");
  //저장된 twit들
  const [password, setPassword] = useState("");
	const [birthday, setBirthday] = useState("");
 
  const onSubmit = async (event) => {
    event.preventDefault();
    //컬렉션에 추가(객체)
    await dbService.collection("users").doc(name+"").set({
	 	name:name,
      password: password,
      birthday: birthday,
    });
	 }

  const onChangeName = (event) => {
    //event.target의 value를 value로
    const { target: { value } } = event;
    setName(value);
  }
  const onChangePassword = (event) => {
    //event.target의 value를 value로
    const { target: { value } } = event;
    setPassword(value);
  }
  const onChangeBirthday = (event) => {
    //event.target의 value를 value로
    const { target: { value } } = event;
    setBirthday(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={onChangeName} type="text" placeholder="이름" minLength={4} maxLength={4} />
		  <input value={birthday} onChange={onChangeBirthday} type="text" placeholder="생년월일(6자리)" minLength={6} maxLength={6} />
		  <input value={password} onChange={onChangePassword} type="text" placeholder="비밀번호" minLength={4} maxLength={4} />
        <input type="submit" value="save" />
      </form>
    </div >
  )
}