import React, { useState } from 'react';
import EditorComponent from '../Components/EditorComponent';
import Voice from '../Components/Voice';
import Chat from '../Components/Chat';
import Whiteboard from '../Components/Whiteboard';
import Copilot from '../Components/Copilot';

import {
  FileText,
  MessageCircle,
  Mic,
  LayoutDashboard,
  Bot 
} from "lucide-react"; 


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
      case 'Copilot':
        return <Copilot />;
      default:
        return <CodeEditor />;
    }
  };

  return (
    <div>
      <div className="h-full w-15 bg-gray-900 flex flex-col absolute items-center py-4 space-y-8 shadow-lg rounded-tl-2xl rounded-bl-2xl  m-2">
        <button className="hover:text-violet-500 text-white" onClick={() => setActiveTab('CodeEditor')} >
          <FileText size={20} />
        </button>
        <button className="hover:text-violet-500 text-white" onClick={() => setActiveTab('Chat')}>
          <MessageCircle size={20} />
        </button>
        <button className="hover:text-violet-500 text-white" onClick={() => setActiveTab('Voice')}>
          <Mic size={20} />
        </button>
        <button className="hover:text-violet-500 text-white" onClick={() => setActiveTab('Whiteboard')}>
          <LayoutDashboard size={20} />
        </button>
        <button className="hover:text-violet-500 text-white" onClick={() => setActiveTab('Copilot')}>
          <Bot size={20} />
        </button>
      </div>
      <div className="p-4">{renderActiveTab()}</div>
    </div>
  );

};

export default Editorpage;
