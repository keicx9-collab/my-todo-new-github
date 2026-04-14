import { supabase } from '@/lib/supabaseClient';

export const deleteTodo = async (id) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id); // ←これ追加

  if (error) {
    console.error('削除に失敗しました:', error.message);
  }
};


//import { supabase } from './supabaseClient';
//
///**
// * id に一致する行を削除する
// */
//export const deleteTodo = async (id) => {
//  const { error } = await supabase
//    .from('todos')
//    .delete()
//    .eq('id', id);
//
//  if (error) {
//    console.error('削除に失敗しました:', error.message);
//  }
//};
//