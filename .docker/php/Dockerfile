# Use official PHP 8.4 FPM Alpine image as base
FROM php:8.4-fpm-alpine AS base

# Environment variables
ENV NODE_VERSION=22.0.0

# Arguments for user/group configuration
ARG WWWUSER
ARG WWWGROUP

# Add Alpine edge repositories for newer packages and update
RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "https://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && apk update && apk upgrade

# Install gosu for privilege management
RUN set -eux; \
    apk add --no-cache --virtual .gosu-deps dpkg; \
    GOSU_VERSION=1.17; \
    wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-amd64"; \
    chmod +x /usr/local/bin/gosu; \
    apk del .gosu-deps

# Install essential system packages and PHP extensions
RUN apk add --no-cache \
    su-exec \
    bash \
    zip \
    unzip \
    git \
    curl \
    supervisor \
    tzdata \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    postgresql-dev \
    rabbitmq-c-dev \
    linux-headers \
    # Configure and install PHP extensions
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql pdo_pgsql opcache bcmath sockets pcntl

# Install Node.js and npm
RUN apk add --no-cache nodejs npm \
    # Verify installations
    && node -v && npm -v

# Install build dependencies for PECL extensions
RUN apk add --no-cache \
    autoconf \
    g++ \
    make \
    libtool

# Install and enable PECL extensions
RUN pecl install redis amqp msgpack \
    && docker-php-ext-enable redis amqp msgpack

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy custom PHP configuration
COPY .docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini

# Set up supervisor logging
RUN mkdir -p /var/log/supervisor \
    && touch /var/log/supervisord.log /var/log/supervisord.err \
    && chown -R www-data:www-data /var/log/supervisor /var/log/supervisord.* \
    && chmod -R 777 /var/log/supervisor /var/log/supervisord.*

# Copy entrypoint script
COPY .docker/php/entrypoint.sh /entrypoint.sh

# Configure www-data user and group
RUN apk add --no-cache shadow \
    && groupmod -g ${WWWGROUP} www-data \
    && usermod -u ${WWWUSER} www-data \
    && usermod -aG www-data www-data

# Make entrypoint executable
RUN chmod +x /entrypoint.sh

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Development stage with Xdebug
FROM base AS dev

# Install Xdebug for development
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    # Configure Xdebug
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=trigger" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.idekey=PHPSTORM" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && apk del .build-deps

# Start supervisor in development
CMD ["supervisord", "-c", "/etc/supervisord.conf"]

# Production stage
FROM base AS prod

# Set working directory
WORKDIR /var/www

# Start supervisor in production
CMD ["supervisord", "-c", "/etc/supervisord.conf"]

# Expose PHP-FPM port
EXPOSE 9000