FROM oraclelinux:7-slim

ARG release=19
ARG update=5

RUN yum -y install curl
RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash -
RUN yum -y install nodejs

RUN  yum -y install oracle-release-el7 && yum-config-manager --enable ol7_oracle_instantclient && \
     yum -y install oracle-instantclient${release}.${update}-basic oracle-instantclient${release}.${update}-devel oracle-instantclient${release}.${update}-sqlplus && \
     rm -rf /var/cache/yum


RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install


EXPOSE 6002
CMD ["node", "index.js"]

# docker build -t migutak/gridsapi:1.0.0 .
# docker build -t 52.117.24.217/gridsapi:1.0.0 .