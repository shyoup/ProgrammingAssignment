import React, { useRef, useEffect } from 'react';
import useStore from 'hooks/util/useStore';
import { ImageModel } from 'store/File';

const ImageViewerComponent: React.FC = () => {
  const { tabStore, fileStore } = useStore();

  useEffect(() => {
    const image = new Image();
    let contents: Blob;
    const cur = fileStore.getFileById(tabStore.getCurTab());
    if (cur instanceof ImageModel) {
      const viewer = document.getElementsByClassName('ImageViewer')[0];
      if (!viewer) return;
      contents = cur.content;
      image.onload = function() {
        if (viewer.clientWidth < image.width || viewer.clientHeight < image.height) {
          const wRatio = viewer.clientWidth / image.width;
          const hRatio = viewer.clientHeight / image.height;
          const ratio = Math.min(wRatio, hRatio);
  
          image.width *= ratio;
          image.height *= ratio;
        }
        viewer.appendChild(image);
      };
      image.src = URL.createObjectURL(contents);
    }
  }, []);

  return <div className="ImageViewer" />;
};
export default ImageViewerComponent;
