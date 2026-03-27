-- =============================================================================
-- Articles (KB + SOPs)
-- =============================================================================

insert into public.articles (id, title, body, type, category) values

('KB-1001', 'Refund Eligibility Policy',
'Customers are eligible for a full refund within 30 days of purchase if the product is unused and in original condition. Digital products are eligible for a refund within 7 days if not downloaded or activated. Refunds are processed to the original payment method within 5–10 business days. Exceptions may be granted at supervisor discretion for extenuating circumstances.',
'kb', 'Billing'),

('KB-1002', 'Return Window & Conditions',
'Physical products may be returned within 30 days of delivery. Items must be unused, in original packaging, and accompanied by proof of purchase. Damaged or defective items are eligible for return at any time within the first 90 days. Return shipping is covered by the company for defective items; customers cover shipping for change-of-mind returns. Once a return is received and inspected, a refund or replacement is issued within 3–5 business days.',
'kb', 'Returns'),

('KB-1003', 'Account Lockout Recovery',
'Accounts are locked after 5 consecutive failed login attempts. Customers can unlock their account via the self-service password reset link sent to their registered email. If the customer no longer has access to the registered email, identity verification is required: government-issued ID and the last 4 digits of the payment method on file. Recovery typically takes 1–2 business days. Agents cannot bypass identity verification under any circumstances.',
'kb', 'Technical Support'),

('KB-1004', 'Billing Adjustment Process',
'Billing adjustments may be issued for overcharges, duplicate charges, or pricing errors. Agents can issue adjustments up to $50 without supervisor approval. Adjustments above $50 require supervisor sign-off. The adjustment is applied as a credit to the customer''s account within 24 hours, or as a refund to the original payment method within 5–10 business days at the customer''s request. All adjustments must be logged with a reason code in the billing system.',
'kb', 'Billing'),

('KB-1005', 'Enterprise SLA Commitments',
'Enterprise customers on Gold or Platinum tiers are entitled to a 99.9% uptime SLA. Downtime exceeding the SLA threshold in any calendar month entitles the customer to a service credit of 10% of their monthly fee per hour of excess downtime, capped at 30% of the monthly fee. SLA credits must be requested within 30 days of the incident. Support response times: P1 (system down) — 1 hour; P2 (degraded) — 4 hours; P3 (minor) — 1 business day.',
'kb', 'Enterprise'),

('SOP-2001', 'Escalation to Tier 2 Procedure',
'Escalate to Tier 2 when: (1) the issue requires a billing adjustment above $50, (2) the customer has contacted support 3 or more times for the same issue, (3) the issue involves a technical fault that cannot be resolved with standard troubleshooting, or (4) the customer explicitly requests a supervisor. Before transferring: summarise the issue, document all steps already taken, and brief the Tier 2 agent. Do not place the customer on hold for more than 2 minutes without providing a status update.',
'sop', 'Escalations'),

('SOP-2002', 'Legal Threat Response Protocol',
'If a customer mentions legal action, a lawyer, or regulatory bodies (e.g. CFPB, BBB): (1) remain calm and do not admit fault or liability, (2) do not make any promises or commitments, (3) inform the customer that their concern has been noted and will be reviewed by the appropriate team, (4) immediately escalate to a supervisor and flag the interaction in the CRM as "legal sensitivity", (5) do not discuss the matter further on the call — direct all further communication to the legal team. Document the exact wording the customer used.',
'sop', 'Escalations'),

('SOP-2003', 'Supervisor Transfer Checklist',
'Before transferring to a supervisor: (1) verify the customer''s identity, (2) summarise the issue in 2–3 sentences in the CRM notes, (3) document all resolution attempts made, (4) confirm the supervisor is available — do not transfer to a queue without confirming availability, (5) introduce the supervisor to the customer by name, (6) do not disconnect until the customer confirms they are connected. After transfer: update the ticket status to "Escalated" and add your agent ID to the interaction log.',
'sop', 'Escalations'),

('SOP-2004', 'Billing Dispute Investigation Steps',
'(1) Pull the customer''s full billing history for the past 6 months. (2) Identify the disputed charge and cross-reference with the order or subscription record. (3) Check for duplicate transactions, failed payment retries, or pricing tier mismatches. (4) If a clear error is found, issue the adjustment per KB-1004. (5) If the charge appears valid, explain the charge in detail with reference to the customer''s plan or order. (6) If the customer disputes a valid charge and escalation criteria are met, follow SOP-2001. (7) Log all findings in the CRM regardless of outcome.',
'sop', 'Billing');


-- =============================================================================
-- Scenarios
-- =============================================================================

insert into public.scenarios (
  name, type, difficulty, estimated_minutes,
  objectives,
  customer_name, customer_tier, customer_sentiment, customer_prior_contacts
) values

-- Billing Issues — Beginner
(
  'Overcharged Invoice — Standard Correction',
  'Billing Issues', 'Beginner', 10,
  array[
    'Verify the customer''s identity and locate the invoice',
    'Identify the overcharge using billing history',
    'Issue a billing adjustment per KB-1004',
    'Confirm resolution and close the ticket'
  ],
  'Sandra Lee', 'Silver Member', 'Frustrated', 1
),

-- Billing Issues — Advanced
(
  'Billing Dispute — Tier 2 Escalation',
  'Billing Issues', 'Advanced', 20,
  array[
    'De-escalate an upset customer who has called multiple times',
    'Investigate a recurring billing discrepancy per SOP-2004',
    'Determine whether escalation criteria are met per SOP-2001',
    'Execute a warm transfer to Tier 2 per SOP-2003'
  ],
  'Marcus Webb', 'Gold Member', 'Angry', 4
),

-- Product Returns — Beginner
(
  'Defective Item Return Request',
  'Product Returns', 'Beginner', 10,
  array[
    'Confirm the item is within the 90-day defect return window',
    'Arrange a prepaid return label',
    'Offer replacement or refund per KB-1002',
    'Set accurate expectations on processing time'
  ],
  'Priya Nair', 'Standard', 'Neutral', 0
),

-- Product Returns — Intermediate
(
  'Return Outside Policy Window',
  'Product Returns', 'Intermediate', 15,
  array[
    'Explain the return policy clearly without being dismissive',
    'Assess whether an exception is warranted',
    'Negotiate an alternative resolution (store credit, partial refund)',
    'Document the outcome and reason code'
  ],
  'Tom Garfield', 'Standard', 'Disappointed', 2
),

-- Technical Support — Beginner
(
  'Password Reset & Account Lockout',
  'Technical Support', 'Beginner', 8,
  array[
    'Diagnose the lockout cause',
    'Walk the customer through the self-service reset flow',
    'Verify identity if email access is unavailable per KB-1003',
    'Confirm account access is restored before ending the call'
  ],
  'Jamie Okafor', 'Standard', 'Impatient', 0
),

-- Technical Support — Advanced
(
  'Integration Failure — Enterprise Client',
  'Technical Support', 'Advanced', 25,
  array[
    'Identify the scope of the integration failure',
    'Reference SLA commitments and applicable credits per KB-1005',
    'Coordinate with Tier 2 engineering team',
    'Communicate clearly without overpromising on resolution timeline'
  ],
  'Rachel Chen', 'Platinum Member', 'Concerned', 3
),

-- Escalations — Intermediate
(
  'Angry Customer Demands Manager',
  'Escalations', 'Intermediate', 15,
  array[
    'Attempt to resolve the issue before escalating',
    'Use de-escalation techniques to reduce hostility',
    'Determine if escalation criteria are met per SOP-2001',
    'Execute a warm supervisor transfer per SOP-2003'
  ],
  'Derek Mills', 'Silver Member', 'Angry', 3
),

-- Escalations — Advanced
(
  'Legal Threat — Billing Complaint',
  'Escalations', 'Advanced', 20,
  array[
    'Identify and respond appropriately to a legal threat per SOP-2002',
    'Avoid admitting liability while maintaining professionalism',
    'Escalate and flag the interaction correctly in the CRM',
    'De-escalate tension without making commitments'
  ],
  'Linda Houser', 'Gold Member', 'Hostile', 5
);
