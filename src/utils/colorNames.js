export function getColorName(hex) {
  if (!hex) return 'Custom Color';
  const cleanHex = hex.toLowerCase().trim();

  const exactNames = {
    '#ffffff': 'White',
    '#000000': 'Pure Black',
    '#0f172a': 'Deep Navy',
    '#1e293b': 'Slate Dark',
    '#6366f1': 'Electric Indigo',
    '#8b5cf6': 'Vibrant Purple',
    '#06b6d4': 'Cyber Cyan',
    '#10b981': 'Emerald Mint',
    '#f59e0b': 'Amber Gold',
    '#f43f5e': 'Neon Rose',
    '#991a1a': 'Crimson Red',
    '#ef4444': 'Bright Red',
    '#3b82f6': 'Royal Blue',
    '#101828': 'Midnight Dark',
    '#064e3b': 'Dark Forest',
    '#ec4899': 'Hot Pink',
    '#34d399': 'Mint Green'
  };

  if (exactNames[cleanHex]) return exactNames[cleanHex];

  // Convert HEX to RGB to approximate color category
  let r = 0, g = 0, b = 0;
  if (cleanHex.length === 7) {
    r = parseInt(cleanHex.substring(1, 3), 16);
    g = parseInt(cleanHex.substring(3, 5), 16);
    b = parseInt(cleanHex.substring(5, 7), 16);
  }

  if (r > 240 && g > 240 && b > 240) return 'White';
  if (r < 25 && g < 25 && b < 25) return 'Dark Gray / Black';
  if (r > 180 && g < 80 && b < 80) return 'Red';
  if (g > 180 && r < 80 && b < 80) return 'Green';
  if (b > 180 && r < 80 && g < 80) return 'Blue';
  if (r > 180 && g > 180 && b < 80) return 'Yellow / Gold';
  if (r > 180 && b > 180 && g < 100) return 'Purple';
  if (g > 180 && b > 180 && r < 100) return 'Cyan / Teal';

  return `Custom Color (${cleanHex.toUpperCase()})`;
}
