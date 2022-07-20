import React, { useState, useEffect } from "react";
import db from "../src/firebase";
import Room from "../src/room";
import {
  doc,
  onSnapshot,
  query,
  collection,
  addDoc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Profile from "../src/profile";
import { useRouter, withRouter } from "next/router";


function App() {
  const [customerName, setCustomerName] = useState("");
  const [customersData, setCustomersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [room, setRoom] = useState(null);
  const [me, setMe] = useState("OfQjztZHHYfOu3QBZhUP");
  
 const router =  useRouter()
  console.log("?", router);
  const submit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: customerName,
      });
      console.log("Document written with ID: ", docRef.id);
      setCustomerName("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //   const collectionRef = collection();
  const meDocRef = doc(db, "users", me);

  const onFollow = async (id) => {
    try {
      updateDoc(meDocRef, {
        following: arrayUnion(id),
      }).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onUnfollow = async (id) => {
    try {
      updateDoc(meDocRef, {
        following: arrayRemove(id),
      }).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const updatePursue = () => {};

  useEffect(() => {
    const q = query(collection(db, "users"));
    const q2 = query(collection(db, "chats"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCustomersData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [db]);

  const viewRoom = (room) => {
    setSelectedUser(room);
  };

  return (
    <div className="App">
      <div className="App__form">
        <input
          type="text"
          placeholder="Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <button onClick={submit}>Submit</button>
      </div>
      <div className="box">
        <ul className="list">
          {customersData?.map((item) => (
            <li key={item.id}>
              <div className="item">
                <p>{item.data.name}</p>
                <button onClick={() => viewRoom(item.id)}>view</button>
                <button onClick={() => onFollow(item.id)}>follow</button>
                <button onClick={() => onUnfollow(item.id)}>unfollow</button>
              </div>
            </li>
          ))}
        </ul>
        <div>{selectedUser && <Profile id={selectedUser} />}</div>
        <div>{room && <Room data={room} />}</div>
      </div>
    </div>
  );
}

export default withRouter(App);

{
  /* <button onClick={updatePursue}>Pursue</button> */
}
