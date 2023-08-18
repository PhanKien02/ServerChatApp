FROM node:18-alpine
WORKDIR /chatApp/server

COPY package*.json ./
RUN npm install
RUN  npm install -g @babel/cli @babel/cli
COPY . . 
RUN  npm run build-src

CMD ["npm" ,"run", "build"]