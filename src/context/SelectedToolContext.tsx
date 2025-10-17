import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Tool } from '../types/tools';

interface SelectedToolContextType {
  selectedTool: Tool | null;
  setSelectedTool: (tool: Tool | null) => void;
}

const SelectedToolContext = createContext<SelectedToolContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'handyman-selected-tool';

// Load selected tool from localStorage
const loadSelectedTool = (): Tool | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Tool;
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load selected tool:', error);
  }
  return null;
};

// Save selected tool to localStorage
const saveSelectedTool = (tool: Tool | null) => {
  try {
    if (tool) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tool));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Failed to save selected tool:', error);
  }
};

export function SelectedToolProvider({ children }: { children: ReactNode }) {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(() => loadSelectedTool());

  // Save to localStorage whenever selected tool changes
  useEffect(() => {
    saveSelectedTool(selectedTool);
  }, [selectedTool]);

  return (
    <SelectedToolContext.Provider
      value={{ selectedTool, setSelectedTool }}
    >
      {children}
    </SelectedToolContext.Provider>
  );
}

export function useSelectedTool() {
  const context = useContext(SelectedToolContext);
  if (!context) {
    throw new Error('useSelectedTool must be used within SelectedToolProvider');
  }
  return context;
}
