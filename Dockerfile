FROM node:15.14-alpine AS production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Bundle app source
COPY . .

EXPOSE 3000
RUN yarn build
CMD ["yarn", "start"]