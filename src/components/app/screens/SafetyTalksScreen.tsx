'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  BookOpen,
  Users,
  PenTool,
  X,
  FileText,
} from 'lucide-react';
import { ScreenHeader } from '../ScreenHeader';
import { SignaturePad } from '../SignaturePad';
import { useAppContext } from '@/context/AppContext';
import { SAFETY_TEMPLATES } from '@/lib/mockData';
import { getSafetyTalks, saveSafetyTalk } from '@/lib/storage';
import { formatFriendlyDate, createUuid } from '@/lib/utils';
import { SafetyTalk, SafetyTalkStatus } from '@/types';

export function SafetyTalksScreen() {
  const { dateKey, selectedProject, triggerRefresh } = useAppContext();
  const [activeTab, setActiveTab] = useState<SafetyTalkStatus>('upcoming');
  const [talks, setTalks] = useState<SafetyTalk[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof SAFETY_TEMPLATES)[0] | null>(null);
  const [showReaderModal, setShowReaderModal] = useState(false);
  const [attendees, setAttendees] = useState([
    { name: 'Ricky Smith', company: "Wick'd Environmental", signed: true },
    { name: 'Tyler Johnson', company: "Wick'd Environmental", signed: true },
    { name: 'Carlos Mendez', company: "Wick'd Environmental", signed: true },
    { name: 'Dave Wilson', company: 'Solanco Subcontracting', signed: false },
  ]);
  const [signature, setSignature] = useState('');

  const loadTalks = () => {
    const list = getSafetyTalks();
    setTalks(list);
  };

  useEffect(() => {
    loadTalks();
  }, [dateKey]);

  const filteredTalks = talks.filter((t) => t.status === activeTab);

  const handleStartTalk = (template: (typeof SAFETY_TEMPLATES)[0]) => {
    setSelectedTemplate(template);
    setShowReaderModal(true);
  };

  const toggleAttendee = (idx: number) => {
    setAttendees((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], signed: !next[idx].signed };
      return next;
    });
  };

  const handleCompleteTalk = () => {
    if (!selectedTemplate) return;

    const newTalk: SafetyTalk = {
      id: `talk-${createUuid()}`,
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.name,
      date: dateKey,
      status: 'conducted',
      createdAt: new Date().toISOString(),
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      attendees,
      signatureDataUrl: signature || undefined,
    };

    saveSafetyTalk(newTalk);
    loadTalks();
    triggerRefresh();
    setShowReaderModal(false);
    setActiveTab('conducted');
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Safety Toolbox Talks"
        subtitle="Daily Compliance & Tailgate Briefs"
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Tab Selector */}
        <div className="flex rounded-xl bg-[#2C2C2E] p-1 border border-[#3A3A3C]">
          {(['upcoming', 'missed', 'conducted'] as SafetyTalkStatus[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? tab === 'conducted'
                    ? 'bg-[#30D158] text-black font-bold'
                    : tab === 'missed'
                    ? 'bg-[#FF453A] text-white'
                    : 'bg-[#FF6633] text-white shadow'
                  : 'text-[#98989D] hover:text-white'
              }`}
            >
              {tab === 'conducted' ? 'Done' : tab}
            </button>
          ))}
        </div>

        {/* Start New Safety Talk Action Cards */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#98989D]">
            Available Toolbox Templates
          </h3>
          <div className="flex flex-col gap-2">
            {SAFETY_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                className="flex items-center justify-between rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-left transition-colors hover:border-[#FF6633]"
              >
                <div className="min-w-0 pr-2">
                  <h4 className="text-xs font-semibold text-white">{tpl.name}</h4>
                  <p className="truncate text-[11px] text-[#98989D]">{tpl.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleStartTalk(tpl)}
                  className="flex shrink-0 items-center gap-1 rounded-lg bg-[#FF6633] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#E05526]"
                >
                  <BookOpen className="h-3 w-3" />
                  <span>Start Talk</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* List of Scheduled / Past Talks */}
        <div className="flex flex-col gap-2 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#98989D]">
            {activeTab === 'conducted' ? 'Completed Talks' : `${activeTab} Talks`}
          </h3>

          {filteredTalks.length > 0 ? (
            <div className="flex flex-col gap-2">
              {filteredTalks.map((talk) => (
                <div
                  key={talk.id}
                  className="rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white">{talk.templateName}</h4>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                        talk.status === 'conducted'
                          ? 'bg-[#30D158]/20 text-[#30D158]'
                          : talk.status === 'missed'
                          ? 'bg-[#FF453A]/20 text-[#FF453A]'
                          : 'bg-[#FF6633]/20 text-[#FF6633]'
                      }`}
                    >
                      {talk.status}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#98989D]">
                    Date: {formatFriendlyDate(talk.date)} • {talk.attendees?.length || 4} Attendees
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#3A3A3C] py-6 text-center text-[#98989D]">
              <ShieldCheck className="h-6 w-6 mb-1 text-[#555558]" />
              <p className="text-xs">No {activeTab} talks recorded</p>
            </div>
          )}
        </div>
      </div>

      {/* Toolbox Talk Reader & Attendance Modal */}
      {showReaderModal && selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl border border-[#3A3A3C] bg-[#1C1C1E] p-4 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#3A3A3C] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6633]">
                  Conduct Safety Brief
                </span>
                <h3 className="text-sm font-semibold text-white">{selectedTemplate.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReaderModal(false)}
                className="rounded p-1 text-[#98989D] hover:bg-[#2C2C2E] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Talk Body */}
            <div className="my-3 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] p-3 text-xs text-white leading-relaxed whitespace-pre-line">
              {selectedTemplate.content}
            </div>

            {/* Attendance Roster */}
            <div className="mb-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#98989D]">Crew Attendance</span>
                <span className="text-[11px] text-[#30D158]">
                  {attendees.filter((a) => a.signed).length} / {attendees.length} Present
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {attendees.map((att, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleAttendee(i)}
                    className="flex items-center justify-between rounded-lg border border-[#3A3A3C] bg-[#242426] px-3 py-2 text-left text-xs transition-colors hover:bg-[#2C2C2E]"
                  >
                    <div>
                      <span className="font-medium text-white">{att.name}</span>
                      <p className="text-[10px] text-[#98989D]">{att.company}</p>
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                        att.signed
                          ? 'border-[#30D158] bg-[#30D158] text-black'
                          : 'border-[#555558] bg-transparent'
                      }`}
                    >
                      {att.signed && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Supervisor Signature Pad */}
            <div className="mb-3">
              <span className="mb-1 block text-xs font-semibold text-[#98989D]">
                Supervisor Verification Signature
              </span>
              <SignaturePad
                onSave={(data) => setSignature(data)}
                height={120}
                label="Supervisor Sign-Off"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleCompleteTalk}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#30D158] py-2.5 text-xs font-bold text-black shadow-lg transition-transform active:scale-[0.98]"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Complete & Record Toolbox Talk</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
