export async function createType(Type, properties) {
    var instances = await Type.getList({where: properties}, {cache: false});

    if (instances.length != 0) {
        throw `${Type.name} already exists: ${properties}`
    }

    return new Type(properties)
}

export async function findType(Type, properties) {
    var instances = await Type.getList({where: properties}, {cache: false});

    if (instances.length != 1) {
        throw `${Type.name} does not exist: ${properties}`
    }

    return instances[0];
}

export function validateType(Type, key) {
    return (key) => findType(Type, {key: value})
}