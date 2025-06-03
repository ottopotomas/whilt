export type InventoryItem = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  rarity: 'basic' | 'special' | 'rare' | 'legendary';
  category: string;
  linked_til_id?: string;
  created_at: string;
};

export const inventoryItems: InventoryItem[] = [
  {
    id: 'botanists_gauntlets',
    emoji: '🧤',
    name: 'Botanist’s Gauntlets',
    description: 'Helps you better identify future species and plant facts. Smells faintly of moss.',
    rarity: 'special',
    category: 'Nature',
    created_at: new Date().toISOString(),
  },
  {
    id: 'scroll_of_synapses',
    emoji: '📜',
    name: 'Scroll of Synapses',
    description: 'Unfolds insights when reflecting deeply. Glows when a neural link is formed.',
    rarity: 'rare',
    category: 'Psychology',
    created_at: new Date().toISOString(),
  },
  {
    id: 'flask_of_clarity',
    emoji: '🧪',
    name: 'Flask of Clarity',
    description: 'Sharpens focus when reviewing complex theories. Makes thoughts bubble nicely.',
    rarity: 'basic',
    category: 'Science',
    created_at: new Date().toISOString(),
  },
  {
    id: 'mindsmiths_hammer',
    emoji: '🧠',
    name: 'Mindsmith’s Hammer',
    description: 'Used to forge memory into understanding. Sparks fly when tests are passed.',
    rarity: 'special',
    category: 'Meta',
    created_at: new Date().toISOString(),
  },
  {
    id: 'navigators_brooch',
    emoji: '🧭',
    name: 'Navigator’s Brooch',
    description: 'Helps you link knowledge across continents and cultures.',
    rarity: 'special',
    category: 'Geography',
    created_at: new Date().toISOString(),
  },
  {
    id: 'ciphered_ring',
    emoji: '🔐',
    name: 'Ciphered Ring',
    description: 'Decrypts complex ideas and makes them elegantly simple. Unlocked through deep TILs.',
    rarity: 'rare',
    category: 'Technology',
    created_at: new Date().toISOString(),
  },
  {
    id: 'pocket_codex',
    emoji: '📚',
    name: 'Pocket Codex',
    description: 'Recaps stories with surprising insight. Fits neatly in your brain’s back pocket.',
    rarity: 'basic',
    category: 'Literature',
    created_at: new Date().toISOString(),
  },
  {
    id: 'star_of_curiosity',
    emoji: '✨',
    name: 'Star of Curiosity',
    description: 'Awarded for continuous learning. Twinkles when you chase the ‘why’.',
    rarity: 'legendary',
    category: 'Miscellaneous',
    created_at: new Date().toISOString(),
  },
];
