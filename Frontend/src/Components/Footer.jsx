import "../Styles/Footer.css";

function Footer() {
    return (
        <div className=" my-5">
            <footer className="text-center text-white pb-5">
                <div className="container">
                    <section className="mt-5">
                        <div className="row text-center d-flex justify-content-center pt-5">
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="#!" class="text-white">
                                        Acerca de nosotros
                                    </a>
                                </h6>
                            </div>

                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="#!" class="text-white">
                                        Ayuda
                                    </a>
                                </h6>
                            </div>

                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="#!" class="text-white">
                                        Filosofia
                                    </a>
                                </h6>
                            </div>

                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="#!" class="text-white">
                                        Historia
                                    </a>
                                </h6>
                            </div>
                        </div>
                    </section>

                    <hr class="my-5" />

                    <section className="mb-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <p>
                                    PlayPalace es una pagina diseñada para que
                                    personas puedan buscar sus juegos favoritos
                                    y alquilarlos por un tiempo, esta empresa
                                    promueve el entretenimiento de nuestros
                                    clientes, y busca facilitarles de medios
                                    para satisfacer su necesidades, los juegos
                                    son en su mayoria originales y les
                                    prometemos la mayor comodidad posible con
                                    nuestra pagina y sistemas de alquiler.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center mt-5">
                        <a href="" className="text-white me-4">
                            <i className="bi bi-facebook"></i>
                        </a>

                        <a href="" className="text-white me-4">
                            <i class="bi bi-twitter"></i>
                        </a>

                        <a href="" className="text-white me-4">
                            <i class="bi bi-google"></i>
                        </a>

                        <a href="" className="text-white me-4">
                            <i class="bi bi-instagram"></i>
                        </a>

                        <a href="" className="text-white me-4">
                            <i class="bi bi-linkedin"></i>
                        </a>

                        <a href="" className="text-white me-4">
                            <i class="bi bi-github"></i>
                        </a>
                    </section>
                </div>

                <div
                    className="text-center p-3 mt-3"
                    id="copy"
                    style={{ backgroundColor: "#1b263b", marginBottom: "-5em" }}
                >
                    © 2023 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">
                        PlayPalace
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
