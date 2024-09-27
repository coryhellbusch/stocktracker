import React, { useEffect, useState } from "react";
import { getPosition, addPosition, updatePosition } from "./PositionService";
import { useNavigate, useParams } from "react-router-dom";

const NewPositionComponent = () => {

    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    const [purchase_price, setPurchasePrice] = useState('');
    const [quantity_owned, setQuantityOwned] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    function saveOrUpdatePosition(e) {
        e.preventDefault()

        const position = {name, ticker, purchase_price, quantity_owned}

        if(id){
            updatePosition(position, id).then((response) => {
                console.log(response.data, "and this one");
                navigate('/');
            }).catch(error => {
                console.error(error);
            })
        } else {
            addPosition(position).then((response) => {
                console.log(response.data);
                navigate('/');
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Position</h2>
        } else {
            return <h2 className='text-center'>Add Position</h2>
        }
    }

    useEffect(() => {
        if(id){
            getPosition(id).then((response) => {
                console.log(response.data)
                setName(response.data.name)
                setTicker(response.data.ticker)
                setPurchasePrice(response.data.purchase_price)
                setQuantityOwned(response.data.quantity_owned)
            }).catch(error => {
                console.error(error)
            })
        }
    }, [id])

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form className='d-flex flex-column'>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    required
                                    className='form-control'
                                    placeholder='Stock name'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Ticker</label>
                                <input
                                    type='text'
                                    required
                                    className='form-control'
                                    placeholder='Stock ticker'
                                    name='ticker'
                                    value={ticker}
                                    onChange={(e) => setTicker(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Purchase price</label>
                                <input
                                    type='number'
                                    required
                                    step='0.01'
                                    min='0.01'
                                    className='form-control'
                                    placeholder='Purchase price'
                                    name='purchase_price'
                                    value={purchase_price}
                                    onChange={(e) => setPurchasePrice(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Quantity owned</label>
                                <input
                                    type='number'
                                    required
                                    min='0.001'
                                    step='0.001'
                                    className='form-control'
                                    placeholder='Quantity owned'
                                    name='quantity_owned'
                                    value={quantity_owned}
                                    onChange={(e) => setQuantityOwned(e.target.value)}
                                >
                                </input>
                            </div>
                            <button className='btn btn-success align-self-center text-center' onClick={(e) => saveOrUpdatePosition(e)}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default NewPositionComponent