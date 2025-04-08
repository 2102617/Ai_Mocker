"use client"
import React, { use, useEffect, useState } from 'react'
import {db} from '@/utils/db'

import { eq } from "drizzle-orm";
import { MockInterview } from '../../../../../utils/schema';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

function StartInterview({params}) {
    const param= use(params);
    const [interviewData,setInterviewData]=useState();
    const [MockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

    useEffect(()=>{
        GetInterviewDetails();
    },[]);
    
    

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,param.interviewId))
        
        const jsonData = JSON.parse(result[0].jsonMockResp);
        const jsonMockResp = jsonData.questions;
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0])

        console.log(jsonMockResp);

    }

  return (
    <div> 
        <div className='grid grid-cols-1 md:grid-cols-2'>
            
        <QuestionsSection MockInterviewQuestion={MockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>

        <RecordAnswerSection/>
        </div>
    </div>
  )
}

export default StartInterview