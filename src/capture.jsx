import { useCallback, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Webcam from 'react-webcam';
import { Link, useLocation } from 'react-router-dom';
import { GrPowerReset } from "react-icons/gr";

// Send POST request to server
const createProfile = async ({users, image}) => {
    await fetch('http://localhost:3000/registration', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({users, image})
    })
}

const Capture = () => {
    const webcamRef = useRef(null);
    const [image, setimage] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const queryClient = useQueryClient();
    const location = useLocation();
    const { users } = location.state || {};

   console.log(users);

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setimage(imageSrc);
    }, [webcamRef]);

    const createMutation = useMutation({
        mutationFn: createProfile,
        onSettled: () => {
            queryClient.invalidateQueries(['profile']);
            setimage(null);
        }
    });

    const handleCreateProfile = () => {
        createMutation.mutate({ users, image });
        setIsRegistered(true);
    }

    const handleReset = () => {
        setimage(null);
    };

    return (
        <div className='w-full h-[100vh] flex items-center justify-center bg-[#e1e5e7] font-poppins'>
            <div className='w-full h-full p-10 flex flex-col items-center gap-[2rem]'>
                {isRegistered ? (
                    <div className='w-[50rem] h-[5rem] bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative' role="alert">
                        <strong className="font-bold">Registration Complete</strong>
                        <span className="block sm:inline"> You have been registered successfully, click scan to proceed.</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <Link to='/scan'>
                                <button className="font-semibold text-teal-700">
                                    Scan
                                </button>
                            </Link>
                        </span>
                    </div>
                ) : ''}
                <div className='w-[45%] h-[90%] flex flex-col items-center bg-teal-600 rounded-[20px] gap-4 p-6 mt-6'>
                    <h1 className='font-poppins text-[25px] font-semibold text-white'>TAKE A PHOTO</h1>
                    {image ?
                        <img src={image} alt="image" /> :
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat='image/jpeg'
                            width='80%'
                            mirrored={true}
                        />
                    }
                    <div className='w-full flex justify-between items-center mt-2 text-white gap-2'>
                        {image && (
                            <button className='flex items-center bg-white p-2 text-black rounded-lg hover:bg-gray-200' onClick={handleReset}>
                                <GrPowerReset />
                            </button>
                        )}
                        <Link to='/register'>
                            <button className="flex items-center bg-white p-2 text-black rounded-lg hover:bg-gray-200">
                                Cancel
                            </button>
                        </Link>
                        {image ?
                            <button className="flex items-center bg-white p-2 text-black rounded-lg hover:bg-gray-200" onClick={handleCreateProfile}>
                                Finish
                            </button> :
                            <button className="flex items-center bg-white p-2 text-black rounded-lg hover:bg-gray-200" type="button" onClick={handleCapture}>
                                Capture
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Capture;