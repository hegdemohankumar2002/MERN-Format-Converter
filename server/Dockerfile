# Use Node.js base image with Debian for apt packages
FROM node:20-bookworm-slim

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

# Copy only package manifests first to leverage Docker layer caching
COPY package*.json ./

# Install Node dependencies
RUN npm ci --omit=dev || npm install --omit=dev

# Copy the rest of the server source
COPY . .

# Install Python dependencies for the converter
RUN pip install --no-cache-dir --break-system-packages -r converter/requirements.txt

# Environment
ENV NODE_ENV=production
ENV PORT=5000

# Railway provides PORT; the app uses process.env.PORT || 5000
EXPOSE 5000

# Start the server
CMD ["node", "app.js"]
