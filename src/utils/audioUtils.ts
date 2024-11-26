export const requestMicrophonePermission = async (): Promise<MediaStream | null> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return stream;
    } catch (error) {
      console.error('Microphone access denied:', error);
      return null;
    }
  }
  
  export const analyzeAudioLevel = (analyser: AnalyserNode): number => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    
    const averageLevel = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
    return (averageLevel / 255) * 100; // Normalize to 0-100
  }