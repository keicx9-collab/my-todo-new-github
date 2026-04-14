'use client';

import { useState } from 'react';
import { insertTodo } from '@/lib/insertTodo';

/**
 * props:
 *   onAdd: (todo) => void   // 親コンポーネントへ新規 todo を渡す
 */
export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setLoading(true);
    const newTodo = await insertTodo(trimmed);
    setLoading(false);

    if (newTodo) {
      onAdd(newTodo);  // 親のリストに即時反映
      setTitle('');    // フォームをクリア
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="新しい TODO を入力"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '0.5rem', width: '70%' }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}
      >
        {loading ? '追加中…' : '追加'}
      </button>
    </form>
  );
}