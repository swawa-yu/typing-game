import React from 'react';
import TypingGame from './TypingGame';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <TypingGame />
    </div>
  );
};

export default App;