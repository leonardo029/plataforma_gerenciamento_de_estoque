## https://hub.docker.com/r/postgis/postgis
FROM postgis/postgis:16-3.4

# Configura locale em pt_BR.UTF-8
RUN apt-get update && apt-get install -y locales \
  && localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8 \
  && rm -rf /var/lib/apt/lists/*

ENV LANG=pt_BR.utf8