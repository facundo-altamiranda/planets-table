import { upperFirst } from 'lodash';

const normalizeTerrains = terrains => {
    const arrayOfTerrain = terrains.split(',');
    const normalizedTerrains = arrayOfTerrain.map(terrain =>
        upperFirst(terrain)
    );

    return normalizedTerrains.join(', ');
};

export {
    normalizeTerrains,
}