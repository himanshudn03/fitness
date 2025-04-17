'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DietTracker({ items = [] }) {
  const [completed, setCompleted] = useState({});

  const handleCheck = async (item) => {
    setCompleted((prev) => ({ ...prev, [item]: true }));

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from('tracking').insert({
      user_id: user.id,
      type: 'diet',
      item,
      completed: true,
    });
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-2">🍽️ Diet Tracker</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx}>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!completed[item]}
                onChange={() => handleCheck(item)}
                disabled={completed[item]}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
