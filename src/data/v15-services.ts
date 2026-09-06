export const services = [
  {
    "title": "Strategy and backtest review",
    "description": "Before capital is committed or a strategy goes into production, I review the research behind it: data quality and point-in-time integrity, assumptions, portfolio construction, transaction costs, and the risk of overfitting or information leakage.",
    "deliverable": "You receive a written assessment of what the evidence supports, where the results may be misleading and which issues need further testing or correction.",
    "slug": "strategy-review",
    "duration": "2-3 weeks",
    "checkTitle": "What I check",
    "checks": [
      "Point-in-time integrity of the data, including survivorship, restatements, and delisting handling.",
      "Whether the signal timing survives a permutation test, and whether the result survives a bar permutation of the underlying series.",
      "Probability of backtest overfitting across the whole strategy search, not just the final variant.",
      "Deflated Sharpe against the number of trials actually run.",
      "Portfolio construction: position sizing, constraints, rebalancing frequency, and what happens when each is perturbed.",
      "Transaction costs and market impact against realistic fills at the strategy’s size, not a fixed basis-point assumption.",
      "Information leakage between research and evaluation, including through feature engineering and hyperparameter choice.",
      "Capacity: the AUM at which the result stops holding."
    ],
    "note": "",
    "fee": "$7,500"
  },
  {
    "title": "Investment systems architecture",
    "description": "When research, data, portfolio management, risk, and execution need to work together, I design the architecture or assess what is already in place. I examine data flows, system boundaries, and operational requirements, including how decisions and results can be traced and reproduced.",
    "deliverable": "You receive an architecture proposal and an implementation roadmap, with priorities, dependencies, and technical trade-offs made explicit.",
    "slug": "systems-architecture",
    "duration": "4-6 weeks",
    "checkTitle": "What I examine",
    "checks": [
      "Where the record of truth actually lives for positions, cash, and valuations, and how many places disagree with it.",
      "Data flows between research, portfolio, risk, and execution, and which of them are manual.",
      "System boundaries: what each component owns, and where ownership is ambiguous or duplicated.",
      "Reproducibility: whether a decision made six months ago can be reconstructed with the data as it stood that day.",
      "Lineage and audit: whether a number in a report can be traced back to its source without asking a person.",
      "Operational load: what breaks when one person is on holiday.",
      "Build, buy, or replace, with the cost and risk of each stated explicitly rather than implied."
    ],
    "note": "Longer delivery engagements by agreement.",
    "fee": "$18,000"
  },
  {
    "title": "Quant and investment technology due diligence",
    "description": "Before investing in a business, selecting a platform or committing to a major technology project, I independently assess the underlying technology, models and engineering practices. I examine whether the system supports its claims and what it will take to operate, maintain and extend it.",
    "deliverable": "You receive a structured assessment of strengths, material risks, unresolved questions and recommended next steps.",
    "slug": "technology-due-diligence",
    "duration": "2-4 weeks",
    "checkTitle": "What I assess",
    "checks": [
      "Whether the system does what the materials claim, tested against the system rather than against the deck.",
      "The models: what they assume, how they were validated, and whether the validation would survive an outside reviewer.",
      "Data: what is licensed, what is derived, what is scraped, and what happens commercially if a provider withdraws.",
      "Engineering practice: testing, deployment, observability, and how much of the system exists only in one person’s head.",
      "Key-person and concentration risk across the technical team.",
      "What it costs to run today and what it will cost at ten times the current load.",
      "Extension cost: what the next major feature actually requires."
    ],
    "note": "",
    "fee": "$15,000"
  }
];
