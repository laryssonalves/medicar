from django.db import models


class Medico(models.Model):
    nome = models.CharField(max_length=60)
    crm = models.CharField(max_length=20)
    email = models.EmailField()
    telefone = models.CharField(max_length=15)
    especialidade = models.ForeignKey(
        'agendamento.Especialidade',
        on_delete=models.PROTECT,
    )

    class Meta:
        db_table = 'medico'
        verbose_name = 'Médico'
        verbose_name_plural = 'Médicos'

    def __str__(self):
        return self.nome
