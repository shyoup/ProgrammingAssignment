import React, { ReactNode, useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import useStore from 'hooks/util/useStore';

const MonacoEditorComponent: React.FC = () => {
  const { tabStore, fileStore } = useStore();
  const divEl = useRef<HTMLDivElement>(null);
	useEffect(() => {
    const tmpmodel = monaco.editor.createModel('console.log("hi")', 'javascript');
		if (divEl.current) {
			fileStore.setEditor(monaco.editor.create(divEl.current, {
				model: tmpmodel,
        minimap: {
          enabled: false
        }
			}));
      monaco.editor.setTheme('vs-dark');
		}
		return () => {
			fileStore.dispose();
		};
	}, []);
	return <div className="Editor" ref={divEl}></div>;
};
export default MonacoEditorComponent;
