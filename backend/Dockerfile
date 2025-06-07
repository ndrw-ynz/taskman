### MULTI-STAGE BUILD DOCKERFILE
### STAGE 1 - BUILDER ###
FROM eclipse-temurin:17 AS build-stage
WORKDIR /app
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY src ./src
RUN ./mvnw clean install -DskipTests

### STAGE 2 - FINAL ###
FROM eclipse-temurin:17 AS  build-final
WORKDIR /app
EXPOSE 8080
COPY --from=build-stage /app/target/*.jar /app/*.jar
ENTRYPOINT ["java", "-jar", "/app/*.jar"]