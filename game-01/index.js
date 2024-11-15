function findFirstPair(M, N) {
    // Creamos un conjunto para almacenar los números vistos
    const seenNumbers = new Set();

    for (let number of M) {
        // Calculamos el complemento necesario para alcanzar N con el número actual
        const required = N - number;

        // Verificamos si el complemento ya está en el conjunto
        if (seenNumbers.has(required)) {
            return [required, number]; // Encontramos el primer par que suma N
        }

        // Añadimos el número actual al conjunto
        seenNumbers.add(number);
    }

    // Si no encontramos ninguna pareja que sume N, devolvemos null
    return null;
}

// Ejemplo de uso
const M = [2, 5, 8, 14, 0];
const N = 10;
console.log(findFirstPair(M, N));  // Salida esperada: [2, 8]
