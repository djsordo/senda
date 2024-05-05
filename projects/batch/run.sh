
if [ "$1" == "" ] ; then 
  echo "debes indicar la aplicacion"
  echo "ejemplo: $0 crear_usuario.ts"
else 
  source=$1
  destination="${1%%.*}.js"

  # rm -rf dist/*
  tsc
  node "./dist/batch/$destination"
fi

