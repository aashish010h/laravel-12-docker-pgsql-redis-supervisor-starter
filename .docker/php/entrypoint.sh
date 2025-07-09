#!/usr/bin/env sh
set -e  # Exit immediately if any command fails

# =============================================
# 🛠  ENTRYPOINT SCRIPT FOR LARAVEL DOCKER CONTAINER
# =============================================

# ---------------------------------------------
# 🔧 1. Fix Directory Permissions
# ---------------------------------------------
echo "🔧 Fixing /var/run/php and /var/log permissions..."
mkdir -p /var/run/php /var/log
chown -R www-data:www-data /var/run/php /var/log
chmod -R 777 /var/run/php /var/log

# ---------------------------------------------
# 📁 2. Fix Laravel Directory Permissions
# ---------------------------------------------
echo "📁 Fixing Laravel storage and cache permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 777 /var/www/storage /var/www/bootstrap/cache

# ---------------------------------------------
# 👤 3. Optional User/Group ID Configuration
# ---------------------------------------------
if [ ! -z "$WWWUSER" ] && [ ! -z "$WWWGROUP" ]; then
    echo "👤 Updating www-data UID/GID to $WWWUSER:$WWWGROUP..."
    apk add --no-cache shadow  # Required for usermod/groupmod
    usermod -u "$WWWUSER" www-data
    groupmod -g "$WWWGROUP" www-data
fi

# ---------------------------------------------
# 🚀 4. Execute Command as www-data User
# ---------------------------------------------
echo "🚀 Switching to www-data user and executing command..."

# Prefer gosu if available (lightweight su alternative)
if command -v gosu > /dev/null; then
    exec gosu www-data "$@"
# Fallback to su-exec (Alpine's gosu alternative)
elif command -v su-exec > /dev/null; then
    exec su-exec www-data "$@"
# Final fallback to standard su
else
    su - www-data -c "$@"
fi