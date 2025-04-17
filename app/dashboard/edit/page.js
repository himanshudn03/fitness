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

import WorkoutTracker from '@/components/Tracker/WorkoutTracker';
import DietTracker from '@/components/Tracker/DietTracker';
import TodoTracker from '@/components/Tracker/TodoTracker';

// Assume plan comes from API
const plan = {
  workout_routine: ['Push-ups', 'Squats', 'Plank'],
  diet_plan: ['Oats breakfast', 'Grilled chicken lunch'],
  todos: ['Drink 3L water', 'Stretch 10 min'],
};

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Render trackers */}
      <WorkoutTracker items={plan.workout_routine} />
      <DietTracker items={plan.diet_plan} />
      <TodoTracker items={plan.todos} />
    </div>
  );
}

