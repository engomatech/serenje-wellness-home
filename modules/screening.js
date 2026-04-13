export const id     = 'screening';
export const name   = 'Screening';
export const icon   = '🔍';
export const desc   = 'M2 — Evidence-based screening instruments with auto-scoring and SBIRT risk flags.';
export const status = 'live';
export const badge  = null;

/* ══════════════════════════════════════════════════════════════════════
   PATIENTS (mirrors M1 intake data — replace with shared store later)
   ══════════════════════════════════════════════════════════════════════ */
const PATIENTS = [
  { id: 'R001', name: 'Agnes Tembo',     room: 'Room A, Bed 1' },
  { id: 'R002', name: 'Bernard Mwale',   room: 'Room A, Bed 2' },
  { id: 'R003', name: 'Catherine Lungu', room: 'Room B, Bed 1' },
  { id: 'R004', name: 'David Sakala',    room: 'Room B, Bed 2' },
  { id: 'R005', name: 'Esther Mutale',   room: 'Room C, Bed 1' },
];

/* ══════════════════════════════════════════════════════════════════════
   INSTRUMENT DEFINITIONS
   ══════════════════════════════════════════════════════════════════════ */
const INSTRUMENTS = {

  /* ── AUDIT ─────────────────────────────────────────────────────────── */
  AUDIT: {
    code: 'AUDIT', name: 'Alcohol Use Disorders Identification Test',
    target: 'Alcohol (all adults)', maxScore: 40,
    instructions: 'The following questions ask about your use of alcoholic beverages during the past year. Please answer as accurately as possible.',
    questions: [
      { id: 'q1', text: 'How often do you have a drink containing alcohol?',
        options: [{v:0,l:'Never'},{v:1,l:'Monthly or less'},{v:2,l:'2–4 times a month'},{v:3,l:'2–3 times a week'},{v:4,l:'4 or more times a week'}] },
      { id: 'q2', text: 'How many drinks containing alcohol do you have on a typical day when you are drinking?',
        options: [{v:0,l:'1–2'},{v:1,l:'3–4'},{v:2,l:'5–6'},{v:3,l:'7–9'},{v:4,l:'10 or more'}] },
      { id: 'q3', text: 'How often do you have 6 or more drinks on one occasion?',
        options: [{v:0,l:'Never'},{v:1,l:'Less than monthly'},{v:2,l:'Monthly'},{v:3,l:'Weekly'},{v:4,l:'Daily or almost daily'}] },
      { id: 'q4', text: 'How often during the last year have you found that you were not able to stop drinking once you had started?',
        options: [{v:0,l:'Never'},{v:1,l:'Less than monthly'},{v:2,l:'Monthly'},{v:3,l:'Weekly'},{v:4,l:'Daily or almost daily'}] },
      { id: 'q5', text: 'How often during the last year have you failed to do what was normally expected from you because of drinking?',
        options: [{v:0,l:'Never'},{v:1,l:'Less than monthly'},{v:2,l:'Monthly'},{v:3,l:'Weekly'},{v:4,l:'Daily or almost daily'}] },
      { id: 'q6', text: 'How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?',
        options: [{v:0,l:'Never'},{v:1,l:'Less than monthly'},{v:2,l:'Monthly'},{v:3,l:'Weekly'},{v:4,l:'Daily or almost daily'}] },
      { id: 'q7', text: 'How often during the last year have you had a feeling of guilt or remorse after drinking?',
        options: [{v:0,l:'Never'},{v:1,l:'Less than monthly'},{v:2,l:'Monthly'},{v:3,l:'Weekly'},{v:4,l:'Daily or almost daily'}] },
      { id: 'q8', text: 'How often during the last year have you been unable to remember what happened the night before because you had been drinking?',
        options: [{v:0,l:'Never'},{v:1,l:'Less than monthly'},{v:2,l:'Monthly'},{v:3,l:'Weekly'},{v:4,l:'Daily or almost daily'}] },
      { id: 'q9', text: 'Have you or someone else been injured as a result of your drinking?',
        options: [{v:0,l:'No'},{v:2,l:'Yes, but not in the last year'},{v:4,l:'Yes, during the last year'}] },
      { id: 'q10', text: 'Has a relative, friend, doctor, or another health worker been concerned about your drinking or suggested you cut down?',
        options: [{v:0,l:'No'},{v:2,l:'Yes, but not in the last year'},{v:4,l:'Yes, during the last year'}] },
    ],
    score: (total) => {
      if (total <= 7)  return { band:'Low Risk',   flag:'green', action:'No further action required. Provide alcohol education.' };
      if (total <= 15) return { band:'Hazardous',  flag:'amber', action:'Brief Intervention indicated. Advise reduction and discuss risks.' };
      if (total <= 19) return { band:'Harmful',    flag:'amber', action:'Brief Intervention required. Referral to counsellor recommended.' };
      return               { band:'Dependent',   flag:'red',   action:'Comprehensive Assessment required. Escalate to Psychologist/Psychiatrist.' };
    },
    bi: ['Acknowledge the patient\'s openness and avoid judgement.',
         'Provide clear feedback: their score indicates harmful alcohol use.',
         'Explore ambivalence using open-ended questions: "What concerns you most about your drinking?"',
         'Discuss health and social consequences in a non-confrontational way.',
         'Agree a specific, realistic goal: e.g. reducing to 2 standard drinks per day.',
         'Offer a follow-up appointment in 4–6 weeks to review progress.'],
  },

  /* ── CAGE ───────────────────────────────────────────────────────────── */
  CAGE: {
    code: 'CAGE', name: 'Cut–Annoyed–Guilty–Eye-opener',
    target: 'Alcohol (quick 4-item screen)', maxScore: 4,
    instructions: 'Please answer yes or no to the following questions about your drinking.',
    questions: [
      { id: 'q1', text: 'Have you ever felt you should Cut down on your drinking?',                              options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q2', text: 'Have people Annoyed you by criticising your drinking?',                                 options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q3', text: 'Have you ever felt bad or Guilty about your drinking?',                                 options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q4', text: 'Have you ever had a drink first thing in the morning to steady your nerves (Eye-opener)?', options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
    ],
    score: (total) => {
      if (total <= 1) return { band:'Low Concern',        flag:'green', action:'Alcohol use unlikely to be problematic. Monitor at next review.' };
      return              { band:'Significant Concern',  flag:'red',   action:'Score ≥2 indicates significant concern. Administer full AUDIT and refer for Comprehensive Assessment.' };
    },
    bi: ['A score of 2 or more suggests a potential alcohol problem.',
         'Ask the patient to elaborate on each positive response.',
         'Discuss the impact on their daily life, relationships and health.',
         'Provide written information on alcohol use disorder and local support.',
         'Refer for full AUDIT screening and, if confirmed, Comprehensive Assessment.'],
  },

  /* ── DAST-10 ─────────────────────────────────────────────────────────── */
  'DAST-10': {
    code: 'DAST-10', name: 'Drug Abuse Screening Test – 10',
    target: 'Non-alcohol drug use', maxScore: 10,
    instructions: 'The following questions concern information about your potential involvement with drugs, not including alcohol, during the past 12 months. Answer yes or no.',
    questions: [
      { id: 'q1',  text: 'Have you used drugs other than those required for medical reasons?',                                          options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q2',  text: 'Do you abuse more than one drug at a time?',                                                                 options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q3',  text: 'Are you always able to stop using drugs when you want to?',                                                  options: [{v:1,l:'No'},{v:0,l:'Yes'}] },
      { id: 'q4',  text: 'Have you had blackouts or flashbacks as a result of drug use?',                                              options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q5',  text: 'Do you ever feel bad or guilty about your drug use?',                                                        options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q6',  text: 'Does your spouse (or parents) ever complain about your involvement with drugs?',                             options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q7',  text: 'Have you neglected your family because of your use of drugs?',                                               options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q8',  text: 'Have you engaged in illegal activities in order to obtain drugs?',                                           options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q9',  text: 'Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?',                   options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q10', text: 'Have you had medical problems as a result of your drug use (e.g. memory loss, hepatitis, convulsions)?',     options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
    ],
    score: (total) => {
      if (total === 0) return { band:'No Problem',       flag:'green', action:'No drug problem indicated. Routine monitoring.' };
      if (total <= 2)  return { band:'Low Level',        flag:'green', action:'Low-level drug use. Provide psychoeducation and monitor.' };
      if (total <= 5)  return { band:'Moderate',         flag:'amber', action:'Brief Intervention indicated. Explore drug use patterns and triggers.' };
      if (total <= 8)  return { band:'Substantial',      flag:'red',   action:'Comprehensive Assessment required. High likelihood of drug use disorder.' };
      return               { band:'Severe',            flag:'red',   action:'Urgent Comprehensive Assessment. Immediate clinical review.' };
    },
    bi: ['Reflect scores non-judgementally: "Your score suggests your drug use may be causing problems."',
         'Explore what substances are being used and in what contexts.',
         'Discuss the consequences of use on health, relationships and responsibilities.',
         'Assess motivation to change using a 1–10 readiness scale.',
         'Agree on a short-term reduction goal or refer for specialist support.',
         'Schedule a follow-up within 2 weeks.'],
  },

  /* ── ASSIST ──────────────────────────────────────────────────────────── */
  ASSIST: {
    code: 'ASSIST', name: 'Alcohol, Smoking & Substance Involvement Screening Test',
    target: 'All substances (multi-drug)', maxScore: 'Per substance',
    instructions: 'The following questions ask about your use of tobacco, alcohol and other drugs during your lifetime and in the past 3 months. Please answer as honestly as possible.',
    substances: ['Tobacco','Alcohol','Cannabis','Cocaine','Amphetamines','Inhalants','Sedatives','Hallucinogens','Opioids','Other'],
    questions: [
      { id: 'q1', text: 'Which of the following substances have you ever used (non-medical use only)?',      type: 'multi-substance-lifetime' },
      { id: 'q2', text: 'In the past 3 months, how often have you used [substance]?',                        type: 'per-substance', options: [{v:0,l:'Never'},{v:2,l:'Once or twice'},{v:3,l:'Monthly'},{v:4,l:'Weekly'},{v:6,l:'Daily or almost daily'}] },
      { id: 'q3', text: 'In the past 3 months, how often have you had a strong desire to use [substance]?', type: 'per-substance', options: [{v:0,l:'Never'},{v:3,l:'Once or twice'},{v:4,l:'Monthly'},{v:5,l:'Weekly'},{v:6,l:'Daily or almost daily'}] },
      { id: 'q4', text: 'In the past 3 months, how often has your use of [substance] led to health, social, legal or financial problems?', type: 'per-substance', options: [{v:0,l:'Never'},{v:4,l:'Once or twice'},{v:5,l:'Monthly'},{v:6,l:'Weekly'},{v:7,l:'Daily or almost daily'}] },
      { id: 'q5', text: 'In the past 3 months, how often have you failed to do what was normally expected of you because of your use of [substance]?', type: 'per-substance', options: [{v:0,l:'Never'},{v:5,l:'Once or twice'},{v:6,l:'Monthly'},{v:7,l:'Weekly'},{v:8,l:'Daily or almost daily'}] },
      { id: 'q6', text: 'Has a friend, relative or anyone else ever expressed concern about your use of [substance]?', type: 'per-substance-lifetime', options: [{v:0,l:'No, never'},{v:6,l:'Yes, in the past 3 months'},{v:3,l:'Yes, but not in the past 3 months'}] },
      { id: 'q7', text: 'Have you ever tried and failed to control, cut down or stop using [substance]?', type: 'per-substance-lifetime', options: [{v:0,l:'No, never'},{v:6,l:'Yes, in the past 3 months'},{v:3,l:'Yes, but not in the past 3 months'}] },
    ],
    score: (total) => {
      if (total <= 10) return { band:'Low Risk',      flag:'green', action:'Low risk. Provide brief information on substance use risks.' };
      if (total <= 26) return { band:'Moderate Risk', flag:'amber', action:'Brief Intervention indicated. Discuss use patterns and motivational interviewing.' };
      return               { band:'High Risk',      flag:'red',   action:'Comprehensive Assessment required. Likely dependence. Refer to Psychologist/Psychiatrist.' };
    },
    bi: ['Provide structured feedback on the specific substances of concern.',
         'Ask about the patient\'s own concerns regarding their substance use.',
         'Use reflective listening: "It sounds like cannabis is becoming a daily part of your life."',
         'Explore pros and cons of use together.',
         'Agree on a specific behaviour change goal.',
         'Provide a take-home resource and schedule follow-up.'],
    simplified: true,
  },

  /* ── PHQ-9 ───────────────────────────────────────────────────────────── */
  'PHQ-9': {
    code: 'PHQ-9', name: 'Patient Health Questionnaire – 9',
    target: 'Depression severity screening', maxScore: 27,
    instructions: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    options: [{v:0,l:'Not at all'},{v:1,l:'Several days'},{v:2,l:'More than half the days'},{v:3,l:'Nearly every day'}],
    questions: [
      { id: 'q1', text: 'Little interest or pleasure in doing things' },
      { id: 'q2', text: 'Feeling down, depressed, or hopeless' },
      { id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much' },
      { id: 'q4', text: 'Feeling tired or having little energy' },
      { id: 'q5', text: 'Poor appetite or overeating' },
      { id: 'q6', text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down' },
      { id: 'q7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
      { id: 'q8', text: 'Moving or speaking so slowly that other people could have noticed; or the opposite — being so fidgety or restless that you have been moving around a lot more than usual' },
      { id: 'q9', text: 'Thoughts that you would be better off dead, or of hurting yourself in some way', critical: true },
    ],
    score: (total) => {
      if (total <= 4)  return { band:'Minimal',          flag:'green', action:'Minimal depression. Monitor and reassess at next review.' };
      if (total <= 9)  return { band:'Mild',              flag:'green', action:'Mild depression. Consider watchful waiting and follow-up.' };
      if (total <= 14) return { band:'Moderate',          flag:'amber', action:'Moderate depression. Brief Intervention and counsellor referral recommended.' };
      if (total <= 19) return { band:'Moderately Severe', flag:'red',   action:'Moderately severe depression. Immediate Psychiatrist referral required.' };
      return               { band:'Severe',             flag:'red',   action:'Severe depression. Urgent psychiatric review. Assess for suicide risk.' };
    },
    bi: ['Validate the patient\'s experience without minimising.',
         'If Q9 was scored > 0, directly assess suicidal ideation using a structured safety assessment immediately.',
         'Explain the depression-substance use cycle: each reinforces the other.',
         'Discuss antidepressant options with the Psychiatrist if indicated.',
         'Engage family support where appropriate.',
         'Ensure 24-hour emergency contact is available to the patient.'],
  },

  /* ── GAD-7 ───────────────────────────────────────────────────────────── */
  'GAD-7': {
    code: 'GAD-7', name: 'Generalised Anxiety Disorder – 7',
    target: 'Anxiety severity screening', maxScore: 21,
    instructions: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
    options: [{v:0,l:'Not at all'},{v:1,l:'Several days'},{v:2,l:'More than half the days'},{v:3,l:'Nearly every day'}],
    questions: [
      { id: 'q1', text: 'Feeling nervous, anxious, or on edge' },
      { id: 'q2', text: 'Not being able to stop or control worrying' },
      { id: 'q3', text: 'Worrying too much about different things' },
      { id: 'q4', text: 'Trouble relaxing' },
      { id: 'q5', text: 'Being so restless that it is hard to sit still' },
      { id: 'q6', text: 'Becoming easily annoyed or irritable' },
      { id: 'q7', text: 'Feeling afraid as if something awful might happen' },
    ],
    score: (total) => {
      if (total <= 4)  return { band:'Minimal Anxiety',   flag:'green', action:'Minimal anxiety. Routine monitoring.' };
      if (total <= 9)  return { band:'Mild Anxiety',      flag:'green', action:'Mild anxiety. Psychoeducation and relaxation techniques.' };
      if (total <= 14) return { band:'Moderate Anxiety',  flag:'amber', action:'Moderate anxiety. Brief Intervention and counsellor referral.' };
      return               { band:'Severe Anxiety',    flag:'red',   action:'Severe anxiety. Psychiatric review required. Assess for panic disorder.' };
    },
    bi: ['Normalise anxiety as a common co-occurring condition with SUD.',
         'Explain the anxiety-substance use cycle clearly.',
         'Teach one grounding technique (e.g. 5-4-3-2-1 sensory method) in-session.',
         'Explore triggers and avoidance behaviours.',
         'Refer for CBT or anxiety-focused counselling.',
         'Review at next MDT whether pharmacological support is warranted.'],
  },

  /* ── MDQ ─────────────────────────────────────────────────────────────── */
  MDQ: {
    code: 'MDQ', name: 'Mood Disorder Questionnaire',
    target: 'Bipolar Disorder screening', maxScore: 'Positive / Negative',
    instructions: 'Has there ever been a period of time when you were not your usual self and...',
    questions: [
      { id: 'q1',  text: '...you felt so good or so hyper that other people thought you were not your normal self, or you were so hyper that you got into trouble?',    options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q2',  text: '...you were so irritable that you shouted at people or started fights or arguments?',                                                          options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q3',  text: '...you felt much more self-confident than usual?',                                                                                            options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q4',  text: '...you got much less sleep than usual and found you didn\'t really miss it?',                                                                  options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q5',  text: '...you were much more talkative or spoke much faster than usual?',                                                                            options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q6',  text: '...thoughts raced through your head or you couldn\'t slow your mind down?',                                                                   options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q7',  text: '...you were so easily distracted by things around you that you had trouble concentrating?',                                                   options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q8',  text: '...you had much more energy than usual?',                                                                                                     options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q9',  text: '...you were much more active or did many more things than usual?',                                                                            options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q10', text: '...you were much more social or outgoing than usual — for example, telephoning friends in the middle of the night?',                          options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q11', text: '...you were much more interested in sex than usual?',                                                                                         options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q12', text: '...you did things that were unusual for you or that other people might think were excessive, foolish or risky?',                               options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q13', text: '...spending money got you or your family into trouble?',                                                                                      options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q14', text: 'If you checked YES to more than one item above — have several of these things happened during the same period of time?',                      options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q15', text: 'How much of a problem did any of these cause you?', options: [{v:0,l:'No problem'},{v:0,l:'Minor problem'},{v:1,l:'Moderate problem'},{v:1,l:'Serious problem'}] },
    ],
    score: (answers) => {
      const yesCount = Object.entries(answers).filter(([k,v]) => k !== 'q14' && k !== 'q15' && v > 0).length;
      const coOccur  = (answers['q14'] || 0) > 0;
      const impaired = (answers['q15'] || 0) > 0;
      const positive = yesCount >= 7 && coOccur && impaired;
      if (positive) return { band:'Positive Screen', flag:'red',   action:'Positive MDQ screen. Psychiatrist referral required for full bipolar assessment. Do not initiate antidepressants without mood stabiliser.' };
      return              { band:'Negative Screen', flag:'green', action:'MDQ screen negative. Monitor and reassess if clinical presentation changes.' };
    },
    bi: ['Explain that the MDQ is a screening tool only — not a diagnosis.',
         'Inform the patient a Psychiatrist will conduct a full evaluation.',
         'Explain the relationship between bipolar disorder and substance use.',
         'Caution against self-medicating with alcohol or drugs.',
         'Ensure a mood diary is started immediately.',
         'Priority referral to Psychiatrist for formal diagnostic assessment.'],
    mdqMode: true,
  },

  /* ── PC-PTSD-5 ───────────────────────────────────────────────────────── */
  'PC-PTSD-5': {
    code: 'PC-PTSD-5', name: 'Primary Care PTSD Screen for DSM-5',
    target: 'Trauma / PTSD', maxScore: 5,
    instructions: 'Sometimes things happen to people that are unusually or especially frightening, horrible, or traumatic. In your life, have you ever experienced anything like that? If YES — In the past month, have you...',
    lifeEventQ: true,
    questions: [
      { id: 'q1', text: 'Had nightmares about the event(s) or thought about the event(s) when you did not want to?',                                   options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q2', text: 'Tried hard not to think about the event(s) or gone out of your way to avoid situations that reminded you of the event(s)?',  options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q3', text: 'Been constantly on guard, watchful, or easily startled?',                                                                     options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q4', text: 'Felt numb or detached from others, activities, or your surroundings?',                                                        options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q5', text: 'Felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?',    options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
    ],
    score: (total) => {
      if (total <= 2) return { band:'Below Threshold', flag:'green', action:'PTSD screen negative. Monitor for emerging trauma symptoms.' };
      return              { band:'Further Evaluation', flag:'red',   action:'Score ≥3 indicates probable PTSD. Refer for trauma-focused assessment. Trauma-informed care approach required.' };
    },
    bi: ['Approach with trauma-informed sensitivity — thank the patient for their openness.',
         'Validate their experience: "What you went through sounds incredibly difficult."',
         'Do not pressure elaboration on traumatic events.',
         'Explain that PTSD and SUD frequently co-occur and both are treatable.',
         'Refer for specialised trauma assessment and consider EMDR or trauma-focused CBT.',
         'Ensure safety plan is in place before next session.'],
  },

  /* ── CAGE-AID ────────────────────────────────────────────────────────── */
  'CAGE-AID': {
    code: 'CAGE-AID', name: 'CAGE Adapted to Include Drugs',
    target: 'Alcohol + Drug use combined', maxScore: 4,
    instructions: 'Please answer yes or no to the following questions about your use of alcohol or drugs.',
    questions: [
      { id: 'q1', text: 'Have you ever felt you ought to Cut down on your drinking or drug use?',                                                          options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q2', text: 'Have people Annoyed you by criticising your drinking or drug use?',                                                               options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q3', text: 'Have you ever felt bad or Guilty about your drinking or drug use?',                                                               options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
      { id: 'q4', text: 'Have you ever had a drink or used drugs first thing in the morning to steady your nerves or get rid of a hangover (Eye-opener)?', options: [{v:0,l:'No'},{v:1,l:'Yes'}] },
    ],
    score: (total) => {
      if (total <= 1) return { band:'Low Concern',        flag:'green', action:'Low concern. Routine monitoring at next review.' };
      return              { band:'Significant Concern',  flag:'red',   action:'Score ≥2 indicates combined alcohol/drug concern. Administer AUDIT and DAST-10 for detailed assessment.' };
    },
    bi: ['A score of 2 or more suggests a potential combined substance problem.',
         'Explore which substances are of most concern to the patient.',
         'Validate concerns and provide information on the combined risks of poly-substance use.',
         'Administer AUDIT and DAST-10 for more detailed profiling.',
         'Refer for Comprehensive Assessment if confirmed.'],
  },
};

/* ══════════════════════════════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════════════════════════════ */
let state = {
  view: 'select-patient',   // 'select-patient' | 'instrument-list' | 'administer' | 'results'
  patient: null,
  instrument: null,
  answers: {},
  lifeEvent: null,          // for PC-PTSD-5
  assistSubstances: [],     // for ASSIST
  history: [],              // completed screenings { patientId, code, score, band, flag, date, clinician }
  adminName: 'N. Banda',    // current clinician (replace with auth session)
};

/* ══════════════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════════════ */
function flagLabel(flag) {
  return { green:'🟢 Low Risk', amber:'🟡 Brief Intervention', red:'🔴 Escalate to Assessment' }[flag] || flag;
}
function flagClass(flag) {
  return { green:'sc-flag-green', amber:'sc-flag-amber', red:'sc-flag-red' }[flag] || '';
}
function fmt(d) { return new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
function patientHistory(pid) { return state.history.filter(h => h.patientId === pid); }
function wasCompleted(pid, code) { return state.history.find(h => h.patientId === pid && h.code === code); }

/* ══════════════════════════════════════════════════════════════════════
   VIEWS
   ══════════════════════════════════════════════════════════════════════ */

/* ── 1. PATIENT SELECTOR ─────────────────────────────────────────────── */
function renderPatientSelect(container) {
  const recentCodes = [...new Set(state.history.slice(-3).map(h => h.patientId))];
  container.innerHTML = `
    <div class="sc-patient-select-wrap">
      <div class="sc-hero">
        <div class="sc-hero-icon">🔍</div>
        <div class="sc-hero-title">Screening — M2</div>
        <div class="sc-hero-sub">Select a patient to administer validated screening instruments (SBIRT protocol).</div>
      </div>

      <div class="sc-patient-grid">
        ${PATIENTS.map(p => {
          const done = patientHistory(p.id);
          const flags = [...new Set(done.map(h=>h.flag))];
          const hasRed   = flags.includes('red');
          const hasAmber = flags.includes('amber');
          const borderCls = hasRed ? 'sc-pcard--red' : hasAmber ? 'sc-pcard--amber' : done.length ? 'sc-pcard--green' : '';
          return `
            <div class="sc-patient-card ${borderCls}" data-pid="${p.id}">
              <div class="sc-pcard-avatar">${p.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
              <div class="sc-pcard-info">
                <div class="sc-pcard-name">${p.name}</div>
                <div class="sc-pcard-room">${p.room} · ${p.id}</div>
                <div class="sc-pcard-done">${done.length} of ${Object.keys(INSTRUMENTS).length} instruments completed</div>
              </div>
              ${hasRed ? '<span class="sc-pcard-flag sc-flag-red">Escalate</span>' : hasAmber ? '<span class="sc-pcard-flag sc-flag-amber">BI Required</span>' : done.length ? '<span class="sc-pcard-flag sc-flag-green">Screened</span>' : '<span class="sc-pcard-flag sc-pcard-pending">Pending</span>'}
            </div>`;
        }).join('')}
      </div>

      ${state.history.length > 0 ? `
        <div class="sc-recent-wrap">
          <div class="sc-section-label">Recent Screening Activity</div>
          <div class="sc-recent-list">
            ${state.history.slice(-5).reverse().map(h => {
              const p = PATIENTS.find(x => x.id === h.patientId);
              return `
                <div class="sc-recent-row">
                  <span class="sc-recent-code">${h.code}</span>
                  <span class="sc-recent-patient">${p?.name || h.patientId}</span>
                  <span class="sc-recent-band">${h.band}</span>
                  <span class="sc-badge-mini ${flagClass(h.flag)}">${flagLabel(h.flag)}</span>
                  <span class="sc-recent-date">${fmt(h.date)}</span>
                </div>`;
            }).join('')}
          </div>
        </div>` : ''}
    </div>`;

  container.querySelectorAll('.sc-patient-card').forEach(el => {
    el.addEventListener('click', () => {
      state.patient = PATIENTS.find(p => p.id === el.dataset.pid);
      state.view = 'instrument-list';
      render(container);
    });
  });
}

/* ── 2. INSTRUMENT LIST ──────────────────────────────────────────────── */
function renderInstrumentList(container) {
  const p = state.patient;
  container.innerHTML = `
    <button class="sc-back-btn" id="sc-back">← Back to Patient Select</button>
    <div class="sc-instrument-header">
      <div class="sc-ih-avatar">${p.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
      <div>
        <div class="sc-ih-name">${p.name}</div>
        <div class="sc-ih-room">${p.room} · ${p.id}</div>
      </div>
    </div>

    <div class="sc-instrument-table-wrap">
      <table class="sc-instrument-table">
        <thead>
          <tr><th>Code</th><th>Instrument</th><th>Target</th><th>Max Score</th><th>Result</th><th></th></tr>
        </thead>
        <tbody>
          ${Object.values(INSTRUMENTS).map(inst => {
            const done = wasCompleted(p.id, inst.code);
            return `
              <tr>
                <td><span class="sc-inst-code">${inst.code}</span></td>
                <td><div class="sc-inst-name">${inst.name}</div></td>
                <td><span class="sc-inst-target">${inst.target}</span></td>
                <td class="sc-inst-max">${inst.maxScore}</td>
                <td>
                  ${done
                    ? `<span class="sc-badge-mini ${flagClass(done.flag)}">${done.band}</span>`
                    : `<span class="sc-inst-pending">Not administered</span>`}
                </td>
                <td>
                  <button class="sc-administer-btn" data-code="${inst.code}">
                    ${done ? 'Re-administer' : 'Administer →'}
                  </button>
                </td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;

  container.querySelector('#sc-back').addEventListener('click', () => {
    state.view = 'select-patient'; state.patient = null; render(container);
  });
  container.querySelectorAll('.sc-administer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.instrument = INSTRUMENTS[btn.dataset.code];
      state.answers = {}; state.lifeEvent = null; state.assistSubstances = [];
      state.view = 'administer';
      render(container);
    });
  });
}

/* ── 3. QUESTIONNAIRE ────────────────────────────────────────────────── */
function renderAdminister(container) {
  const inst = state.instrument;
  const isAssist = inst.simplified;
  const isMDQ    = inst.mdqMode;

  let questionsHtml = '';

  if (inst.lifeEventQ) {
    questionsHtml += `
      <div class="sc-life-event-q">
        <div class="sc-q-text">Before we begin — have you experienced a traumatic or frightening event in your life?</div>
        <div class="sc-radio-row">
          <label class="sc-radio-label"><input type="radio" name="life_event" value="yes"> Yes</label>
          <label class="sc-radio-label"><input type="radio" name="life_event" value="no"> No (skip remaining questions)</label>
        </div>
      </div>
      <div id="sc-ptsd-questions" class="sc-hidden">`;
  }

  if (isAssist) {
    questionsHtml += `
      <div class="sc-q-block">
        <div class="sc-q-num">1</div>
        <div class="sc-q-body">
          <div class="sc-q-text">Which of the following substances have you ever used (non-medical use only)? <em>(Select all that apply)</em></div>
          <div class="sc-assist-substances">
            ${inst.substances.map(s => `
              <label class="sc-check-label">
                <input type="checkbox" name="substance_${s}" value="${s}"> ${s}
              </label>`).join('')}
          </div>
        </div>
      </div>
      <div id="sc-assist-freq" class="sc-hidden"></div>`;
  } else {
    const sharedOpts = inst.options;
    questionsHtml += inst.questions.map((q, i) => {
      const opts = q.options || sharedOpts;
      return `
        <div class="sc-q-block ${q.critical ? 'sc-q-critical' : ''}">
          <div class="sc-q-num">${i+1}</div>
          <div class="sc-q-body">
            ${q.critical ? '<div class="sc-critical-label">⚠️ Critical item — assess immediately if positive</div>' : ''}
            <div class="sc-q-text">${q.text}</div>
            <div class="sc-radio-row">
              ${opts.map(o => `
                <label class="sc-radio-label">
                  <input type="radio" name="${q.id}" value="${o.v}"> ${o.l}
                </label>`).join('')}
            </div>
          </div>
        </div>`;
    }).join('');
  }

  if (inst.lifeEventQ) questionsHtml += '</div>';

  container.innerHTML = `
    <button class="sc-back-btn" id="sc-back">← Back to Instrument List</button>

    <div class="sc-admin-wrap">
      <div class="sc-admin-header">
        <div>
          <div class="sc-admin-code">${inst.code}</div>
          <div class="sc-admin-title">${inst.name}</div>
          <div class="sc-admin-patient">Patient: <strong>${state.patient.name}</strong> · ${state.patient.room}</div>
        </div>
        <div class="sc-admin-meta">
          <div>Clinician: <strong>${state.adminName}</strong></div>
          <div>${new Date().toLocaleDateString('en-GB')}</div>
        </div>
      </div>

      <div class="sc-instructions">${inst.instructions}</div>

      <form id="sc-form">
        <div class="sc-questions">${questionsHtml}</div>
        <div class="sc-form-actions">
          <div class="sc-progress-label" id="sc-progress">0 of ${isAssist ? inst.questions.length : inst.questions.length} answered</div>
          <button type="submit" class="sc-submit-btn">Score Instrument →</button>
        </div>
      </form>
    </div>`;

  container.querySelector('#sc-back').addEventListener('click', () => {
    state.view = 'instrument-list'; render(container);
  });

  /* PC-PTSD-5 life event toggle */
  if (inst.lifeEventQ) {
    container.querySelectorAll('input[name="life_event"]').forEach(r => {
      r.addEventListener('change', () => {
        const show = r.value === 'yes';
        state.lifeEvent = show;
        container.querySelector('#sc-ptsd-questions').classList.toggle('sc-hidden', !show);
      });
    });
  }

  /* ASSIST substance selection → frequency questions */
  if (isAssist) {
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const selected = [...container.querySelectorAll('input[type="checkbox"]:checked')].map(x=>x.value);
        state.assistSubstances = selected;
        const freqDiv = container.querySelector('#sc-assist-freq');
        if (selected.length === 0) { freqDiv.classList.add('sc-hidden'); freqDiv.innerHTML=''; return; }
        freqDiv.classList.remove('sc-hidden');
        freqDiv.innerHTML = selected.map((sub,si) =>
          inst.questions.slice(1).map((q,qi) => {
            const opts = q.options || [];
            return `
              <div class="sc-q-block">
                <div class="sc-q-num">${si+2}.${qi+1}</div>
                <div class="sc-q-body">
                  <div class="sc-q-text">${q.text.replace('[substance]', `<strong>${sub}</strong>`)}</div>
                  <div class="sc-radio-row">
                    ${opts.map(o=>`<label class="sc-radio-label"><input type="radio" name="assist_${sub}_q${qi+2}" value="${o.v}"> ${o.l}</label>`).join('')}
                  </div>
                </div>
              </div>`;
          }).join('')
        ).join('');
      });
    });
  }

  /* progress counter */
  const form = container.querySelector('#sc-form');
  form.addEventListener('change', () => {
    const answered = form.querySelectorAll('input[type="radio"]:checked').length +
                     (inst.lifeEventQ && state.lifeEvent === false ? inst.questions.length : 0);
    container.querySelector('#sc-progress').textContent = `${answered} answered`;
  });

  /* submit → score */
  form.addEventListener('submit', e => {
    e.preventDefault();

    /* PC-PTSD-5: if no life event, score = 0 */
    if (inst.lifeEventQ && !state.lifeEvent) {
      const result = inst.score(0);
      saveAndShowResult(container, 0, result, {});
      return;
    }

    /* MDQ scoring */
    if (isMDQ) {
      const answers = {};
      form.querySelectorAll('input[type="radio"]:checked').forEach(r => { answers[r.name] = parseInt(r.value); });
      const result = inst.score(answers);
      const yesCount = Object.entries(answers).filter(([k,v])=>k!=='q14'&&k!=='q15'&&v>0).length;
      saveAndShowResult(container, `${yesCount}/13 symptoms`, result, answers);
      return;
    }

    /* ASSIST scoring */
    if (isAssist) {
      let total = 0;
      form.querySelectorAll('input[type="radio"]:checked').forEach(r => { total += parseInt(r.value)||0; });
      const result = inst.score(total);
      saveAndShowResult(container, total, result, {});
      return;
    }

    /* Standard scoring */
    let total = 0;
    const answers = {};
    form.querySelectorAll('input[type="radio"]:checked').forEach(r => {
      answers[r.name] = parseInt(r.value);
      total += parseInt(r.value)||0;
    });

    if (Object.keys(answers).length < inst.questions.length) {
      alert('Please answer all questions before scoring.');
      return;
    }
    const result = inst.score(typeof inst.score === 'function' && isMDQ ? answers : total);
    saveAndShowResult(container, total, result, answers);
  });
}

function saveAndShowResult(container, score, result, answers) {
  const record = {
    patientId: state.patient.id,
    code: state.instrument.code,
    score, ...result,
    date: new Date().toISOString(),
    clinician: state.adminName,
  };
  /* remove previous if re-administering */
  state.history = state.history.filter(h => !(h.patientId === record.patientId && h.code === record.code));
  state.history.push(record);
  state.view = 'results';
  render(container);
}

/* ── 4. RESULTS ──────────────────────────────────────────────────────── */
function renderResults(container) {
  const last   = [...state.history].reverse().find(h => h.patientId === state.patient.id && h.code === state.instrument.code);
  const inst   = state.instrument;
  const isRed  = last.flag === 'red';
  const isAmber= last.flag === 'amber';
  const bi     = inst.bi || [];

  container.innerHTML = `
    <button class="sc-back-btn" id="sc-back">← Back to Instrument List</button>

    <div class="sc-result-wrap">

      <!-- Score card -->
      <div class="sc-result-card ${flagClass(last.flag)}--card">
        <div class="sc-result-top">
          <div>
            <div class="sc-result-code">${inst.code}</div>
            <div class="sc-result-instname">${inst.name}</div>
            <div class="sc-result-patient">Patient: <strong>${state.patient.name}</strong> · ${state.patient.room}</div>
          </div>
          <div class="sc-result-score-box">
            <div class="sc-result-score-num">${last.score}</div>
            <div class="sc-result-score-label">Score</div>
          </div>
        </div>

        <div class="sc-result-band-row">
          <span class="sc-flag-pill ${flagClass(last.flag)}">${flagLabel(last.flag)}</span>
          <span class="sc-result-band-name">${last.band}</span>
        </div>

        <div class="sc-result-action ${isRed ? 'sc-action-red' : isAmber ? 'sc-action-amber' : 'sc-action-green'}">
          <strong>${isRed ? '🔴 Action Required:' : isAmber ? '🟡 Recommended Action:' : '🟢 Outcome:'}</strong>
          ${last.action}
        </div>

        <div class="sc-result-meta">
          Administered by <strong>${last.clinician}</strong> · ${fmt(last.date)} · Max score: ${inst.maxScore}
        </div>
      </div>

      <!-- Escalation notice (Red) -->
      ${isRed ? `
        <div class="sc-escalation-box">
          <div class="sc-escalation-title">🔴 Escalation to Comprehensive Assessment (M3)</div>
          <p>This patient has been automatically flagged for comprehensive assessment. Please ensure the following steps are completed:</p>
          <ol>
            <li>Notify the assigned Psychologist or Psychiatrist immediately.</li>
            <li>Document this screening result in the patient's clinical record.</li>
            <li>Do not discharge or grant leave until the Clinical Director is informed.</li>
            <li>Proceed to <strong>Module M3 — Comprehensive Assessment</strong> as soon as possible.</li>
          </ol>
          <button class="sc-escalate-btn" id="sc-go-assess">Go to Assessment (M3) →</button>
        </div>` : ''}

      <!-- Brief Intervention prompts (Amber) -->
      ${isAmber ? `
        <div class="sc-bi-box">
          <div class="sc-bi-title">🟡 Brief Intervention Guide (SBIRT Phase 2)</div>
          <p>Use the following structured talking points with the patient now:</p>
          <ol class="sc-bi-list">
            ${bi.map(b => `<li>${b}</li>`).join('')}
          </ol>
        </div>` : ''}

      <!-- Low risk (Green) -->
      ${!isRed && !isAmber ? `
        <div class="sc-green-box">
          <div class="sc-green-title">🟢 No Further Action Required</div>
          <p>Result is within the low-risk range. Continue routine monitoring and reassess at next scheduled review or if clinical presentation changes.</p>
        </div>` : ''}

      <!-- All results for this patient -->
      <div class="sc-patient-results">
        <div class="sc-section-label">All Screening Results — ${state.patient.name}</div>
        <div class="sc-results-grid">
          ${Object.keys(INSTRUMENTS).map(code => {
            const h = wasCompleted(state.patient.id, code);
            return `
              <div class="sc-result-chip ${h ? flagClass(h.flag)+'--chip' : 'sc-result-chip--empty'}">
                <div class="sc-chip-code">${code}</div>
                ${h
                  ? `<div class="sc-chip-band">${h.band}</div><div class="sc-chip-flag ${flagClass(h.flag)}">${h.flag.toUpperCase()}</div>`
                  : `<div class="sc-chip-band">Not done</div>`}
              </div>`;
          }).join('')}
        </div>
      </div>

      <div class="sc-result-actions">
        <button class="sc-secondary-btn" id="sc-readminister">Re-administer ${inst.code}</button>
        <button class="sc-primary-btn" id="sc-next-inst">Back to Instrument List</button>
      </div>
    </div>`;

  container.querySelector('#sc-back').addEventListener('click', () => {
    state.view = 'instrument-list'; render(container);
  });
  container.querySelector('#sc-next-inst').addEventListener('click', () => {
    state.view = 'instrument-list'; render(container);
  });
  container.querySelector('#sc-readminister').addEventListener('click', () => {
    state.answers = {}; state.view = 'administer'; render(container);
  });
  container.querySelector('#sc-go-assess')?.addEventListener('click', () => {
    location.hash = '#assessment';
  });
}

/* ── MAIN RENDER ─────────────────────────────────────────────────────── */
export function render(container) {
  if (state.view === 'select-patient')   renderPatientSelect(container);
  else if (state.view === 'instrument-list') renderInstrumentList(container);
  else if (state.view === 'administer')  renderAdminister(container);
  else if (state.view === 'results')     renderResults(container);
}
