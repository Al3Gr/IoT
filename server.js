const express = require('express');
const { ethers } = require("hardhat");
const { abi, contractAddress } = require("./constants"); 
const mqtt = require("mqtt");
require("dotenv").config() 

const app = express();
const port = 5000;
app.use(express.json());

const client = mqtt.connect("mqtt://localhost")
client.on('connect', function(){
    console.log("Connected to MQTT broker")

    client.subscribe('temperature', function(err) {
        if (!err) {
            console.log('Subscribed to topic')
        }
    })
})

const provider = new ethers.JsonRpcProvider(process.env.GANACHE_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specified HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
    next();
});


client.on('message', async (topic, message) => {
    const json = JSON.parse(message)
    console.log('Received message: ', json)
    const txResponse = await contract.store(json.timestamp, json.value)
    await txResponse.wait(1)
    console.log("Temperature published");
})

app.get('/retrieve', async (req, res) => {
    console.log("retrieve");
    let jsonResponse = {}
    const values = await contract.retrieve()
    values.forEach(element => {
        jsonResponse[element[0]] = element[1]
    });
    
    res.json(jsonResponse)
})


app.listen(port, "0.0.0.0", () => {
    console.log(`Server is listening on port ${port}`);
  });