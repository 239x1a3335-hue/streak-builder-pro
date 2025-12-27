// EmailJS Integration for CodeChef Lite
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const SERVICE_ID = "service_r7l16u8";
const PUBLIC_KEY = "aSiKP7rbqoKlXXhUC";
const WELCOME_TEMPLATE_ID = "template_pt4yib6";
const SUBMISSION_TEMPLATE_ID = "template_8mextx5";

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

// Send Welcome Email after signup
export const sendWelcomeEmail = async (userName: string, userEmail: string): Promise<boolean> => {
  try {
    const templateParams = {
      name: userName,
      to_email: userEmail,
    };

    await emailjs.send(SERVICE_ID, WELCOME_TEMPLATE_ID, templateParams);
    console.log("Welcome email sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
};

// Send Submission Analysis Email after each problem submission
export interface SubmissionEmailParams {
  name: string;
  email: string;
  problem: string;
  language: string;
  status: string;
  topics: string;
  accuracy: string;
  currentStreak: number;
  bestStreak: number;
  feedback: string;
  recommendation: string;
}

export const sendSubmissionEmail = async (params: SubmissionEmailParams): Promise<boolean> => {
  try {
    const templateParams = {
      name: params.name,
      to_email: params.email,
      problem: params.problem,
      language: params.language,
      status: params.status,
      topics: params.topics,
      accuracy: params.accuracy,
      currentStreak: params.currentStreak.toString(),
      bestStreak: params.bestStreak.toString(),
      feedback: params.feedback,
      recommendation: params.recommendation,
    };

    await emailjs.send(SERVICE_ID, SUBMISSION_TEMPLATE_ID, templateParams);
    console.log("Submission analysis email sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send submission email:", error);
    return false;
  }
};
