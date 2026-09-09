interface ReviewArea {
  title: string;
  text: string;
  note?: string;
}
interface ServiceSection {
  title: string;
  paragraphs: string[];
}
interface ServiceDetail {
  description: string;
  positioning: string;
  coverageTitle: string;
  areas: ReviewArea[];
  additionalSections: ServiceSection[];
  deliverables: string[];
  outcome: string;
  recommendations?: string;
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'strategy-review': {
    description: 'Independent review of strategy research, data and code before capital or after live performance diverges. Written assessment, reproduced backtest and remediation priorities.',
    positioning: 'An independent review of a strategy before it takes capital - or after it stops behaving the way the backtest said it would. I look at the research, the data, and the code behind it, not just the equity curve. The output is a written assessment you can hand to an IC, an allocator, or your own team.',
    coverageTitle: 'What I review',
    areas: [
      { title: 'Data integrity', text: 'Sources, point-in-time correctness, corporate actions, survivorship.', note: 'In practice, this is where most reviews find their first material issue.' },
      { title: 'Lookahead and leakage', text: 'Timestamp alignment, feature construction, restatement handling.' },
      { title: 'Cost and execution model', text: 'Spread, impact, borrow, fill assumptions against realistic venues.', note: 'Many otherwise convincing backtests fail here first, at realistic size.' },
      { title: 'Statistical robustness', text: 'Parameter sensitivity, multiple-testing burden, out-of-sample discipline.' },
      { title: 'Capacity and liquidity', text: 'The AUM level at which the edge stops paying for itself.' },
      { title: 'Research-to-production parity', text: 'Whether the live system computes what the backtest computed.', note: 'Divergence between research and production code is common and rarely instrumented.' },
    ],
    additionalSections: [],
    deliverables: [
      'Written review (15-25 pages): findings, severity-ranked, with the evidence behind each',
      'Reproduced backtest under my own assumptions, with the delta explained',
      'Prioritised remediation list - what to fix before capital, what can wait',
      '90-minute walkthrough with your team',
    ],
    outcome: 'You get a defensible answer to one question: does the available evidence support deploying capital, and under what assumptions? The review either provides independent evidence for proceeding within defined limits or identifies material weaknesses before they surface in live trading.',
  },
  'systems-architecture': {
    recommendations: 'Recommendations are vendor-neutral. If a QuantJourney component is relevant, I disclose the overlap explicitly and treat it as one option alongside external or internal alternatives.',
    description: 'Investment systems architecture: current-state assessment, target design, build/buy decisions and a sequenced implementation roadmap with cost and headcount implications.',
    positioning: 'Most investment technology problems are not tooling problems. They are sequencing problems - the data layer, the research environment, and the execution path were built at different times, by different people, for a smaller firm than the one that exists now. I design the target architecture and the order in which to get there.',
    coverageTitle: 'What the engagement covers',
    areas: [
      { title: 'Current-state map', text: 'Data flows, systems, manual steps, where the firm actually loses time.' },
      { title: 'Data layer', text: 'Vendors, storage, point-in-time guarantees, cost per marginal dataset.' },
      { title: 'Research environment', text: "Reproducibility, environment parity, how ideas reach production." },
      { title: 'Signal and portfolio construction', text: "Where the logic lives, who can change it, how it's tested." },
      { title: 'Execution and OMS/EMS integration', text: 'Order path, reconciliation, failure modes.' },
      { title: 'Risk, monitoring, and controls', text: 'What breaks silently today.' },
      { title: 'Build vs. buy vs. defer', text: 'Per component, with reasoning, not preference.' },
    ],
    additionalSections: [],
    deliverables: [
      'Target architecture document with component-level decisions and rationale',
      'Current-state assessment and gap analysis',
      'Sequenced implementation roadmap: what to build first, what it unblocks, and what can wait',
      'Build/buy recommendations with indicative cost and headcount implications',
      'Two working sessions with your team plus one review round',
    ],
    outcome: 'A roadmap your team can execute against and you can budget against - with the reasoning attached, so decisions survive the next hire and the next vendor conversation.',
  },
  'technology-due-diligence': {
    recommendations: 'Recommendations are vendor-neutral. If a QuantJourney component is relevant, I disclose the overlap explicitly and treat it as one option alongside external or internal alternatives.',
    description: 'Quant and investment technology due diligence for investors, acquirers and allocators. Evidence-backed findings and costed remediation options to inform the transaction.',
    positioning: 'Commissioned by investors, acquirers, and allocators who need to know whether the technology and research behind a firm is what the deck says it is. I assess what exists, what it depends on, and what it would cost to keep running.',
    coverageTitle: 'Diligence areas',
    areas: [
      { title: 'IP and key-person concentration', text: "What is documented, what lives in one person's head." },
      { title: 'Code quality and reproducibility', text: 'Can the results be regenerated from source today.' },
      { title: 'Data rights', text: 'Licensing, redistribution terms, vendor concentration, cost trajectory.' },
      { title: 'Track record verification', text: 'Claimed vs. demonstrable, and what the gap consists of.' },
      { title: 'Infrastructure cost and scalability', text: 'Unit economics at 3× and 10× current AUM.' },
      { title: 'Security and operational resilience', text: 'Access control, recovery, single points of failure.' },
      { title: 'Technical debt', text: 'The remediation cost a buyer inherits, quantified where possible.' },
      { title: 'Remediation paths', text: 'For each material finding, what fixing it realistically requires.' },
    ],
    additionalSections: [
      {
        title: 'Findings come with options, not just severity',
        paragraphs: [
          "A risk rating tells you something is broken. It doesn't tell you what to pay for it. For every material finding I set out the realistic paths - rebuild in-house, replace with a vendor, or contain and live with it - with indicative cost, elapsed time, and the dependency each one creates. Where a vendor or an open-source component is the obvious answer, I name it and say why.",
          'This is scoped to inform the transaction. Designing and sequencing the target architecture is a separate engagement.',
        ],
      },
      {
        title: 'What this typically surfaces',
        paragraphs: ['Concentration risk and reproducibility gaps, more often than code quality. A track record that cannot be regenerated from source is not a code problem - it is a valuation problem.'],
      },
    ],
    deliverables: [
      'Diligence report with risk-rated findings and supporting evidence',
      'Red-flag summary for investment committee use',
      'Remediation options per material finding - typically two or three paths, with indicative cost, timeline, and what each leaves unresolved',
      'Management Q&A session and one follow-up round post-report',
    ],
    outcome: 'A view of technical and research risk you can price into the deal or the allocation - with a costed remediation picture, so the number you negotiate against has something behind it.',
  },
};
