function Separator() {
    const spacerStyle = {
        backgroundColor: "#323232",
        width: "1px",
        height: "70px",
    };

    const separatorStyle = {
        backgroundColor: "#101010",
        position: "absolute",
        left: "0",
        right: "0",
    };

    return (
        <div style={separatorStyle}>
            <div className="container">
                <div className="row gx-0 py-3 justify-content-between ms-5">
                    <div className="col-4">
                        <div className="row align-items-center">
                            <div className="col-2 mx-2">
                                <i
                                    className="bi bi-shield-check fs-1"
                                    style={{ color: "#ff4020" }}
                                ></i>
                            </div>
                            <div className="col-8 mt-3">
                                <p className="text-white">
                                    Fiable y seguro
                                    <p className="text-secondary">
                                        Más de 10,000 juegos
                                    </p>
                                </p>
                            </div>
                            <div className="col-1">
                                <div style={spacerStyle}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row align-items-center">
                            <div className="col-2 mx-2">
                                <i
                                    className="bi bi-chat-dots fs-1"
                                    style={{ color: "#ff4020" }}
                                ></i>
                            </div>
                            <div className="col-8 mt-3">
                                <p className="text-white">
                                    Atención al cliente
                                    <p className="text-secondary">
                                        Agente disponible 24/7
                                    </p>
                                </p>
                            </div>
                            <div className="col-1">
                                <div style={spacerStyle}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row align-items-center">
                            <div className="col-2 mx-2">
                                <i
                                    className="bi bi-star fs-1"
                                    style={{ color: "#ff4020" }}
                                ></i>
                            </div>
                            <div className="col-8 mt-3">
                                <p className="text-white">
                                    Puntuación de 4.8 sobre 5
                                    <p className="text-secondary">
                                        585,689 reviews
                                    </p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Separator;
