'use client';

import TodoItem from './TodoItem'; // ← 追加

export default function TodoList({ todos, setTodos }) {
  const todoList = todos || [];

  // 再取得関数（TodoItemから呼ばれる）
  const refreshTodos = async () => {
    const { fetchTodos } = await import('@/lib/fetchTodos');
    const data = await fetchTodos();
    setTodos(data);
  };

  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRefresh={refreshTodos} // ← ここ重要
        />
      ))}
    </ul>
  );
}



//'use client';
//
//// 不要な useEffect や useState (独自でのデータ取得) を削除
//export default function TodoList({ todos, setTodos }) {
//  // todos が undefined または null の場合に備えて空配列をデフォルトにする
//  const todoList = todos || [];
//
//  return (
//    <ul>
//      {todoList.map((todo) => (
//        <li key={todo.id}>
//          {todo.title}
//          {/* 編集・削除ボタンなどの処理 */}
//        </li>
//      ))}
//    </ul>
//  );
//}
//
//

//'use client';
//
//import { useEffect, useState } from 'react';
//import { fetchTodos } from '@/lib/fetchTodos';
//import TodoItem from '@/components/TodoItem';
//
///**
// * 一覧取得と再取得ロジックをカプセル化
// */
//export default function TodoList() {
//  const [todos, setTodos] = useState([]);
//
//  const loadTodos = async () => {
//    const data = await fetchTodos();
//    setTodos(data);
//  };
//
//  useEffect(() => {
//    loadTodos();
//  }, []);
//
//  return (
//    <ul>
//      {todos.map((todo) => (
//        <TodoItem key={todo.id} todo={todo} onRefresh={loadTodos} />
//      ))}
//    </ul>
//  );
//}