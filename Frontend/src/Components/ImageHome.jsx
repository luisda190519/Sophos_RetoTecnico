import React, { useState, useEffect } from "react";

function ImageHome() {
    // Define state variables for current image index and random numbers
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const prices = ["44.000", "15.000", "28.900", "19.000", "125.000"];
    const discount = ["22", "44", "17", "80", "8"];
    const [randomNumber1, setRandomNumber1] = useState(discount[0]);
    const [randomNumber2, setRandomNumber2] = useState(prices[0]);

    // Array of image URLs
    const imagesUrls = [
        "image1.jpg",
        "image2.jpg",
        "image3.jpg",
        "image4.jpg",
        "image5.jpg",
    ];

    // Function to switch to the next image and update random numbers
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % imagesUrls.length;
            setRandomNumber1(discount[nextIndex]);
            setRandomNumber2(prices[nextIndex]);
            return nextIndex;
        });
    };

    // Set an interval to automatically switch images every 8 seconds
    useEffect(() => {
        const interval = setInterval(nextImage, 8000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    // Inline styles for various elements
    const containerStyle = {
        position: "relative",
        width: "100%",
        height: "auto",
    };

    const boxContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: "55%",
        left: 0,
        right: 0,
        transform: "translateY(-50%)",
    };

    const boxStyle = {
        width: "400px",
        height: "200px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        textAlign: "start",
        lineHeight: "40px",
    };

    const boxStyle2 = {
        width: "80px",
        height: "80px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        textAlign: "center",
        lineHeight: "80px",
        cursor: "pointer",
    };

    return (
        <div style={containerStyle}>
            <img
                src={imagesUrls[currentImageIndex]}
                alt="Gaming"
                className="img-fluid stretched-img"
                style={{ width: "100%", objectFit: "cover" }}
            />
            <div style={boxContainerStyle}>
                <div style={boxStyle} className="mx-5 ">
                    <p className="fs-1 pt-3 text-center">
                        Don't miss out on limited-time offers!
                    </p>
                    <div className="row fs-2">
                        <div className="col">
                            <div className="bg-danger w-50 text-center rounded py-2 ms-3 mt-2">
                                {randomNumber1}%
                            </div>
                        </div>
                        <div className="col py-2 ms-3 mt-2 fs-3">
                            {randomNumber2} COP
                        </div>
                    </div>
                </div>
                <div
                    style={boxStyle2}
                    className="mx-5 rounded"
                    onClick={nextImage}
                >
                    <i className="bi bi-arrow-right"></i>
                </div>
            </div>
        </div>
    );
}

export default ImageHome;
