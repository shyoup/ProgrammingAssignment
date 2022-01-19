import React, { useRef, useEffect } from 'react';
import useStore from 'hooks/util/useStore';

const ImageViewerComponent: React.FC = () => {
  const { tabStore, fileStore } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let canvasWidth = 0;
  let canvasHeight = 0;
  let imageWidth = 0;
  let imageHeight = 0;

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasWidth = canvasRef.current.width;
    canvasHeight = canvasRef.current.height;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const image = new Image();
    const contents = fileStore.getFileById(tabStore.getCurTab())?.content;
    if (contents) image.src = contents;

    image.onload = function() {
      imageWidth = image.width;
      imageHeight = image.height;

      ctx.drawImage(image,
        (canvasWidth - imageWidth)/2,
        (canvasHeight-imageHeight)/2
        // canvasWidth * 2,
        // canvasHeight * 2
      );
    };
  }, []);

  return <canvas ref={canvasRef} className="ImageViewer" />;
};
export default ImageViewerComponent;
