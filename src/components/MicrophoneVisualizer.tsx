// src/components/MicrophoneVisualizer.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { analyzeAudioLevel } from '@/utils/audioUtils'

interface MicrophoneVisualizerProps {
  audioStream: MediaStream
}

export default function MicrophoneVisualizer({ audioStream }: MicrophoneVisualizerProps) {
  const [audioLevel, setAudioLevel] = useState(0)
  const animationRef = useRef<number>()
  const analyserRef = useRef<AnalyserNode | null>(null)

  useEffect(() => {
    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaStreamSource(audioStream)
    
    source.connect(analyser)
    analyser.fftSize = 256
    analyserRef.current = analyser

    const updateAudioLevel = () => {
      if (analyserRef.current) {
        const level = analyzeAudioLevel(analyserRef.current)
        setAudioLevel(level)
        animationRef.current = requestAnimationFrame(updateAudioLevel)
      }
    }

    updateAudioLevel()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      analyser.disconnect()
      audioContext.close()
    }
  }, [audioStream])

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-blue-500 h-full transition-all duration-200 ease-out" 
          style={{ width: `${audioLevel}%` }}
        />
      </div>
      <p className="text-center mt-2 text-sm text-gray-600">
        Audio Level: {audioLevel.toFixed(2)}%
      </p>
    </div>
  )
}