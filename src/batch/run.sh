
if [ "$1" == "" ] ; then 
  echo "debes indicar la aplicacion"
else 
  # rm -rf dist/*
  tsc
  node ./dist/batch/$1.js
fi

