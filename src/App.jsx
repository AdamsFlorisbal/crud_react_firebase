import { useEffect, useState } from 'react'
import Firebase from './components/firebase/firebase'
import {  
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
 } from "firebase/firestore";


export const App = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");

  const [users, setUsers] = useState([]);

  const db = getFirestore(Firebase);
  const usersCollectionRef = collection(db, "users");

  async function criarDado() {
    try {
      const user = await addDoc(collection(db, "users"), {
        name,
        position,
        level,
      });

      alert("dados salvos com sucessos", user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    
    await deleteDoc(userDoc);
    alert("Deletado com sucesso")
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Posição"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <button onClick={criarDado}>Criar dado</button>

      <ul>
        {users.map((user) => {
          return (
            <>
              <li>{user.name}</li>
              <li>{user.position}</li>
              <li>{user.level}</li>

              <button onClick={() => deleteUser(user.id)}>Deletar</button>
            </>
          );
        })}
      </ul>
    </div>)
}