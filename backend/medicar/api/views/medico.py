from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from agendamento.models import Medico
from agendamento.serializers import MedicoSerializer


class MedicoList(APIView):
    """
    Lista medicos
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        nome = request.query_params.get('search', '')
        especialidades = request.query_params.getlist('especialidade', [])
        medicos = Medico.objects.all()

        if especialidades:
            medicos = medicos.filter(especialidade__in=especialidades)

        if nome:
            medicos = medicos.filter(nome__icontains=nome)

        serializer = MedicoSerializer(medicos, many=True)
        return Response(serializer.data)
