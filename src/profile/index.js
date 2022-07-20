import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db from "../firebase";

function Profile({ id }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", id), (doc) => {
      setUser(doc.data());
    });
  }, [id]);

  return <div>{JSON.stringify(user)}</div>;
}

export default Profile;
