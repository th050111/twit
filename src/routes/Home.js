import Twit from "components/Twit";
import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

export default ({ userObj }) => {
  //작성중인 twit
  const [twit, setTwit] = useState("");
  //저장된 twit들
  const [twits, setTwits] = useState([]);


  useEffect(() => {
    //해당컬렉션에대한 이벤트 리스너
    dbService.collection("twits").orderBy('createAt','desc').limit(10).onSnapshot(snapshot => {
	 
	 
      //문서의 데이터와 id의 객체를 배열로 저장
      const twitArray = snapshot.docs.map(doc => {
       return ({
          id: doc.id, 
          ...doc.data()
        });
      })
      setTwits(twitArray);
    })
  }, [])
  const onSubmit = async (event) => {
    event.preventDefault();
	 const data = await dbService.collection("names").doc(`${userObj.uid}`).get();
		const name = data.data() === undefined? "익명" : data.data().name;
    //컬렉션에 추가(객체)
    await dbService.collection("twits").add({
	 	writerName:name,
      text: twit,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTwit("");
  };

  const onChange = (event) => {
    //event.target의 value를 value로
    const { target: { value } } = event;
    setTwit(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={twit} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="twit" />
      </form>
      <div>
        {twits.map(twit =>
          <Twit 
          key={twit.id} 
          twitObj={twit} 
          isOwner={twit.creatorId === userObj.uid}
			 creatorName={twit.writerName}
          />
        )}
      </div>
    </div >
  )
}