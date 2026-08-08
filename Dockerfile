# Base Python image
FROM python:3.12-slim

# Prevent Python from creating .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Show logs immediately in terminal
ENV PYTHONUNBUFFERED=1

# Create working directory inside container
WORKDIR /app

# Copy dependency list first
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project source code
COPY . .

# Expose Django port
EXPOSE 8000

# Run Django development server
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]