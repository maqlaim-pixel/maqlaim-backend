# ==========================================
# TravelVista Backend — Dockerfile
# Deploy: Render / Railway / Fly.io
# Database: Neon (cloud PostgreSQL)
# ==========================================

# ---------- Stage 1: Build ----------
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

# ---------- Stage 2: Run ----------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
RUN addgroup -S travelvista && adduser -S travelvista -G travelvista
RUN mkdir -p /app/uploads && chown -R travelvista:travelvista /app

COPY --from=build /app/target/*.jar app.jar

USER travelvista
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:8080/api/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=docker"]
