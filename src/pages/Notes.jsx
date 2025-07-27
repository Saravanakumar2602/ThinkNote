// pages/Notes.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'notes'), where('uid', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
  };

  return (
    <div className="notes-container">
      <h2>Your Notes</h2>
      <button onClick={() => navigate('/editor')}>+ New Note</button>
      <div className="notes-list">
        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <small>{new Date(note.timestamp?.seconds * 1000).toLocaleString()}</small>
            <div>
              <button onClick={() => navigate(`/editor?id=${note.id}`)}>Edit</button>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;