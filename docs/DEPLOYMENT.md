# Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests pass: `pnpm test`
- [ ] No linting errors: `pnpm lint`
- [ ] TypeScript compiles: `pnpm type-check`
- [ ] Build succeeds: `pnpm build`
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Version bumped in package.json

## Environment Setup

### Production Environment Variables

Create `.env.production` with:

```env
NODE_ENV=production
API_PORT=3000
API_HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@prod-db-host:5432/halal_tinder
DB_POOL_SIZE=20

# Redis
REDIS_URL=redis://prod-redis-host:6379

# JWT
JWT_SECRET=your-production-secret-key-very-long-and-secure
JWT_EXPIRATION=7d
JWT_REFRESH_EXPIRATION=30d

# CORS
CORS_ORIGIN=https://yourdomain.com

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin
ADMIN_EMAIL=admin@halaltinder.com
ADMIN_PASSWORD=secure-password-change-after-first-login
```

## Docker Deployment

### Build Production Image

```bash
docker build -t halal-tinder-api:latest \
  -f infra/docker/api.Dockerfile .
```

### Run Container

```bash
docker run -d \
  --name halal-tinder-api \
  -p 3000:3000 \
  --env-file .env.production \
  -v /data/uploads:/app/uploads \
  halal-tinder-api:latest
```

### Docker Compose Production

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: always

  api:
    image: halal-tinder-api:latest
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    restart: always

volumes:
  postgres_data:
  redis_data:
```

Deploy with:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Kubernetes Deployment

### Prerequisites

- kubectl configured
- Docker image pushed to registry

### Create ConfigMap

```bash
kubectl create configmap halal-tinder-config \
  --from-env-file=.env.production
```

### Apply Manifests

```bash
kubectl apply -f infra/k8s/
```

## Database Migrations

### Before Deployment

```bash
# Run migrations in test environment first
pnpm db:migrate

# Verify migrations
cd apps/api && pnpm prisma migrate status
```

### Zero-Downtime Migrations

1. Deploy new code (backward compatible)
2. Run migrations
3. Deploy code that uses new schema

## Monitoring

### Health Checks

```bash
# API health
curl http://localhost:3000/health

# Readiness
curl http://localhost:3000/health/ready
```

### Logs

```bash
# Docker
docker logs halal-tinder-api

# Kubernetes
kubectl logs deployment/halal-tinder-api
```

### Metrics

Set up monitoring with:
- Prometheus
- Grafana
- DataDog
- New Relic

## Rollback

### Docker

```bash
# Revert to previous image
docker run -d \
  --name halal-tinder-api \
  -p 3000:3000 \
  --env-file .env.production \
  halal-tinder-api:previous-version

docker stop halal-tinder-api
docker rename halal-tinder-api halal-tinder-api-old
docker rename halal-tinder-api-new halal-tinder-api
docker start halal-tinder-api
```

### Kubernetes

```bash
# Rollback deployment
kubectl rollout undo deployment/halal-tinder-api

# Check status
kubectl rollout status deployment/halal-tinder-api
```

## Performance Optimization

### API

- Enable gzip compression
- Configure CORS properly
- Set up caching headers
- Use CDN for static assets

### Database

- Create indexes for frequently queried fields
- Enable connection pooling
- Regular backups
- Monitor slow queries

### Redis

- Set appropriate TTLs
- Monitor memory usage
- Enable persistence
- Configure eviction policies

## Security Checklist

- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] JWT secret secured
- [ ] Database password strong
- [ ] Environment variables not in code
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Security headers configured

## Backup & Recovery

### Database Backup

```bash
# Automatic daily backup
pg_dump -h localhost -U user halal_tinder | gzip > backup.sql.gz

# Restore
gunzip < backup.sql.gz | psql -h localhost -U user halal_tinder
```

### Redis Backup

```bash
# Automatic backup (configured in docker-compose)
# Manual backup
redis-cli SAVE
```

## Scaling

### Horizontal Scaling

- Run multiple API instances
- Use load balancer (Nginx, HAProxy)
- Share Redis instance
- Connect to same database

### Vertical Scaling

- Increase server resources
- Optimize database queries
- Implement caching layer
- Use CDN for static files

## Post-Deployment

1. Verify all endpoints working
2. Check application logs
3. Monitor resource usage
4. Verify backups created
5. Update status page
6. Notify users if needed
7. Document deployment

## Support & Troubleshooting

### Common Issues

**Database Connection Error**
- Check DATABASE_URL
- Verify PostgreSQL is running
- Check firewall rules

**Redis Connection Error**
- Check REDIS_URL
- Verify Redis is running
- Check connection limits

**Out of Memory**
- Check application logs
- Analyze heap dumps
- Increase server RAM

## Contacts

- DevOps Team: devops@halaltinder.com
- On-Call: [oncall-pagerduty-link]
- Slack: #deployment

---

For emergency deployments, follow incident response procedures.
