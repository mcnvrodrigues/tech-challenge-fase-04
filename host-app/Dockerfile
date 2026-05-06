FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# --- build-time env for Next.js / Module Federation ---
ARG NEXT_PUBLIC_REMOTE_APP_URL
ENV NEXT_PUBLIC_REMOTE_APP_URL=$NEXT_PUBLIC_REMOTE_APP_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
