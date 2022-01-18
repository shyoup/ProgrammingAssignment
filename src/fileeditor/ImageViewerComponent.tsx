import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import useStore from 'hooks/util/useStore';

const ImageViewerComponent: React.FC = () => {
  const { fileStore } = useStore();
  const divEl = useRef<HTMLDivElement>(null);
	return <img className="ImageViewer"></img>;
};
export default ImageViewerComponent;
