# Use the official Python image
FROM python:3.10-slim

# Install system dependencies for Chromium and Selenium
RUN apt-get update && apt-get install -y \
    chromium-driver \
    chromium \
    wget \
    unzip \
    xvfb \
    libnss3 \
    libxss1 \
    libappindicator3-1 \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libgbm-dev \
    libu2f-udev \
    libasound2 \
    libgtk-3-0 \
    libx11-xcb1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables to use Chromium with Selenium
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_BIN=/usr/bin/chromedriver

# Set up PostgreSQL client library (for FastAPI with asyncpg)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Set the working directory
WORKDIR /src
COPY . .

# Increase shared memory (important for Chrome)
ENV SHM_SIZE=1g

# Expose the port used by FastAPI
EXPOSE 8000

# Set Python path to allow module imports
ENV PYTHONPATH=/src

# Command to run the FastAPI app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]