import React, { useState } from "react";
import {
  FileText,
  MessageCircle,
  Mic,
  LayoutDashboard,
  Bot,
} from "lucide-react"; 

const Editor = () => {
  const [code, setCode] = useState("// CODLET is ready to assist you...");
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      const log = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => log.push(args.join(" "));

      const result = eval(code);
      if (result !== undefined) log.push(result);

      console.log = originalConsoleLog;

      setOutput(log.join("\n"));
    } catch (error) {
      setOutput(error.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-white text-white flex">
      <div className="h-full w-16 bg-gray-900 flex flex-col items-center py-4 space-y-8 shadow-lg rounded-tl-2xl rounded-bl-2xl  m-2">
        <button className="hover:text-violet-500">
          <FileText size={20} />
        </button>
        <button className="hover:text-violet-500">
          <MessageCircle size={20} />
        </button>
        <button className="hover:text-violet-500">
          <Mic size={20} />
        </button>
        <button className="hover:text-violet-500">
          <LayoutDashboard size={20} />
        </button>
        <button className="hover:text-violet-500">
          <Bot size={20} />
        </button>
      </div>
      <div className="flex flex-1">
        <div className="w-full h-full p-1">
          <div className="relative h-full w-full">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-[#1E1E2F] text-zinc-100 text-sm font-mono p-4 pr-24 rounded-lg outline-none resize-none shadow-lg"
              spellCheck={false}
            />
            <button
              onClick={runCode}
              className="absolute bottom-4 right-4 bg-violet-500 text-black font-bold px-4 py-2 rounded hover:bg-violet-700 transition"
            >
              Run
            </button>
          </div>
        </div>
        <div className="w-1/3 h-full p-1">
          <div className="w-full h-full bg-[#2D2D3A] text-zinc-100 p-4 rounded-lg shadow-lg overflow-auto">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
