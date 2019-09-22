FROM node:10


# Create work directory
WORKDIR /usr/src/app

# Install runtime dependencies
RUN npm install yarn -g

# Copy app source to work directory
COPY . /usr/src/app

# Install app dependencies

# RUN sudo npm install -g grpc --allow-root --unsafe
RUN yarn cache clean
RUN yarn setup

# RUN cd dist
# start the dist
CMD yarn start
