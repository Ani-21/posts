FROM node:18.15.0-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
EXPOSE 5173
CMD ["npm", "run", "dev"]