module.exports.contractAddress = "0xf21b75ab62Ea6AE1C05EEEc63925AD9C4C545F72"
module.exports.abi = [
    {
      "inputs": [],
      "name": "retrieve",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "timestamp",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "value",
              "type": "string"
            }
          ],
          "internalType": "struct TemperatureStorage.Sample[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_timestamp",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_value",
          "type": "string"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]