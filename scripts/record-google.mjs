import fs from 'fs';
const A = 'http://localhost:8000', out = process.argv[2];
const login = await fetch(A + '/api/v1/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'resident@neighbourhood.org', password: 'Password123!' }) }).then(r => r.json());
const H = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + login.access_token };
const post = async (p, b) => { const t = Date.now(); const r = await fetch(A + p, { method: 'POST', headers: H, body: JSON.stringify(b) }).then(r => r.json()); return { ...r, _ms: Date.now() - t }; };
const triage = {};
for (const [k, text] of Object.entries({
  hinglish_sos: 'Papa gir gaye hain aur saans nahi le pa rahe, B-204 jaldi aao',
  hinglish_knife: 'Ek aadmi chaku leke gate 2 pe ghoom raha hai, bacche bahar khel rahe hain',
  elder: 'My elderly neighbour has not answered her door or phone since last night. She lives alone.',
  streetlight: 'The streetlight on Lane 4 has been broken for a week and the road is dark at night',
})) triage[k] = { input: text, output: await post('/api/v1/ai/incident-assistance', { raw_text: text }) };
const briefing = await post('/api/v1/ai/briefing', { raw_text: 'My elderly neighbour has not answered her door or phone since last night.' });
const guidance = await fetch(A + '/api/v1/ai/guidance?query=my%20grandmother%20is%20not%20answering%20her%20phone', { headers: H }).then(r => r.json());
const insights = await fetch(A + '/api/v1/community/insights', { headers: H }).then(r => r.json());
const health = await fetch(A + '/health').then(r => r.json());
const ist = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 16).replace('T', ' ') + ' IST';
fs.writeFileSync(out, JSON.stringify({ recorded_at: ist, results: { triage, briefing, guidance, insights, health } }, null, 2));
for (const [k, v] of Object.entries(triage)) console.log(k, v.output.ai_engine, v.output.rule_priority, '->', v.output.suggested_priority, v.output.parsed_category, v.output._ms + 'ms');
console.log('briefing', briefing.briefing?.model, briefing.briefing?.grounded, briefing.briefing_error, briefing._ms + 'ms');
