import Webcam from 'react-webcam';
import React, { useState } from 'react'
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

function RecordAnswerSection() {
    const [webCamEnabled,setWebCamEnabled]=useState(false);
    
  return (
    <div className='flex flex-col justify-center items-center rounded-lg  p-5'>
        {webCamEnabled? <Webcam
         onUserMedia={()=>setWebCamEnabled(true)}
         onUserMediaError={()=>setWebCamEnabled(false)}
         mirrored={true}
         style={{
          height:450,
          width:800

         }}
         />
         :
         <>
        <WebcamIcon className='h-72 w-full my-7 p-20 rounded-lg border'/>
        <div className="flex gap-4 justify-center">
        <Button variant="ghost" className="border" onClick={() => setWebCamEnabled(true)}>
              Enable Web Cam and Microphone
            </Button>
            <Button  className="border" onClick={() => setWebCamEnabled(true)}>
              Record Answer
            </Button>
            </div>
        </>
         }   
    </div>
  )
}

export default RecordAnswerSection