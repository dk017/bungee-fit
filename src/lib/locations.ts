interface City {
  name: string;
  state: string;
  slug: string;
  country: string;
  region: string;
}

export const cities: City[] = [
  // United States - West Coast
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca', country: 'USA', region: 'West Coast' },
  { name: 'San Francisco', state: 'CA', slug: 'san-francisco-ca', country: 'USA', region: 'West Coast' },
  { name: 'Portland', state: 'OR', slug: 'portland-or', country: 'USA', region: 'West Coast' },
  { name: 'Seattle', state: 'WA', slug: 'seattle-wa', country: 'USA', region: 'West Coast' },

  // United States - East Coast
  { name: 'New York', state: 'NY', slug: 'new-york-ny', country: 'USA', region: 'East Coast' },
  { name: 'Boston', state: 'MA', slug: 'boston-ma', country: 'USA', region: 'East Coast' },
  { name: 'Miami', state: 'FL', slug: 'miami-fl', country: 'USA', region: 'East Coast' },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta-ga', country: 'USA', region: 'East Coast' },

  // United States - Central
  { name: 'Chicago', state: 'IL', slug: 'chicago-il', country: 'USA', region: 'Central' },
  { name: 'Houston', state: 'TX', slug: 'houston-tx', country: 'USA', region: 'Central' },
  { name: 'Dallas', state: 'TX', slug: 'dallas-tx', country: 'USA', region: 'Central' },
  { name: 'Denver', state: 'CO', slug: 'denver-co', country: 'USA', region: 'Central' }
];

export const getPopularCities = (count: number = 6): City[] => {
  return cities.slice(0, count);
};

export const getCitiesByRegion = (region: string): City[] => {
  return cities.filter(city => city.region === region);
};

export const formatCityState = (city: City): string => {
  return `${city.name}, ${city.state}`;
};