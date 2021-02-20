# Attendance App for PESU IO
Welcome to the Attendance app for the PESU IO Course "Introduction to Blockchain and Decentralized Applications"! Here are some instructions on how to run your DApp.

## Open Ganache
If using GUI, open the application.  
If using cli, use the command `ganache-cli`.  
Create a new workspace or use an old one.

## Compile the constract
`truffle compile`

## Test the contract
`truffle test`

## Migrate the contract
`truffle migrate`  
If you want to reset the past data on the blockchain, use `truffle migrate --reset`

## Check the ports
Make sure the ports in ganache, metamask and `truffle-config.js`(Windows) / `truffle.js`(Linux/Mac) match

## Run the development server
`npm run dev`

## Login to metamask and Enjoy!
