from datetime import datetime, time

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from agendamento.models import Agenda, AgendaHorario
from agendamento.serializers import AgendaSerializer


class AgendaList(APIView):
    """
    Lista agendas
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        especilidades = request.query_params.getlist('especialidade', [])
        medicos = request.query_params.getlist('medico', [])
        data_inicio = request.query_params.get('data_inicio', '')
        data_final = request.query_params.get('data_final', '')

        agendas = Agenda.agendas_validas(
            especilidades, medicos,
            data_inicio, data_final
        )

        serializer = AgendaSerializer(agendas, many=True)
        return Response(serializer.data)
