import { useEffect, useState } from 'react';

const STORAGE_KEY_OFFICE = 'jovina_photo_office_data';
const STORAGE_KEY_BOOKS = 'jovina_photo_books_data';

export function usePsychologistPhotos() {
  const [officePhoto, setOfficePhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_OFFICE);
    } catch {
      return null;
    }
  });

  const [booksPhoto, setBooksPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_BOOKS);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_OFFICE) {
        setOfficePhoto(e.newValue);
      }
      if (e.key === STORAGE_KEY_BOOKS) {
        setBooksPhoto(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const savePhoto = async (target: 'office' | 'books', file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        try {
          if (target === 'office') {
            localStorage.setItem(STORAGE_KEY_OFFICE, dataUrl);
            setOfficePhoto(dataUrl);
          } else {
            localStorage.setItem(STORAGE_KEY_BOOKS, dataUrl);
            setBooksPhoto(dataUrl);
          }
          // Also persist to server filesystem via /api/upload-photo
          try {
            await fetch(`/api/upload-photo?target=${target}`, {
              method: 'POST',
              body: file,
            });
          } catch {
            // Server upload fallback
          }

          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return {
    officePhoto,
    booksPhoto,
    savePhoto,
  };
}
