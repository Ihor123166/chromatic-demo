FROM mcr.microsoft.com/playwright:v1.58.2-amd64

WORKDIR /app

COPY . .

RUN yarn install

CMD ["sh", "-c", "yarn storybook dev --ci -p 6006 & yarn wait-on http://localhost:6006/ & yarn playwright test ${ARGS}"]
