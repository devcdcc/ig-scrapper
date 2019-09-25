FROM node:12.9.1

COPY . /app
RUN mkdir -p /app/node_modules
WORKDIR /app
EXPOSE 3000
RUN cd /app && npm ci
ENTRYPOINT ["npm", "start","src/app.ts"]