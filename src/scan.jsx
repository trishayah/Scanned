import { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from "react-webcam";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Scan = () => {
    const webcamRef = useRef(null);
    const [image, setimage] = useState(null);
    const [user, userInfo] = useState(null);
    const [found, setFound] = useState(false);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false); // For loading indicator

    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = io("http://localhost:3001");
        setSocket(newSocket);
        newSocket.on("response", (data) => {
            console.log("Socket connected:", data);
        });
        return () => newSocket.close();
    }, []);

    // Capture image from webcam
    const capturePhoto = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setimage(imageSrc);
    }, [webcamRef]);

    // Auto-capture every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            capturePhoto();
        }, 5000);
        return () => clearInterval(timer);
    }, [capturePhoto]);

    // Send captured image to Flask
    useEffect(() => {
        if (image && !found && socket) {
            setLoading(true); // Set loading to true before sending image
            console.log("Sending image to Flask...");
            socket.emit("send_to_flask", image);
        }
    }, [image, found, socket]);

    // Handle the response from Flask
    // useEffect(() => {
    //     if (socket) {
    //         socket.on("receive_from_flask", (response) => {
    //             console.log("Response received from Flask:", response);
    //             setLoading(false); // Set loading to false when response is received
    //             if (response && response.status === "success") {
    //                 // userInfo(response.user);
    //                  // Mark as found
    //                 const parsedUser = JSON.parse(response.user);
    //                 console.log("Parsed user data:", parsedUser);
    //                 userInfo(parsedUser);
    //                 setFound(true);
    //                 navigate("/profile", { state: { users: parsedUser } }); 
    //             } else {
    //                 alert(response.message || "No profile found, register first.");
    //                 navigate("/register");
    //             }
    //         });

    //         return () => {
    //             socket.off("receive_from_flask");
    //         };
    //     }
    // }, [socket, navigate]);

    // // Redirect to profile page when match is found
    // useEffect(() => {
    //     if (found && user) {
    //         console.log("Navigating to profile...");
    //         navigate("/profile", { state: { data: user } });
    //     }
    // }, [found, user, navigate]);

    useEffect(() => {
        if (socket) {
            socket.on("receive_from_flask", (response) => {
                console.log("Response received from Flask:", response);
                setLoading(false); // Stop loading spinner
    
                if (response && response.status === "success") {
                    // Parse the user data
                    const parsedUser = JSON.parse(response.user);
                    console.log("Parsed user data:", parsedUser);
    
                    // Update user state and found flag
                    userInfo(parsedUser);
                    setFound(true);
    
                    // Navigate to the profile page with parsed user data
                    navigate("/profile", { state: { data: parsedUser } });
                } else {
                    // Handle failure case
                    alert(response.message || "No profile found, register first.");
                    navigate("/register");
                }
            });
    
            // Cleanup to avoid memory leaks
            return () => {
                socket.off("receive_from_flask");
            };
        }
    }, [socket, navigate]);
    

    const videoConstraints = {
        width: 600,
        facingMode: "environment",
    };

    return (
        <div className="w-full h-[100vh] p-10 flex flex-col items-center gap-3 bg-[#ECF8FF]">
            <Webcam
                className="mt-[4rem]"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                width="40%"
                mirrored={true}
            />
            <h1 className="text-[20px] font-poppins">{loading ? "Processing..." : "Scanning..."}</h1>
            {found && user && (
                <div className="profile-info mt-4">
                    <h2 className="text-xl text-white">Profile Found:</h2>
                    <p className="text-white">{JSON.stringify(user)}</p>
                </div>
            )}
        </div>
    );
};

export default Scan;
