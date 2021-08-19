import React, {useState} from "react";
import { dbService } from "myBase";

const Twit = ({ twitObj, isOwner, creatorName}) => {
  //수정모드?
  const [editing, setEditing] = useState(false);
  //새로운 twit
  const [newTwit, setNewTwit] = useState(twitObj.text);
  
  

  const onDeleteClick = async () =>{
    const ok = window.confirm("Are you sure?");
     if(ok){
       //삭제
      await dbService.doc(`twits/${twitObj.id}`).delete();
    }
  }
  
  //수정 온,오프
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) =>{
    event.preventDefault();
    //twit수정
    await dbService.doc(`twits/${twitObj.id}`).update({
      text: newTwit,
    });
    setEditing(false);
  }
  const onChange = (event) => {
    const {target:{value},} = event;
    setNewTwit(value);
  }

  return (
    <div>
      {
        editing ? (
          <>
          <form onSubmit={onSubmit}>
          <input 
            onChange={onChange} 
            type="text" 
            placeholder="Edit" 
            value={newTwit} required/>
        <input type="submit" value="Update" />
        </form>
        <button onClick={toggleEditing}>cancel</button>
        </>
        ) : (
        <>
		  <h5>{creatorName}:{twitObj.text}</h5>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button onClick={toggleEditing}>Edit</button>
        </>
      )}
      </> )
      }
    </div>
  )
}

export default Twit;