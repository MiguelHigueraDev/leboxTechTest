# Dockerfile

# PHP 8.3 required for Laravel 11
FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libcurl4-openssl-dev \
    && docker-php-ext-install zip pdo_mysql \
    curl

# Install pcov for code coverage
RUN pecl install pcov && docker-php-ext-enable pcov && apt-get clean

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy existing application directory contents from the 'backend' directory
COPY backend /var/www/html

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]