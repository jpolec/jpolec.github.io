/**
 * Canonical public profile facts for jakubpolec.com.
 *
 * Keep identity, social URLs, canonical URLs and person schema here.
 * Pages, metadata, JSON-LD and text-first discovery files import this module
 * rather than maintaining competing versions of the same biography.
 */
export const profile = {
  name: 'Jakub Polec',
  canonicalUrl: 'https://jakubpolec.com/',
  personId: 'https://jakubpolec.com/#jakub-polec',
  imageUrl: 'https://jakubpolec.com/jpbg.jpeg',
  role: 'Proprietary Portfolio Manager & Quant Systems Architect',
  rolePhrase: 'proprietary portfolio manager and quant systems architect',
  jobTitle: 'Proprietary Portfolio Manager, Quant Systems Architect and Founder',
  description:
    'Jakub Polec is a proprietary portfolio manager, quant systems architect, founder of QuantJourney, and builder of OneBook.',
  disambiguatingDescription:
    'Founder of QuantJourney and builder of OneBook; proprietary portfolio manager and quant systems architect working on systematic research and buy-side investment infrastructure.',
  location: 'Dubai, UAE',
  organisation: {
    name: 'QuantJourney',
    url: 'https://quantjourney.cloud',
    id: 'https://quantjourney.cloud/#organization',
  },
  career: {
    oracleTitle: 'Head of Industry and Innovation, Director, ECEMEA',
    startups: 'three award-winning startups',
    microsoftAwards: 'two global marketing innovation awards from Microsoft’s CEO',
  },
  urls: {
    video: 'https://jakubpolec.com/video/',
    llms: 'https://jakubpolec.com/llms.txt',
    llmsFull: 'https://jakubpolec.com/llms-full.txt',
    calendly: 'https://calendly.com/jpolec/30min',
    email: 'mailto:jakub@quantjourney.pro',
  },
  socialProfiles: [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/jakubpolec',
    },
    {
      label: 'X / Twitter',
      href: 'https://twitter.com/jakubpolec',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/jpolec',
    },
    {
      label: 'Medium',
      href: 'https://medium.com/@jpolec_72972',
    },
    {
      label: 'Substack',
      href: 'https://quantjourney.substack.com',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@QuantJourneywithCode',
    },
  ],
} as const;

export const profileLinksMarkdown = profile.socialProfiles
  .map((socialProfile) => `- [${socialProfile.label}](${socialProfile.href})`)
  .join('\n');

export const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': profile.personId,
  name: profile.name,
  url: profile.canonicalUrl,
  image: profile.imageUrl,
  jobTitle: profile.jobTitle,
  description: profile.description,
  disambiguatingDescription: profile.disambiguatingDescription,
  homeLocation: {
    '@type': 'Place',
    name: profile.location,
  },
  worksFor: {
    '@id': profile.organisation.id,
  },
  sameAs: profile.socialProfiles.map((socialProfile) => socialProfile.href),
} as const;
