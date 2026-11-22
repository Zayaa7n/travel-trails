/*
 * ============================================================================
 * TRAVEL TRAILS — DESTINATIONS CATALOGUE
 * Each destination uses its own unique photograph and maps cleanly to one of
 * the three sliding galleries on the Destinations page.
 * ============================================================================
 */

export type DestinationCategory = 'resort' | 'domestic' | 'international';

export interface DestinationItem {
  id: string;
  name: string;
  category: DestinationCategory;
  image: string;
}

export interface CategoryMeta {
  id: DestinationCategory;
  title: string;
  subtitle: string;
  editorialIndex: string;
}

export const CATEGORY_SECTIONS: CategoryMeta[] = [
  {
    id: 'resort',
    editorialIndex: '01',
    title: 'Resort Escapes',
    subtitle: "Unwind in nature's most beautiful hideaways.",
  },
  {
    id: 'domestic',
    editorialIndex: '02',
    title: 'Explore India',
    subtitle: 'Discover the incredible beauty and diversity of India.',
  },
  {
    id: 'international',
    editorialIndex: '03',
    title: 'Beyond Borders',
    subtitle: 'Your passport to extraordinary experiences.',
  },
];

export const DESTINATIONS: DestinationItem[] = [
  // =========================================================================
  // GALLERY 1: RESORT ESCAPES (7)
  // =========================================================================
  {
    id: 'wayanad',
    name: 'Wayanad',
    category: 'resort',
    image: '/src/assets/images/dest_wayanad_mist_1795344820039.jpg',
  },
  {
    id: 'munnar',
    name: 'Munnar',
    category: 'resort',
    image: '/src/assets/images/dest_tea_hills_resort_1795256296228.jpg',
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    category: 'resort',
    image: '/src/assets/images/dest_misty_lake_hills_1795256296001.jpg',
  },
  {
    id: 'vagamon',
    name: 'Vagamon',
    category: 'resort',
    image: '/src/assets/images/dest_vagamon_meadows_1795344820470.jpg',
  },
  {
    id: 'ooty',
    name: 'Ooty',
    category: 'resort',
    image: '/src/assets/images/dest_ooty_hills_1795344819757.jpg',
  },
  {
    id: 'kakkadampoya',
    name: 'Kakkadampoya',
    category: 'resort',
    image: '/src/assets/images/dest_kakkadampoya_falls_1795344820472.jpg',
  },
  {
    id: 'vattavada',
    name: 'Vattavada',
    category: 'resort',
    image: '/src/assets/images/dest_vattavada_valley_1795344918688.jpg',
  },

  // =========================================================================
  // GALLERY 2: EXPLORE INDIA (14)
  // =========================================================================
  {
    id: 'manali',
    name: 'Manali',
    category: 'domestic',
    image: '/src/assets/images/dest_manali_snow_1795344919116.jpg',
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    category: 'domestic',
    image: '/src/assets/images/dest_himalayan_valley_1795256296033.jpg',
  },
  {
    id: 'delhi',
    name: 'Delhi',
    category: 'domestic',
    image: '/src/assets/images/dest_delhi_heritage_1795344819363.jpg',
  },
  {
    id: 'sar-pass',
    name: 'Sar Pass',
    category: 'domestic',
    image: '/src/assets/images/dest_alpine_trek_pass_1795256296833.jpg',
  },
  {
    id: 'hampta-pass',
    name: 'Hampta Pass',
    category: 'domestic',
    image: '/src/assets/images/dest_hampta_pass_1795344819959.jpg',
  },
  {
    id: 'kasol',
    name: 'Kasol',
    category: 'domestic',
    image: '/src/assets/images/dest_kasol_river_1795344819602.jpg',
  },
  {
    id: 'spiti-valley',
    name: 'Spiti Valley',
    category: 'domestic',
    image: '/src/assets/images/dest_spiti_monastery_1795344921842.jpg',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    category: 'domestic',
    image: '/src/assets/images/dest_ladakh_roads_1795344819940.jpg',
  },
  {
    id: 'shimla',
    name: 'Shimla',
    category: 'domestic',
    image: '/src/assets/images/dest_shimla_ridge_1795344819871.jpg',
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    category: 'domestic',
    image: '/src/assets/images/dest_sikkim_peaks_1795344921018.jpg',
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    category: 'domestic',
    image: '/src/assets/images/hero_scenic_mountains_1795256296249.jpg',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    category: 'domestic',
    image: '/src/assets/images/dest_tropical_coast_kerala_1795256295453.jpg',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    category: 'domestic',
    image: '/src/assets/images/dest_heritage_palace_1795256295808.jpg',
  },
  {
    id: 'goa',
    name: 'Goa',
    category: 'domestic',
    image: '/src/assets/images/dest_goa_coast_1795344819492.jpg',
  },

  // =========================================================================
  // GALLERY 3: BEYOND BORDERS (8)
  // =========================================================================
  {
    id: 'malaysia',
    name: 'Malaysia',
    category: 'international',
    image: '/src/assets/images/dest_malaysia_skyline_1795344819948.jpg',
  },
  {
    id: 'maldives',
    name: 'Maldives',
    category: 'international',
    image: '/src/assets/images/dest_maldives_lagoon_1795344921560.jpg',
  },
  {
    id: 'bali',
    name: 'Bali',
    category: 'international',
    image: '/src/assets/images/dest_bali_temple_1795344819577.jpg',
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    category: 'international',
    image: '/src/assets/images/dest_emerald_islands_asia_1795256297331.jpg',
  },
  {
    id: 'azerbaijan',
    name: 'Azerbaijan',
    category: 'international',
    image: '/src/assets/images/dest_azerbaijan_baku_1795344819717.jpg',
  },
  {
    id: 'uzbekistan',
    name: 'Uzbekistan',
    category: 'international',
    image: '/src/assets/images/dest_silkroad_arch_azure_1795256296667.jpg',
  },
  {
    id: 'andaman',
    name: 'Andaman',
    category: 'international',
    image: '/src/assets/images/dest_andaman_beach_1795344819963.jpg',
  },
  {
    id: 'nepal',
    name: 'Nepal',
    category: 'international',
    image: '/src/assets/images/dest_nepal_himalaya_1795344921123.jpg',
  },
];
