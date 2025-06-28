export function generateMainImage(type: string, id: string): string {
  const imageTypes = {
    villa: '1029',
    townhouse: '1031',
    apartment: '1031',
    penthouse: '1032',
    studio: '1033',
    duplex: '1033',
  };

  const imageId = imageTypes[type as keyof typeof imageTypes] || '1031';

  return `https://picsum.photos/id/${imageId}/800/600?unit=${id}`;
}

export function generateDetailImages(type: string, id: string, count: number = 4): string[] {
  const images: string[] = [];

  for (let i = 0; i < count; i++) {
    const imageId = 1040 + i;
    images.push(`https://picsum.photos/id/${imageId}/1200/800?unit=${id}&img=${i}`);
  }

  return images;
}

export function getApartmentType(unitName: string): string {
  const name = unitName.toLowerCase();

  if (name.includes('villa')) return 'villa';
  if (name.includes('townhouse')) return 'townhouse';
  if (name.includes('penthouse')) return 'penthouse';
  if (name.includes('studio')) return 'studio';
  if (name.includes('duplex')) return 'duplex';

  return 'apartment';
}
