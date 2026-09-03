/**
 * Canonical public profile facts for jakubpolec.com.
 *
 * Keep identity, social URLs, canonical URLs and person schema here.
 * Pages, metadata, JSON-LD and text-first discovery files import this module
 * rather than maintaining competing versions of the same biography.
 */
export const profile = {
  // Use the spelling shared by the public handles and official profiles as the
  // canonical entity name. The preferred Polish spelling remains the display
  // name throughout the site.
  canonicalName: 'Jakub Polec',
  name: 'Jakub Połeć',
  canonicalUrl: 'https://jakubpolec.com/',
  personId: 'https://jakubpolec.com/#jakub-polec',
  imageUrl: 'https://jakubpolec.com/jpbg.jpeg',
  role: 'Quant Systems Architect & Founder of QuantJourney',
  rolePhrase: 'quant systems architect and founder of QuantJourney',
  jobTitle: 'Quant Systems Architect and Founder of QuantJourney',
  description:
    'Jakub Polec (Jakub Połeć) is a quant systems architect and founder of QuantJourney, working with investment teams on quantitative systems and investment-decision infrastructure.',
  disambiguatingDescription:
    'Founder of QuantJourney and builder of OneBook; quant systems architect working on research, data, portfolio, risk, and AI infrastructure for investment teams.',
  location: 'Dubai, UAE',
  organisation: {
    name: 'QuantJourney',
    url: 'https://quantjourney.cloud',
    id: 'https://quantjourney.cloud/#organization',
  },
  career: {
    oracleTitle: 'Head of Industry and Innovation, Director, ECEMEA',
    startups: 'three award-winning startups',
    microsoftAwards: 'two global marketing innovation awards at Microsoft',
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

const personEntity = {
  '@type': 'Person',
  '@id': profile.personId,
  name: profile.canonicalName,
  alternateName: profile.name,
  givenName: 'Jakub',
  familyName: 'Polec',
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
    '@type': 'Organization',
    name: profile.organisation.name,
    url: profile.organisation.url,
  },
  sameAs: [
    ...profile.socialProfiles.map((socialProfile) => socialProfile.href),
    profile.organisation.url,
  ],
} as const;

export const personStructuredData = {
  '@context': 'https://schema.org',
  ...personEntity,
} as const;

/** Google ProfilePage markup keeps the public spelling and the preferred UI
 * spelling in one resolvable Person entity, rather than making crawlers infer
 * a relationship from similarly named profiles. */
export const profilePageStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${profile.canonicalUrl}#profile`,
      url: profile.canonicalUrl,
      mainEntity: { '@id': profile.personId },
    },
    personEntity,
  ],
} as const;
