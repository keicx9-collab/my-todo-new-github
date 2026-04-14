'use client';

import { useState } from 'react';
import { updateTodo } from '@/lib/updateTodo';
import { deleteTodo } from '@/lib/deleteTodo';

export default function TodoItem({ todo, onRefresh }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await updateTodo(todo.id, title.trim());
    setLoading(false);
    setEditing(false);
    onRefresh();
  };

  const handleDelete = async () => {
    if (!confirm('この TODO を削除しますか？')) return;
    setLoading(true);
    await deleteTodo(todo.id);
    setLoading(false);
    onRefresh();
  };

  return (
    <li style={{ marginBottom: '0.5rem' }}>
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <button onClick={handleUpdate} disabled={loading}>
            保存
          </button>
          <button onClick={() => setEditing(false)} disabled={loading}>
            キャンセル
          </button>
        </>
      ) : (
        <>
          {todo.title}
          <button onClick={() => setEditing(true)} style={{ marginLeft: '0.5rem' }}>
            編集
          </button>
          <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>
            削除
          </button>
        </>
      )}
    </li>
  );
}