import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import useStore from 'hooks/util/useStore';
import { FileModel } from 'store/File';

const MonacoEditorComponent: React.FC = () => {
  const { fileStore, tabStore } = useStore();
  const divEl = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const curFile = fileStore.getFileById(tabStore.getCurTab());
		if (curFile instanceof FileModel) {
			const tmpmodel = curFile.model;
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
		}
	}, []);
	return <div className="Editor" ref={divEl}></div>;
};
export default MonacoEditorComponent;
