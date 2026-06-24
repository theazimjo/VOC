import { useState, useEffect, useCallback } from 'react';
import { ref, set, push, update, remove, get, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useBooks() {
  const { user } = useAuth();
  const [books, setBooks] = useState(() => {
    if (typeof window !== 'undefined' && user) {
      const cached = localStorage.getItem(`voc-cache-books-${user.uid}`);
      return cached ? JSON.parse(cached) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(true);

  // Real-time listener for books
  useEffect(() => {
    if (!user) {
      setBooks([]);
      setLoading(false);
      return;
    }

    // Load from cache first
    const cached = localStorage.getItem(`voc-cache-books-${user.uid}`);
    if (cached) {
      setBooks(JSON.parse(cached));
      setLoading(false);
    } else {
      setLoading(true);
    }

    const booksRef = ref(db, `users/${user.uid}/books`);

    const unsubscribe = onValue(
      booksRef,
      (snapshot) => {
        const booksData = [];
        snapshot.forEach((childSnap) => {
          // Exclude any non-object keys if they exist, but normally they are book objects
          const val = childSnap.val();
          if (val && typeof val === 'object') {
            // Count words if nested words object exists
            const wordsObj = val.words || {};
            const calculatedWordCount = Object.keys(wordsObj).length;

            booksData.push({
              id: childSnap.key,
              ...val,
              wordCount: calculatedWordCount // dynamically sync wordCount based on actual nested words
            });
          }
        });

        // Sort by createdAt desc
        booksData.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        
        // Cache data
        localStorage.setItem(`voc-cache-books-${user.uid}`, JSON.stringify(booksData));
        
        setBooks(booksData);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to books from RTDB:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Add a new book
  const addBook = useCallback(
    async (data) => {
      if (!user) return null;

      const booksRef = ref(db, `users/${user.uid}/books`);
      const newBookRef = push(booksRef);
      const bookData = {
        title: data.title || '',
        author: data.author || '',
        coverColor: data.coverColor || '#7C3AED',
        createdAt: new Date().toISOString(),
        wordCount: 0
      };

      await set(newBookRef, bookData);
      return newBookRef.key;
    },
    [user]
  );

  // Update an existing book
  const updateBook = useCallback(
    async (bookId, data) => {
      if (!user) return;

      const bookRef = ref(db, `users/${user.uid}/books/${bookId}`);
      await update(bookRef, data);
    },
    [user]
  );

  // Delete a book (deleting the book node automatically deletes its nested words)
  const deleteBook = useCallback(
    async (bookId) => {
      if (!user) return;

      const bookRef = ref(db, `users/${user.uid}/books/${bookId}`);
      await remove(bookRef);
    },
    [user]
  );

  // Get a single book by ID
  const getBook = useCallback(
    async (bookId) => {
      if (!user) return null;

      const bookRef = ref(db, `users/${user.uid}/books/${bookId}`);
      const snap = await get(bookRef);

      if (snap.exists()) {
        const val = snap.val();
        const wordsObj = val.words || {};
        return {
          id: snap.key,
          ...val,
          wordCount: Object.keys(wordsObj).length
        };
      }
      return null;
    },
    [user]
  );

  return { books, loading, addBook, updateBook, deleteBook, getBook };
}

