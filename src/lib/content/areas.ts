import type { AreaPage } from '@/types/content';

export const AREAS: AreaPage[] = [
  {
    slug: 'johannesburg',
    name: 'Johannesburg',
    province: 'Gauteng',
    regionKey: 'johannesburg',
    description:
      'Serving commercial and industrial clients across Johannesburg, including the CBD, Sandton, Randburg, Roodepoort, and surrounding business parks.',
    population: '5.7 million',
  },
  {
    slug: 'pretoria',
    name: 'Pretoria',
    province: 'Gauteng',
    regionKey: 'pretoria',
    description:
      'Full sealing, surfacing, and line marking services throughout Pretoria, Centurion, Midrand, and the broader Tshwane metro area.',
    population: '2.9 million',
  },
  {
    slug: 'cape-town',
    name: 'Cape Town',
    province: 'Western Cape',
    regionKey: 'cape-town',
    description:
      'Specialist contractor covering Cape Town, the Cape Winelands, Bellville, Somerset West, and all major commercial zones in the Western Cape.',
    population: '4.6 million',
  },
  {
    slug: 'durban',
    name: 'Durban',
    province: 'KwaZulu-Natal',
    regionKey: 'durban',
    description:
      'Sealing and surfacing services for Durban, Pinetown, Umhlanga, Pietermaritzburg, and the broader eThekwini municipality.',
    population: '3.7 million',
  },
  {
    slug: 'port-elizabeth',
    name: 'Port Elizabeth (Gqeberha)',
    province: 'Eastern Cape',
    regionKey: 'port-elizabeth',
    description:
      'Commercial surfacing, sealing, and line marking in Port Elizabeth, Uitenhage, and the Nelson Mandela Bay metro area.',
    population: '1.3 million',
  },
  {
    slug: 'bloemfontein',
    name: 'Bloemfontein',
    province: 'Free State',
    regionKey: 'bloemfontein',
    description:
      'Serving Bloemfontein, Botshabelo, Thaba Nchu, and commercial clients across the Mangaung metro and Free State province.',
    population: '750 000',
  },
  {
    slug: 'east-london',
    name: 'East London',
    province: 'Eastern Cape',
    regionKey: 'east-london',
    description:
      'Full-service contractor covering East London, King William\'s Town, and the Buffalo City metro area.',
    population: '800 000',
  },
  {
    slug: 'polokwane',
    name: 'Polokwane',
    province: 'Limpopo',
    regionKey: 'polokwane',
    description:
      'Sealing, surfacing, and line marking services for Polokwane, Mokopane, and major commercial sites across Limpopo.',
    population: '620 000',
  },
  {
    slug: 'nelspruit',
    name: 'Nelspruit (Mbombela)',
    province: 'Mpumalanga',
    regionKey: 'nelspruit',
    description:
      'Specialist contractor serving Mbombela, Middelburg, Witbank, and commercial clients throughout Mpumalanga.',
    population: '500 000',
  },
  {
    slug: 'kimberley',
    name: 'Kimberley',
    province: 'Northern Cape',
    regionKey: 'kimberley',
    description:
      'Providing sealing, surfacing, and line marking solutions to Kimberley, Upington, and Northern Cape commercial clients.',
    population: '225 000',
  },
];

export function getAreaBySlug(slug: string): AreaPage | undefined {
  return AREAS.find((a) => a.slug === slug);
}
