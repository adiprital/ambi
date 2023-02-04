# Ambi 

<br />

### Description:
This project contains UI that was developed with **React**, global state is maintained with **Redux** and presents products that were created by my sister. <br />
The backend is a web server based on **Node.js Express framework**.
The application is packaged as a **docker** image and run as a docker container on an **AWS** EC2 instance.

### Features:
1. Secured authentication system - based on login session, created by **JWT**, passwords are stored in **MongoDB** after being encrypted with **hash** algotithem.
2. Purchases system - the products data and the execution of the purchase's logic according to the balance of each account is done on MongoDB.

### How to run this code:
#### run locally:
1. In the root directory run 'npm run install' to install both client and server node modules.
2. In the root directory run 'npm run deploy' to start both server and client. The Browser will be opened with the client, and the server will be ready to listen to requests. <br />

#### run with docker container:
1. create an image with the command: docker built -t ${imageName} .
2.  run the container with the command: docker run -it -p 8000:8000 ${imageName}



