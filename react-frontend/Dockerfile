FROM node:latest
RUN apt-get update && apt-get -y install default-jre && apt-get -y install default-jdk && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip -O android-sdk.zip && \
    unzip android-sdk.zip -d /android-sdk && \
    rm android-sdk.zip && \
    mkdir -p /android-sdk/cmdline-tools/latest && \
    mv /android-sdk/cmdline-tools/* /android-sdk/cmdline-tools/latest/ || true

ENV ANDROID_HOME=/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
ENV PORT=8081

RUN yes | /android-sdk/cmdline-tools/latest/bin/sdkmanager --licenses && \
    /android-sdk/cmdline-tools/latest/bin/sdkmanager "platforms;android-34" "build-tools;34.0.0"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "start"]
