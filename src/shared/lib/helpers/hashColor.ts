export function hashColor(name: string) {
  const colorPalette: string[] = [
    '#4C7FA8',
    '#4CAF7D',
    '#C9A347',
    '#E8922A',
    '#A07BC5',
    '#E05252',
    '#4AAFB0',
    '#7B8FC5',
    '#C56B8F',
    '#7BAF5E',
  ];

  const hash = hashFromName(name);
  return colorPalette[hash % colorPalette.length];
}
function hashFromName(name: string) {
  return name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}
