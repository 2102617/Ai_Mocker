"use client";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "../../../utils/schema";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState();
  const { user } = useUser();
  const router=useRouter;

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const inputPrompt = `
      Return **only valid JSON**, starting with { and ending with }, with no additional text, markdown, or explanations. Do not include \`\`\`json or any other markers. Generate exactly 5 interview questions with answers based on these job details:

      - Position: ${jobPosition}
      - Tech Stack / Key Skills: ${jobDesc}
      - Experience Level: ${jobExperience} years

      Example format:
      {"questions":[{"question":"What is X?","answer":"X is..."},{"question":"What is Y?","answer":"Y is..."}]}
    `;

    try {
      const result = await model.generateContent(inputPrompt);
      const responseText = await result.response.text();
      console.log("AI Raw Response:", responseText);

      const cleanJson = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/^\s+|\s+$/g, "")
        .replace(/[\r\n]+/g, "");
      console.log("Cleaned JSON:", cleanJson);

      const jsonMockResp = JSON.parse(cleanJson);
      console.log("Parsed JSON:", jsonMockResp);

      if (!jsonMockResp?.questions?.length) {
        throw new Error("AI response does not contain valid questions");
      }

      setInterviewQuestions(jsonMockResp.questions);

      const insertData = {
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(jsonMockResp), // Matches schema
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
        createdAt: new Date(),
      };
      console.log("Inserting into DB:", insertData);

      const resp = await db.insert(MockInterview).values(insertData).returning({ mockId: MockInterview.mockId });
      console.log("Inserted ID:", resp);
      if(resp){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Error generating interview questions:", error.message);
      alert("Failed to generate questions: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              Add details about your job position, skills, and experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="mt-5 my-3">
              <label className="block font-medium mb-1">Job Position</label>
              <Input
                placeholder="Ex. Full Stack Developer"
                required
                value={jobPosition}
                onChange={(event) => setJobPosition(event.target.value)}
              />
            </div>

            <div className="my-4">
              <label className="block font-medium mb-1">
                Job Description / Tech Stack (In Short)
              </label>
              <Textarea
                placeholder="Ex. React, Angular, NodeJs, MySQL etc."
                required
                value={jobDesc}
                onChange={(event) => setJobDesc(event.target.value)}
              />
            </div>

            <div className="my-3">
              <label className="block font-medium mb-1">Years of Experience</label>
              <Input
                placeholder="Ex. 5"
                type="number"
                required
                value={jobExperience}
                onChange={(event) => setJobExperience(event.target.value)}
              />
            </div>

            <div className="flex gap-5 justify-end mt-6">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;