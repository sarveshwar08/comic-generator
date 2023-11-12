import Form from './Components/Form';
import React, { useRef, useState } from 'react';
import dashtoonLogo from '../src/static/images/dashtoon.png';

const logoSrc = dashtoonLogo;
const logoAlt = 'dashtoon-logo';
const imageContainerStyle = 'border border-gray-500 h-48 w-48 bg-black';

function App() {
  // store the src urls of generated images in an array
  const [imageUrls, setImageUrls] = useState([]);

  // To keep a track of currentIndex of the image to be generated
  // we don't want the image index to change on re-rendering, 
  // hence we have used useRef instead of useState.
  const currentIndexOfImage = useRef(0);

  return (
    <div className='flex flex-col items-center justify-center md:h-screen md:flex-row bg-black'>
      <div className="md:w-1/3">
        <div className='flex space-x-3 items-center justify-center mb-8 md:mb-0 md:top-4 md:left-4 md:absolute'>
          <img src={logoSrc} alt={logoAlt} className='h-14 w-14' />
          <div>
            <p className='text-white text-2xl font-bold'>DASHTOON</p>
            <p className='text-white text-base'>Comic Generator</p>
          </div>
        </div>
        <Form {...{ imageUrls, setImageUrls, currentIndexOfImage }} />
      </div>
      <div className='md:w-2/3 px-4'>
        <p className='text-white my-2 text-center text-lg'>Your comic appears here...</p>
        <div id="generated-images" className='flex flex-wrap justify-center'>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={imageContainerStyle}>
              {imageUrls[index] && <img src={imageUrls[index]} alt='generatedImage' className='object-cover' />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;