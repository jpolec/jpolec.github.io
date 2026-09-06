interface ReviewArea { title: string; text: string }
interface Evidence { title: string; text: string; href: string }
interface ServiceDetail {
  lead: string;
  audience: string;
  decision: string;
  startingScope: string;
  areas: ReviewArea[];
  method: ReviewArea[];
  outputs: ReviewArea[];
  example: { observation: string; implication: string; action: string };
  experience: string;
  evidence: Evidence[];
  materials: string;
  boundary: string;
  contact: string;
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'strategy-review': {
    lead: 'Establish what the research supports before a strategy receives capital or enters production.',
    audience: 'For CIOs, portfolio managers, research leads and allocators evaluating a systematic strategy.',
    decision: 'A written view of the evidence, the unresolved risks and the conditions for the next research or deployment decision.',
    startingScope: 'One strategy, its research history and an agreed set of markets and implementation assumptions.',
    areas: [
      { title: 'Data and information timing', text: 'Point-in-time availability, universe membership, survivorship, corporate actions and restatements. Trace the path from observation to feature, signal, order and fill.' },
      { title: 'Research validity', text: 'Economic rationale, baselines, walk-forward and out-of-sample design. Purging and embargo where labels overlap; Deflated Sharpe and probability of backtest overfitting where the trial history supports them.' },
      { title: 'Robustness and portfolio risk', text: 'Parameter sensitivity, subperiods, market regimes, factor exposures, concentration, leverage and drawdowns. Resampling and permutation tests selected to respect the series structure and the hypothesis being tested.' },
      { title: 'Execution and capacity', text: 'Signal latency, order semantics, turnover, spreads, fees, borrow and financing where relevant. Stress participation rates, liquidity and market impact; estimate capacity ranges conditional on the execution model.' },
    ],
    method: [
      { title: 'Define the claim', text: 'Agree the decision, strategy boundary, benchmarks and tests. Record what was tried before the final variant was selected.' },
      { title: 'Reproduce the baseline', text: 'Freeze code, data and configuration. Reconcile reported returns with positions, cash, trades and costs; log any result that cannot be reproduced.' },
      { title: 'Challenge the result', text: 'Run the agreed validation and sensitivity tests. Separate coding defects, optimistic assumptions and weak statistical evidence.' },
      { title: 'Report and challenge', text: 'Discuss factual findings with the research team, then deliver the independent assessment and a prioritised retest plan.' },
    ],
    outputs: [
      { title: 'Decision memo', text: 'What is supported, what remains unproven and what should block deployment pending correction or further evidence.' },
      { title: 'Technical evidence pack', text: 'Test specifications, baseline and sensitivity results, reproducibility references and an explicit account of missing data or unavailable experiments.' },
      { title: 'Remediation and retest plan', text: 'Issues ranked by consequence, with proposed corrections and acceptance criteria. A findings readout with your investment and engineering teams.' },
    ],
    example: {
      observation: 'A feature uses a revised fundamental value before its publication timestamp.',
      implication: 'The affected backtest does not establish a tradable historical result.',
      action: 'Rebuild the feature from point-in-time data, rerun the affected tests and compare the corrected result before proceeding.',
    },
    experience: 'I lead QuantJourney, where my team and I build the Backtester and its research infrastructure. The engine and my published research make the implementation choices behind this review approach inspectable.',
    evidence: [
      { title: 'QuantJourney Backtester', text: 'Execution timing, cost models, diagnostics and reproducible research workflows.', href: 'https://backtester.quantjourney.cloud/' },
      { title: 'Research behind the Backtester', text: 'My account of the engine and the assumptions that shape a backtest.', href: 'https://quantjourney.substack.com/p/quantjourney-backtester-is-now-open' },
    ],
    materials: 'Strategy specification, source code and environment, data provenance, trial logs, return series, positions and trade records. We agree secure access and confidentiality before transfer.',
    boundary: 'Tests depend on the evidence available. Missing search history limits selection-bias analysis; simulated fills limit capacity conclusions. These limits appear in the report. Remediation coding and live execution trials are scoped separately.',
    contact: 'Bring the strategy, its current evidence and the decision deadline. We will establish the review boundary, access requirements and fixed fee.',
  },
  'systems-architecture': {
    lead: 'Make research, portfolio, risk and execution operate from a consistent, traceable investment state.',
    audience: 'For CTOs, COOs, investment heads and platform teams deciding what to build, buy or replace.',
    decision: 'A target architecture and delivery sequence that make ownership, operating risk and implementation trade-offs explicit.',
    startingScope: 'One investment platform and a defined set of critical workflows, from current-state assessment to an implementation roadmap.',
    areas: [
      { title: 'Investment state and ownership', text: 'Investment book of record (IBOR), portfolio management (PMS), positions, cash, valuations and corporate actions. Define authoritative records, reconciliation rules and component responsibilities.' },
      { title: 'Data and decision lineage', text: 'Point-in-time and bitemporal history, identifiers, data contracts and entitlements. Trace research inputs through portfolio decisions, risk calculations and reporting.' },
      { title: 'Execution and operational controls', text: 'Order and execution management (OMS/EMS), pre-trade checks, approvals and order lifecycles. Examine idempotency, late events, corrections, replay and recovery.' },
      { title: 'Production and controlled AI access', text: 'Service boundaries, APIs, observability, deployment and recovery objectives. Where agents are in scope: MCP, OAuth, scoped permissions, tool audit trails and approval boundaries.' },
    ],
    method: [
      { title: 'Map the decision', text: 'Agree users, workflows, operating constraints and success criteria. Identify critical paths and the cost of failure.' },
      { title: 'Trace the current system', text: 'Walk representative trades, cash movements and corrections across components. Compare documented architecture with actual records and handoffs.' },
      { title: 'Design and test the options', text: 'Compare build, buy and replace choices. Specify interfaces and invariants; use targeted prototypes or replay tests where agreed to resolve material uncertainty.' },
      { title: 'Sequence delivery', text: 'Define migration stages, reconciliation gates, rollback conditions and ownership. Review the proposed architecture and roadmap with your team.' },
    ],
    outputs: [
      { title: 'Current-state assessment', text: 'System and data-flow maps, duplicated responsibilities, reconciliation gaps and operational dependencies, prioritised by investment and delivery impact.' },
      { title: 'Architecture proposal', text: 'Target components, state ownership, interface contracts and control boundaries. Decision records explain alternatives, assumptions and technical trade-offs.' },
      { title: 'Implementation roadmap', text: 'Work packages, dependencies, sequencing, effort ranges and acceptance criteria, including migration and parallel-run checks. A technical handover session.' },
    ],
    example: {
      observation: 'Risk and PMS apply a late trade correction at different times, with no shared portfolio version.',
      implication: 'The risk report and the decision screen can describe different portfolios.',
      action: 'Introduce explicit state versions and reconciliation gates; prove consistent replay before migrating the workflow.',
    },
    experience: 'At QuantJourney, my team and I build OneBook and financial-data infrastructure. My writing on portfolio systems explains the state, cash and history problems behind the architecture work.',
    evidence: [
      { title: 'OneBook', text: 'Research, portfolio state, risk, decisions and execution in one investment workspace.', href: 'https://onebook.quantjourney.cloud/' },
      { title: 'Designing a real portfolio management system', text: 'My design notes on positions, cash and reconstructing portfolio history.', href: 'https://quantjourney.substack.com/p/designing-a-real-portfolio-management' },
    ],
    materials: 'Architecture diagrams, workflow examples, interface specifications, representative records, incident history and operating requirements. Sessions with investment, operations and engineering owners.',
    boundary: 'The starting engagement delivers the design and roadmap. Production implementation, vendor procurement and migration execution require a separate scope. Existing components are retained where the evidence supports them.',
    contact: 'Bring a workflow that is breaking down, the systems involved and the decision you need to make. We will define the architecture engagement around that boundary.',
  },
  'technology-due-diligence': {
    lead: 'Test the technology behind the investment case before you acquire, select or fund it.',
    audience: 'For investors, acquirers, family offices and investment firms assessing a company, platform or major technology commitment.',
    decision: 'An independent technical assessment of the claims, material risks and likely cost of operating and extending the system.',
    startingScope: 'One company or platform, its critical technical claims and an agreed set of product, model and operating workflows.',
    areas: [
      { title: 'Claims and model evidence', text: 'Reconcile the investment materials with working software, source code and test results. Examine model assumptions, validation design, reproducibility and dependence on manual intervention.' },
      { title: 'Data and dependencies', text: 'Provenance, provider concentration, usage restrictions and third-party or open-source dependencies. Identify continuity and commercial questions requiring contractual or legal review.' },
      { title: 'Engineering and control environment', text: 'Architecture, automated testing, CI/CD, access controls, secrets management, observability, incident response and recovery. Inspect evidence of operation and change, alongside design documents.' },
      { title: 'Economics and team resilience', text: 'Current operating costs, scaling assumptions, technical debt and extension effort. Assess key-person dependencies, ownership and the feasibility of the delivery roadmap.' },
    ],
    method: [
      { title: 'Define the investment questions', text: 'Agree the transaction or selection context, material claims, access level and deadline. Establish the evidence request list and review priorities.' },
      { title: 'Inspect and triangulate', text: 'Review the data room, code, architecture and operating records. Walk critical workflows with the team and reconcile interviews with documentary evidence.' },
      { title: 'Test material uncertainty', text: 'Select targeted reproduction, deployment, recovery or performance checks within scope. Estimate remediation and scaling costs with assumptions and ranges.' },
      { title: 'Deliver the independent view', text: 'Raise material issues as they emerge. Conduct a factual review, then present findings, unresolved questions and implications for the decision.' },
    ],
    outputs: [
      { title: 'Executive assessment', text: 'Strengths, material risks and unresolved claims, with implications for investment, vendor selection or the conditions required before proceeding.' },
      { title: 'Evidence and risk register', text: 'Each finding links the claim, evidence, severity, uncertainty and consequence. Distinguish verified observations from management statements and untested assumptions.' },
      { title: 'Remediation and follow-up plan', text: 'Priorities, indicative cost and effort ranges, dependencies and questions for management or legal advisers. A findings session with your decision makers.' },
    ],
    example: {
      observation: 'A platform is presented as reproducible, but historical outputs depend on overwritten vendor data and unversioned manual files.',
      implication: 'The historical claims cannot be independently reconstructed from the evidence provided.',
      action: 'Record the claim as unverified, scope the missing controls and define the evidence required before relying on it.',
    },
    experience: 'I lead QuantJourney and work on the research engines, data services and investment workflows behind its products. That engineering work informs the questions I ask and the evidence I request during diligence.',
    evidence: [
      { title: 'QuantJourney Backtester', text: 'An inspectable research engine with documented behaviour and release history.', href: 'https://backtester.quantjourney.cloud/' },
      { title: 'Controlled access to investment infrastructure', text: 'My writing on MCP access to portfolio, risk, data and research systems.', href: 'https://quantjourney.substack.com/p/ai-agent-native-investment-infrastructure' },
    ],
    materials: 'Investment or product materials, architecture and data-room documents, repository access, deployment and incident records, cost reports, dependency inventories and interviews with technical owners.',
    boundary: 'An interview-only review provides less assurance than code and runtime access; the report states the coverage achieved. Legal opinions, penetration testing and financial audit are separate workstreams.',
    contact: 'Bring the company or platform, the decision deadline and the claims that matter. We will agree the evidence access, review priorities and fixed fee.',
  },
};
