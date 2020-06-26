from django.db import models

from agendamento.models import AgendaHorario


class Consulta(models.Model):
    medico = models.ForeignKey(
        'agendamento.Medico',
        on_delete=models.PROTECT
    )
    usuario = models.ForeignKey(
        'auth.User',
        on_delete=models.PROTECT,
    )
    dia = models.DateField()
    horario = models.TimeField()
    data_agendamento = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'consulta'
        ordering = ('dia', 'horario')
        verbose_name = 'Consulta'
        verbose_name_plural = 'Consultas'

    def __str__(self):
        return f"{self.medico} - {self.dia_formatado} - {self.horario_formatado}"

    def save(self, *args, **kwargs):
        super(Consulta, self).save(*args, **kwargs)
        self.reservar_agenda_horario()

    def delete(self, *args, **kwargs):
        self.horario_consulta.desmarcar_consulta()
        super(Consulta, self).delete(*args, **kwargs)

    @staticmethod
    def criar_consulta(agenda_id, horario, usuario):
        agenda_horario = AgendaHorario.get_object(**{
            'agenda_id': agenda_id,
            'hora': horario,
        })

        return Consulta.objects.create(**{
            'medico_id': agenda_horario.agenda.medico_id,
            'usuario': usuario,
            'dia': agenda_horario.agenda.dia,
            'horario': horario
        })

    @property
    def horario_formatado(self):
        return self.horario.strftime('%H:%M')

    @property
    def dia_formatado(self):
        return self.dia.strftime('%d/%m/%Y')

    def reservar_agenda_horario(self):
        agenda_horario = AgendaHorario.get_object(**{
            'agenda__medico': self.medico,
            'agenda__dia': self.dia,
            'hora': self.horario
        })
        agenda_horario.marcar_consulta(self)
