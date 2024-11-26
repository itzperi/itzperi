'use client'

import { useState } from 'react'
import MicrophoneTest from '@/components/MicrophoneTest'
import MicrophoneVisualizer from '@/components/MicrophoneVisualizer'

export default function Home() {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Microphone Tester
        </h1>
        
        <MicrophoneTest onStreamReady={setAudioStream} />
        
        {audioStream && (
          <MicrophoneVisualizer audioStream={audioStream} />
        )}
      </div>
    </main>
  )
}