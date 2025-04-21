"use client";
import Webcam from 'react-webcam';
import React, { useState, useEffect } from 'react';
import { Lightbulb, WebcamIcon, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';



function RecordAnswerSection() {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.forEach(result => {
      setUserAnswer(prevAns => prevAns + (result?.transcript || ""));
    });
  }, [results]);

  useEffect(() => {
    console.log("User Answer:", userAnswer);
  }, [userAnswer]);

  return (
    <div className='flex flex-col justify-center items-center rounded-lg p-5 gap-4'>
      {webCamEnabled ? (
        <Webcam
          onUserMedia={() => setWebCamEnabled(true)}
          onUserMediaError={() => setWebCamEnabled(false)}
          mirrored={true}
          style={{
            height: 450,
            width: 800
          }}
        />
      ) : (
        <WebcamIcon className='h-72 w-full my-7 p-20 rounded-lg border' />
      )}

      <div className="flex gap-4 justify-center">
        <Button variant="ghost" className="border" onClick={() => setWebCamEnabled(true)}>
          Enable Web Cam and Microphone
        </Button>
        <Button className="border" onClick={() => {
          if (!webCamEnabled) setWebCamEnabled(true);
          isRecording ? stopSpeechToText() : startSpeechToText();
        }}>
          {isRecording ? (
            <h2 className="flex items-center gap-2">
              <Mic /> Recording...
            </h2>
          ) : (
            'Record Answer'
          )}
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
