from datetime import datetime

from django.http import Http404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from agendamento.models import Consulta
from agendamento.serializers import ConsultaSerializer


class ConsultaList(APIView):
    """
    Lista e cria consultas
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        agora = datetime.now()
        consultas = Consulta.objects.filter(
            usuario=request.user,
            dia__gte=agora.date(),
            horario__gte=agora.time()
        )
        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        consulta = Consulta.criar_consulta(
            request.data['agenda_id'],
            request.data['horario'],
            request.user
        )
        serializer = ConsultaSerializer(consulta)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ConsultaDetail(APIView):
    """
    Excluir Consulta
    """

    def get_object(self, pk):
        try:
            return Consulta.objects.get(pk=pk)
        except Consulta.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        consulta = self.get_object(pk)
        consulta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
