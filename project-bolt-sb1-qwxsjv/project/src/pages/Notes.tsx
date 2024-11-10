// Notes.tsx
import React, { useState } from 'react';
import { PlusCircle, StickyNote, Bell, Smile } from 'lucide-react';
import NoteModal from '../components/modals/NoteModal';
import { Note } from '../types';

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    { 
      id: '1', 
      title: 'Reunión de profesores', 
      content: 'Recordar agenda para la reunión del lunes', 
      type: 'reminder' as const, 
      createdAt: '2024-03-18' 
    },
    { 
      id: '2', 
      title: 'Mensaje motivacional', 
      content: '¡El éxito es la suma de pequeños esfuerzos repetidos día tras día!', 
      type: 'motivation' as const, 
      createdAt: '2024-03-17' 
    },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);

  // Función getIcon corregida
  const getIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'motivation':
        return <Smile className="h-5 w-5 text-yellow-500" />;
      default:
        return <StickyNote className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleNewNote = () => {
    setSelectedNote(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleDelete = (noteId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const handleSubmit = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    if (selectedNote) {
      // Actualizar nota existente
      setNotes(notes.map(note => 
        note.id === selectedNote.id 
          ? { ...note, ...noteData }
          : note
      ));
    } else {
      // Crear nueva nota
      const newNote = {
        ...noteData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      } as Note;
      setNotes([newNote, ...notes]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Notas</h1>
        <button 
          onClick={handleNewNote} 
          className="btn btn-primary flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nueva Nota
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getIcon(note.type)}
                <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
              </div>
              <span className="text-sm text-gray-500">{note.createdAt}</span>
            </div>
            <p className="text-gray-600">{note.content}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => handleEdit(note)}
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(note.id)}
                className="text-red-600 hover:text-red-900 text-sm font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        note={selectedNote}
      />
    </div>
  );
}