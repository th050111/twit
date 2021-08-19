import { authService } from "myBase";
import { dbService } from "myBase";
import React, { Fragment,useState, useEffect} from "react";

export default ({userObj}) => {
  const [currentName,setCurrentName] = useState("");
  const [newName,setNewName] = useState("");

  useEffect(() => {
        dbService.collection("names").doc(`${userObj.uid}`).onSnapshot(snapshot =>{
          getName();
        })
    }, [])

	const getName = async () =>{
		const data = await dbService.collection("names").doc(`${userObj.uid}`).get();
		const name = data.data().name;
		setCurrentName(name);
	}
	const setName = async () =>{
		const data = {
			name: newName,
		}
		await dbService.collection("names").doc(`${userObj.uid}`).set(data);
	}
  const onChange = (event) => {
  	const {target: {value}} = event;
  	setNewName(value);
  }
  const onSubmit = (event) => {
  	event.preventDefault();
	setName();
	setNewName("");
  }
  
  const onLogOutClick = () => authService.signOut();
  return (
    <>
      <div>현재 이름: {currentName}</div>
      <form onSubmit={onSubmit}>
        <input type="text" value={newName} onChange={onChange}/>
		  <input type="submit" value="change"/>
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}