from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from agendamento.models import Especialidade
from agendamento.serializers import EspecialidadeSerializer


class EspecialidadeList(APIView):
    """
    Lista especialidades
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        search = request.query_params.get('search', '')

        if search:
            especialidades = Especialidade.objects.filter(nome__icontains=search)
        else:
            especialidades = Especialidade.objects.all()

        serializer = EspecialidadeSerializer(especialidades, many=True)
        return Response(serializer.data)
