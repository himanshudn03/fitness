'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [userId, setUserId] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!error) setPlan(data);
      setLoading(false);
    };

    fetchPlan();
  }, []);

  if (loading) return <p className="p-6">Loading your plan...</p>;

  if (!plan) {
    return <div className="p-6">No plan found. Please generate one from your profile.</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Your Personalized Fitness Plan</h1>

      <Section title="🏋️ Workout Routine" data={plan.workout_routine} />
      <Section title="🍽️ Diet Plan" data={plan.diet_plan} />
      <Section title="✅ To-Do List" data={plan.todos} />
      <Section title="📅 Weekly Schedule" data={plan.schedule} />
    </div>
  );
}

function Section({ title, data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <ul className="list-disc list-inside space-y-1">
        {data.map((item, idx) => (
          <li key={idx}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
