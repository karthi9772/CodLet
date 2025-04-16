import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { fetchLanguages, runCode } from "../Api/PistonApi";

const EditorComponent = () => {
  const [code, setCode] = useState("// CodLet is ready to assist you...");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [availableLangs, setAvailableLangs] = useState([]);

  useEffect(() => {
    const loadLanguages = async () => {
      const langs = await fetchLanguages();
      setAvailableLangs(langs);
    };
    loadLanguages();
  }, []);

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case "python":
        return python();
      case "java":
        return java();
      case "javascript":
      case "nodejs":
        return javascript();
      default:
        return javascript();
    }
  };

  const handleRun = async () => {
    const result = await runCode(language, code);
    const { stdout, stderr } = result.run;
    setOutput(stderr ? stderr : stdout);
  };

  return (
    <div className="ml-16 h-screen w-[95%] bg-white flex flex-col p-4 space-y-4">
      <div className="flex items-center gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded"
        >
          {availableLangs.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.language}
            </option>
          ))}
        </select>
        <button
          onClick={handleRun}
          className="bg-violet-500 hover:bg-violet-700 transition text-white px-4 py-2 rounded"
        >
          Run
        </button>
      </div>

      {/* Main editor-output area */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="w-2/3 h-full">
          <div className="h-full border rounded overflow-hidden bg-gray-900">
            <CodeMirror
              value={code}
              theme="dark"
              height="100%"
              extensions={[getLanguageExtension(language)]}
              onChange={(value) => setCode(value)}
            />
          </div>
        </div>
        <div className="w-1/3 bg-gray-900 text-white p-4 rounded overflow-auto shadow-inner">
          <h2 className="font-semibold mb-2">Output:</h2>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default EditorComponent;
