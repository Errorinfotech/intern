"use client";
import { TimelineContent } from "./timeline-animation";
import { VerticalCutReveal } from "./vertical-cut-reveal";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import NumberFlow from "@number-flow/react";
import { CheckCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import React, { useId, useRef, useState } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PricingSwitch = ({
  button1,
  button2,
  onSwitch,
  className,
  layoutId,
  selected = "0",
}: {
  button1: string;
  button2: string;
  onSwitch: (value: string) => void;
  className?: string;
  layoutId?: string;
  selected?: string;
}) => {
  const uniqueId = useId();
  const switchLayoutId = layoutId || `switch-${uniqueId}`;

  const handleSwitch = (value: string) => {
    onSwitch(value);
  };

  return (
    <div
      className={cn(
        "relative z-10 w-full flex rounded-full bg-[#1a1410] border border-[rgba(187,115,75,0.3)] p-1",
        className,
      )}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          console.log('Pricing Pro Clicked');
          e.preventDefault();
          e.stopPropagation();
          handleSwitch("0");
        }}
        className={cn(
          "relative z-10 w-full sm:h-14 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer text-center flex items-center justify-center",
          selected === "0"
            ? "text-white"
            : "text-gray-400 hover:text-white",
        )}
      >
        {selected === "0" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute top-0 left-0 sm:h-14 h-10 w-full rounded-full border-2 border-[#bb734b] shadow-[0_0_20px_rgba(187,115,75,0.4)] bg-[#bb734b]"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative">{button1}</span>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          console.log('Pricing Ent Clicked');
          e.preventDefault();
          e.stopPropagation();
          handleSwitch("1");
        }}
        className={cn(
          "relative z-10 w-full sm:h-14 h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer text-center flex items-center justify-center",
          selected === "1"
            ? "text-white"
            : "text-gray-400 hover:text-white",
        )}
      >
        {selected === "1" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute top-0 left-0 sm:h-14 h-10 w-full rounded-full border-2 border-[#bb734b] shadow-[0_0_20px_rgba(187,115,75,0.4)] bg-[#bb734b]"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative flex justify-center items-center gap-2">
          {button2}
        </span>
      </div>
    </div>
  );
};

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.3, duration: 0.5 },
  }),
  hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};
const timelineVaraints = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
  hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};

export default function PricingSection2({
  mode = 3,
  onModeChange,
  customPrices,
  showPro = true
}: {
  mode?: 3 | 6,
  onModeChange?: (mode: 3 | 6) => void,
  customPrices?: { pro: number, ent: number, originalPro: number, originalEnt: number },
  showPro?: boolean
}) {
  const isEnterprise = mode === 6;
  const pricingRef = useRef<HTMLDivElement>(null);

  const toggleMode = (value: string) => {
    const newMode = Number.parseInt(value) === 1 ? 6 : 3;
    if (newMode !== mode) {
      onModeChange?.(newMode);
    }
  };

  const calculatePrice = () => {
    if (customPrices) {
      return isEnterprise ? customPrices.ent : customPrices.pro;
    }
    return isEnterprise ? 15999 : 10999;
  };

  const calculateOriginalPrice = () => {
    if (customPrices) {
      return isEnterprise ? customPrices.originalEnt : customPrices.originalPro;
    }
    return isEnterprise ? 21999 : 14999;
  };

  const currentPrice = calculatePrice();
  const originalPrice = calculateOriginalPrice();

  const features = isEnterprise ? [
    "6 Month Professional Internship with AI",
    "4+ Live AI Projects",
    "Weekly Mentorship",
    "Real client exposure",
    "AI Portfolio development",
    "Recommendation Letter",
  ] : [
    "3 Month Internship with AI",
    "Practical AI tool training",
    "1 Live AI mini project",
    "2 Mentorship sessions",
    "Internship Completion Certificate + internship letter",
    "AI Professional Communication Skills",
  ];

  return (
    <div className="px-4 pt-10 pb-20 w-full relative" ref={pricingRef}>
      <div className="py-16 px-4 relative rounded-3xl overflow-hidden border border-[#bb734b]/20 bg-[#0d0a08]/80 backdrop-blur-md">
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 90%, transparent 40%, rgba(187,115,75,0.4) 100%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <TimelineContent
            as="div"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="flex items-center justify-center mb-4"
          >
            <Zap className="h-5 w-5 text-[#bb734b] fill-[#bb734b] mr-2" />
            <span className="text-[#bb734b] font-medium tracking-wide">Investment In Your Career</span>
          </TimelineContent>

          <h1 className="md:text-5xl sm:text-4xl text-3xl font-semibold text-white mb-4 leading-relaxed pb-8">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                delay: 0.4,
              }}
            >
              Choose Your Package
            </VerticalCutReveal>
          </h1>

          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-xl text-gray-400"
          >
            Learn, develop, and connect. Future-proof your career today.
          </TimelineContent>
        </div>
      </div>

      {/* Product Features */}
      <div className="px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:gap-12 gap-8 items-center">
            <div>
              <TimelineContent
                as="h3"
                animationNum={2}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="text-3xl font-medium text-white mb-6"
              >
                What's included
              </TimelineContent>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <TimelineContent
                    key={index}
                    as="div"
                    animationNum={index}
                    timelineRef={pricingRef}
                    customVariants={timelineVaraints}
                    className="flex items-center"
                  >
                    <div className="w-6 h-6 bg-[#bb734b]/20 border border-[#bb734b] shadow-[0_0_10px_rgba(187,115,75,0.2)] rounded-full flex items-center justify-center mr-4">
                      <CheckCheck className="h-3 w-3 text-[#bb734b]" />
                    </div>
                    <span className="text-gray-300 tracking-wide">{feature}</span>
                  </TimelineContent>
                ))}
              </div>
            </div>

            <div className="space-y-8 p-8 rounded-3xl bg-[#130f0c] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#bb734b]/10 blur-[80px] rounded-full point-events-none" />

              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="relative z-10"
              >
                <h4 className="font-semibold text-white mb-2 text-lg">
                  Package Type
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  Select between Pro or Enterprise Track
                </p>
                {showPro ? (
                  <PricingSwitch
                    button1="Pro (3 Months)"
                    button2="Enterprise (6 Months)"
                    onSwitch={toggleMode}
                    selected={isEnterprise ? "1" : "0"}
                    className="grid grid-cols-2 w-full"
                  />
                ) : (
                  <div className="relative z-10 w-full flex rounded-full bg-[#1a1410] border border-[rgba(187,115,75,0.3)] p-1">
                    <div className="relative z-10 w-full sm:h-14 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium text-white text-center flex items-center justify-center border-2 border-[#bb734b] shadow-[0_0_20px_rgba(187,115,75,0.4)] bg-[#bb734b]">
                      Enterprise (6 Months)
                    </div>
                  </div>
                )}
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="text-center grid grid-cols-1 sm:grid-cols-2 items-center gap-6 px-2 mt-8 relative z-10"
              >
                <div className="flex flex-col items-start justify-center">
                  <div className="flex items-center">
                    <span className="text-5xl font-bold text-white tracking-tight flex items-center">
                      <span className="text-2xl mr-1 text-[#bb734b]">₹</span>
                      <NumberFlow
                        value={currentPrice}
                        className="text-5xl font-bold"
                      />
                    </span>
                  </div>
                  <span className="text-md text-gray-500 line-through mt-1 flex items-center">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                </div>

                <TimelineContent
                  as="div"
                  role="button"
                  tabIndex={0}
                  animationNum={6}
                  timelineRef={pricingRef}
                  customVariants={revealVariants}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const experienceSelect = document.getElementById('experience') as HTMLSelectElement;
                    if (experienceSelect) {
                      experienceSelect.value = isEnterprise ? "6" : "3";
                      experienceSelect.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    const applySection = document.getElementById('apply');
                    if (applySection) {
                      applySection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-white text-lg font-semibold h-14 w-full rounded-xl border-2 border-[#bb734b] shadow-[0_0_30px_rgba(187,115,75,0.4)] bg-[#bb734b] hover:bg-[#d6956f] transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  Apply Now
                </TimelineContent>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
