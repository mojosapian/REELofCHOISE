import { useState, useEffect } from 'react';

export interface SavedList {
  id: string;
  name: string;
  items: string[];
}

export const useSavedLists = () => {
  const [lists, setLists] = useState<SavedList[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('decider_saved_lists');
    if (saved) {
      setLists(JSON.parse(saved));
    }
  }, []);

  const saveList = (name: string, items: string[]) => {
    const newList: SavedList = {
      id: Date.now().toString(),
      name,
      items: items.filter(i => i.trim() !== ''),
    };
    const updated = [...lists, newList];
    setLists(updated);
    localStorage.setItem('decider_saved_lists', JSON.stringify(updated));
  };

  const deleteList = (id: string) => {
    const updated = lists.filter(l => l.id !== id);
    setLists(updated);
    localStorage.setItem('decider_saved_lists', JSON.stringify(updated));
  };

  return { lists, saveList, deleteList };
};