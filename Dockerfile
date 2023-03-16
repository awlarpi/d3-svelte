FROM node:alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies using pnpm
RUN pnpm install

# Copy the rest of your application code into the container
COPY . .

# Build your application inside the container
RUN pnpm build

# Expose the port that your application will run on
EXPOSE 4173

# Finally, specify the command that Docker should run when the container starts
CMD [ "pnpm", "preview", "--host" ]