# Configuración del entorno de desarrollo

## Intro
**¿Porqué este documento se llama "hacking"?** Estamos siguiendo el estilo de los primeros proyectos de software libre, donde `HACKING`era el nombre de los documentos que explicaban cómo configurar el entorno de desarrollo del poryecto. 
El presente documento explica cómo configurar el entorno de desarrollo para poder funcionar con el proyecto. 

## Linux

Los pasos que se describen a continuación son para un Ubuntu 20. Para otros sistemas operativos, habrá que ejecutar las instrucciones equivalentes. 

### Paso 0: instalar software basico

Si queremos descargarnos el proyecto y comenzar a colaborar, necesitaremos
instalarnos git y un editor de texto.

    apt-get install git  
    
### Paso 1: instalar node

Recomiendamos instalar node desde el [sitio web de node](https://nodejs.org/); 
descargar el paquete e instalarlo. ¿Porqué?? Pues porque el paquete de nodejs 
de ubuntu está desactualizado (en este momento instala la versión 12 en un 
ubuntu 20 y el de `npm` instala un montón de software que no necesitamos 
para nada. 

Asi que descargaremos el fichero y procederemos a descomprimirlo: 

    tar -xJf node-v16.15.0-linux-x64.tar.xz

Y lo instalamos en una ubicación de la máquina. Para este ejemplo usaremos 
`/usr/local/share`, aunque se puede usar cualquier otra: 

    sudo mv node-v16.15.0-linux-x64 /usr/local/share/
    sudo ln -s /usr/local/share/node-v16.15.0-linux-x64 /usr/local/share/node
    
Para que al teclear `node` se ejecute efectivamente node, lo que haremos 
será configurar el path. Para ello, crear el fichero `/etc/profile.d/node.sh`
con el siguiente contenido: 

    #!/bin/bash
    export PATH=$PATH:/usr/local/share/node/bin 

### Paso 2: instalar angular e ionic

    $ npm install --global @angular/cli 
    $ npm install --global @ionic/cli

Para generar aplicaciones moviles, será preciso instalarse además dos paquetes 
más: 

    $ npm install --global native-run cordova-res


### Paso 3: descargar el proyecto y actualizar todas las dependencias

    $ git clone https://github.com/djsordo/senda.git

Como sabemos, el directorio `node_modules` contiene todas las librerías 
del proyecto; pero al descargarlo de git nos viene vacío. No obstante, la
lista de librerías usadas está en el fichero `packages.json`. Lo primero 
que haremos es descargarlas: 

    $ npm install

### Paso 4: nuestra primera prueba

Y estaríamos listos para comenzar a ejecutar: 

    $ ionic serve 

Bastaría con abrir un navegador en la direccion [http://localhost:8100](http://localhost:8100) para ver nuestra flamante aplicación en desarrollo funcionando. 



