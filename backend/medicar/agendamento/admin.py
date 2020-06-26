import re

from django.contrib import admin
from django import forms

from .models import Especialidade, Medico, Agenda, AgendaHorario

admin.site.register(Especialidade)


@admin.register(Medico)
class MedicoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'crm', 'email', 'telefone', 'especialidade')
    list_filter = ('especialidade', 'nome')


class AgendaHorarioForm(forms.ModelForm):
    class Meta:
        mdoel = AgendaHorario
        fields = ('hora',)
        widgets = {
            'hora': forms.TimeInput(format='%H:%M')
        }


class AgendaHorarioAdmin(admin.StackedInline):
    model = AgendaHorario
    form = AgendaHorarioForm
    extra = 1


@admin.register(Agenda)
class AgendaAdmin(admin.ModelAdmin):
    date_hierarchy = 'dia'
    list_display = ('medico', 'dia_formatado')
    list_display_links = ('medico', 'dia_formatado')
    search_fields = ('medico__nome',)
    inlines = (AgendaHorarioAdmin,)
    ordering = ('medico', 'dia')
