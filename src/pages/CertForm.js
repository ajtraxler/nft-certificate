import React from 'react';
import Navigation from './Navigation';
import { Form, Button } from 'react-bootstrap';
import { create } from 'ipfs-http-client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import Certificate from '../artifacts/contracts/Certificate.sol/Certificate.json'

// import * as dotenv from 'dotenv';
// dotenv.config();


const provider = new ethers.providers.Web3Provider(window.ethereum);


///////THIS PART IS FOR IPFS UPLOAD////////
//authorisation now that there are no more public gateways for ipfs... 
const projectID = process.env.PROJECT_ID;
const projectSecret = process.env.PROJECT_SECRET;
const auth = "Basic " + btoa(projectID + ":" + projectSecret);

//create client ipfs
const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization: auth,
  },
});

function CertForm() {
  const [isLoading, updateIsLoading] = useState(false);
  const [fileUrl, updateFileUrl] = useState("");
  const [jsonURL, updateJsonURL] = useState("");
  const [list, updateList] = useState([]);
  const [minted, updateMinted] = useState(false);
  const navigate = useNavigate();


  //submit informarion to deploy smart contract
  async function submitHandler(e) {
    try {
      console.log("in submit handler")
      e.preventDefault();
      let artistValue = document.getElementById('artist').value;
      let titleValue = document.getElementById('title').value;
      let yearValue = document.getElementById('year').value;


      //according to OpenSea metadata standard
      const metaData = {
        name: `${titleValue} by ${artistValue}`,
        description: `This is an NFT certificate for ${titleValue} by ${artistValue}`,
        image: fileUrl,
        attributes: [
          {
            "trait_type": "year",
            "value": yearValue
          },
          {
            "trait_type": "title",
            "value": titleValue
          },
          {
            "trait_type": "artist",
            "value": artistValue
          }
        ]
      }

      const jsonMetaData = JSON.stringify(metaData);
      console.log(jsonMetaData);

      const addedMeta = await client.add(jsonMetaData);
      const mUrl = `https://ipfs.infura.io/ipfs/${addedMeta.path}`;
      updateJsonURL(mUrl);
      console.log("metaUrl", mUrl);


      //deploy contract
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const factory = new ethers.ContractFactory(Certificate.abi, Certificate.bytecode, signer);
      updateIsLoading(true);
      let tx = await factory.deploy(titleValue, titleValue, artistValue, titleValue, mUrl, yearValue);
      let contAdress = tx.address;
      updateIsLoading(false);
      //navigate to mint page
      navigate(`../minting`, { state: { artist: artistValue, title: titleValue, year: yearValue, fileUrl: fileUrl, contAdress: contAdress } });


    }
    catch (err) {
      console.log(err);
    }


  };

  //uploading image ipfs
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      console.log(added, "added");
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
      console.log(url);

    }
    catch (err) {
      console.log("error", err);
    }
  }


  return (
    <div>
      <div>
        <Navigation />
      </div>


      {isLoading ? (<div className="top-to-bottom">
        <img src="https://media1.giphy.com/media/3o7btQ0NH6Kl8CxCfK/giphy.gif?cid=790b7611b9f9d79a9ef149c45f12d0c32ea55a045683af30&rid=giphy.gif&ct=g" alt="Logo" />
      </div>) :
        (< div className="mids">
          <div class="card">
            <h5 class="card-header">Create Your NFT Certificate</h5>
            <br></br>
            <div class="card-body">
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" >
                  <Form.Label>Title:</Form.Label>
                  <Form.Control type="string" id="title"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Artist:</Form.Label>
                  <Form.Control type="string" id="artist"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Upload Image:</Form.Label>
                  <Form.Control type="file" onChange={onChange} id="input"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Year:</Form.Label>
                  <Form.Control type="number" id="year"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Next</Button>
              </Form>
            </div>

          </div>
        </div>)}


    </div >
  )
}

export default CertForm;