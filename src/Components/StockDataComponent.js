import React, {useState, useEffect} from "react";
import {deletePosition, getStockData} from "./PositionService";
import { useNavigate } from 'react-router-dom'

const StockDataComponent = ({position, listPositions}) => {
    const [stockData, setStockData] = useState([])
    const [error, setError] =useState([])
    const navigate = useNavigate();

    useEffect(() => {
        if (position.ticker) {
            getStockData(position.ticker).then((response) => {
                setStockData(response.data[0]);
                console.log(response.data[0])
            }).catch(error => {
                console.error(error);
            })
        }
    }, [position.ticker]);

    function updatePosition(id) {
        navigate(`/update-position/${id}`)
    }

    function removePosition(id){
        deletePosition(id).then((response) => {
            listPositions();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <tr key={position.id}>
            <td>{position.name}</td>
            <td>{position.ticker}</td>
            <td>{"$"+position.purchase_price}</td>
            <td>{"$"+stockData.close}</td>
            <td>{position.quantity_owned.toFixed(3)}</td>
            <td>{"$"+(position.quantity_owned * stockData.close).toFixed(2)}</td>
            <td>{(((stockData.close - position.purchase_price) / stockData.close)*100).toFixed(2)+"%"}</td>
            <td>
            <div className='btn-group' role='group'>
                <button className='btn btn-info' onClick={() => updatePosition(position.id)}>Update</button>
                <button className='btn btn-danger ms-2' onClick={() => removePosition(position.id)}>Delete</button>
            </div>
            </td>
        </tr>
    )
}

export default StockDataComponent