FROM python:3.8

WORKDIR /python_flask

COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "app.py"]
