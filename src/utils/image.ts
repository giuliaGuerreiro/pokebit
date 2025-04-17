import { PokemonSprites } from 'pokenode-ts';

export const getPokemonImageUrl = (url: string): string => {
  if (url !== null) {
    const matches = url.match(/\/pokemon\/(\d+)\/?$/);
    if (matches && matches[1]) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${matches[1]}.png`;
    }

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`;
  } else {
    // Fallback image
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  }
};

export const extractSpriteUrls = (sprites: PokemonSprites): string[] => {
  const orderedUrls: string[] = [];

  const officialArtwork = sprites.other?.['official-artwork']?.front_default;
  if (officialArtwork) {
    orderedUrls.push(officialArtwork);
  }

  const frontKeys = ['front_default', 'front_shiny', 'front_female', 'front_shiny_female'] as const;

  for (const key of frontKeys) {
    const url = sprites[key];
    if (url) {
      orderedUrls.push(url);
    }
  }

  const additionalFronts = getSpritesUrlsByCondition(sprites, (key) => key.startsWith('front_'));
  orderedUrls.push(...additionalFronts);

  const backKeys = ['back_default', 'back_shiny', 'back_female', 'back_shiny_female'] as const;

  for (const key of backKeys) {
    const url = sprites[key];
    if (url) {
      orderedUrls.push(url);
    }
  }

  const additionalBacks = getSpritesUrlsByCondition(sprites, (key) => key.startsWith('back_'));
  orderedUrls.push(...additionalBacks);

  return Array.from(new Set(orderedUrls));
};

const getSpritesUrlsByCondition = (obj: unknown, condition: (key: string) => boolean): string[] => {
  const urls: string[] = [];

  if (typeof obj !== 'object' || obj === null) {
    return urls;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && condition(key) && value) {
      urls.push(value);
    } else if (typeof value === 'object' && value !== null) {
      urls.push(...getSpritesUrlsByCondition(value, condition));
    }
  }

  return urls;
};
