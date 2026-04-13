export const id     = 'assessment';
export const name   = 'Comprehensive Assessment';
export const icon   = '📋';
export const desc   = 'M3 — Full bio-psycho-social-spiritual assessment across 8 domains with ASAM severity rating and Level of Care recommendation.';
export const status = 'live';
export const badge  = null;

/* ══════════════════════════════════════════════════════════════════════
   PATIENTS  (mirrors M1/M2 data — replace with shared store later)
   ══════════════════════════════════════════════════════════════════════ */
const PATIENTS = [
  { id: 'R001', name: 'Agnes Tembo',     age: 34, gender: 'Female', room: 'Room A, Bed 1', primarySubstance: 'Alcohol',    screeningFlag: 'red'   },
  { id: 'R002', name: 'Bernard Mwale',   age: 45, gender: 'Male',   room: 'Room A, Bed 2', primarySubstance: 'Cannabis',   screeningFlag: 'amber' },
  { id: 'R003', name: 'Catherine Lungu', age: 29, gender: 'Female', room: 'Room B, Bed 1', primarySubstance: 'Opioids',    screeningFlag: 'red'   },
  { id: 'R004', name: 'David Sakala',    age: 52, gender: 'Male',   room: 'Room B, Bed 2', primarySubstance: 'Alcohol',    screeningFlag: 'red'   },
  { id: 'R005', name: 'Esther Mutale',   age: 38, gender: 'Female', room: 'Room C, Bed 1', primarySubstance: 'Stimulants', screeningFlag: 'amber' },
];

/* ══════════════════════════════════════════════════════════════════════
   DOMAIN DEFINITIONS — 8 clinical domains
   ══════════════════════════════════════════════════════════════════════ */
const DOMAINS = [
  {
    id: 'D1', code: 'SUH', title: 'Substance Use History',
    icon: '🧪', color: '#dc2626',
    desc: 'Age of onset, substances used, frequency, route, duration, previous treatment',
    fields: [
      { id: 'primary_substance',    label: 'Primary Substance of Concern', type: 'select',
        options: ['Alcohol','Cannabis','Opioids (heroin/prescription)','Cocaine/Crack','Methamphetamine','Benzodiazepines','Tobacco/Nicotine','Khat','Multiple substances','Other'] },
      { id: 'age_first_use',        label: 'Age of First Use (years)', type: 'number', placeholder: 'e.g. 16' },
      { id: 'age_regular_use',      label: 'Age Regular Use Began (years)', type: 'number', placeholder: 'e.g. 19' },
      { id: 'years_dependent',      label: 'Years of Dependent Use', type: 'number', placeholder: 'e.g. 5' },
      { id: 'secondary_substances', label: 'Secondary / Co-used Substances', type: 'checkboxgroup',
        options: ['Alcohol','Cannabis','Opioids','Cocaine/Crack','Methamphetamine','Benzodiazepines','Tobacco','Khat','Inhalants','Other'] },
      { id: 'route_of_admin',       label: 'Route of Administration (primary substance)', type: 'checkboxgroup',
        options: ['Oral','Smoked/inhaled','Intranasal (snorted)','Intravenous (injected)','Subcutaneous','Sublingual','Other'] },
      { id: 'frequency',            label: 'Current Frequency of Use', type: 'select',
        options: ['Not using currently','Less than monthly','Monthly','2-3 times per month','Weekly','Several times per week','Daily','Multiple times daily'] },
      { id: 'quantity',             label: 'Typical Quantity per Use Session', type: 'textarea', placeholder: 'e.g. Half a bottle of spirits, 2-3 joints...' },
      { id: 'longest_abstinence',   label: 'Longest Period of Abstinence', type: 'text', placeholder: 'e.g. 6 months in 2021' },
      { id: 'triggers',             label: 'Known Triggers / High-Risk Situations', type: 'textarea', placeholder: 'Stress, social settings, certain people, emotions...' },
      { id: 'withdrawal_history',   label: 'Previous Withdrawal Symptoms', type: 'checkboxgroup',
        options: ['None','Sweating/shaking','Nausea/vomiting','Seizures','Hallucinations','Delirium tremens (DTs)','Severe cravings','Anxiety/panic','Other'] },
      { id: 'previous_treatment',   label: 'Previous Treatment Episodes', type: 'select',
        options: ['None','Outpatient counselling only','Outpatient programme','Intensive outpatient (IOP)','Residential/inpatient','Detoxification only','Multiple episodes'] },
      { id: 'previous_treatment_detail', label: 'Previous Treatment Details (where, when, outcome)', type: 'textarea', placeholder: 'Facility name, year, duration, reason for discharge...' },
      { id: 'relapse_history',      label: 'Relapse History', type: 'textarea', placeholder: 'Number of relapses, circumstances, duration between episodes...' },
    ]
  },
  {
    id: 'D2', code: 'MED', title: 'Medical & Physical Health',
    icon: '🏥', color: '#2563eb',
    desc: 'Current medical conditions, medications, vital signs, infectious disease, physical health review',
    fields: [
      { id: 'current_medical',      label: 'Current Medical Conditions / Diagnoses', type: 'textarea', placeholder: 'e.g. Hypertension, Diabetes Type 2, Liver cirrhosis...' },
      { id: 'current_medications',  label: 'Current Prescribed Medications', type: 'textarea', placeholder: 'Medication name, dose, frequency, prescribing doctor...' },
      { id: 'allergies',            label: 'Known Allergies / Adverse Reactions', type: 'textarea', placeholder: 'Drug allergies, food allergies, reactions...' },
      { id: 'infectious_disease',   label: 'Infectious Disease Screening', type: 'checkboxgroup',
        options: ['HIV - Negative','HIV - Positive','HIV - Not tested','Hepatitis B - Negative','Hepatitis B - Positive','Hepatitis B - Not tested','Hepatitis C - Negative','Hepatitis C - Positive','Hepatitis C - Not tested','TB - Screened negative','TB - Active','TB - Not screened','STI - None identified','STI - Under treatment'] },
      { id: 'iv_drug_use_risk',     label: 'IV Drug Use / Needle Sharing Risk', type: 'select',
        options: ['No IV drug use','IV use - personal equipment only','IV use - shared equipment previously','Currently sharing equipment','Unknown'] },
      { id: 'overdose_history',     label: 'History of Overdose', type: 'select',
        options: ['None','One episode','Multiple episodes','Recent episode (within 3 months)'] },
      { id: 'overdose_detail',      label: 'Overdose Details (if applicable)', type: 'textarea', placeholder: 'Substance involved, date, required hospitalisation...' },
      { id: 'physical_complaints',  label: 'Current Physical Complaints / Symptoms', type: 'textarea', placeholder: 'Pain, fatigue, nausea, withdrawal symptoms...' },
      { id: 'nutrition_status',     label: 'Nutritional Status', type: 'select',
        options: ['Adequate - no concerns','Mild malnutrition / weight loss','Moderate malnutrition','Severe malnutrition - support required','Under assessment'] },
      { id: 'pregnancy_status',     label: 'Pregnancy Status (if applicable)', type: 'select',
        options: ['N/A - Male','Not pregnant','Pregnant - weeks unknown','Pregnant - specify weeks','Post-partum (within 12 months)','Unknown'] },
      { id: 'mat_indicated',        label: 'Medication-Assisted Treatment (MAT) Indicated?', type: 'select',
        options: ['No - not indicated','Yes - Nicotine Replacement Therapy','Yes - Methadone','Yes - Buprenorphine/Naloxone','Yes - Naltrexone (oral)','Yes - Naltrexone (depot injection)','Yes - Acamprosate','Yes - Disulfiram','Yes - Psychiatric medication (specify in notes)','Requires Psychiatrist assessment'] },
      { id: 'medical_notes',        label: 'Additional Medical Notes / Clinician Observations', type: 'textarea', placeholder: 'Any other relevant medical information...' },
    ]
  },
  {
    id: 'D3', code: 'MHX', title: 'Mental Health History',
    icon: '🧠', color: '#7c3aed',
    desc: 'Psychiatric diagnoses, mood disorders, psychosis, suicidality, previous mental health treatment',
    fields: [
      { id: 'psych_diagnoses',      label: 'Previous / Current Psychiatric Diagnoses (ICD-11)', type: 'checkboxgroup',
        options: ['None known','Major Depressive Disorder (6A70)','Bipolar I (6A60)','Bipolar II (6A61)','Generalised Anxiety Disorder (6B00)','PTSD (6B40)','Complex PTSD (6B41)','Schizophrenia (6A20)','Schizoaffective Disorder (6A21)','ADHD (6A05)','Borderline Personality Disorder (6D11.5)','Panic Disorder (6B01)','Social Anxiety Disorder (6B04)','OCD (6B20)','Eating Disorder','Other'] },
      { id: 'mh_treatment_history', label: 'Previous Mental Health Treatment', type: 'textarea', placeholder: 'Psychiatrist, psychologist, counsellor - where, when, for how long...' },
      { id: 'current_psych_meds',   label: 'Current Psychiatric Medications', type: 'textarea', placeholder: 'Name, dose, frequency, prescribing psychiatrist...' },
      { id: 'mood_current',         label: 'Current Mood (Patient Self-Report)', type: 'select',
        options: ['Euthymic (normal)','Mildly depressed','Moderately depressed','Severely depressed','Elevated / Hypomanic','Manic','Anxious','Irritable','Labile (fluctuating)','Flat / Blunted'] },
      { id: 'suicidal_ideation',    label: 'Suicidal Ideation (current)', type: 'select',
        options: ['None reported','Passive ideation - no plan','Active ideation - no plan','Active ideation - with plan','Recent attempt (within 3 months)','Past attempt (>3 months ago)','Multiple past attempts'] },
      { id: 'suicide_risk_detail',  label: 'Suicide Risk Detail / Safety Plan Notes', type: 'textarea', placeholder: 'Describe ideation, plan, means, intent, protective factors...' },
      { id: 'self_harm',            label: 'Non-Suicidal Self-Injury (NSSI)', type: 'select',
        options: ['None','Past history - not current','Current - low frequency','Current - moderate frequency','Current - high frequency / severe'] },
      { id: 'psychosis_screen',     label: 'Psychotic Symptoms', type: 'checkboxgroup',
        options: ['None','Auditory hallucinations','Visual hallucinations','Persecutory delusions','Grandiose delusions','Thought disorder','Disorganised behaviour','Negative symptoms','Substance-induced psychosis suspected'] },
      { id: 'dual_diagnosis_flag',  label: 'Co-occurring Disorder (Dual Diagnosis) Suspected?', type: 'select',
        options: ['No - SUD only','Yes - mood disorder','Yes - anxiety disorder','Yes - psychotic disorder','Yes - personality disorder','Yes - neurodevelopmental (ADHD/ASD)','Yes - multiple co-occurring','Requires Psychiatrist evaluation'] },
      { id: 'psych_referral',       label: 'Psychiatrist Referral Required?', type: 'select',
        options: ['No','Yes - routine (within 7 days)','Yes - urgent (within 24-48 hours)','Yes - emergency (immediate)'] },
      { id: 'mh_notes',             label: 'Mental Health Clinician Notes', type: 'textarea', placeholder: 'MSE observations, risk formulation, other relevant notes...' },
    ]
  },
  {
    id: 'D4', code: 'TRX', title: 'Trauma History',
    icon: '🛡️', color: '#b45309',
    desc: 'ACEs, trauma types, trauma-informed care needs, safety assessment',
    fields: [
      { id: 'trauma_types',         label: 'Types of Trauma Experienced', type: 'checkboxgroup',
        options: ['None disclosed','Physical abuse (childhood)','Physical abuse (adult)','Sexual abuse (childhood)','Sexual abuse (adult)','Emotional/psychological abuse','Neglect (childhood)','Domestic violence','Witnessing violence','Community violence / crime','War / conflict','Bereavement / complicated grief','Serious accident / injury','Medical trauma','Natural disaster','Trafficking','Other'] },
      { id: 'trauma_age_onset',     label: 'Age at First Trauma (approximate)', type: 'text', placeholder: 'e.g. Childhood (under 10), Early adulthood' },
      { id: 'trauma_ongoing',       label: 'Is the Traumatic Situation Ongoing?', type: 'select',
        options: ['No - historical only','Yes - domestic violence ongoing','Yes - other ongoing threat','Unclear','Patient declined to disclose'] },
      { id: 'ptsd_symptoms',        label: 'PTSD / Trauma Symptoms Reported', type: 'checkboxgroup',
        options: ['None','Intrusive memories / flashbacks','Nightmares','Emotional numbing','Avoidance of reminders','Hypervigilance / startle response','Sleep disturbance','Dissociation','Emotional dysregulation','Anger / irritability','Shame / guilt','Trust difficulties'] },
      { id: 'aces_score',           label: 'Adverse Childhood Experiences (ACEs) Score (0-10)', type: 'select',
        options: ['0 - None','1','2','3','4 - Elevated risk','5','6','7','8','9','10 - Very high exposure','Not assessed'] },
      { id: 'substance_trauma_link', label: 'Patient Identifies Link Between Trauma and Substance Use?', type: 'select',
        options: ['No connection identified','Possibly connected','Clearly connected - uses to cope','Clearly connected - uses to numb','Unsure / not ready to explore'] },
      { id: 'safety_current',       label: 'Current Safety Status', type: 'select',
        options: ['Safe - no current threat','At risk - domestic violence','At risk - other perpetrator','At risk - self-harm','At risk - multiple threats','Safety plan in place','Referral to social services made'] },
      { id: 'trauma_informed_needs', label: 'Specific Trauma-Informed Care Accommodations Needed', type: 'textarea', placeholder: 'Gender of therapist preference, room allocation, session structure, triggers to avoid...' },
      { id: 'trauma_notes',         label: 'Trauma Clinician Notes', type: 'textarea', placeholder: 'Formulation, risk factors, protective factors, recommendations...' },
    ]
  },
  {
    id: 'D5', code: 'SOC', title: 'Social & Family History',
    icon: '👨‍👩‍👧', color: '#059669',
    desc: 'Family system, social support, living situation, employment, legal, cultural context',
    fields: [
      { id: 'living_situation',     label: 'Current Living Situation', type: 'select',
        options: ['Own home / rented accommodation','With family (parents/siblings)','With partner','With friends','Hostel / shelter','Homeless / no fixed address','Correctional facility','Hospital / inpatient','Other'] },
      { id: 'household_composition', label: 'Household Members', type: 'textarea', placeholder: 'Who lives with the patient? Ages, relationship, any dependents...' },
      { id: 'family_sud_history',   label: 'Family History of Substance Use Disorder', type: 'checkboxgroup',
        options: ['None known','Father','Mother','Sibling(s)','Grandparent(s)','Extended family','Partner / spouse','Multiple family members'] },
      { id: 'family_mh_history',    label: 'Family History of Mental Illness', type: 'checkboxgroup',
        options: ['None known','Depression','Bipolar Disorder','Schizophrenia','Anxiety Disorder','Suicide','Other'] },
      { id: 'social_support',       label: 'Social Support Level', type: 'select',
        options: ['Strong - multiple supportive relationships','Moderate - some support','Limited - few supportive contacts','Isolated - no meaningful support','Support but complicated (enabling relationships)'] },
      { id: 'support_persons',      label: 'Key Support Person(s) / Emergency Contact', type: 'textarea', placeholder: 'Name, relationship, contact number, willingness to be involved...' },
      { id: 'marital_status',       label: 'Marital / Relationship Status', type: 'select',
        options: ['Single','In a relationship (not cohabiting)','Cohabiting','Married','Separated','Divorced','Widowed'] },
      { id: 'children',             label: 'Children / Dependents', type: 'text', placeholder: 'Number, ages, in care? Living with patient?' },
      { id: 'child_protection',     label: 'Child Protection Concerns?', type: 'select',
        options: ['No concerns','Concerns identified - social worker notified','Social services already involved','Children in foster care / removed','N/A - no children'] },
      { id: 'employment_status',    label: 'Employment Status', type: 'select',
        options: ['Full-time employed','Part-time employed','Self-employed','Unemployed - seeking work','Unemployed - not seeking','Student','Retired','Unable to work (disability)','Informal employment','Other'] },
      { id: 'financial_situation',  label: 'Financial Situation', type: 'select',
        options: ['Stable - no concerns','Mild difficulties','Significant debt / financial stress','Severe - unable to meet basic needs','Reliant on family / others','Social grants only'] },
      { id: 'legal_issues',         label: 'Current / Past Legal Issues', type: 'checkboxgroup',
        options: ['None','Awaiting trial','Probation / parole','Community service order','Drug offence(s)','Violence offence(s)','Property offence(s)','DUI / road offence','Court-ordered treatment','Past convictions - completed','Civil / family court matters'] },
      { id: 'education_level',      label: 'Highest Education Level', type: 'select',
        options: ['No formal education','Primary (incomplete)','Primary (complete)','Secondary (incomplete)','Secondary (complete / Grade 12)','Certificate / vocational','Diploma','Degree','Postgraduate'] },
      { id: 'cultural_background',  label: 'Cultural / Ethnic Background & Relevant Considerations', type: 'textarea', placeholder: 'Language preference, cultural practices, traditional beliefs relevant to treatment...' },
      { id: 'social_notes',         label: 'Social Worker / Clinician Notes', type: 'textarea', placeholder: 'Family dynamics, social determinants of health, referrals made...' },
    ]
  },
  {
    id: 'D6', code: 'PSY', title: 'Psychological & Cognitive',
    icon: '🔬', color: '#6366f1',
    desc: 'Coping styles, motivation for change, cognitive functioning, personality factors',
    fields: [
      { id: 'motivation_stage',     label: 'Stage of Change (Prochaska & DiClemente)', type: 'select',
        options: ['Pre-contemplation - not considering change','Contemplation - thinking about change','Preparation - planning to change','Action - actively making changes','Maintenance - sustaining change','Relapse - returned to use'] },
      { id: 'readiness_score',      label: 'Readiness to Change Score (1-10, patient self-rate)', type: 'select',
        options: ['1 - Not at all ready','2','3','4','5 - Somewhat ready','6','7','8','9','10 - Completely ready'] },
      { id: 'importance_score',     label: 'Importance of Change Score (1-10, patient self-rate)', type: 'select',
        options: ['1 - Not at all important','2','3','4','5 - Somewhat important','6','7','8','9','10 - Extremely important'] },
      { id: 'confidence_score',     label: 'Confidence in Ability to Change Score (1-10, patient self-rate)', type: 'select',
        options: ['1 - Not at all confident','2','3','4','5 - Somewhat confident','6','7','8','9','10 - Completely confident'] },
      { id: 'coping_styles',        label: 'Predominant Coping Styles', type: 'checkboxgroup',
        options: ['Problem-focused coping','Emotional regulation','Social support seeking','Avoidance / escape','Substance use to cope','Distraction','Denial / minimisation','Spiritual coping','Physical activity','Creative expression'] },
      { id: 'strengths',            label: 'Personal Strengths & Protective Factors', type: 'textarea', placeholder: 'Intelligence, insight, resilience, vocational skills, family support, spirituality...' },
      { id: 'treatment_goals_patient', label: 'Patient\'s Own Goals for Treatment', type: 'textarea', placeholder: 'What does the patient hope to achieve? In their own words...' },
      { id: 'barriers_to_treatment', label: 'Identified Barriers to Treatment Engagement', type: 'checkboxgroup',
        options: ['None identified','Ambivalence about change','Stigma concerns','Family resistance','Work / financial obligations','Transport difficulties','Childcare responsibilities','Previous negative treatment experience','Distrust of services','Language / communication barriers','Other'] },
      { id: 'cognitive_screening',  label: 'Cognitive Screening Result (if administered)', type: 'select',
        options: ['Not administered','MMSE - within normal limits','MMSE - mild impairment','MMSE - moderate impairment','MMSE - severe impairment','MOCA - within normal limits','MOCA - below threshold','Other screen administered (see notes)'] },
      { id: 'psych_notes',          label: 'Psychologist / Counsellor Notes', type: 'textarea', placeholder: 'Formulation, MI strategies used, therapeutic alliance, recommendations...' },
    ]
  },
  {
    id: 'D7', code: 'SPI', title: 'Spiritual & Cultural',
    icon: '✨', color: '#0891b2',
    desc: 'Spiritual beliefs, cultural identity, meaning-making, community connection',
    fields: [
      { id: 'religious_affiliation', label: 'Religious / Spiritual Affiliation', type: 'select',
        options: ['None / Secular','Christian - Catholic','Christian - Protestant','Christian - Pentecostal/Charismatic','Christian - Seventh-Day Adventist','Christian - Other','Islam','African Traditional Religion','Hinduism','Buddhism','Multiple / Syncretic','Spiritual but not religious','Other','Prefer not to say'] },
      { id: 'spirituality_importance', label: 'Importance of Spirituality/Religion to Patient', type: 'select',
        options: ['Not important','Slightly important','Moderately important','Very important','Central to identity and recovery'] },
      { id: 'spiritual_community',  label: 'Active Participation in Religious/Spiritual Community', type: 'select',
        options: ['No','Occasional','Regular (weekly+)','Very active / leadership role','Was active - lapsed due to substance use','Wishes to reconnect'] },
      { id: 'spiritual_coping',     label: 'Uses Spiritual Practices as Coping?', type: 'select',
        options: ['No','Prayer','Meditation / mindfulness','Scripture / sacred reading','Community worship','Fasting','Traditional healing practices','Other'] },
      { id: 'traditional_healer',   label: 'Involvement with Traditional / Faith Healer', type: 'select',
        options: ['None','Past involvement - not currently','Current involvement','Plans to involve during treatment','Family pressure to use traditional healer'] },
      { id: 'cultural_values',      label: 'Cultural Values Relevant to Treatment', type: 'textarea', placeholder: 'Family decision-making norms, gender roles, community obligations, stigma in cultural context...' },
      { id: 'meaning_purpose',      label: 'Patient\'s Sense of Meaning / Purpose', type: 'textarea', placeholder: 'What gives the patient\'s life meaning? What are they living for?' },
      { id: 'spiritual_concerns',   label: 'Spiritual Concerns or Conflicts', type: 'textarea', placeholder: 'Guilt, shame, feeling abandoned by God, conflict between beliefs and behaviour...' },
      { id: 'chaplain_referral',    label: 'Chaplain / Spiritual Care Referral Indicated?', type: 'select',
        options: ['No','Yes - patient requested','Yes - clinician recommended','Yes - both agreed'] },
      { id: 'cultural_notes',       label: 'Cultural / Spiritual Clinician Notes', type: 'textarea', placeholder: 'Cultural formulation, integration with treatment plan, accommodations...' },
    ]
  },
  {
    id: 'D8', code: 'ASAM', title: 'ASAM Severity Rating',
    icon: '⚖️', color: '#b45309',
    desc: 'ASAM 6-dimension severity scoring to determine Level of Care recommendation',
    isAsam: true,
    dimensions: [
      {
        id: 'dim1', num: '1', title: 'Acute Intoxication & Withdrawal Potential',
        desc: 'Risk and severity of current intoxication or withdrawal',
        levels: [
          { v: 0, l: '0 — None: No current intoxication; no withdrawal risk' },
          { v: 1, l: '1 — Mild: Mild intoxication or minimal withdrawal risk; manageable without medical monitoring' },
          { v: 2, l: '2 — Moderate: Moderate withdrawal risk; requires 24h monitoring but not round-the-clock nursing' },
          { v: 3, l: '3 — Significant: Significant withdrawal risk; needs 24h nursing care and medical monitoring' },
          { v: 4, l: '4 — Severe: Severe withdrawal (e.g. DTs, seizure risk); requires medically managed withdrawal' },
        ]
      },
      {
        id: 'dim2', num: '2', title: 'Biomedical Conditions & Complications',
        desc: 'Physical health conditions affecting treatment',
        levels: [
          { v: 0, l: '0 — None: No physical health concerns' },
          { v: 1, l: '1 — Mild: Minor physical conditions; no impact on SUD treatment setting' },
          { v: 2, l: '2 — Moderate: Stable chronic conditions; requires monitoring during treatment' },
          { v: 3, l: '3 — Significant: Conditions require daily nursing attention during SUD treatment' },
          { v: 4, l: '4 — Severe: Acute medical illness requiring parallel medical hospitalisation' },
        ]
      },
      {
        id: 'dim3', num: '3', title: 'Emotional, Behavioural & Cognitive Conditions',
        desc: 'Mental health and cognitive functioning',
        levels: [
          { v: 0, l: '0 — None: No mental health or cognitive concerns' },
          { v: 1, l: '1 — Mild: Mild emotional/behavioural issues; manageable with standard counselling' },
          { v: 2, l: '2 — Moderate: Moderate psychiatric symptoms; require co-occurring treatment' },
          { v: 3, l: '3 — Significant: Significant psychiatric comorbidity; requires psychiatric consultation' },
          { v: 4, l: '4 — Severe: Unstable psychiatric condition; requires dual-diagnosis inpatient care' },
        ]
      },
      {
        id: 'dim4', num: '4', title: 'Readiness to Change',
        desc: 'Motivation and engagement with treatment',
        levels: [
          { v: 0, l: '0 — Ready: Highly motivated; active engagement with recovery goals' },
          { v: 1, l: '1 — Ambivalent: Some motivation but inconsistent; benefits from motivational enhancement' },
          { v: 2, l: '2 — Variable: Inconsistent motivation; needs intensive motivational support' },
          { v: 3, l: '3 — Resistant: Minimal insight; oppositional; may need intensively structured programme' },
          { v: 4, l: '4 — No Motivation: Completely resistant; unable to engage voluntarily' },
        ]
      },
      {
        id: 'dim5', num: '5', title: 'Relapse / Continued Use Potential',
        desc: 'Risk of relapse or continued problematic use',
        levels: [
          { v: 0, l: '0 — Low: Strong recovery capital; low relapse risk; effective coping skills' },
          { v: 1, l: '1 — Mild: Some relapse risk; manageable with outpatient monitoring' },
          { v: 2, l: '2 — Moderate: Moderate relapse risk; triggers identified; needs structured support' },
          { v: 3, l: '3 — High: High relapse risk; poor coping; needs intensive structure and monitoring' },
          { v: 4, l: '4 — Imminent: Active craving/use; unable to maintain abstinence; needs 24h structure' },
        ]
      },
      {
        id: 'dim6', num: '6', title: 'Recovery / Living Environment',
        desc: 'Safety and support of the living environment',
        levels: [
          { v: 0, l: '0 — Supportive: Safe, stable environment; strong recovery support network' },
          { v: 1, l: '1 — Mildly unsupportive: Minor environmental stressors; manageable with outpatient support' },
          { v: 2, l: '2 — Unsupportive: Environment makes recovery difficult; requires intensive outpatient or sober living' },
          { v: 3, l: '3 — Dangerous: Unsafe or enabling environment; residential placement indicated' },
          { v: 4, l: '4 — Hostile: Severely dangerous environment; immediate residential care required for safety' },
        ]
      },
    ]
  },
];

/* ══════════════════════════════════════════════════════════════════════
   ASAM LEVEL OF CARE LOGIC
   ══════════════════════════════════════════════════════════════════════ */
function calcLevelOfCare(scores) {
  const vals = Object.values(scores).map(Number);
  if (vals.length < 6) return null;
  const max  = Math.max(...vals);
  const avg  = vals.reduce((a, b) => a + b, 0) / 6;
  const dim1 = Number(scores.dim1 || 0);
  const dim3 = Number(scores.dim3 || 0);

  if (max >= 4 || dim1 >= 4)
    return { level: 'IV', label: 'Level IV — Medically Managed Intensive Inpatient',
             color: '#dc2626',
             desc: 'Round-the-clock medical monitoring required. Acute medical or psychiatric instability. Immediate referral to hospital-level care.',
             services: ['24/7 medical & nursing supervision','Medically managed withdrawal','Psychiatric emergency protocols','Daily MDT review'] };

  if (max >= 3 || dim3 >= 3)
    return { level: 'III', label: 'Level III — Medically Monitored Intensive Inpatient / Residential',
             color: '#ea580c',
             desc: 'Residential placement indicated. High severity across multiple dimensions. 24-hour structure with clinical oversight.',
             services: ['Residential treatment programme','Daily clinical contact','Integrated dual-diagnosis care','Structured therapeutic milieu'] };

  if (avg >= 2 || max >= 2)
    return { level: 'II', label: 'Level II — Intensive Outpatient / Partial Hospitalisation',
             color: '#d97706',
             desc: 'Moderate severity. Structured day programme (9-20 hours per week). Stable enough to live at home or in sober living.',
             services: ['Intensive Outpatient Programme (IOP)','Group therapy (3-5 days/week)','Individual counselling','Family therapy','MAT review'] };

  if (avg >= 1)
    return { level: 'I', label: 'Level I — Outpatient Services',
             color: '#2563eb',
             desc: 'Mild to moderate severity. Standard outpatient counselling and monitoring.',
             services: ['Weekly individual counselling','Group therapy','Psychoeducation','MAT if indicated','Peer support'] };

  return { level: '0.5', label: 'Level 0.5 — Early Intervention',
           color: '#059669',
           desc: 'Low severity. Education and brief intervention sufficient.',
           services: ['Brief intervention (1-4 sessions)','Psychoeducation','Alcohol/drug information','Self-help resources'] };
}

/* ══════════════════════════════════════════════════════════════════════
   MODULE STATE
   ══════════════════════════════════════════════════════════════════════ */
let state = {
  view: 'select',
  patient: null,
  currentDomain: null,
  assessments: {},
};

function getAssessment(pid) {
  if (!state.assessments[pid]) {
    state.assessments[pid] = { domains: {}, asam: {}, completedAt: null };
  }
  return state.assessments[pid];
}

function domainProgress(pid) {
  const a     = getAssessment(pid);
  const total = DOMAINS.length;
  const done  = DOMAINS.filter(d => {
    if (d.isAsam) return Object.keys(a.asam).length === 6;
    return !!a.domains[d.id] && Object.keys(a.domains[d.id]).length > 0;
  }).length;
  return { done, total, pct: Math.round((done / total) * 100) };
}

/* ══════════════════════════════════════════════════════════════════════
   RENDER ENTRY
   ══════════════════════════════════════════════════════════════════════ */
export function render(container) {
  container.innerHTML = '';
  container.className = 'as-root';

  if (state.view === 'select')   renderSelectPatient(container);
  else if (state.view === 'overview') renderOverview(container);
  else if (state.view === 'domain')   renderDomain(container);
  else if (state.view === 'summary')  renderSummary(container);

  bindEvents(container);
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: SELECT PATIENT
   ══════════════════════════════════════════════════════════════════════ */
function renderSelectPatient(container) {
  container.innerHTML = `
    <div class="as-header">
      <div class="as-header-inner">
        <div class="as-title-row">
          <span class="as-icon">📋</span>
          <div>
            <h1 class="as-title">Comprehensive Assessment</h1>
            <p class="as-subtitle">M3 — Bio-psycho-social-spiritual assessment with ASAM Level of Care</p>
          </div>
        </div>
      </div>
    </div>
    <div class="as-body">
      <div class="as-patient-intro">
        <h2 class="as-section-title">Select Patient to Assess</h2>
        <p class="as-section-sub">Patients flagged 🔴 by M2 Screening are prioritised for comprehensive assessment. All current residents may be assessed.</p>
      </div>
      <div class="as-patient-cards">
        ${PATIENTS.map(p => {
          const prog = domainProgress(p.id);
          const flagEmoji = p.screeningFlag === 'red' ? '🔴' : p.screeningFlag === 'amber' ? '🟡' : '🟢';
          const flagLabel = p.screeningFlag === 'red' ? 'M2 Escalation' : p.screeningFlag === 'amber' ? 'Brief Intervention' : 'Low Risk';
          const statusText = prog.done === 0 ? 'Not started' : prog.done === prog.total ? '✅ Complete' : `${prog.done}/${prog.total} domains`;
          return `
          <div class="as-patient-card${p.screeningFlag === 'red' ? ' as-card--urgent' : ''}" data-action="select-patient" data-pid="${p.id}">
            <div class="as-card-left">
              <div class="as-card-avatar">${p.name.charAt(0)}</div>
            </div>
            <div class="as-card-body">
              <div class="as-card-name">${p.name} <span class="as-card-id">${p.id}</span></div>
              <div class="as-card-meta">${p.age}y · ${p.gender} · ${p.room}</div>
              <div class="as-card-meta">Primary substance: <strong>${p.primarySubstance}</strong></div>
              <div class="as-card-flags">
                <span class="as-flag">${flagEmoji} ${flagLabel}</span>
                <span class="as-flag as-flag--prog">${statusText}</span>
              </div>
            </div>
            ${prog.done > 0 ? `
            <div class="as-card-prog">
              <div class="as-prog-ring">
                <svg viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" stroke-width="3"/>
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#1e40af" stroke-width="3"
                    stroke-dasharray="${Math.round(prog.pct * 0.942)} 94.2"
                    stroke-linecap="round" transform="rotate(-90 18 18)"/>
                </svg>
                <span class="as-prog-pct">${prog.pct}%</span>
              </div>
            </div>` : ''}
            <div class="as-card-arrow">›</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: DOMAIN OVERVIEW
   ══════════════════════════════════════════════════════════════════════ */
function renderOverview(container) {
  const p    = PATIENTS.find(x => x.id === state.patient);
  const prog = domainProgress(p.id);
  const a    = getAssessment(p.id);
  const loc  = Object.keys(a.asam).length === 6 ? calcLevelOfCare(a.asam) : null;

  container.innerHTML = `
    <div class="as-header">
      <div class="as-header-inner">
        <button class="as-back" data-action="go-select">← All Patients</button>
        <div class="as-title-row">
          <span class="as-icon">📋</span>
          <div>
            <h1 class="as-title">${p.name} — Comprehensive Assessment</h1>
            <p class="as-subtitle">${p.id} · ${p.primarySubstance} · ${p.room}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="as-body">
      <div class="as-progress-banner">
        <div class="as-pb-left">
          <div class="as-pb-bar-wrap"><div class="as-pb-bar" style="width:${prog.pct}%"></div></div>
          <span class="as-pb-label">${prog.done} of ${prog.total} domains completed · ${prog.pct}%</span>
        </div>
        ${prog.done === prog.total ? `<button class="as-btn as-btn--primary" data-action="go-summary">View Assessment Summary →</button>` : ''}
      </div>

      ${loc ? `
      <div class="as-loc-banner" style="border-left-color:${loc.color}">
        <div class="as-loc-left">
          <div class="as-loc-label">ASAM Recommended Level of Care</div>
          <div class="as-loc-level" style="color:${loc.color}">${loc.label}</div>
          <div class="as-loc-desc">${loc.desc}</div>
        </div>
        <button class="as-btn as-btn--outline" data-action="go-asam">Review ASAM →</button>
      </div>` : ''}

      <h2 class="as-section-title" style="margin-bottom:0.75rem">Assessment Domains</h2>
      <div class="as-domain-grid">
        ${DOMAINS.map(d => {
          let complete = false;
          if (d.isAsam) complete = Object.keys(a.asam).length === 6;
          else complete = !!a.domains[d.id] && Object.keys(a.domains[d.id]).length > 0;
          return `
          <div class="as-domain-card${complete ? ' as-domain--done' : ''}" data-action="go-domain" data-did="${d.id}">
            <div class="as-domain-top" style="background:${d.color}22; border-bottom:2px solid ${d.color}44">
              <span class="as-domain-icon">${d.icon}</span>
              ${complete ? '<span class="as-domain-check">✓</span>' : ''}
            </div>
            <div class="as-domain-body">
              <div class="as-domain-num" style="color:${d.color}">${d.code}</div>
              <div class="as-domain-title">${d.title}</div>
              <div class="as-domain-desc">${d.desc}</div>
              <div class="as-domain-status">${complete ? '<span class="as-status-done">Completed</span>' : '<span class="as-status-todo">Not started</span>'}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: DOMAIN FORM
   ══════════════════════════════════════════════════════════════════════ */
function renderDomain(container) {
  const p = PATIENTS.find(x => x.id === state.patient);
  const d = DOMAINS.find(x => x.id === state.currentDomain);
  const a = getAssessment(p.id);

  if (d.isAsam) { renderAsamForm(container, p, d, a); return; }

  const saved = a.domains[d.id] || {};
  const dIdx  = DOMAINS.findIndex(x => x.id === d.id);
  const nextD = DOMAINS[dIdx + 1] || null;

  container.innerHTML = `
    <div class="as-header">
      <div class="as-header-inner">
        <button class="as-back" data-action="go-overview">← Assessment Overview</button>
        <div class="as-title-row">
          <span class="as-icon">${d.icon}</span>
          <div>
            <h1 class="as-title">${d.title}</h1>
            <p class="as-subtitle">${p.name} · ${p.id} · Domain ${dIdx + 1} of ${DOMAINS.length}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="as-body">
      <div class="as-form-wrap">
        <div class="as-form-header" style="border-left:4px solid ${d.color}">
          <strong>${d.code} — ${d.title}</strong>
          <p>${d.desc}</p>
        </div>
        <form class="as-form" id="domain-form">
          ${d.fields.map(f => renderField(f, saved[f.id])).join('')}
          <div class="as-form-actions">
            <button type="button" class="as-btn as-btn--secondary" data-action="go-overview">Cancel</button>
            <div class="as-form-actions-right">
              <button type="submit" class="as-btn as-btn--primary" data-action="save-domain" data-did="${d.id}">
                💾 Save Domain
              </button>
              ${nextD ? `<button type="button" class="as-btn as-btn--success" data-action="save-next" data-did="${d.id}" data-next="${nextD.id}">
                Save & Next →
              </button>` : ''}
            </div>
          </div>
        </form>
      </div>
    </div>`;
}

function renderField(f, savedValue) {
  const label = `<label class="as-field-label" for="${f.id}">${f.label}</label>`;

  if (f.type === 'select') {
    return `<div class="as-field">
      ${label}
      <select class="as-select" id="${f.id}" name="${f.id}">
        <option value="">— Select —</option>
        ${f.options.map(o => `<option value="${o}"${savedValue === o ? ' selected' : ''}>${o}</option>`).join('')}
      </select>
    </div>`;
  }
  if (f.type === 'textarea') {
    return `<div class="as-field">
      ${label}
      <textarea class="as-textarea" id="${f.id}" name="${f.id}" placeholder="${f.placeholder || ''}" rows="3">${savedValue || ''}</textarea>
    </div>`;
  }
  if (f.type === 'number' || f.type === 'text') {
    return `<div class="as-field">
      ${label}
      <input class="as-input" type="${f.type}" id="${f.id}" name="${f.id}" placeholder="${f.placeholder || ''}" value="${savedValue || ''}">
    </div>`;
  }
  if (f.type === 'checkboxgroup') {
    const saved = Array.isArray(savedValue) ? savedValue : [];
    return `<div class="as-field as-field--check">
      ${label}
      <div class="as-check-grid">
        ${f.options.map(o => `
          <label class="as-check-item">
            <input type="checkbox" name="${f.id}" value="${o}"${saved.includes(o) ? ' checked' : ''}> ${o}
          </label>`).join('')}
      </div>
    </div>`;
  }
  return '';
}

/* ── ASAM FORM ─────────────────────────────────────────────────────── */
function renderAsamForm(container, p, d, a) {
  const saved = a.asam;
  const dIdx  = DOMAINS.findIndex(x => x.id === d.id);

  container.innerHTML = `
    <div class="as-header">
      <div class="as-header-inner">
        <button class="as-back" data-action="go-overview">← Assessment Overview</button>
        <div class="as-title-row">
          <span class="as-icon">⚖️</span>
          <div>
            <h1 class="as-title">ASAM Severity Rating</h1>
            <p class="as-subtitle">${p.name} · ${p.id} · Domain ${dIdx + 1} of ${DOMAINS.length}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="as-body">
      <div class="as-form-wrap">
        <div class="as-form-header" style="border-left:4px solid #b45309">
          <strong>ASAM Patient Placement Criteria — 6 Dimensions</strong>
          <p>Rate each dimension based on your clinical assessment across all 8 domains. The combined rating generates a recommended Level of Care.</p>
        </div>
        <form class="as-form" id="asam-form">
          ${d.dimensions.map(dim => `
            <div class="as-asam-dim">
              <div class="as-asam-dim-header">
                <span class="as-asam-num">Dimension ${dim.num}</span>
                <span class="as-asam-title">${dim.title}</span>
              </div>
              <p class="as-asam-desc">${dim.desc}</p>
              <div class="as-asam-options">
                ${dim.levels.map(lv => `
                  <label class="as-asam-opt${saved[dim.id] == lv.v ? ' as-asam-opt--selected' : ''}">
                    <input type="radio" name="${dim.id}" value="${lv.v}"${saved[dim.id] == lv.v ? ' checked' : ''}>
                    <span>${lv.l}</span>
                  </label>`).join('')}
              </div>
            </div>`).join('')}

          <div class="as-asam-preview" id="asam-preview">
            ${Object.keys(saved).length === 6 ? renderLocPreview(calcLevelOfCare(saved)) : '<p class="as-asam-preview-hint">Rate all 6 dimensions to see Level of Care recommendation.</p>'}
          </div>

          <div class="as-form-actions">
            <button type="button" class="as-btn as-btn--secondary" data-action="go-overview">Cancel</button>
            <div class="as-form-actions-right">
              <button type="submit" class="as-btn as-btn--primary" data-action="save-asam">💾 Save ASAM Rating</button>
            </div>
          </div>
        </form>
      </div>
    </div>`;
}

function renderLocPreview(loc) {
  if (!loc) return '';
  return `
    <div class="as-loc-preview" style="border-color:${loc.color}">
      <div class="as-loc-preview-label">Recommended Level of Care</div>
      <div class="as-loc-preview-level" style="color:${loc.color}">${loc.label}</div>
      <div class="as-loc-preview-desc">${loc.desc}</div>
      <div class="as-loc-preview-services">
        <strong>Indicated services:</strong>
        <ul>${loc.services.map(s => `<li>${s}</li>`).join('')}</ul>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: SUMMARY REPORT
   ══════════════════════════════════════════════════════════════════════ */
function renderSummary(container) {
  const p   = PATIENTS.find(x => x.id === state.patient);
  const a   = getAssessment(p.id);
  const loc = Object.keys(a.asam).length === 6 ? calcLevelOfCare(a.asam) : null;
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  const suh = a.domains['D1'] || {};
  const med = a.domains['D2'] || {};
  const mhx = a.domains['D3'] || {};
  const trx = a.domains['D4'] || {};
  const soc = a.domains['D5'] || {};
  const psy = a.domains['D6'] || {};
  const spi = a.domains['D7'] || {};

  const dualDiag = mhx.dual_diagnosis_flag && !mhx.dual_diagnosis_flag.startsWith('No');
  const suicidal = mhx.suicidal_ideation && !mhx.suicidal_ideation.startsWith('None');
  const urgentRef = mhx.psych_referral && mhx.psych_referral.includes('urgent');
  const routineRef = mhx.psych_referral && !mhx.psych_referral.startsWith('No') && !urgentRef;
  const childPro = soc.child_protection && !soc.child_protection.startsWith('No') && !soc.child_protection.startsWith('N/A');

  container.innerHTML = `
    <div class="as-header">
      <div class="as-header-inner">
        <button class="as-back" data-action="go-overview">← Back to Overview</button>
        <div class="as-title-row">
          <span class="as-icon">📄</span>
          <div>
            <h1 class="as-title">Assessment Summary Report</h1>
            <p class="as-subtitle">${p.name} · ${p.id} · Generated ${today}</p>
          </div>
        </div>
        <button class="as-btn as-btn--outline" onclick="window.print()">🖨️ Print</button>
      </div>
    </div>
    <div class="as-body as-summary-body">

      ${(dualDiag || suicidal || urgentRef || childPro) ? `
      <div class="as-alerts">
        <div class="as-alerts-title">⚠️ Clinical Alerts — Immediate Action Required</div>
        ${suicidal ? `<div class="as-alert as-alert--red">🚨 <strong>Suicidal ideation reported:</strong> ${mhx.suicidal_ideation} — Implement Safety Plan. Notify Psychiatrist immediately.</div>` : ''}
        ${urgentRef ? `<div class="as-alert as-alert--red">🚨 <strong>Urgent Psychiatrist Referral:</strong> ${mhx.psych_referral}</div>` : ''}
        ${dualDiag ? `<div class="as-alert as-alert--amber">🧠 <strong>Co-occurring Disorder (Dual Diagnosis):</strong> ${mhx.dual_diagnosis_flag} — Integrated dual-diagnosis treatment required.</div>` : ''}
        ${childPro ? `<div class="as-alert as-alert--amber">👶 <strong>Child Protection Concern:</strong> ${soc.child_protection} — Social worker notification required.</div>` : ''}
        ${routineRef ? `<div class="as-alert as-alert--blue">ℹ️ <strong>Psychiatrist Referral Indicated:</strong> ${mhx.psych_referral}</div>` : ''}
      </div>` : ''}

      ${loc ? `
      <div class="as-sum-loc" style="border-color:${loc.color}">
        <div class="as-sum-loc-badge" style="background:${loc.color}">ASAM Level ${loc.level}</div>
        <div class="as-sum-loc-body">
          <div class="as-sum-loc-title">${loc.label}</div>
          <div class="as-sum-loc-desc">${loc.desc}</div>
          <div class="as-sum-loc-services">${loc.services.map(s => `<span class="as-sum-service">${s}</span>`).join('')}</div>
        </div>
      </div>` : ''}

      ${Object.keys(a.asam).length === 6 ? `
      <div class="as-sum-section">
        <div class="as-sum-section-title">⚖️ ASAM Dimension Scores</div>
        <div class="as-asam-score-grid">
          ${DOMAINS.find(d => d.isAsam).dimensions.map(dim => {
            const score = Number(a.asam[dim.id]);
            const colours = ['#059669','#2563eb','#d97706','#ea580c','#dc2626'];
            return `
            <div class="as-asam-score-card">
              <div class="as-asam-score-num" style="background:${colours[score] || '#6b7280'}">${score}</div>
              <div class="as-asam-score-body">
                <div class="as-asam-score-dim">Dim. ${dim.num}</div>
                <div class="as-asam-score-title">${dim.title}</div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>` : ''}

      ${renderSumBlock('🧪', 'D1 — Substance Use History', [
        ['Primary substance', suh.primary_substance],
        ['Age first use', suh.age_first_use ? suh.age_first_use + ' years' : null],
        ['Years dependent', suh.years_dependent ? suh.years_dependent + ' years' : null],
        ['Current frequency', suh.frequency],
        ['Route of administration', Array.isArray(suh.route_of_admin) ? suh.route_of_admin.join(', ') : suh.route_of_admin],
        ['Previous treatment', suh.previous_treatment],
        ['Withdrawal history', Array.isArray(suh.withdrawal_history) ? suh.withdrawal_history.join(', ') : null],
        ['Known triggers', suh.triggers],
        ['Longest abstinence', suh.longest_abstinence],
      ])}

      ${renderSumBlock('🏥', 'D2 — Medical & Physical Health', [
        ['Current conditions', med.current_medical],
        ['Medications', med.current_medications],
        ['Infectious disease screening', Array.isArray(med.infectious_disease) ? med.infectious_disease.join(', ') : null],
        ['Overdose history', med.overdose_history],
        ['MAT indicated', med.mat_indicated],
        ['Nutritional status', med.nutrition_status],
        ['Additional notes', med.medical_notes],
      ])}

      ${renderSumBlock('🧠', 'D3 — Mental Health History', [
        ['Psychiatric diagnoses', Array.isArray(mhx.psych_diagnoses) ? mhx.psych_diagnoses.join(', ') : null],
        ['Current mood', mhx.mood_current],
        ['Suicidal ideation', mhx.suicidal_ideation],
        ['Self-harm', mhx.self_harm],
        ['Psychotic symptoms', Array.isArray(mhx.psychosis_screen) ? mhx.psychosis_screen.join(', ') : null],
        ['Dual diagnosis', mhx.dual_diagnosis_flag],
        ['Psychiatrist referral', mhx.psych_referral],
        ['Clinician notes', mhx.mh_notes],
      ])}

      ${renderSumBlock('🛡️', 'D4 — Trauma History', [
        ['Trauma types', Array.isArray(trx.trauma_types) ? trx.trauma_types.join(', ') : null],
        ['PTSD symptoms', Array.isArray(trx.ptsd_symptoms) ? trx.ptsd_symptoms.join(', ') : null],
        ['ACEs score', trx.aces_score],
        ['Trauma-substance link', trx.substance_trauma_link],
        ['Current safety', trx.safety_current],
        ['Care accommodations', trx.trauma_informed_needs],
        ['Notes', trx.trauma_notes],
      ])}

      ${renderSumBlock('👨‍👩‍👧', 'D5 — Social & Family History', [
        ['Living situation', soc.living_situation],
        ['Social support', soc.social_support],
        ['Family SUD history', Array.isArray(soc.family_sud_history) ? soc.family_sud_history.join(', ') : null],
        ['Employment', soc.employment_status],
        ['Legal issues', Array.isArray(soc.legal_issues) ? soc.legal_issues.join(', ') : null],
        ['Child protection', soc.child_protection],
        ['Notes', soc.social_notes],
      ])}

      ${renderSumBlock('🔬', 'D6 — Psychological & Cognitive', [
        ['Stage of change', psy.motivation_stage],
        ['Readiness to change', psy.readiness_score],
        ['Coping styles', Array.isArray(psy.coping_styles) ? psy.coping_styles.join(', ') : null],
        ['Personal strengths', psy.strengths],
        ['Patient goals', psy.treatment_goals_patient],
        ['Barriers to treatment', Array.isArray(psy.barriers_to_treatment) ? psy.barriers_to_treatment.join(', ') : null],
        ['Notes', psy.psych_notes],
      ])}

      ${renderSumBlock('✨', 'D7 — Spiritual & Cultural', [
        ['Religious/spiritual affiliation', spi.religious_affiliation],
        ['Importance of spirituality', spi.spirituality_importance],
        ['Spiritual coping practices', spi.spiritual_coping],
        ['Cultural values', spi.cultural_values],
        ['Chaplain referral', spi.chaplain_referral],
        ['Notes', spi.cultural_notes],
      ])}

      <div class="as-sum-section">
        <div class="as-sum-section-title">📝 Recommended Treatment Modalities</div>
        <div class="as-rec-grid">
          ${buildRecommendations(p, a, loc).map(r => `
          <div class="as-rec-card">
            <div class="as-rec-icon">${r.icon}</div>
            <div class="as-rec-body">
              <div class="as-rec-title">${r.title}</div>
              <div class="as-rec-desc">${r.desc}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <div class="as-sum-section as-sig-block">
        <div class="as-sum-section-title">Clinician Sign-off</div>
        <div class="as-sig-row">
          <div class="as-sig-field"><div class="as-sig-line"></div><div class="as-sig-label">Assessing Clinician</div></div>
          <div class="as-sig-field"><div class="as-sig-line"></div><div class="as-sig-label">Clinical Director Review</div></div>
          <div class="as-sig-field"><div class="as-sig-line"></div><div class="as-sig-label">Date</div></div>
        </div>
        <div class="as-sig-note">Assessment completed via Serenje Wellness Home SATM System · Powered by eNgoma</div>
      </div>

    </div>`;
}

function renderSumBlock(icon, title, rows) {
  const filtered = rows.filter(([, v]) => v && v !== '' && v !== 'None' && v !== '— Select —');
  if (filtered.length === 0) return '';
  return `
  <div class="as-sum-section">
    <div class="as-sum-section-title">${icon} ${title}</div>
    <div class="as-sum-table">
      ${filtered.map(([k, v]) => `
      <div class="as-sum-row">
        <div class="as-sum-key">${k}</div>
        <div class="as-sum-val">${v}</div>
      </div>`).join('')}
    </div>
  </div>`;
}

function buildRecommendations(p, a, loc) {
  const recs = [];
  const mhx = a.domains['D3'] || {};
  const trx = a.domains['D4'] || {};
  const med = a.domains['D2'] || {};

  if (loc) {
    if (['III','IV'].includes(loc.level))
      recs.push({ icon:'🏠', title:'Residential Treatment', desc:'24-hour structured inpatient programme with daily clinical contact.' });
    if (loc.level === 'II')
      recs.push({ icon:'📅', title:'Intensive Outpatient Programme (IOP)', desc:'Structured group and individual therapy 3-5 days per week.' });
    if (['I','0.5'].includes(loc.level))
      recs.push({ icon:'🗣️', title:'Standard Outpatient Counselling', desc:'Weekly individual and group therapy sessions.' });
  }

  recs.push({ icon:'🤝', title:'Individual Counselling', desc:'Motivational Interviewing and CBT-SUD based on stage of change.' });
  recs.push({ icon:'👥', title:'Group Therapy', desc:'Psychoeducation, cognitive-behavioural skills, relapse prevention groups.' });

  if (mhx.dual_diagnosis_flag && !mhx.dual_diagnosis_flag.startsWith('No'))
    recs.push({ icon:'🧠', title:'Integrated Dual-Diagnosis Treatment', desc:'Concurrent SUD and mental health treatment. Psychiatric consultation required.' });

  if (med.mat_indicated && !med.mat_indicated.startsWith('No'))
    recs.push({ icon:'💊', title:'Medication-Assisted Treatment (MAT)', desc:med.mat_indicated });

  if (trx.ptsd_symptoms && Array.isArray(trx.ptsd_symptoms) && trx.ptsd_symptoms.some(s => s !== 'None'))
    recs.push({ icon:'🛡️', title:'Trauma-Focused Therapy', desc:'EMDR, Trauma-focused CBT or Narrative Exposure Therapy as indicated.' });

  recs.push({ icon:'👨‍👩‍👧', title:'Family Therapy', desc:'Involving family system in recovery where clinically appropriate.' });
  recs.push({ icon:'📊', title:'Relapse Prevention Planning', desc:'Identify triggers, develop coping strategies and emergency safety plan.' });
  recs.push({ icon:'🌟', title:'Aftercare Planning', desc:'Discharge planning to begin within first week of residential admission.' });

  return recs.slice(0, 8);
}

/* ══════════════════════════════════════════════════════════════════════
   EVENT BINDING
   ══════════════════════════════════════════════════════════════════════ */
function bindEvents(container) {
  container.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    if (action === 'select-patient') {
      state.patient = el.dataset.pid;
      state.view = 'overview';
      render(container);
    } else if (action === 'go-select') {
      state.view = 'select';
      render(container);
    } else if (action === 'go-overview') {
      state.view = 'overview';
      render(container);
    } else if (action === 'go-domain') {
      state.currentDomain = el.dataset.did;
      state.view = 'domain';
      render(container);
    } else if (action === 'go-asam') {
      state.currentDomain = 'D8';
      state.view = 'domain';
      render(container);
    } else if (action === 'go-summary') {
      state.view = 'summary';
      render(container);
    } else if (action === 'save-domain') {
      e.preventDefault();
      saveDomain(container, el.dataset.did);
    } else if (action === 'save-next') {
      e.preventDefault();
      saveDomain(container, el.dataset.did, el.dataset.next);
    } else if (action === 'save-asam') {
      e.preventDefault();
      saveAsam(container);
    }
  });

  container.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    if (form.id === 'domain-form') {
      const btn = form.querySelector('[data-action="save-domain"]');
      if (btn) saveDomain(container, btn.dataset.did);
    }
    if (form.id === 'asam-form') saveAsam(container);
  });

  // Live ASAM Level of Care preview
  container.addEventListener('change', e => {
    if (e.target.type === 'radio' && e.target.closest('#asam-form')) {
      updateAsamPreview(container);
      // Highlight selected option
      const group = e.target.closest('.as-asam-options');
      if (group) {
        group.querySelectorAll('.as-asam-opt').forEach(o => o.classList.remove('as-asam-opt--selected'));
        e.target.closest('.as-asam-opt').classList.add('as-asam-opt--selected');
      }
    }
  });
}

function saveDomain(container, did, nextDid) {
  const form = container.querySelector('#domain-form');
  if (!form) return;
  const a    = getAssessment(state.patient);
  const fd   = new FormData(form);
  const data = {};
  const domain = DOMAINS.find(d => d.id === did);
  domain.fields.forEach(f => {
    data[f.id] = f.type === 'checkboxgroup' ? fd.getAll(f.id) : (fd.get(f.id) || '');
  });
  a.domains[did] = data;
  if (nextDid) {
    state.currentDomain = nextDid;
    state.view = 'domain';
  } else {
    state.view = 'overview';
  }
  render(container);
}

function saveAsam(container) {
  const form = container.querySelector('#asam-form');
  if (!form) return;
  const a    = getAssessment(state.patient);
  const fd   = new FormData(form);
  DOMAINS.find(d => d.isAsam).dimensions.forEach(dim => {
    const val = fd.get(dim.id);
    if (val !== null) a.asam[dim.id] = parseInt(val);
  });
  state.view = 'overview';
  render(container);
}

function updateAsamPreview(container) {
  const form    = container.querySelector('#asam-form');
  const preview = container.querySelector('#asam-preview');
  if (!form || !preview) return;
  const fd     = new FormData(form);
  const scores = {};
  DOMAINS.find(d => d.isAsam).dimensions.forEach(dim => {
    const val = fd.get(dim.id);
    if (val !== null) scores[dim.id] = parseInt(val);
  });
  if (Object.keys(scores).length === 6) {
    preview.innerHTML = renderLocPreview(calcLevelOfCare(scores));
  }
}
