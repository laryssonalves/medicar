from rest_framework import serializers

from agendamento.models import Consulta
from agendamento.serializers import MedicoSerializer


class ConsultaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer()
    horario = serializers.SerializerMethodField()

    class Meta:
        model = Consulta
        fields = ['id', 'dia', 'horario', 'data_agendamento', 'medico']

    def get_horario(self, obj):
        if not isinstance(obj.horario, str):
            return obj.horario.strftime('%H:%M')
        else:
            return obj.horario
