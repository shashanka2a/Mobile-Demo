'use client';

import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  Save,
  HelpCircle,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { useAppContext } from '@/context/AppContext';
import { getSurvey, saveSurvey } from '@/lib/storage';
import { SurveyEntry, SurveyQuestionEntry, SurveyAnswer } from '@/types';

export function SurveyScreen() {
  const { dateKey, selectedProject, triggerRefresh } = useAppContext();
  const [questions, setQuestions] = useState<SurveyQuestionEntry[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const survey = getSurvey(dateKey);
    if (survey) {
      setQuestions(survey.questions);
    }
  }, [dateKey]);

  const setAnswer = (id: string, answer: SurveyAnswer) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, answer } : q))
    );
    setIsSaved(false);
  };

  const setDescription = (id: string, description: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, description } : q))
    );
    setIsSaved(false);
  };

  const handleSave = () => {
    const entry: SurveyEntry = {
      id: `survey-${dateKey}`,
      project: selectedProject.name,
      projectId: selectedProject.id,
      timestamp: new Date().toISOString(),
      questions,
      syncStatus: 'synced',
    };

    saveSurvey(dateKey, entry);
    triggerRefresh();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Site Survey Checklist"
        subtitle="11 Daily Compliance & Incident Checks"
        rightAction={<SyncStatusBadge status="synced" />}
      />

      <div className="flex flex-col gap-3 p-4">
        {questions.map((q, idx) => {
          const isNonStandard = q.positiveAnswer && q.answer && q.answer !== q.positiveAnswer && q.answer !== 'N/A';
          return (
            <div
              key={q.id}
              className={`rounded-xl border p-3.5 transition-colors text-xs ${
                isNonStandard
                  ? 'border-[#FF9F0A] bg-[#FF9F0A]/10'
                  : 'border-[#3A3A3C] bg-[#2C2C2E]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#FF6633]">
                    {idx + 1}.
                  </span>
                  <p className="font-medium text-white leading-snug">
                    {q.question}
                  </p>
                </div>

                {/* N/A / No / Yes Buttons */}
                <div className="flex shrink-0 gap-1">
                  {(['N/A', 'No', 'Yes'] as SurveyAnswer[]).map((opt) => {
                    const isSelected = q.answer === opt;
                    const isPositive = q.positiveAnswer === opt;
                    const isAlert = isSelected && !isPositive && opt !== 'N/A';

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswer(q.id, opt)}
                        className={`min-w-[36px] rounded-lg px-2 py-1 text-xs font-semibold transition-all ${
                          isSelected
                            ? isAlert
                              ? 'bg-[#FF453A] text-white shadow'
                              : isPositive
                              ? 'bg-[#30D158] text-black font-bold shadow'
                              : 'bg-white text-black font-bold'
                            : 'bg-[#1C1C1E] text-[#98989D] hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional explanation textarea if non-standard or user wants to add note */}
              {isNonStandard && (
                <div className="mt-2.5 flex flex-col gap-1">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#FF9F0A]">
                    <AlertTriangle className="h-3 w-3" />
                    Please provide details for this condition:
                  </span>
                  <input
                    type="text"
                    placeholder="Describe incident, delay, or condition..."
                    value={q.description || ''}
                    onChange={(e) => setDescription(q.id, e.target.value)}
                    className="w-full rounded-lg border border-[#3A3A3C] bg-[#1C1C1E] px-2.5 py-1.5 text-xs text-white focus:border-[#FF6633] focus:outline-none"
                  />
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={handleSave}
          className={`mt-2 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all active:scale-[0.98] ${
            isSaved ? 'bg-[#30D158]' : 'bg-[#FF6633] hover:bg-[#E05526]'
          }`}
        >
          {isSaved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{isSaved ? 'Survey Saved & Synced!' : 'Submit Site Survey'}</span>
        </button>
      </div>
    </div>
  );
}
