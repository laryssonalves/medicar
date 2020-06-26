from datetime import datetime

from django.db import models, IntegrityError


def valida_dia_agenda(data):
    from datetime import datetime
    from django.core.exceptions import ValidationError

    if data < datetime.now().date():
        raise ValidationError('Não é possível criar agenda para um dia anterior a hoje.')


class Agenda(models.Model):
    medico = models.ForeignKey(
        'agendamento.Medico',
        on_delete=models.PROTECT
    )
    dia = models.DateField(validators=[valida_dia_agenda])

    class Meta:
        unique_together = ('medico', 'dia')
        ordering = ('dia',)
        db_table = 'agenda'
        verbose_name = 'Agenda'
        verbose_name_plural = 'Agendas'

    def __str__(self):
        return f"{self.medico} - {self.dia_formatado}"

    @property
    def dia_formatado(self):
        return self.dia.strftime('%d/%m/%Y')

    @staticmethod
    def agendas_validas(especialidades, medicos, data_inicio, data_final):
        hora = datetime.now().replace(second=0).time()
        agendas_validas = [
            x['agenda_id'] for x in
            AgendaHorario.objects.filter(consulta__isnull=True, hora__gt=hora).values('agenda_id').distinct()
        ]
        agendas = Agenda.objects.filter(pk__in=agendas_validas)
        agendas = agendas.filter(
            medico__especialidade_id__in=especialidades,
            medico_id__in=medicos
        )

        if data_inicio and data_final:
            data_inicio = datetime.strptime(data_inicio, '%Y-%m-%d').date()
            data_final = datetime.strptime(data_final, '%Y-%m-%d').date()
            agendas = agendas.filter(dia__range=[data_inicio, data_final])

        agendas = agendas.exclude(dia__lt=datetime.now().date())
        return agendas

    def horarios_validos(self):
        hora = datetime.now().replace(second=0).time()
        return self.horarios.filter(consulta__isnull=True, hora__gt=hora)


class AgendaHorario(models.Model):
    agenda = models.ForeignKey(
        'Agenda',
        on_delete=models.CASCADE,
        related_name='horarios',
    )
    hora = models.TimeField(help_text="Formato: H:M")
    consulta = models.OneToOneField(
        'agendamento.Consulta',
        on_delete=models.PROTECT,
        related_name='horario_consulta',
        null=True,
    )

    class Meta:
        unique_together = ('agenda', 'hora')
        ordering = ('hora',)
        db_table = 'agenda_horario'
        verbose_name = 'Horário da Agenda'
        verbose_name_plural = 'Horários da Agenda'

    def __str__(self):
        return self.hora.strftime('%H:%M')

    @staticmethod
    def get_object(**kwargs):
        try:
            return AgendaHorario.objects.get(**kwargs)
        except AgendaHorario.DoesNotExist:
            raise Exception('Horário requisitado não existe.')

    def marcar_consulta(self, consulta):
        self.consulta = consulta
        self.save()

    def desmarcar_consulta(self):
        self.consulta = None
        self.save()