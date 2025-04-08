"use client"
import React, { useState } from 'react'
import {db} from '@/utils/db'
import { useEffect, use } from 'react';
import { eq } from "drizzle-orm";
import { MockInterview } from '../../../../utils/schema'
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

function Interview({params}) {
  const param= use(params);
  const [interviewData,setInterviewData]=useState();
  const [webCamEnabled,setWebCamEnabled]=useState(false);
  useEffect(()=>{
    console.log(param)
    GetInterviewDetails();
  },[])

const GetInterviewDetails=async()=>{
    const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,param.interviewId))
    console.log(result);
    setInterviewData(result[0])
}

  return (
    <div className='my-10 flex justify-center flex-col items-center'> 
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>

      <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col gap-5 p-5 rounded-lg border'>
              <h2 className='text-lg'><strong>Job Position: </strong>{interviewData?.jobPosition}</h2>
              <h2 className='text-lg'><strong>Job Description: </strong>{interviewData?.jobDesc}</h2>
              <h2 className='text-lg'><strong>Years of Experience: </strong>{interviewData?.jobExperience}</h2>
         </div>
         <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-200'>
          <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
          <h2 className='mt-3 text-yellow-500'>Enable Video Cam and Microphone to Start your AI Generated Mock Interview, It has 5 questions which you have to answer and at last you will get the report on the basis of your answer.</h2><br/>
          <h2 className='mt-3 text-yellow-500'><strong>NOTE:</strong> We newer record your video, Web cam access you can disable at any time if you want.</h2>
         </div>
      </div>
         <div>
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
        <WebcamIcon className='h-72 w-full my-7 p-20 rounded-lg border bg-secondary'/>
        <Button variant="ghost" className="border" onClick={() => setWebCamEnabled(true)}>
              Enable Web Cam and Microphone
            </Button>
            <Link href={'/dashboard/interview/'+param.interviewId+'/start'}>
            <Button className='m-7'>Start Interview</Button>
            </Link>
        </>
         }
        </div>

      </div>
    </div>
  )
}

export default Interview