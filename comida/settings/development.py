from comida.settings.base import *



# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
TEMPLATE_DEBUG = True

INSTALLED_APPS += (
    'debug_toolbar', # and other apps for local development
)

ALLOWED_HOSTS = []

# Extra information #

#####
