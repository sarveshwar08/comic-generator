import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const Form = ({ imageUrls, setImageUrls, currentIndexOfImage }) => {
    const [userInput, setUserInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleChange = (event) => {
        setSelectedIndex(event.target.value - 1);
    };

    async function query(data) {
        try{
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: {
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            return result;
        } catch(error) {
            alert("Error occured in generating image")
        }
    }

    async function handleSubmitClick() {
        // disabling the submit and export buttons
        setIsGenerating(true);

        // fetching image through query
        const result = await query({ "inputs": userInput })
        const newArray = [...imageUrls];
        if (newArray.length > selectedIndex) {
            // in case we are attemping to re-generate any existing image, then replace the url of the present index
            newArray[selectedIndex] = URL.createObjectURL(result);
        } else {
            // push the new generated image url in the array
            newArray.push(URL.createObjectURL(result))
        }

        setImageUrls(newArray);
        setIsGenerating(false);

        if (selectedIndex < 9) {
            // since we are asked to support only 10 images at maximum
            if (selectedIndex === currentIndexOfImage.current) {
                const newIndex = currentIndexOfImage.current += 1;
                setSelectedIndex(newIndex)
            } else {
                setSelectedIndex(currentIndexOfImage.current)
            }

        }
    };

    async function handleDownloadClick() {
        // select the element containing the generated images
        const element = document.getElementById('generated-images'),
        // convert it to canvas for exporting
        canvas = await html2canvas(element),
        data = canvas.toDataURL('image/jpg'),
        link = document.createElement('a');
        link.href = data;
        link.download = 'downloaded-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='mx-auto px-4'>

            <div className='flex space-x-2 items-center'>
                <p className='my-auto text-white text-lg'>Please enter your prompt for image</p>
                <div className='my-auto'>
                    <select value={selectedIndex + 1} onChange={handleChange}>
                        {Array.from({ length: currentIndexOfImage.current + 1 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <input
                type="text"
                onChange={(e) => { setUserInput(e.target.value) }}
                value={userInput}
                className='border p-1 rounded w-full my-2 focus:outline-none'
            />

            <div className='flex space-x-4 items-center my-4 flex-wrap'>
                <button
                    type="button"
                    onClick={handleSubmitClick}
                    className="border rounded bg-green-500 border-green-500 px-6 py-2 cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isGenerating || userInput === ''}
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={handleDownloadClick}
                    className="border rounded bg-slate-950 border-white px-6 py-2 cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={imageUrls.length < 1 || isGenerating}
                >
                    Export
                </button>
            </div>
        </div>
    );
};

export default Form;