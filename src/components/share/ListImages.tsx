import React, { useState } from 'react';
import { data } from '../../data/imagesBackground';
import '../../styles/components/ListImages.css';

interface ImageData {
  id: number;
  imgUrl: string;
}

export const ListImages: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePointClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div className="container-images">
        <ul 
          className="image-list" 
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, 
          }}
        >
          {data.map((item: ImageData, _index: number) => (
            <li key={item.id}>
              <img src={item.imgUrl} alt={`Image ${item.id}`} className='background-image' />
            </li>
          ))}
        </ul>

        <div className="navigation-dots">
          {data.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handlePointClick(index)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
