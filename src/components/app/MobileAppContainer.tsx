'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { HomeScreen } from './screens/HomeScreen';
import { NotesScreen } from './screens/NotesScreen';
import { ChemicalsScreen } from './screens/ChemicalsScreen';
import { MetricsScreen } from './screens/MetricsScreen';
import { SurveyScreen } from './screens/SurveyScreen';
import { ChecklistScreen } from './screens/ChecklistScreen';
import { AttachmentsScreen } from './screens/AttachmentsScreen';
import { IncidentsScreen } from './screens/IncidentsScreen';
import { JobSafetyScreen } from './screens/JobSafetyScreen';
import { SafetyTalksScreen } from './screens/SafetyTalksScreen';
import { ObservationsScreen } from './screens/ObservationsScreen';
import { ProjectMapScreen } from './screens/ProjectMapScreen';
import { ReportPreviewScreen } from './screens/ReportPreviewScreen';
import { SignReportScreen } from './screens/SignReportScreen';
import { ActivityScreen } from './screens/ActivityScreen';
import { MoreScreen } from './screens/MoreScreen';
import { ProjectInfoScreen } from './screens/ProjectInfoScreen';
import { BottomNav } from './BottomNav';

interface MobileAppContainerProps {
  className?: string;
  hideNav?: boolean;
}

export function MobileAppContainer({ className = '', hideNav = false }: MobileAppContainerProps) {
  const { currentScreen } = useAppContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'notes':
        return <NotesScreen />;
      case 'chemicals':
        return <ChemicalsScreen />;
      case 'metrics':
        return <MetricsScreen />;
      case 'survey':
        return <SurveyScreen />;
      case 'checklist':
        return <ChecklistScreen />;
      case 'attachments':
        return <AttachmentsScreen />;
      case 'incidents':
        return <IncidentsScreen />;
      case 'job-safety':
        return <JobSafetyScreen />;
      case 'safety':
        return <SafetyTalksScreen />;
      case 'observations':
        return <ObservationsScreen />;
      case 'map':
        return <ProjectMapScreen />;
      case 'report-preview':
        return <ReportPreviewScreen />;
      case 'report-sign':
        return <SignReportScreen />;
      case 'activity':
        return <ActivityScreen />;
      case 'more':
        return <MoreScreen />;
      case 'project-info':
        return <ProjectInfoScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const showBottomNav = !hideNav && (currentScreen === 'home' || currentScreen === 'activity' || currentScreen === 'more');

  return (
    <div className={`flex h-full w-full flex-col bg-[#1C1C1E] text-white ${className}`}>
      <main className="flex-1 overflow-y-auto no-scrollbar pb-4">
        {renderScreen()}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
