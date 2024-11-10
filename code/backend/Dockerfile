# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-21 as builder
WORKDIR /backend

# Copy the pom.xml file and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Build the application
RUN mvn clean install -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-jammy
WORKDIR /backend
EXPOSE 8080

# Copy the JAR file from the builder stage
COPY --from=builder /backend/target/app-0.0.1-SNAPSHOT.jar /backend/app.jar

# Run the application
ENTRYPOINT ["java","-Dspring.profiles.active=prod", "-jar", "/backend/app.jar"]