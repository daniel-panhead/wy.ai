FROM python:3.11.7
ENV PYTHONUNBUFFERED True

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r  requirements.txt

ENV APP_HOME /app
WORKDIR ${APP_HOME}
COPY .  $APP_HOME 

ENV PORT 6942
CMD exec uvicorn src.main:app --host 0.0.0.0 --port ${PORT} --workers 1