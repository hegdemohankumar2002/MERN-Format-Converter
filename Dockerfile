# Runtime image for server + tools
FROM node:20-bookworm-slim AS runtime

# Install Python (as `python`), pip, zip, ffmpeg, and libheif runtime deps
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        python3 \
        python3-pip \
        python-is-python3 \
        zip \
        ffmpeg \
        libheif1 \
        libde265-0 \
        libaom3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install server deps
COPY server/package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Copy server source
COPY server/. .

# Install Python deps
RUN pip install --no-cache-dir --break-system-packages -r converter/requirements.txt

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "app.js"]
