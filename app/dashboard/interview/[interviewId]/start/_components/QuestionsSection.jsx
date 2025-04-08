import { Lightbulb } from 'lucide-react'
import React from 'react'

function QuestionsSection({MockInterviewQuestion,activeQuestionIndex}) {
  return MockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {MockInterviewQuestion&&MockInterviewQuestion.map((question,index)=>(
             <div key={index}>
             <h2 className={`p-2 bg-secendory rounded-full border text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index&&'bg-black text-white'}`}>Question #{index + 1}</h2>
           </div>
        ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'>{MockInterviewQuestion[activeQuestionIndex]?.question}</h2>

        <div className='border rounded-lg p-5 bg-gray-100 mt-20'>
            <h2 className='gap-2 flex items-center text-gray-500'>
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className="text-sm text-gray-500 my-2">Click on Record Answer when you want to answer the question. At the end of interview for each of question and answer to compare it.</h2>
        </div>

    </div>
  )
}

export default QuestionsSection