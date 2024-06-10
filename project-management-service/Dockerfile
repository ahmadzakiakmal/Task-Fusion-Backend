
# Use the Eclipse Temurin 17 JDK base image
FROM eclipse-temurin:17-jdk-focal

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and the pom.xml file
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Make the mvnw script executable
RUN chmod +x ./mvnw

# Download dependencies and go offline
RUN ./mvnw dependency:go-offline

# Copy the source code
COPY src ./src

# Set the server port
ENV SERVER_PORT=8011

# Run the application
CMD ["./mvnw", "spring-boot:run", "-Dserver.port=${SERVER_PORT}"]
