import { supabase } from '@/lib/supabase';
import { queryGemini } from '@/lib/gemini';

export async function POST(req) {
  const { userId } = await req.json();

  const { data: profile } = await supabase.from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  const prompt = `
    Generate a personalized fitness and diet plan for:
    - Age: ${profile.age}
    - Weight: ${profile.weight}
    - Height: ${profile.height}
    - Fitness Level: ${profile.fitness_level}
    - Medical Conditions: ${profile.medical_conditions}
    - Workout Preferences: ${profile.workout_preferences}
    - Meal Preferences: ${profile.meal_preferences}

    Respond ONLY in this JSON format:
    {
      "workout": [...],
      "diet": [...],
      "todos": [...],
      "schedule": [...]
    }
  `;

  const aiResponse = await queryGemini(prompt);

  let plan;
  try {
    plan = JSON.parse(aiResponse.match(/{[\s\S]*}/)[0]);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to parse Gemini response." }), { status: 500 });
  }

  await supabase.from('plans').insert({
    user_id: userId,
    workout_routine: plan.workout,
    diet_plan: plan.diet,
    todos: plan.todos,
    schedule: plan.schedule
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
