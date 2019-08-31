FROM node:12.9.1

COPY . /app
RUN mkdir -p /app/node_modules
WORKDIR /app
EXPOSE 3000
RUN cd /app && npm ci
RUN rm -rf /app/node_modules/instagram-private-api/
COPY node_modules/instagram-private-api/ /app/node_modules/
ENTRYPOINT ["npm", "start","src/app.ts"]