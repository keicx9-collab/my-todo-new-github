'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AuthForm from '@/components/AuthForm';
import UserMenu from '@/components/UserMenu';

export default function AuthPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 現在のログイン状態を確認
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    fetchUser();
    
    // ★これを追加：ログイン状態の変化をリアルタイムで監視する
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>認証デモ</h2>
      {user ? (
        <UserMenu userEmail={user.email} />
      ) : (
        <AuthForm />
      )}
    </main>
  );
}





//// ログイン成功後に飛ぶように修正
//// app/auth/page.js
//import { supabase } from '@/lib/supabaseClient';
//import AuthForm from '@/components/AuthForm';
//import UserMenu from '@/components/UserMenu';
//
//export default async function AuthPage() {
//  // Cookieを直接取得するコードを削除し、Supabaseのセッションを確認する
//  const { data: { session } } = await supabase.auth.getSession();
//  const user = session?.user;
//
//  return (
//    <main style={{ padding: '2rem', textAlign: 'center' }}>
//      <h2>認証デモ</h2>
//      {user ? (
//        <UserMenu userEmail={user.email} />
//      ) : (
//        <AuthForm />
//      )}
//    </main>
//  );
//}
//




//// 7. Supabaseの認証機能（Auth）の追加
//
//import { supabase } from '@/lib/supabaseClient';
//import { cookies } from 'next/headers';
//import AuthForm from '@/components/AuthForm';
//import UserMenu from '@/components/UserMenu';
//
///**
// * サーバーコンポーネントでセッションを取得し、
// * ログイン済みならユーザー情報を表示。
// */
//export default async function AuthPage() {
//  // cookies() に await を追加
//  const cookieStore = await cookies(); 
//  const accessToken = cookieStore.get('sb-access-token')?.value;
//  let user = null;
//
//  if (accessToken) {
//    const {
//      data: { user: currentUser },
//    } = await supabase.auth.getUser(accessToken);
//    user = currentUser;
//  }
//
//  return (
//    <main style={{ padding: '2rem', textAlign: 'center' }}>
//      <h2>認証デモ</h2>
//      {user ? (
//        <UserMenu userEmail={user.email} />
//      ) : (
//        <AuthForm />
//      )}
//    </main>
//  );
//}
//
//



