function newObject() {
    return {
        id: '283428724',
        equipoId: ['234827382'],
        equipo: [{
                id: '234827382',
                nombre: 'Atletico de Melgar',
                nombreCorto: 'atl. Melgar',
                screenName: 'sss',
                club: {
                    clubId: 'Melgar club de balonmano',
                    nombre: 'Melgar club de balonmano'
                },
                categoria: 'Alevin',
                genero: 'Masculino'
            }],
        numero: '30',
        nombre: 'Juan Pelotas',
        posicion: 'delantero',
        portero: false,
        foto: ''
    };
}
var o1 = newObject();
var o2 = newObject();
o1.nombre = "Raul Luna";
o1.portero = true;
o2.nombre = "perico perez";
console.log("hola");
console.log(o1.nombre);
console.log(o1.portero);
console.log(o2.nombre);
console.log(o2.portero);
