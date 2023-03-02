FROM node:18-alpine
WORKDIR /P2
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000