from rest_framework import serializers

from agendamento.models import Agenda
from agendamento.serializers import MedicoSerializer


class AgendaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer()
    horarios = serializers.StringRelatedField(many=True, source='horarios_validos')

    class Meta:
        model = Agenda
        fields = ['id', 'medico', 'dia', 'horarios']
