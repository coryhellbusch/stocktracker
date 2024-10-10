import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import {getAllPositions, getStockData} from "./PositionService";
import StockDataComponent from "./StockDataComponent";

const PositionsComponent = ()=> {

    const [positions, setPositions] = useState([])
    const [positionsWithStockData, setPositionsWithStockData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listPositions();

    }, [])

    async function listPositions() {
        try {
            const response = await getAllPositions();
            const positionsData = response.data;

            const updatedPositions = await Promise.all(positionsData.map(async (position) => {
                const stockResponse = await getStockData(position.ticker);
                const stockData = stockResponse.data[0];
                return {...position, stockData};
            }));

            setPositionsWithStockData(updatedPositions);
        } catch (error) {
            console.error(error);
        }
    }


    function addNewPosition() {
        navigate('/new-position')
    }

    const totalValueOfShares = positionsWithStockData.reduce((acc, position) => {
        const currentPrice = position.stockData?.close || 0;
        return acc + (position.quantity_owned * currentPrice);
    }, 0).toFixed(2);

    const valueOfSharesAtPurchase = positionsWithStockData.reduce((acc, position) => {
        const purchasePrice = position.purchase_price || 0;
        const quantityOwned = position.quantity_owned || 0;
        const valueAtPurchase = purchasePrice * quantityOwned;
        return acc + valueAtPurchase;
    }, 0).toFixed(2);

    const totalReturnLoss = (((totalValueOfShares - valueOfSharesAtPurchase) / valueOfSharesAtPurchase) * 100).toFixed(2);


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
                        positionsWithStockData.map(position =>
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
                            <td><strong>{"$" + totalValueOfShares}</strong></td>
                            <td><strong>{totalReturnLoss + "%"}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>

    )
}

export default PositionsComponent