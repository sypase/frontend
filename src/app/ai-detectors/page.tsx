'use client';

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
const NextSeo = dynamic(() => import('next-seo').then(mod => mod.NextSeo), { ssr: false });
import Header from "../header";
import ElegantFooter from "../last";
import { ToastContainer } from "react-toastify";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { breadcrumbJsonLd } from '../../../next-seo.config'; // Ensure this path is correct and the file exports breadcrumbJsonLd
import SignupForm from "../signup/SignupForm";

const AiDetectorsPage = () => {
    const [showSignupForm, setShowSignupForm] = useState(false);

    // Ensure useState and other hooks only run on the client-side
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // This ensures that client-side only code runs after the component mounts
        setIsClient(true);
    }, []);

    return (
        <>
            <NextSeo
                title="AI Detectors - Compare the Best Tools | NoAIGPT"
                description="Compare the performance of popular AI detection tools such as ZeroGPT, GPTRadar, and Turnitin. Find the right AI detector for your needs."
                canonical="https://noaigpt.com/ai-detectors"
                openGraph={{
                    title: "AI Detectors - Compare the Best Tools | NoAIGPT",
                    description:
                        "Compare the performance of popular AI detection tools such as ZeroGPT, GPTRadar, and Turnitin. Find the right AI detector for your needs.",
                    url: "https://noaigpt.com/ai-detectors",
                    images: [
                        {
                            url: "https://noaigpt.com/assets/images/ai-detectors.png", // Add relevant OG image for this page
                            width: 1200,
                            height: 630,
                            alt: "AI Detectors Comparison Chart",
                        },
                    ],
                }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content: "AI Detectors, AI Detection Tools, AI-generated Content, ZeroGPT, GPTRadar, Turnitin, NoAIGPT",
                    },
                ]}
            />
            <script type="application/ld+json">
                {JSON.stringify([breadcrumbJsonLd])}
            </script>
            <main className="flex-grow px-4 overflow-y-auto overflow-x-hidden relative z-30 bg-black text-gray-100">
                {/* Dark background for main content */}
                <Header onShowSignupForm={() => setShowSignupForm(true)} />

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-20 pt-10">
                    <h1 className="text-3xl text-center font-bold text-white mb-4">
                        Performance Comparison of AI Detectors
                    </h1>
                    <p className="text-lg text-gray-300 mb-8">
                        This table compares the performance of various AI detectors based on their accuracy, usability, and effectiveness at identifying AI-generated content. Each tool has strengths and weaknesses depending on the model being detected and the nature of the content.
                    </p>

                    <Table className="min-w-full table-auto">
                        <TableCaption>AI Detectors Comparison</TableCaption>
                        <TableHeader>
                            <TableRow className="hover:text-white">
                                <TableHead>AI Detector</TableHead>
                                <TableHead>Accuracy</TableHead>
                                <TableHead>Usability</TableHead>
                                <TableHead>Limitations</TableHead>
                                <TableHead>Best Use Case</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">ZeroGPT</TableCell>
                                <TableCell>98%+</TableCell>
                                <TableCell>User-friendly interface, easy to set up</TableCell>
                                <TableCell>Less effective with newer GPT-4 models</TableCell>
                                <TableCell className="break-words">General detection of GPT-based content</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">GPTRadar</TableCell>
                                <TableCell>64% confidence</TableCell>
                                <TableCell>Decent but not as intuitive as ZeroGPT</TableCell>
                                <TableCell>Lower accuracy with advanced GPT models</TableCell>
                                <TableCell className="break-words">Detection of GPT-3.5 content</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">AI Content Detector (Longshot)</TableCell>
                                <TableCell>Varies by complexity</TableCell>
                                <TableCell>Good for academic content, but not intuitive for all users</TableCell>
                                <TableCell>Inconsistent with creative writing or newer models</TableCell>
                                <TableCell className="break-words">Academic content detection</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Turnitin AI Detection</TableCell>
                                <TableCell>Good for academic plagiarism detection</TableCell>
                                <TableCell>Well-known, easy to integrate in academic environments</TableCell>
                                <TableCell>Struggles with creative and non-formal writing</TableCell>
                                <TableCell className="break-words">Academic settings, plagiarism detection</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Content at Scale AI Detector</TableCell>
                                <TableCell>High for GPT models, less for others</TableCell>
                                <TableCell>Easy to use with clear instructions</TableCell>
                                <TableCell>Less effective for mixed writing styles</TableCell>
                                <TableCell className="break-words">Detecting GPT-based content</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Texta.ai</TableCell>
                                <TableCell>Good for basic GPT-3.5 detection</TableCell>
                                <TableCell>User-friendly interface, intuitive for beginners</TableCell>
                                <TableCell>Not as effective with creative or complex texts</TableCell>
                                <TableCell className="break-words">General AI content detection</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">GPTZero</TableCell>
                                <TableCell>High for detecting GPT-3, GPT-4, and LLaMA</TableCell>
                                <TableCell>Educational and academic focus, with easy-to-use features</TableCell>
                                <TableCell>May struggle with very short texts and highly humanized AI content</TableCell>
                                <TableCell className="break-words">Academic writing, education, and research settings</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">CrossPlag</TableCell>
                                <TableCell>Good for detecting AI-generated content but struggles with humanized AI text</TableCell>
                                <TableCell>Free and easy to use for research, focuses on both AI and humanized AI content</TableCell>
                                <TableCell>Occasional false positives, ineffective with content spinners like Quillbot</TableCell>
                                <TableCell className="break-words">Detecting ChatGPT and humanized AI content in research or academic writing</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Undetectable.ai</TableCell>
                                <TableCell>Transforms AI-generated content to appear human-like, bypassing detection</TableCell>
                                <TableCell>Simple and efficient interface for transforming content</TableCell>
                                <TableCell>Primarily a tool to make content undetectable, not a traditional AI detector</TableCell>
                                <TableCell className="break-words">Making AI-generated text undetectable by detection tools</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <p className="text-lg text-gray-300 mb-8 pt-10">
                        The performance of these AI detectors varies depending on the type of content and AI model being analyzed. While tools like ZeroGPT excel in academic settings, CrossPlag is better for detecting humanized AI content. Undetectable.ai, on the other hand, focuses on making AI-generated text undetectable to other detectors. It is important to choose the right tool based on your specific use case.
                    </p>
                </div>

                <ToastContainer theme="dark" />
                <ElegantFooter />
                {isClient && showSignupForm && (
                    <SignupForm onClose={() => setShowSignupForm(false)} />
                )}
            </main>
        </>
    );
};

export default AiDetectorsPage;
