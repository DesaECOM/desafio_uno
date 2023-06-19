FROM openjdk:22
WORKDIR /app

COPY target/evol-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]