'use client'

import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { MicIcon, StopIcon } from '@radix-ui/react-icons'
import { requestMicrophonePermission } from '@/utils/audioUtils'

interface MicrophoneTestProps {
  onStreamReady: (stream: MediaStream) => void
}

export default function MicrophoneTest({ onStreamReady }: MicrophoneTestProps) {
  const [isRecording, setIsRecording] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startMicTest = async () => {
    const stream = await requestMicrophonePermission()
    
    if (stream) {
      streamRef.current = stream
      audioContextRef.current = new AudioContext()
      onStreamReady(stream)
      
      setIsRecording(true)
      toast.success('Microphone Test Started')
    } else {
      toast.error('Failed to access microphone')
    }
  }

  const stopMicTest = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      audioContextRef.current?.close()
      
      setIsRecording(false)
      toast.success('Microphone Test Stopped')
    }
  }

  return (
    <div className="flex justify-center space-x-4">
      {!isRecording ? (
        <button 
          onClick={startMicTest}
          className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
        >
          <MicIcon className="w-6 h-6" />
        </button>
      ) : (
        <button 
          onClick={stopMicTest}
          className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
        >
          <StopIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}