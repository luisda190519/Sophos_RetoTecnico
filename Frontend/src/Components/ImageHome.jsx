import React, { useState, useEffect } from "react";

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumberWithCommas(number) {
    return number.toLocaleString();
}

function ImageHome() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [randomNumber1, setRandomNumber1] = useState(
        generateRandomNumber(15, 80)
    );
    const [randomNumber2, setRandomNumber2] = useState(
        formatNumberWithCommas(generateRandomNumber(10000, 200000))
    );

    const imagesUrls = [
        "https://gaming-cdn.com/img/products/2675/pcover/2675.jpg?v=1693555738",
        "https://gaming-cdn.com/img/products/6442/pcover/6442.jpg?v=1686753600",
        "https://gaming-cdn.com/img/products/1919/pcover/1919.jpg?v=1645396692",
        "https://gaming-cdn.com/img/products/51/pcover/51.jpg?v=1666175938",
        "https://gaming-cdn.com/img/products/13288/pcover/1920x620/13288.jpg?v=1693513018",
    ];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % imagesUrls.length;
            setRandomNumber1(generateRandomNumber(15, 80));
            setRandomNumber2(
                formatNumberWithCommas(generateRandomNumber(10000, 200000))
            );
            return nextIndex;
        });
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 8000);

        return () => clearInterval(interval);
    }, []);

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
        textAlign: "Start",
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
                        No te pierdas de las ofertas limitadas!
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
                    <i class="bi bi-arrow-right"></i>
                </div>
            </div>
        </div>
    );
}

export default ImageHome;
