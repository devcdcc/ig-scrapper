FROM node:12.9.1

COPY . /app
RUN mkdir -p /app/node_modules
COPY node_modules/instagram-private-api/ /app/node_modules/
WORKDIR /app
RUN cd /app && npm install
ENTRYPOINT ["npm", "start","src/app.ts"]