import React, { useState } from "react";

const Editor = () => {
  const [code, setCode] = useState("// Write your code here...");
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
    <div className="h-screen w-screen bg-black text-white flex">
      {/* Code Editor Panel */}
      <div className="w-1/2 h-full p-4">
        <div className="relative h-full w-full">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-[#1E1E2F] text-zinc-100 text-sm font-mono p-4 pr-24 rounded-lg outline-none resize-none shadow-lg"
            spellCheck={false}
          />
          <button
            onClick={runCode}
            className="absolute bottom-4 right-4 bg-violet-500 text-black font-bold px-4 py-2 rounded hover:bg-violet-700-300 transition"
          >
            Run
          </button>
        </div>
      </div>

      {/* Output Panel */}
      <div className="w-1/2 h-full p-4">
        <div className="w-full h-full bg-[#2D2D3A] text-zinc-100 p-4 rounded-lg shadow-lg overflow-auto">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default Editor;
