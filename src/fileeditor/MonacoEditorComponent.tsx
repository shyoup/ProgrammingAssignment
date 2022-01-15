import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import useStore from 'hooks/util/useStore';

const MonacoEditorComponent: React.FC = () => {
  const { fileStore } = useStore();
  const divEl = useRef<HTMLDivElement>(null);
	useEffect(() => {
    const tmpmodel = monaco.editor.createModel('', 'javascript');
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
