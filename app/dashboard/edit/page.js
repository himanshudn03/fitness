'use client';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

export default function EditProfile() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('profiles').upsert({ id: user.id, ...form });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
      <input name="full_name" onChange={handleChange} placeholder="Full Name" />
      <input name="age" type="number" onChange={handleChange} placeholder="Age" />
      <button type="submit">Save</button>
    </form>
  );
}
