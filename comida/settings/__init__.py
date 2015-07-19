# -*- coding: utf-8 -*-

# En producción ajustar variable de entorno
# $ export DJANGO_SETTINGS_MODULE=app.settings.production

import os
import importlib

if os.environ['DJANGO_SETTINGS_MODULE'] != 'comida.settings':
    try:
        """
        Cargar dinámicamente 'from DJANGO_SETTINGS_MODULE import *'
        """
        settings = importlib.import_module(os.environ['DJANGO_SETTINGS_MODULE'])
        for v in dir(settings):
            if v.startswith("__"): continue
            globals()[v] = getattr(settings, v)
    except ImportError, KeyError:
        """
        Finalmente si no se ha ajustado el valor o no estaba propiamente ajustado
        cargar ajustes de producción
        """
        from .production import *
else:
    try:
        """
        Si no se ha ajustado la variable de entorno
        predeterminadamente se cargan ajustes de desarrollo
        """
        from .development import *
    except ImportError:
        pass