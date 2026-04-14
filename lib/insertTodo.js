


import { supabase } from '@/lib/supabaseClient';

export const insertTodo = async (title) => {
  // ログイン中のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('ログインしていません');
  }

  const { data, error } = await supabase
    .from('todos')
    .insert([{ title, user_id: user.id }])
    .select()
    .single();

  if (error) {
    console.error('TODO 追加失敗:', error.message);
    return null;
  }

  return data;
};


//// lib/insertTodo.jsをTODO追加時に再読み込みせずに反映するよう修正
//import { supabase } from './supabaseClient';
//
//export const insertTodo = async (title) => {
//  const { data, error } = await supabase
//    .from('todos')
//    .insert([{ title }])
//    .select()
//    .single(); // ← ここを .single() に戻し、確実に1件のオブジェクトを返す
//
//  if (error) {
//    console.error('TODO の追加に失敗しました:', error.message);
//    return null;
//  }
//
//  return data; // { id: ..., title: ... } という形式が返る
//};
//
//
//

//import { supabase } from './supabaseClient';
//
///**
// * title を受け取り、todos テーブルに 1 行 INSERT する
// * 成功すると挿入されたレコード（1 行）を返す
// */
//export const insertTodo = async (title) => {
//  const { data, error } = await supabase
//    .from('todos')
//    .insert([{ title }])   // ← 配列形式で渡す
//    .select()              // ← 挿入後に戻り値を取得
//    .single();             // ← 1 行だけ返す
//
//  if (error) {
//    console.error('TODO の追加に失敗しました:', error.message);
//    return null;
//  }
//
//  return data;             // { id, title, … } 形式
//};