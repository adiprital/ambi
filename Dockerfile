FROM  node:lts-alpine 

WORKDIR /app
ENV NODE_ENV=prod

COPY package.json ./

COPY ambi/package.json ambi/
RUN npm run install-client --force --omit=dev

COPY backend/package.json backend/
RUN npm i mongoose
RUN npm run install-backend --omit=dev

COPY ambi/ ambi/
RUN npm run build --prefix ambi

COPY backend/ backend/

USER node

CMD [ "npm", "start", "--prefix", "backend" ]

EXPOSE 8000