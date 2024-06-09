FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git

RUN pip install --no-cache-dir virtualenv

COPY . /app

RUN virtualenv venv

RUN . venv/bin/activate && pip install --no-cache-dir -r requirements.txt

EXPOSE 5001

CMD ["sh", "-c", ". venv/bin/activate && gunicorn -w 4 -b 0.0.0.0:5001 app:app"]