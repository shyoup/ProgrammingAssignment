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

    console.log(canvasWidth, canvasHeight);

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const image = new Image();
    const contents = fileStore.getFileById(tabStore.getCurTab())?.content;
    if (contents) image.src = contents;

    image.onload = function() {
      imageWidth = image.width;
      imageHeight = image.height;
      
      const wRatio = canvasWidth / imageWidth;
      const hRatio = canvasHeight / imageHeight;
      const ratio = Math.max( wRatio, hRatio);

      image.width *= ratio;
      image.height *= ratio;

      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);  
    };
  }, []);

  return <canvas ref={canvasRef} className="ImageViewer" />;
};
export default ImageViewerComponent;
