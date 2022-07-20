import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db from "../firebase";
function Room({ data }) {
  const [room, setRoom] = useState(null);
  useEffect(() => {
    setRoom(data.data);
  }, [data]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.id), (doc) => {
      setRoom(doc.data());
    });
  }, []);

  return (
    <div>
      {data.id}
      <br />

      {room?.like?.toString()}
    </div>
  );
}

export default Room;
