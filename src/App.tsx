import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FrameDataTable } from './components/FrameDataTable';
import { PreloadWasm } from './PreloadWasm';
import { ThemeProvider } from './components/theme-provider';
import { GameProvider } from './contexts/GameContext';
import { CommandProvider } from './contexts/CommandContext';
import { Navbar } from './components/Navbar';
import { GameSelectionPage } from './components/GameSelectionPage';
import { CharacterSelectionPage } from './components/CharacterSelectionPage';
import { CommandPalette } from './components/CommandPalette';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <GameProvider>
          <CommandProvider>
            <div className="min-h-screen flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
              <PreloadWasm />
              <Navbar />
              <CommandPaletteContainer />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Navigate to="/games" replace />} />
                  <Route path="/games" element={<GameSelectionPage />} />
                  <Route path="/:gameId" element={<CharacterSelectionPage />} />
                  <Route path="/:gameId/:characterName" element={<FrameDataTable />} />
                </Routes>
              </main>
            </div>
          </CommandProvider>
        </GameProvider>
      </Router>
    </ThemeProvider>
  );
}

// Separate component to use the context hook
function CommandPaletteContainer() {
  // The CommandPalette will access the state from context directly
  return <CommandPalette />;
}

export default App; 