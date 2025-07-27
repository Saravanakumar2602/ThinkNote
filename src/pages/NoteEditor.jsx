// pages/NoteEditor.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/NoteEditor.css';

function NoteEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const noteId = queryParams.get('id');

  useEffect(() => {
    const fetchNote = async () => {
      if (noteId) {
        const noteRef = doc(db, 'notes', noteId);
        const noteSnap = await getDoc(noteRef);
        if (noteSnap.exists()) {
          const noteData = noteSnap.data();
          setTitle(noteData.title);
          setDescription(noteData.description);
        }
      }
    };
    fetchNote();
  }, [noteId]);

  const handleSave = async () => {
    const noteRef = noteId ? doc(db, 'notes', noteId) : doc(db, 'notes', crypto.randomUUID());
    await setDoc(noteRef, {
      uid: auth.currentUser.uid,
      title,
      description,
      timestamp: serverTimestamp(),
    });
    navigate('/notes');
  };

  return (
    <div className="editor-container">
      <h2>{noteId ? 'Edit Note' : 'New Note'}</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default NoteEditor;