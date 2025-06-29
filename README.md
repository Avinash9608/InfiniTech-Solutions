# InfiniTech Solutions - AI-Powered IT Services Showcase

This is a comprehensive, single-page marketing website for a fictional IT company called "InfiniTech Solutions". It is built using a modern tech stack and showcases a variety of services, company strengths, and a portfolio of work.

## Website Overview

The website serves as a digital storefront for InfiniTech Solutions, designed to attract potential clients and generate leads. It features a professional and clean design, is fully responsive, and is structured as a classic one-page landing site with smooth scrolling navigation.

### Key Sections:

*   **Header:** Sticky navigation bar that provides easy access to all sections of the page.
*   **Hero Section:** An engaging introduction with a strong call-to-action (CTA) to grab the visitor's attention.
*   **Services:** Highlights the company's core offerings (Web Design, Digital Marketing, Software Development, Mobile Apps).
*   **Why Choose Us:** Showcases the company's unique selling propositions (USPs) like their experienced team, client-centric approach, and 24/7 support.
*   **Portfolio:** A filterable gallery of past projects to demonstrate expertise.
*   **Testimonials:** A carousel of client reviews to build trust and credibility.
*   **CTA Banner:** A visually distinct section to encourage users to get a quote.
*   **Contact Form:** A form for potential clients to get in touch.
*   **Footer:** Contains quick links, contact information, and social media profiles.

## Core AI Feature: Personalized IT Solution Generation

The standout feature of this application is the AI-powered recommendation tool integrated into the contact form. This feature was added to provide immediate value to potential clients and demonstrate the company's innovative capabilities.

### How it works:

1.  A user visits the website and navigates to the **Contact Form**.
2.  Along with their contact details, they fill in the "Project / Business Details" textarea, describing their needs, challenges, or business goals.
3.  Upon submitting the form, the application triggers a **Genkit AI flow** called `generateItSolutions`.
4.  This server-side flow takes the user's business details as input and sends them to a powerful AI model (like Google's Gemini).
5.  The AI analyzes the input and generates a set of personalized, high-level IT solution recommendations tailored to the user's description.
6.  The recommendations are sent back to the frontend and displayed directly below the contact form, providing the user with instant, valuable insights.

This showcases a practical application of Generative AI to enhance user engagement and lead generation.

## Technology Stack

*   **Framework:** Next.js (with App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** ShadCN UI
*   **Generative AI:** Google AI via Genkit
*   **Forms:** React Hook Form with Zod for validation
