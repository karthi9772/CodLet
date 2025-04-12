import React, { useState } from 'react';
import EditorComponent from '../Components/EditorComponent';
import Voice from '../Components/Voice';
import Chat from '../Components/Chat';
import Whiteboard from '../Components/Whiteboard';

const Editorpage = () => {
  const [activeTab, setActiveTab] = useState('CodeEditor');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'CodeEditor':
        return <EditorComponent />;
      case 'Voice':
        return <Voice />;
      case 'Chat':
        return <Chat />;
      case 'Whiteboard':
        return <Whiteboard />;
      default:
        return <CodeEditor />;
    }
  };

  return (
    <div>
      <nav className="flex space-x-4 bg-gray-200 p-4">
        <button onClick={() => setActiveTab('CodeEditor')} className="text-blue-500">
          Code Editor
        </button>
        <button onClick={() => setActiveTab('Voice')} className="text-blue-500">
          Voice
        </button>
        <button onClick={() => setActiveTab('Chat')} className="text-blue-500">
          Chat
        </button>
        <button onClick={() => setActiveTab('Whiteboard')} className="text-blue-500">
          Whiteboard
        </button>
      </nav>
      <div className="p-4">{renderActiveTab()}</div>
    </div>
  );
};

export default Editorpage;