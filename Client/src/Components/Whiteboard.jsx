import React, { useCallback } from "react";
import { Tldraw, Editor, createTLStore, defaultShapeUtils } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

const STORAGE_KEY = "codlet-whiteboard";

const Whiteboard = () => {
  const handleMount = useCallback((editor) => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const file = JSON.parse(saved);
        editor.store.loadSnapshot(file);
      } catch (error) {
        console.error("Error loading whiteboard data:", error);
      }
    }

    editor.store.listen(() => {
      const snapshot = editor.store.getSnapshot();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    });
  }, []);

  return (
    <div className="ml-15 w-[95] h-screen">
      <Tldraw
        onMount={handleMount}
        autoFocus
        inferDarkMode
        store={createTLStore({ shapeUtils: defaultShapeUtils })}
      />
    </div>
  );
};

export default Whiteboard;
