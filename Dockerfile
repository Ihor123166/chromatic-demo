FROM mcr.microsoft.com/playwright:v1.58.2

ENV CI=true

WORKDIR /app

COPY . .

RUN yarn && yarn playwright install msedge chrome

CMD ["sh", "-c", "yarn playwright test ${ARGS}"]
