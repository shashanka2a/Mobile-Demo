'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { Project, SyncStatus } from '@/types';
import { MOCK_PROJECTS } from '@/lib/mockData';
import { getDateKey, startOfLocalDay } from '@/lib/utils';
import { ensureStorageInitialized, resetStorageToDemo } from '@/lib/storage';

interface AppContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  dateKey: string;
  selectedProject: Project;
  setSelectedProject: (project: Project) => void;
  projects: Project[];
  currentUser: { name: string; role: string; email: string };
  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  screenParams: Record<string, any>;
  navigate: (screen: string, params?: Record<string, any>) => void;
  goBack: () => void;
  history: { screen: string; params?: Record<string, any> }[];
  activeTab: 'home' | 'activity' | 'more';
  setActiveTab: (tab: 'home' | 'activity' | 'more') => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedDate, setSelectedDateState] = useState<Date>(() => startOfLocalDay(new Date()));
  const [selectedProject, setSelectedProjectState] = useState<Project>(MOCK_PROJECTS[0]);
  const [projects] = useState<Project[]>(MOCK_PROJECTS);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [isOffline, setIsOffline] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // App navigation state (allows in-mockup screen switching or full routing)
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [screenParams, setScreenParams] = useState<Record<string, any>>({});
  const [history, setHistory] = useState<{ screen: string; params?: Record<string, any> }[]>([
    { screen: 'home' },
  ]);
  const [activeTab, setActiveTabState] = useState<'home' | 'activity' | 'more'>('home');

  const currentUser = useMemo(
    () => ({
      name: 'Ricky Smith',
      role: 'Field Supervisor',
      email: 'ricky.smith@wickdenvironmental.com',
    }),
    []
  );

  useEffect(() => {
    ensureStorageInitialized();
  }, []);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const setSelectedDate = useCallback((date: Date) => {
    setSelectedDateState(startOfLocalDay(date));
  }, []);

  const setSelectedProject = useCallback((project: Project) => {
    setSelectedProjectState(project);
    triggerRefresh();
  }, [triggerRefresh]);

  const dateKey = useMemo(() => getDateKey(selectedDate), [selectedDate]);

  const navigate = useCallback((screen: string, params?: Record<string, any>) => {
    setHistory((prev) => [...prev, { screen, params }]);
    setCurrentScreen(screen);
    setScreenParams(params || {});

    // Sync tab highlighting
    if (screen === 'home') setActiveTabState('home');
    else if (screen === 'activity') setActiveTabState('activity');
    else if (screen === 'more') setActiveTabState('more');
  }, []);

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, prev.length - 1);
      const last = next[next.length - 1];
      setCurrentScreen(last.screen);
      setScreenParams(last.params || {});
      if (last.screen === 'home') setActiveTabState('home');
      else if (last.screen === 'activity') setActiveTabState('activity');
      else if (last.screen === 'more') setActiveTabState('more');
      return next;
    });
  }, []);

  const setActiveTab = useCallback((tab: 'home' | 'activity' | 'more') => {
    setActiveTabState(tab);
    if (tab === 'home') navigate('home');
    else if (tab === 'activity') navigate('activity');
    else if (tab === 'more') navigate('more');
  }, [navigate]);

  const resetAllData = useCallback(() => {
    resetStorageToDemo();
    setSelectedDateState(startOfLocalDay(new Date()));
    setSelectedProjectState(MOCK_PROJECTS[0]);
    setCurrentScreen('home');
    setHistory([{ screen: 'home' }]);
    setActiveTabState('home');
    triggerRefresh();
  }, [triggerRefresh]);

  const value = useMemo(
    () => ({
      selectedDate,
      setSelectedDate,
      dateKey,
      selectedProject,
      setSelectedProject,
      projects,
      currentUser,
      syncStatus,
      setSyncStatus,
      currentScreen,
      setCurrentScreen,
      screenParams,
      navigate,
      goBack,
      history,
      activeTab,
      setActiveTab,
      refreshTrigger,
      triggerRefresh,
      isOffline,
      setIsOffline,
      resetAllData,
    }),
    [
      selectedDate,
      setSelectedDate,
      dateKey,
      selectedProject,
      setSelectedProject,
      projects,
      currentUser,
      syncStatus,
      currentScreen,
      screenParams,
      navigate,
      goBack,
      history,
      activeTab,
      setActiveTab,
      refreshTrigger,
      triggerRefresh,
      isOffline,
      resetAllData,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return ctx;
}
