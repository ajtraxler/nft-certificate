import React from 'react';
import Navigation from './Navigation';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { useState } from 'react';


import Certificate from '../artifacts/contracts/Certificate.sol/Certificate.json';


function Minting() {
  const location = useLocation();
  const state = location.state;
  let contractAddress = state.contAdress;
  const [isMinted, updateIsMinted] = useState(false);


  async function mint() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    try {
      const certificateContract = new ethers.Contract(contractAddress, Certificate.abi, signer);
      // const options = { value: ethers.utils.parseEther(data.cost) }
      console.log(certificateContract);
      let tx = await certificateContract.connect(signer).mintNewToken();
      updateIsMinted(true);


    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <div>
      <div>
        <Navigation />
      </div>
      {isMinted ? (<div className="top-to-bottom">
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h1>Your Certificate is now minted</h1>
        <br></br>
        <div className="top-to-bottom">
          <img width="200" margin-left="30px" height="200" src="https://klantcase.nl/wp0316/wp-content/uploads/2020/01/Yes_Check_Circle.svg_.png" />
          <br></br>
          <h3><a href='https://testnets.opensea.io/account'>You can view it on your Opensea profile</a></h3>
        </div>
      </div>) :
        (<div className="mids" >
          <div class="card">
            <img class=" rounded mx-auto d-block img-display" src={state.fileUrl} alt="Art piece" />
            <div class="card-body">
              <h5 class="card-title">{state.title} by {state.artist}</h5>
              <p class="card-text">This NFT certifies that you are the owner of {state.title}.</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Title: {state.title}</li>
              <li class="list-group-item">Artist: {state.artist}</li>
              <li class="list-group-item">Year: {state.year}</li>
            </ul>
            <Button onClick={mint}>Mint Certificate</Button>
          </div>
        </div>
        )
      }



    </div >)
}

export default Minting