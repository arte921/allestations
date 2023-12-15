FROM fedora:39
RUN dnf install -y nodejs
COPY . /app
WORKDIR /app
RUN npm i
CMD node .
