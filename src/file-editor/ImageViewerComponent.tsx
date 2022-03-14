import React, { useRef, useEffect } from 'react';
import useStore from 'hooks/util/UseStore';
import { ImageModel } from 'store/File';
import { observer } from 'mobx-react';

interface Props {
  id: string;
}

const ImageViewerComponent: React.FC<Props> = (prop: Props) => {
  const { id } = prop;
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
        } else {
          image.style.width = `${image.width}px`;
          image.style.height = `${image.height}px`;
        }
        viewer.appendChild(image);
      };
      image.src = URL.createObjectURL(contents);
    }
  }, [id]);

  return <div className="ImageViewer" key={id} />;
};
export default ImageViewerComponent;
