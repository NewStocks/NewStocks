FROM python:3.11

WORKDIR /app

RUN pip install --no-cache-dir \
    APScheduler==3.10.4 \
    blinker==1.6.2 \
    certifi==2023.7.22 \
    charset-normalizer==3.2.0 \
    click==8.1.7 \
    colorama==0.4.6 \
    contourpy==1.1.0 \
    cycler==0.11.0 \
    DateTime==5.2 \
    Deprecated==1.2.14 \
    Flask==2.3.3 \
    fonttools==4.42.1 \
    idna==3.4 \
    itsdangerous==2.1.2 \
    Jinja2==3.1.2 \
    kiwisolver==1.4.5 \
    MarkupSafe==2.1.3 \
    matplotlib==3.7.2 \
    mplfinance==0.12.10b0 \
    multipledispatch==1.0.0 \
    numpy==1.26.0 \
    packaging==23.1 \
    pandas==2.1.0 \
    Pillow==10.0.0 \
    plotly==5.16.1 \
    pykrx==1.0.45 \
    PyMySQL==1.1.0 \
    pyparsing==3.0.9 \
    python-dateutil==2.8.2 \
    python-dotenv==1.0.0 \
    pytz==2023.3 \
    requests==2.31.0 \
    six==1.16.0 \
    tenacity==8.2.3 \
    tzdata==2023.3 \
    tzlocal==5.0.1 \
    urllib3==2.0.4 \
    Werkzeug==2.3.7 \
    wrapt==1.15.0 \
    xlrd==2.0.1 \
    zope.interface==6.0

COPY . .

# RUN chmod +x app/app.py

EXPOSE 5000

CMD ["python", "app.py"]
