import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';


const Coin = () => {

  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const {currency} = useContext(CoinContext);

  const fetchCoinData = async ()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        'x-cg-pro-api-key': 'CG-91Na3gF37jLkMimFB9B4FtwP'},
    };
    const coinId = "bitcoin"; // Example coin ID
const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setCoinData(data))
      .catch(err => console.error("Error fetching data:"));
  
  }

  useEffect(()=>{
    fetchCoinData(coinId);
  },[currency])

  if(coinData){
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData?.image?.large} alt="" />
          <p><b>{coinData.name} ({coinData?.symbol?.toUpperCase()})</b></p>
        </div>
      </div>
    )
  }else{
    return (
      <div className='Spinner'>
        <div className="spin"></div>
        <h2>Coin : {coinId}</h2>
      </div>
    )
  }
 
}

export default  Coin