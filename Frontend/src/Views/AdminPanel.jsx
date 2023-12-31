import { AuthContext } from "../Utils/AuthContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../Utils/Request";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TableInfo from "../Components/TableInfo";
import TableEdit from "../Components/TableEdit";
import AddEmpresa from "../Components/AddEmpresa";
import AddGame from "../Components/AddGame";
import AddPlataforma from "../Components/AddPlataforma";
import AddMc from "../Components/AddMc";
import TableRental from "../Components/TableRental";

function AdminPanel() {
    const { userAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [screen, setScreen] = useState(0);
    const [mostCustomers, setMostCustomers] = useState([{}]);
    const [mostRented, setMostRented] = useState([{}]);
    const [rentedByYear, setRentedByYear] = useState([{}]);
    const [rentedPrices, setRentedPrices] = useState([{}]);
    const [rentals, setRentals] = useState([{}]);

    const nav = function (e, place) {
        e.preventDefault();
        return navigate(place);
    };

    const handleCreateGame = function (e, id) {
        e.preventDefault();
        setScreen(id);
    };

    const transformDataForTable = function (data) {
        const rows = [];
        for (const ageRange in data) {
            if (data[ageRange]) {
                const games = data[ageRange];
                for (const game of games) {
                    const row = {
                        AgeRange: ageRange,
                        ...game,
                    };
                    rows.push(row);
                }
            }
        }
        return rows;
    };

    const transformDataForTable2 = function (data, desiredProperties) {
        const rows = [];

        for (const game of data) {
            const row = {};

            for (const prop of desiredProperties) {
                row[prop] = game[prop];
            }

            rows.push(row);
        }

        return rows;
    };

    const handleRequests = async function () {
        let response = await getRequest("/Customer/mostfrequentcustomers");
        setMostCustomers(response);
        response = await getRequest("/games");
        setMostRented(response);
        response = await getRequest("/Rental/leastrentedgamesbyagerange");
        response = transformDataForTable(response);
        setRentedByYear(response);
        response = await getRequest("/Games/titles-and-prices");
        setRentedPrices(response);
        response = await getRequest(
            "/Rental/unfinished"
        );
        console.log(response)
        setRentals(response)
    };

    useEffect(() => {
        if (!userAuthenticated) {
            return navigate("/home");
        }

        handleRequests();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container" style={{ marginTop: "10em" }}>
                {screen === 0 ? (
                    <div>
                        <div>
                            <h3 className="text-white">Crear elementos</h3>
                            <div className="row">
                                <div className="col-3">
                                    <div
                                        className="card mt-3 click"
                                        style={{ width: "100%" }}
                                        onClick={(e) => handleCreateGame(e, 1)}
                                    >
                                        <div className="card-body">
                                            <i class="bi bi-plus-circle"></i>{" "}
                                            Añadir juego
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div
                                        className="card mt-3 click"
                                        style={{ width: "100%" }}
                                        onClick={(e) => handleCreateGame(e, 2)}
                                    >
                                        <div className="card-body">
                                            <i class="bi bi-plus-circle"></i>{" "}
                                            Añadir empresa
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div
                                        className="card mt-3 click"
                                        style={{ width: "100%" }}
                                        onClick={(e) => handleCreateGame(e, 3)}
                                    >
                                        <div className="card-body">
                                            <i class="bi bi-plus-circle"></i>{" "}
                                            Añadir plataforma
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div
                                        className="card mt-3 click"
                                        style={{ width: "100%" }}
                                        onClick={(e) => handleCreateGame(e, 4)}
                                    >
                                        <div className="card-body">
                                            <i class="bi bi-plus-circle"></i>{" "}
                                            Añadir protagonista
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white mt-5">
                                Clientes mas frecuentes
                                <TableInfo
                                    headValues={[
                                        "ID",
                                        "Nombre",
                                        "Apellido",
                                        "Email",
                                        "Numero de rentas",
                                    ]}
                                    data={mostCustomers}
                                ></TableInfo>
                            </h3>
                        </div>
                        <div>
                            <h3 className="text-white mt-5">
                                Juegos mas rentados
                                <TableInfo
                                    headValues={[
                                        "ID",
                                        "Titulo",
                                        "Director",
                                        "Productor",
                                        "Año",
                                    ]}
                                    data={transformDataForTable2(mostRented, [
                                        "gameID",
                                        "title",
                                        "director",
                                        "producer",
                                        "year",
                                    ])}
                                ></TableInfo>
                            </h3>
                        </div>
                        <div>
                            <h3 className="text-white mt-5">
                                juego menos rentado por clientes de 10 años en
                                10 años
                                <TableInfo
                                    headValues={[
                                        "Rango de año",
                                        "ID",
                                        "Titulo",
                                        "Director",
                                        "Productor",
                                        "Año",
                                    ]}
                                    data={transformDataForTable2(rentedByYear, [
                                        "AgeRange",
                                        "gameID",
                                        "title",
                                        "director",
                                        "producer",
                                        "year",
                                    ])}
                                ></TableInfo>
                            </h3>
                        </div>
                        <div>
                            <h3 className="text-white mt-5">
                                Precio de alquileres
                                <TableEdit
                                    headValues={["ID", "Titulo", "Precio"]}
                                    data={transformDataForTable2(mostRented, [
                                        "gameID",
                                        "title",
                                        "price",
                                    ])}
                                ></TableEdit>
                            </h3>
                        </div>
                        <div>
                            <h3 className="text-white mt-5">
                                Renta de clientes sin finalizar
                                <TableRental
                                    data={transformDataForTable2(rentals, [
                                        "customerID",
                                        "gameTitle",
                                        "totalBalance",
                                        "rentalID"
                                    ])}
                                ></TableRental>
                            </h3>
                        </div>
                    </div>
                ) : screen === 1 ? (
                    <div>
                        <AddGame setScreen={setScreen}></AddGame>
                    </div>
                ) : screen === 2 ? (
                    <div>
                        <AddEmpresa setScreen={setScreen}></AddEmpresa>
                    </div>
                ) : screen === 3 ? (
                    <div>
                        {" "}
                        <AddPlataforma setScreen={setScreen}></AddPlataforma>
                    </div>
                ) : (
                    <div>
                        {" "}
                        <AddMc setScreen={setScreen}></AddMc>{" "}
                    </div>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default AdminPanel;
