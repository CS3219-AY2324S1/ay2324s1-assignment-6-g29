# Use the official Ubuntu 20.04 image as the base
FROM python:3.10

# Create and set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

# Expose the port that your app runs on
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]