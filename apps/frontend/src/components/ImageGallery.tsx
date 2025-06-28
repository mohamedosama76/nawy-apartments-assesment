import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) {
    return (
      <div className="relative bg-gray-200 dark:bg-gray-700 h-96 flex items-center justify-center">
        <span className="text-gray-400 dark:text-gray-500 text-2xl">No Images Available</span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative bg-gray-200 dark:bg-gray-700 h-96">
        <Image
          src={images[currentImageIndex]}
          alt={`${alt} - Image ${currentImageIndex + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={handlePrevImage}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              &gt;
            </button>
          </div>
        )}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex overflow-x-auto p-2 gap-2 bg-gray-100 dark:bg-gray-700">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-20 h-20 flex-shrink-0 cursor-pointer ${
                index === currentImageIndex ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="80px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
