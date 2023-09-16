import { useState, useEffect, useContext } from "react";
import { getRequest } from "../Utils/Request";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Utils/AuthContext";

function Rentals() {
    const { userAuthenticated } = useContext(AuthContext);
    const [rentals, setRentals] = useState([]);

    const getRentals = async function () {
        if (userAuthenticated) {
            let response = await getRequest(
                "/Rental/customer/" + userAuthenticated.userId
            );

            if (response.length > 0) {
                setRentals(response);
            }
        }
    };

    useEffect(() => {
        getRentals();
    }, [userAuthenticated]);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container" style={{ marginTop: "10em" }}>
                <h3 className="text-white mb-3">Rentas:</h3>
                <table className="table table-dark table-striped fs-5">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Fecha de renta</th>
                            <th>Fecha fin</th>
                            <th>Total a pagar</th>
                            <th>Medio de pago</th>
                            <th>Finalizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals.map((d, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{d.gameTitle}</td>
                                <td>{d.rentalDate}</td>
                                <td>{d.dueDate}</td>
                                <td>{d.totalBalance}</td>
                                <td>{d.payMethod}</td>
                                <td>
                                    {d.finished
                                        ? "Renta finalizada"
                                        : "Renta en progreso"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Rentals;
