
//// 6章　TODOの更新と削除機能の実装＋追加時の再読み込み
'use client';

import { useEffect, useState } from 'react';
import { fetchTodos } from '@/lib/fetchTodos'; // 追加
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

export default function TodosPage() {
  const [todos, setTodos] = useState([]);

  // 初期表示時にデータを取得する
  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    loadTodos();
  }, []);

  const handleAdd = (todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h2>TODO リスト</h2>
      <TodoForm onAdd={handleAdd} />
      {/* todos と、削除・編集用の setTodos も渡す */}
      <TodoList todos={todos} setTodos={setTodos} />
    </main>
  );
}


//// 6章　TODOの更新と削除機能の実装
//'use client';
//
//import { useEffect, useState } from 'react';
//import TodoForm from '@/components/TodoForm';
//import TodoList from '@/components/TodoList';
//
//export default function TodosPage() {
//  const [todos, setTodos] = useState([]);
//
//  // TodoForm から呼ばれる
//  const handleAdd = (todo) => {
//    setTodos((prev) => [todo, ...prev]);
//  };
//  return (
//    <main style={{ padding: '2rem' }}>
//      <h2>TODO リスト</h2>
//      <TodoForm onAdd={handleAdd} />
//      <TodoList />
//    </main>
//  );
//}
//


// 5. 新規TODOの追加機能の実装
//'use client';
//
//import { useEffect, useState } from 'react';
//import { fetchTodos } from '@/lib/fetchTodos';
//import TodoForm from '@/components/TodoForm';
//
//export default function TodoAppPage() {
//  const [todos, setTodos] = useState([]);
//
//  // 初回マウント時に既存 TODO を取得
//  useEffect(() => {
//    const load = async () => {
//      const data = await fetchTodos();
//      setTodos(data);
//    };
//    load();
//  }, []);
//
//  // TodoForm から呼ばれる
//  const handleAdd = (todo) => {
//    setTodos((prev) => [todo, ...prev]);
//  };
//
//  return (
//    <main style={{ padding: '2rem' }}>
//      <h2>TODO リスト</h2>
//
//      <TodoForm onAdd={handleAdd} />
//
//      <ul>
//        {todos.map((todo) => (
//          <li key={todo.id}>{todo.title}</li>
//        ))}
//      </ul>
//    </main>
//  );
//}
//



// オリジナル
//'use client';
//
//import { useEffect, useState } from 'react';
//import { fetchTodos } from '@/lib/fetchTodos';
//
//export default function TodoListPage() {
//  const [todos, setTodos] = useState([]);
//
//  useEffect(() => {
//    const loadTodos = async () => {
//      const data = await fetchTodos();
//      setTodos(data);
//    };
//
//    loadTodos();
//  }, []);
//
//  return (
//    <main>
//      <h2>TODOリスト</h2>
//      <ul>
//        {todos.map((todo) => (
//          <li key={todo.id}>{todo.title}</li>
//        ))}
//      </ul>
//    </main>
//  );
//}



