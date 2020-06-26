# Medicar
Sistema para gestão de consultas em uma clínica médica

## :rocket: Tecnologias

Projeto foi desenvolvido usando as seguintes tecnologias:

- [Python](https://www.python.org/)
- [Django](https://docs.djangoproject.com/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Angular](https://angular.io/)

## :information_source: Como usar
Para clonar e rodar projeto você irá precisar do git para clonar, pip e virtualenv para criar a ambiente para rodar o backend e
precisará do npm para instalar o Angular CLI.

### Clonando Repositório
```bash
$ git clone https://github.com/devlarysson/medicar.git
```

### Rodando Backend (Django)

```bash
# Va ate a pasta backend
$ cd medicar/backend

# Crie o ambiente
$ virtualenv -p python3.7 venv

# Ative o ambiente e vá até a pasta do projeto
$ source venv/bin/activate && cd medicar/

# Instale as dependencias do projeto
$ pip install -r requirements.txt

# Crie e rode as migrations no banco
$ ./manage.py makemigrations && ./manage.py migrate

# Inicie o servidor
$ ./manage.py runserver

# Crie seu super usuário
$ ./manage.py createsuperuser

Rodando em http://localhost:8000/
```

### Rodando Frontend (Angular)

```bash
# Va ate a pasta frontend
$ cd medicar/frontend

# Abra a pasta do projeto
$ cd medicar/

# Inicie o frontend e abra em um navegador
$ ng server --open

Rodando em http://localhost:4200/
```
