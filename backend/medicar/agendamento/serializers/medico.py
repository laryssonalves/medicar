from rest_framework import serializers

from agendamento.models import Medico
from agendamento.serializers import EspecialidadeSerializer


class MedicoSerializer(serializers.ModelSerializer):
    especialidade = EspecialidadeSerializer()

    class Meta:
        model = Medico
        fields = ['id', 'crm', 'nome', 'especialidade']
