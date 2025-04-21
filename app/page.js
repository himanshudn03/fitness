'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-8 sm:p-20 text-gray-900">
      <main className="flex flex-col items-center text-center gap-10">
        <Image src="/logo.png" alt="FitTrack AI" width={100} height={100} />
        <h1 className="text-4xl font-bold sm:text-5xl">
          Welcome to <span className="text-purple-600">FitTrack AI</span>
        </h1>
        <p className="max-w-xl text-lg sm:text-xl text-gray-700">
          Your AI-powered fitness companion. Get personalized workout and diet plans, track your progress, and chat with your fitness assistant powered by Gemini AI.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/auth/register"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="border border-purple-600 hover:bg-purple-100 px-6 py-3 rounded-lg text-lg"
          >
            Login
          </Link>
        </div>
      </main>

      <footer className="mt-16 text-sm text-center text-gray-500">
        Built with 💪 using Next.js, Supabase, and Gemini AI.
      </footer>
    </div>
  );
}
