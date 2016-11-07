FROM node:6.9.1

# Create app directory
RUN mkdir -p /home/src
WORKDIR /home/src

# Install app dependencies
COPY package.json /home/src/
RUN npm install

# Bundle app source
COPY . /home/src/

# app setting
ENV NODE_ENV="production"
EXPOSE 5002

CMD ["node","server.js"]