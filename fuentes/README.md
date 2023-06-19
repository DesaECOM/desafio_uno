
# Ejecutar proyecto BackEnd
  Al entrar a la carpeta Fuentes/backend 
  
  Puede ejecutar Docker-composer 

  # docker composer up --build
    donde cargara la bd y los componentes necesarios 
    La bd esta con usario root y password toor con nombre de bd 'evol'
    # si ya cuenta con mvn intalado puede ejecutar el proyecto con 
    # mvn clean install && mvn spring-boot:run 

  Puerto de salida 
   Api: http://localhost:8080
   pgadmin4: http://localhost:5050 (si usa Docker-composer)

# Ejecutar proyecto FronEnd
  Es necesario contar con NodeService lo mas actualizado posible 

  # Primero Instalar Paquetes 
  npm install 
  # ejecutar proyecto 
  npm run dev
  # Puerto de salida
  http://localhost:5173

  