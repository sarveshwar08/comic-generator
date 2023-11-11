import Form from './Components/Form';
import React, { useRef, useState } from 'react';

function App() {

  const [imageUrls, setImageUrls] = useState([]);

  const currentIndexOfImage = useRef(0);

  return (
    <div className='flex flex-col items-center justify-center md:h-screen md:flex-row bg-black'>
      <div className="md:w-1/3">
        <Form imageUrls={imageUrls} setImageUrls={setImageUrls} currentIndexOfImage={currentIndexOfImage} />
      </div>
      <div className='md:w-2/3 px-4'>
        <div id="generated-images" className='flex flex-wrap justify-center'>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[0] && (<img src={imageUrls[0]} alt='generatedImage' className='object-cover' />)}
          </div>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[1] && (<img src={imageUrls[1]} alt='generatedImage' className='object-cover' />)}
          </div>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[2] && (<img src={imageUrls[2]} alt='generatedImage' className='object-cover' />)}
          </div>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[3] && (<img src={imageUrls[3]} alt='generatedImage' className='object-cover' />)}
          </div>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[4] && (<img src={imageUrls[4]} alt='generatedImage' className='object-cover' />)}
          </div>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[5] && (<img src={imageUrls[5]} alt='generatedImage' className='object-cover' />)}
          </div>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[6] && (<img src={imageUrls[6]} alt='generatedImage' className='object-cover' />)}
          </div>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[7] && (<img src={imageUrls[7]} alt='generatedImage' className='object-cover' />)}
          </div>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[8] && (<img src={imageUrls[8]} alt='generatedImage' className='object-cover' />)}
          </div>
          <div className='border border-gray-500 h-48 w-48 bg-black'>
            {imageUrls && imageUrls[9] && (<img src={imageUrls[9]} alt='generatedImage' className='object-cover' />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
