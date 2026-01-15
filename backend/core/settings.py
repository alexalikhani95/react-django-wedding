import os
import sys  # needed for detecting test mode
from pathlib import Path

from dotenv import load_dotenv
import dj_database_url

# Load environment variables from .env
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "True") == "True"

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",") if not DEBUG else ["*"]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "rest_framework",
    "corsheaders",
    "rest_framework_simplejwt",
    "rsvp",
    "guests",
    "tables",
    "costs"
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASE_URL = os.getenv("DATABASE_URL")

# Default database (used in dev/prod)
default_db = dj_database_url.parse(
    DATABASE_URL,
    conn_max_age=600,   # persistent connections
)

# Use SQLite for tests to avoid overwriting your real DB
if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'test_db.sqlite3',
        }
    }
else:
    DATABASES = {'default': default_db}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = "/static/"

# Only set the production bits when DEBUG is False (as in the Render docs)
if not DEBUG:
    STATIC_ROOT = BASE_DIR / "staticfiles"
    STORAGES = {
        "staticfiles": {
            "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"
        },
    }

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://react-django-wedding.vercel.app",
    "https://www.alikhani-wedding.info"
]

# Email configuration
# In development, print emails to console. In production, send via SMTP
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend" if DEBUG else "django.core.mail.backends.smtp.EmailBackend"
# Gmail SMTP server settings
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
# Gmail account to send emails from
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
# Gmail App Password (not your regular password)
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")
# Email address that appears as the sender
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL")

# RSVP notification recipients
# Get the comma-separated list of emails from environment variable
rsvp_emails = os.getenv("RSVP_NOTIFICATION_EMAILS")
# If emails are set, split them by comma and remove any spaces
if rsvp_emails:
    RSVP_NOTIFICATION_EMAILS = [email.strip() for email in rsvp_emails.split(",")]
# If no emails set, use empty list (no emails will be sent)
else:
    RSVP_NOTIFICATION_EMAILS = []
