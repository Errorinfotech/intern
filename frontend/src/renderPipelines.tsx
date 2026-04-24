import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GradientCard } from '../components/ui/gradient-card';
import PricingSection2, { PricingSwitch } from '../components/ui/pricing-section-1';
import { motion, AnimatePresence } from 'framer-motion';
import './tailwind_built.css';

const PIpelines: Record<string, any> = {
    "frontend-dev": {
        pro: [
            { t: "Month 1: AI-Powered UI Foundations", d: "Mastering Semantic HTML, CSS3, and Responsive Design utilizing Bolt.new and v0.dev for rapid component prototyping." },
            { t: "Month 2: AI-Assisted React Mastery", d: "Deep dive into React.js framework using Cursor AI for code generation, state management, and debugging." },
            { t: "Month 3: Production Deployment & AI Workflows", d: "Industrial project implementation. Automated testing with AI, performance optimization, and CI/CD pipelines." }
        ],
        ent: [
            { t: "Month 4: Complex State & Redux AI", d: "Mastering complex state architectures with Copilot. Implementing robust global state management strategies." },
            { t: "Month 5: Next.js & Full-Stack AI Integration", d: "Server-side rendering, API routes, and full-stack integration using Next.js and AI code generation." },
            { t: "Month 6: Enterprise Architecture & Leadership", d: "Leading frontend teams, writing design docs, and utilizing AI for extreme performance audits and scaling." }
        ],
        prices: { pro: 10999, ent: 15999, originalPro: 14999, originalEnt: 21999 }
    },
    "backend-dev": {
        pro: [
            { t: "Month 1: Node.js & AI Logic Design", d: "Building scalable server logic using Node.js/Express. Utilizing GitHub Copilot for rapid endpoint creation." },
            { t: "Month 2: Database Architecture & GPT Models", d: "Designing MongoDB/PostgreSQL schemas with AI assistance. Integrating ORMs and optimizing queries." },
            { t: "Month 3: Security & AI-Driven Deployments", d: "Implementing JWT auth, rate limiting, and automated CI/CD using AI DevOps tools." }
        ],
        ent: [
            { t: "Month 4: Advanced Microservices with AI", d: "Breaking monoliths into microservices using Docker/Kubernetes and AI architecture mapping." },
            { t: "Month 5: High-Performance Caching & WebSockets", d: "Implementing Redis, real-time WebSockets, and system scaling with AI predictability models." },
            { t: "Month 6: System Design & Enterprise Leadership", d: "End-to-end system design for millions of users. Load testing and AI-driven infrastructure management." }
        ],
        prices: { pro: 10999, ent: 15999, originalPro: 14999, originalEnt: 21999 }
    },
    "data-analysis": {
        pro: [
            { t: "Month 1: Data Foundations & Pandas AI", d: "Mastering Python, SQL, and EDA. Utilizing Pandas AI for rapid data cleaning and descriptive analytics." },
            { t: "Month 2: AI-Enhanced Visualization", d: "Building interactive dashboards in Tableau and PowerBI using AI-generated DAX and charting scripts." },
            { t: "Month 3: Statistical Modeling with GPT", d: "Implementing regression, clustering, and predictive modeling utilizing machine learning algorithms." }
        ],
        ent: [
            { t: "Month 4: Big Data Processing architectures", d: "Mastering PySpark, Hadoop, and distributed computing frameworks with AI-assisted pipeline generation." },
            { t: "Month 5: Advanced Predictive Analytics", d: "Time series forecasting and neural network integrations for complex business intelligence scenarios." },
            { t: "Month 6: Strategic Insights & Executive Reporting", d: "Translating data into actionable business strategies and creating automated AI-driven reporting systems." }
        ],
        prices: { pro: 10999, ent: 15999, originalPro: 14999, originalEnt: 21999 }
    },
    "qa-testing": {
        pro: [
            { t: "Month 1: Manual Testing & AI Test Cases", d: "Mastering fundamental QA concepts. Using ChatGPT to generate edge-cases, core test plans, and bug reports." },
            { t: "Month 2: Automated Testing with AI", d: "Implementing Selenium/Cypress workflows. Using AI to write robust automation scripts natively." },
            { t: "Month 3: API & Performance Testing", d: "Mastering Postman/JMeter with AI assertion generation and automated API health checks." }
        ],
        ent: [
            { t: "Month 4: CI/CD Pipeline Integration", d: "Integrating test suites into Jenkins/GitHub Actions using AI for fail-safe deployments." },
            { t: "Month 5: Security & Penetration Testing Basics", d: "Identifying vulnerabilities using OWASP top 10 and AI-driven automated security scanners." },
            { t: "Month 6: QA Team Leadership & Framework Design", d: "Designing scalable automation frameworks from scratch and managing enterprise QA lifecycles." }
        ],
        prices: { pro: 10999, ent: 15999, originalPro: 14999, originalEnt: 21999 }
    },
    "content-creator": {
        pro: [
            { t: "Month 1: AI Ideation & Narrative Research", d: "Mastering Jasper and ChatGPT-4 for high-converting content frameworks and viral trend research." },
            { t: "Month 2: Multi-Platform Narrative Scaling", d: "Scaling long-form into short-form content using Auto-Sub AI. Mastering AI-assisted SEO workflows." },
            { t: "Month 3: Corporate Brand Voice & AI Monetization", d: "Industrial content strategy for large enterprises. Advanced AI research tools for niche markets." }
        ],
        ent: [
            { t: "Month 4: Growth Hacking & AI Automation", d: "Implementing automated content scheduling and AI-driven community engagement algorithms." },
            { t: "Month 5: Video Scripting & Production AI", d: "Mastering AI tools like Synthesia and Midjourney for automated, high-retention video production." },
            { t: "Month 6: Content Agency Leadership", d: "Managing end-to-end content teams, tracking ROI, and executing massive brand campaigns." }
        ],
        prices: { pro: 10999, ent: 15999, originalPro: 14999, originalEnt: 21999 }
    },
    "bde-operations": {
        pro: [
            { t: "Month 1: AI Lead Acquisition & Strategy", d: "Mastering Apollo.io and LinkedIn Helper for automated lead sourcing and strategic sales funnel design." },
            { t: "Month 2: AI Strategic Outreach & Nurturing", d: "Implementing Lavender AI for email coaching. Mastering AI-driven deal tracking and follow-up sequences." },
            { t: "Month 3: Advanced Closing & Sales AI Leadership", d: "AI-driven proposal generation and contract analysis. Strategic partnership growth workflows." }
        ],
        ent: [
            { t: "Month 4: Global Enterprise B2B Sales", d: "Navigating complex 6-month enterprise deal cycles using AI account mapping and stakeholder alignment." },
            { t: "Month 5: Sales Team Automation Frameworks", d: "Building scalable CRM architectures and automated pipeline forecasting using Einstein AI/HubSpot." },
            { t: "Month 6: Revenue Operations & Deal Desk", d: "Closing high-ticket retainers, advanced negotiation tactics, and sales leadership modeling." }
        ],
        prices: { pro: 10999, ent: 15999, originalPro: 14999, originalEnt: 21999 }
    },
    "digital bussiness management": {
        pro: [
            { t: "Month 1: Digital Strategy & AI Operations", d: "Mastering core business operations using Notion AI and automated workflow mapping." },
            { t: "Month 2: Financial & Marketing AI Intelligence", d: "Utilizing AI for budget forecasting, ROI tracking, and digital marketing metric analysis." },
            { t: "Month 3: Project Management & Automation", d: "Implementing Asana/Jira with automated triggers and AI-driven resource allocation." }
        ],
        ent: [
            { t: "Month 4: Corporate Scaling Strategies", d: "Advanced OKR framework mapping and international market expansion planning with AI research." },
            { t: "Month 5: Organizational Architecture & HR Tech", d: "Structuring departments, optimizing talent acquisition with AI applicant tracking, and culture management." },
            { t: "Month 6: Executive Leadership & Mergers", d: "High-level strategic forecasting, business valuation principles, and preparing companies for acquisitions." }
        ],
        prices: { pro: 10999, ent: 15999, originalPro: 14999, originalEnt: 21999 }
    },
    "product photography-videography": {
        pro: [
            { t: "Month 1: Studio Operations & Setup", d: "Mastering lighting theory, composition, and camera settings for high-end product visualization." },
            { t: "Month 2: AI Post-Production Mastery", d: "Utilizing Adobe Firefly and Lightroom AI for rapid retouching, background generation, and color grading." },
            { t: "Month 3: Commercial Reel Production", d: "Shooting high-retention commercial b-roll and editing with AI-driven speed ramping and VFX in Premiere Pro." }
        ],
        ent: [
            { t: "Month 4: 3D Visualization & AI Integration", d: "Blending pure photography with Midjourney elements and Blender rendering for impossible shots." },
            { t: "Month 5: High-End Fashion & Lifestyle", d: "Directing complex shoots, managing talent, and advanced frequency separation utilizing AI macros." },
            { t: "Month 6: Creative Direction & Agency Scale", d: "Building a global commercial portfolio, landing massive enterprise clients, and leading production teams." }
        ],
        prices: { pro: 10999, ent: 15999, originalPro: 14999, originalEnt: 21999 }
    },
    "graphic-designer-operations": {
        pro: [
            { t: "Month 1: Commercial Design & AI Ideation", d: "Mastering Photoshop & Illustrator. Integrating Midjourney for rapid conceptualization and mood-boarding." },
            { t: "Month 2: UI/UX & Generative Branding", d: "Creating scalable corporate identities and using Figma AI plugins for automated responsive web layouts." },
            { t: "Month 3: Motion Graphics & Performance Ad Design", d: "Designing high-converting ad creatives using automated After Effects workflows and psychological color theory." }
        ],
        ent: [
            { t: "Month 4: 3D & Advanced Typography", d: "Implementing Cinema4D/Blender basics and mastering custom typographic layouts for enterprise brands." },
            { t: "Month 5: Generative AI Packaging & Print", d: "Designing ultra-dense packaging files and large-scale print graphics with perfect bleed/color validation." },
            { t: "Month 6: Art Direction & Portfolio Mastery", d: "Leading creative teams, pitch deck communication, and formulating million-dollar brand identities." }
        ],
        prices: { pro: 10999, ent: 15999, originalPro: 14999, originalEnt: 21999 }
    },
    "ai-ml internship": {
        ent: [
            { t: "Month 1: Python, Math & Data Engineering", d: "Mastering Python for AI, linear algebra, calculus, and advanced data preprocessing pipelines." },
            { t: "Month 2: Machine Learning Architectures", d: "Building scalable regression, classification, and ensemble models from scratch using Scikit-Learn." },
            { t: "Month 3: Deep Learning & Neural Networks", d: "Mastering TensorFlow/PyTorch. Designing CNNs for computer vision and deep feature extraction." },
            { t: "Month 4: Natural Language Processing & LLMs", d: "Fine-tuning transformer models, handling sequence data, and building advanced RAG (Retrieval-Augmented Generation) systems." },
            { t: "Month 5: MLOps & Model Deployment", d: "Containerizing AI models with Docker, managing ML lifecycles with MLFlow, and deploying to AWS/GCP endpoints." },
            { t: "Month 6: Full-Scale Industrial AI Solutions", d: "Building an end-to-end proprietary enterprise AI system, handling concept drift, and securing model architectures." }
        ],
        prices: { pro: 14999, ent: 26999, originalPro: 19999, originalEnt: 27999 }
    }
};

const PipelineApp = ({ pageName }: { pageName: string }) => {
    const data = PIpelines[pageName];
    const isAIML = pageName === "ai-ml internship";
    const [mode, setMode] = useState<3 | 6>(isAIML ? 6 : 3);

    React.useEffect(() => {
        console.log(`%c🚀 PipelineApp [${pageName}] Mounted - SPA Active`, "color: #bb734b; font-weight: bold; font-size: 14px;");
    }, [pageName]);

    if (!data) return <div className="text-white">Data not found for {pageName}</div>;

    const cards = mode === 3 ? data.pro : [...data.pro || [], ...data.ent];

    const handleModeChange = (newMode: number) => {
        setMode(newMode as 3 | 6);
    };

    return (
        <div className="w-full flex justify-center items-center py-10 px-4">
            <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
                {!isAIML && (
                    <div className="mb-20 md:mb-32 relative z-20 w-fit">
                        <PricingSwitch
                            button1="3 Months"
                            button2="6 Months"
                            onSwitch={(val) => handleModeChange(val === "1" ? 6 : 3)}
                            selected={mode === 6 ? "1" : "0"}
                        />
                    </div>
                )}
                <br />
                <br />

                <motion.div
                    layout
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-full max-w-7xl px-4"
                >
                    {cards.map((card: any, idx: number) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="w-full flex justify-center h-full"
                            key={`${pageName}-${idx}`}
                        >
                            <GradientCard title={card.t} description={card.d} />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="w-full mt-24" id="packages">
                    <PricingSection2
                        mode={mode}
                        onModeChange={setMode}
                        customPrices={data.prices}
                        showPro={!isAIML}
                    />
                </div>
            </div>
        </div>
    );
};

// Mount dynamically
document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.react-pipeline-root');
    nodes.forEach(node => {
        const pageName = node.getAttribute('data-page');
        if (pageName) {
            const root = createRoot(node);
            root.render(<PipelineApp pageName={pageName} />);
        }
    });
});
