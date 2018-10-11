#FROM is the base image for which we will run our application
FROM deepakdpk6/msv:arm-hf

# Copy files and directories from the application
COPY credits.html /var/www/html/credits.html
COPY index.html /var/www/html/index.html

# Tell Docker we are going to use this port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
