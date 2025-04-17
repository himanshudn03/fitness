'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function EditProfilePage() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  const generatePlan = async () => {
    if (!userId) return;
    setLoading(true);
    setResponse(null);

    const res = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const result = await res.json();
    setLoading(false);
    setResponse(result.success ? '✅ Plan generated successfully!' : `❌ Error: ${result.error}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Your profile form code here */}

      <button
        onClick={generatePlan}
        disabled={loading || !userId}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating Plan...' : 'Generate My Fitness Plan'}
      </button>

      {response && (
        <p className="mt-2 text-sm">
          {response}
        </p>
      )}
    </div>
  );
}
