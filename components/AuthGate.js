'use client';

import { useState, useEffect } from 'react';
import { fetchTodos } from '@/lib/fetchTodos';
import AuthForm from '@/components/AuthForm';
import TodoList from '@/components/TodoList';
import UserMenu from '@/components/UserMenu';
import { useSupabaseUser } from '@/lib/useSupabaseUser';
import TodoForm from '@/components/TodoForm';

export default function AuthGate() {
  const { user, loading } = useSupabaseUser();
  const [todos, setTodos] = useState([]);

  // ログインしている場合にデータを取得する
  useEffect(() => {
    if (user) {
      const loadTodos = async () => {
        const data = await fetchTodos();
        setTodos(data || []);
      };
      loadTodos();
    }
  }, [user]);

  // 新規 TODO が追加された時に、現在のリストの先頭に加える関数
  const handleAdd = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  if (loading) return <p>読み込み中…</p>;

  return user ? (
    <>
      <UserMenu userEmail={user.email} />
      {/* 1. TodoForm を追加し、onAdd プロップスに handleAdd を渡す */}
      <TodoForm onAdd={handleAdd} />
      
      {/* 2. TodoList にデータを渡す */}
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  ) : (
    <AuthForm />
  );
}



//'use client';
//
//import AuthForm from '@/components/AuthForm';
//import TodoList from '@/components/TodoList';
//import UserMenu from '@/components/UserMenu';
//import { useSupabaseUser } from '@/lib/useSupabaseUser';
//
//export default function AuthGate() {
//  const { user, loading } = useSupabaseUser();
//
//  if (loading) return <p>読み込み中…</p>;
//
//  return user ? (
//    <>
//      <UserMenu userEmail={user.email} />
//      <TodoList />
//    </>
//  ) : (
//    <AuthForm />
//  );
//}