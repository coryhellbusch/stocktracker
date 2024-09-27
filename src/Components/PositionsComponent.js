import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import {getAllPositions} from "./PositionService";
import StockDataComponent from "./StockDataComponent";

const PositionsComponent = ()=> {

    const [positions, setPositions] = useState([])
    const navigate = useNavigate();
    const [totals, setTotals] = useState({
        totalValue: 0,
        totalReturnLoss: 0
    });

    useEffect(() => {
        listPositions();

    }, [])

    function listPositions() {
        getAllPositions().then((response) => {
            const positionsData = response.data;
            setPositions(response.data);

            let totalValue = 0;
            let totalReturnLoss = 0;

            positionsData.forEach(position => {
                const stockData = position.stockData || {close: position.purchase_price};

                totalValue += position.quantity_owned * stockData.close;
                totalReturnLoss += ((stockData.close - position.purchase_price) / stockData.close) * 100;
            });
        }).catch(error => {
            console.error(error)
        })

        setTotals({

        })

    }

    function addNewPosition() {
        navigate('/new-position')
    }

    return(
        <div className='container'>
            <h2 className='text-center'>Position Details</h2>
            <button className='btn btn-primary mb-2' onClick={addNewPosition}>Add Position</button>
            <div>
                <table className='table table-bordered table-striped'>
                    <thead className='border: 2x'>
                    <tr>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Purchase Price</th>
                        <th>Current Price</th>
                        <th>Quantity Owned</th>
                        <th>Value of Shares Owned</th>
                        <th>Return/Loss on Position</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        positions.map(position =>
                            <StockDataComponent
                            key={position.id}
                            position={position}
                            listPositions={listPositions}
                            />
                        )
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}><strong>Totals</strong></td>
                            <td><strong>{totals.totalValue}</strong></td>
                            <td><strong>{totals.totalReturnLoss}%</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>

    )
}

export default PositionsComponent