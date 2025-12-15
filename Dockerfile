FROM golang:1.24 as builder 
WORKDIR /app 
COPY go.mod go.sum ./ 
RUN go mod download
COPY configs ./configs
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd


FROM alpine:latest
RUN addgroup -g 1000 -S appuser && adduser -u 1000 -S appuser -G appuser
WORKDIR /home/appuser/app
COPY --from=builder --chown=appuser:appuser  /app/main .
RUN chown -R appuser:appuser /home/appuser
USER appuser
EXPOSE 8080
CMD ["./main"]