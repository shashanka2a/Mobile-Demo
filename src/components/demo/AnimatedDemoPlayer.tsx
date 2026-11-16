'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sparkles,
  MousePointer2,
  CheckCircle2,
  Layers,
  ChevronRight,
  Hand,
  Volume2,
} from 'lucide-react';
import { DeviceFrame } from './DeviceFrame';
import { SimulatedCursor } from './SimulatedCursor';
import { MobileAppContainer } from '../app/MobileAppContainer';
import { DEMO_WORKFLOWS, DemoWorkflow, DemoStep } from './demoScenarios';
import { useAppContext } from '@/context/AppContext';

export function AnimatedDemoPlayer() {
  const { navigate, currentScreen } = useAppContext();

  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isTapping, setIsTapping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const currentWorkflow = DEMO_WORKFLOWS[activeWorkflowIdx];
  const currentStep = currentWorkflow.steps[activeStepIdx];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync screen and cursor when step changes
  useEffect(() => {
    if (isInteractiveMode) return;

    if (currentStep) {
      // Navigate to target screen
      navigate(currentStep.targetScreen);

      // Animate simulated cursor
      if (currentStep.cursorPos) {
        setCursorVisible(true);
        setCursorPos(currentStep.cursorPos);

        if (currentStep.tap) {
          setIsTapping(false);
          const tapTimer = setTimeout(() => {
            setIsTapping(true);
            setTimeout(() => setIsTapping(false), 500);
          }, 600);
          return () => clearTimeout(tapTimer);
        }
      } else {
        setCursorVisible(false);
      }
    }
  }, [activeStepIdx, activeWorkflowIdx, isInteractiveMode, navigate, currentStep]);

  // Auto-play progression loop
  useEffect(() => {
    if (!isPlaying || isInteractiveMode) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const duration = (currentStep?.actionDelayMs || 2500) / playbackSpeed;

    timerRef.current = setTimeout(() => {
      if (activeStepIdx < currentWorkflow.steps.length - 1) {
        setActiveStepIdx((prev) => prev + 1);
      } else {
        // Move to next workflow or loop
        if (activeWorkflowIdx < DEMO_WORKFLOWS.length - 1) {
          setActiveWorkflowIdx((prev) => prev + 1);
          setActiveStepIdx(0);
        } else {
          setActiveWorkflowIdx(0);
          setActiveStepIdx(0);
        }
      }
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, activeStepIdx, activeWorkflowIdx, playbackSpeed, isInteractiveMode, currentStep, currentWorkflow]);

  const handleNextStep = useCallback(() => {
    if (activeStepIdx < currentWorkflow.steps.length - 1) {
      setActiveStepIdx((prev) => prev + 1);
    } else if (activeWorkflowIdx < DEMO_WORKFLOWS.length - 1) {
      setActiveWorkflowIdx((prev) => prev + 1);
      setActiveStepIdx(0);
    }
  }, [activeStepIdx, activeWorkflowIdx, currentWorkflow.steps.length]);

  const handlePrevStep = useCallback(() => {
    if (activeStepIdx > 0) {
      setActiveStepIdx((prev) => prev - 1);
    } else if (activeWorkflowIdx > 0) {
      setActiveWorkflowIdx((prev) => prev - 1);
      setActiveStepIdx(DEMO_WORKFLOWS[activeWorkflowIdx - 1].steps.length - 1);
    }
  }, [activeStepIdx, activeWorkflowIdx]);

  const handleReplay = useCallback(() => {
    setActiveStepIdx(0);
    setIsPlaying(true);
  }, []);

  const selectWorkflow = (idx: number) => {
    setActiveWorkflowIdx(idx);
    setActiveStepIdx(0);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-6xl mx-auto py-4">
      {/* LEFT: Guided Tour Narrator & Workflow Switcher */}
      <div className="flex flex-col gap-5 w-full lg:w-[420px] shrink-0">
        {/* Mode Toggle Banner */}
        <div className="flex items-center justify-between rounded-2xl bg-[#2C2C2E] p-1.5 border border-[#3A3A3C] shadow-lg">
          <button
            type="button"
            onClick={() => setIsInteractiveMode(false)}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-semibold transition-all flex-1 ${
              !isInteractiveMode
                ? 'bg-[#FF6633] text-white shadow-md'
                : 'text-[#98989D] hover:text-white'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>Animated Demo</span>
          </button>
          <button
            type="button"
            onClick={() => setIsInteractiveMode(true)}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-semibold transition-all flex-1 ${
              isInteractiveMode
                ? 'bg-[#30D158] text-black shadow-md font-bold'
                : 'text-[#98989D] hover:text-white'
            }`}
          >
            <Hand className="h-3.5 w-3.5" />
            <span>Interactive Sandbox</span>
          </button>
        </div>

        {/* Current Step Narration Card */}
        <div className="rounded-2xl border border-[#3A3A3C] bg-gradient-to-br from-[#242426] to-[#1C1C1E] p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-[#FF6633]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6633]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#FF6633] ring-1 ring-[#FF6633]/30">
              <Sparkles className="h-3 w-3" />
              {currentStep?.badge || 'Live Simulation'}
            </span>
            <span className="font-mono text-xs text-[#98989D]">
              Step {activeStepIdx + 1} of {currentWorkflow.steps.length}
            </span>
          </div>

          <h3 className="text-base font-bold text-white mb-2 leading-tight">
            {currentStep?.title}
          </h3>

          <p className="text-xs text-[#98989D] leading-relaxed mb-4">
            {currentStep?.narration}
          </p>

          {/* Step Progress Line */}
          <div className="flex gap-1.5 w-full">
            {currentWorkflow.steps.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveStepIdx(i)}
                className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all ${
                  i === activeStepIdx
                    ? 'bg-[#FF6633]'
                    : i < activeStepIdx
                    ? 'bg-[#30D158]'
                    : 'bg-[#3A3A3C]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Workflow Switcher List */}
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#98989D] px-1">
            Choose Workflow Scenario:
          </h4>
          <div className="flex flex-col gap-1.5">
            {DEMO_WORKFLOWS.map((wf, idx) => {
              const isCurrent = idx === activeWorkflowIdx;
              return (
                <button
                  key={wf.id}
                  type="button"
                  onClick={() => selectWorkflow(idx)}
                  className={`flex items-center justify-between rounded-xl p-3 text-left transition-all border ${
                    isCurrent
                      ? 'border-[#FF6633] bg-[#FF6633]/10 text-white shadow'
                      : 'border-[#3A3A3C] bg-[#2C2C2E]/70 text-[#98989D] hover:bg-[#2C2C2E] hover:text-white'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <h5 className={`text-xs font-semibold ${isCurrent ? 'text-white' : 'text-gray-300'}`}>
                      {wf.title}
                    </h5>
                    <p className="text-[11px] text-[#98989D] truncate mt-0.5">
                      {wf.shortDesc}
                    </p>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isCurrent ? 'text-[#FF6633] translate-x-0.5' : 'text-[#555558]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: Mobile Device Mockup with Animated Touch Pointer & Controls */}
      <div className="flex flex-col items-center gap-4 w-full max-w-[390px]">
        {/* Device Container */}
        <div className="relative w-full">
          <DeviceFrame dynamicIslandText={`Step ${activeStepIdx + 1}: ${currentStep?.title || 'Live'}`}>
            <MobileAppContainer />
            {!isInteractiveMode && (
              <SimulatedCursor
                x={cursorPos.x}
                y={cursorPos.y}
                isTapping={isTapping}
                visible={cursorVisible}
              />
            )}
          </DeviceFrame>
        </div>

        {/* Player Controls Bar */}
        <div className="flex items-center justify-between w-full rounded-2xl bg-[#2C2C2E] px-4 py-3 border border-[#3A3A3C] shadow-xl">
          {/* Play / Pause / Replay */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6633] text-white transition-transform hover:scale-105 active:scale-95 shadow"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={handleReplay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3A3A3C] text-white hover:bg-[#48484A] transition-colors"
              title="Replay Workflow"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Prev / Next Step */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3A3A3C] text-white hover:bg-[#48484A] transition-colors"
              title="Previous Step"
            >
              <SkipBack className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3A3A3C] text-white hover:bg-[#48484A] transition-colors"
              title="Next Step"
            >
              <SkipForward className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 rounded-lg bg-[#1C1C1E] p-0.5 border border-[#3A3A3C]">
            {[1, 1.5, 2].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setPlaybackSpeed(spd)}
                className={`rounded px-2 py-1 text-[10px] font-mono font-semibold transition-colors ${
                  playbackSpeed === spd
                    ? 'bg-[#FF6633] text-white'
                    : 'text-[#98989D] hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
