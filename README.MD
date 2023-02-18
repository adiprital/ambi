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

#### run locally with docker container: (building the images or pull them for docker hub)
##### for building the images:
In the root directory run 'docker-compose -f docker-compose-development.yml up' for building the images and run the services in containers.<br />
##### pull images from docker hub:
In the root directory run 'docker-compose -f docker-compose-production.yml up' for pulling the images from docker hub and run the services in containers.<br />



