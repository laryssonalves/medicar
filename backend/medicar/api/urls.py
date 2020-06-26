from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token
from api import views

api_patterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
]

api_patterns.extend([
    path('especialidades/', views.EspecialidadeList.as_view()),
    path('medicos/', views.MedicoList.as_view()),
    path('agendas/', views.AgendaList.as_view()),
    path('consultas/', views.ConsultaList.as_view()),
    path('consultas/<int:pk>/', views.ConsultaDetail.as_view()),
    path('usuarios/', views.UsuarioCreate.as_view()),
])

api_patterns = format_suffix_patterns(api_patterns)
