from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from comida.views import HomeTemplateView


urlpatterns = patterns(
    '',
    url(r'^$', HomeTemplateView.as_view(), name='home'),
    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns = staticfiles_urlpatterns() + urlpatterns
