// Cloudflare Pages Function : reçoit le formulaire de devis, l'envoie à contact@kaenys.com
// et envoie une confirmation au visiteur. Envoi des e-mails via l'API Resend (offre gratuite).
//
// Variables d'environnement (Cloudflare Pages > Paramètres > Variables) :
//   RESEND_API_KEY  clé API Resend (secret)
//   MAIL_FROM       expéditeur vérifié, ex. "Kaenys <site@kaenys.com>"
//   MAIL_TO         destinataire, par défaut contact@kaenys.com

interface Env {
  RESEND_API_KEY: string;
  MAIL_FROM?: string;
  MAIL_TO?: string;
}

type Ctx = { request: Request; env: Env };

const MAX_FILE = 5 * 1024 * 1024;
const SERVICES: Record<string, { fr: string; en: string }> = {
  design: { fr: 'Design et identité visuelle', en: 'Design and brand identity' },
  community: { fr: 'Community management', en: 'Community management' },
  video: { fr: 'Montage vidéo', en: 'Video editing' },
  web: { fr: 'Développement web et applications', en: 'Web and app development' },
  ai: { fr: 'Solutions d’intelligence artificielle', en: 'AI solutions' },
  training: { fr: 'Formation', en: 'Training' },
  collab: { fr: 'Collaborer avec Kaenys', en: 'Collaborate with Kaenys' },
  other: { fr: 'Autre besoin', en: 'Something else' },
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

async function toBase64(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

async function send(env: Env, payload: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function onRequestPost({ request, env }: Ctx) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { ok: false, error: 'bad_request' });
  }

  // Champ piège anti-robots : rempli = robot, on fait semblant d'accepter.
  if (String(form.get('website') ?? '').trim()) return json(200, { ok: true });

  const get = (k: string, max = 500) => String(form.get(k) ?? '').trim().slice(0, max);
  const lang = get('lang') === 'en' ? 'en' : 'fr';
  const data = {
    name: get('name', 120),
    company: get('company', 120),
    email: get('email', 160),
    phone: get('phone', 30),
    service: get('service', 20),
    budget: get('budget', 60),
    message: get('message', 4000),
    consent: get('consent') === 'yes',
  };

  const missing = !data.name || !data.email || !data.phone || !data.service || !data.message || !data.consent;
  const badEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email);
  if (missing || badEmail) return json(422, { ok: false, error: 'invalid' });

  const file = form.get('attachment');
  const attachments: { filename: string; content: string }[] = [];
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE) return json(413, { ok: false, error: 'file_too_large' });
    attachments.push({ filename: file.name.slice(0, 120), content: await toBase64(file) });
  }

  if (!env.RESEND_API_KEY) return json(500, { ok: false, error: 'not_configured' });
  const from = env.MAIL_FROM || 'Kaenys <site@kaenys.com>';
  const to = env.MAIL_TO || 'contact@kaenys.com';
  const serviceLabel = SERVICES[data.service]?.fr ?? data.service;

  const rows: [string, string][] = [
    ['Nom', data.name],
    ['Entreprise', data.company || '—'],
    ['E-mail', data.email],
    ['Téléphone / WhatsApp', data.phone],
    ['Service', serviceLabel],
    ['Budget', data.budget || '—'],
    ['Langue du site', lang.toUpperCase()],
  ];
  const table = rows
    .map(([k, v]) => `<tr><td style="padding:8px 12px;background:#F5FAFC;color:#5B6B7A;font:14px sans-serif">${k}</td><td style="padding:8px 12px;font:15px sans-serif;color:#1C2733">${esc(v)}</td></tr>`)
    .join('');

  try {
    await send(env, {
      from,
      to: [to],
      reply_to: data.email,
      subject: `Demande de devis · ${serviceLabel} · ${data.name}`,
      html: `<h2 style="font:600 20px sans-serif;color:#003152">Nouvelle demande de devis</h2><table style="border-collapse:collapse">${table}</table><h3 style="font:600 16px sans-serif;color:#003152;margin-top:24px">Besoin</h3><p style="font:15px/1.5 sans-serif;color:#1C2733;white-space:pre-wrap">${esc(data.message)}</p>`,
      attachments,
    });

    const confirm = lang === 'fr'
      ? {
          subject: 'Kaenys · Nous avons bien reçu votre demande',
          html: `<p style="font:15px/1.6 sans-serif;color:#1C2733">Bonjour ${esc(data.name)},</p><p style="font:15px/1.6 sans-serif;color:#1C2733">Merci pour votre demande concernant : <strong>${esc(serviceLabel)}</strong>. Nous vous répondons sous 48 h ouvrées.</p><p style="font:15px/1.6 sans-serif;color:#1C2733">L’équipe Kaenys<br><a href="https://kaenys.com/fr/" style="color:#003152">kaenys.com</a></p>`,
        }
      : {
          subject: 'Kaenys · We have received your request',
          html: `<p style="font:15px/1.6 sans-serif;color:#1C2733">Hello ${esc(data.name)},</p><p style="font:15px/1.6 sans-serif;color:#1C2733">Thank you for your request about: <strong>${esc(SERVICES[data.service]?.en ?? data.service)}</strong>. We will reply within 48 business hours.</p><p style="font:15px/1.6 sans-serif;color:#1C2733">The Kaenys team<br><a href="https://kaenys.com/en/" style="color:#003152">kaenys.com</a></p>`,
        };
    await send(env, { from, to: [data.email], reply_to: to, ...confirm });
  } catch (err) {
    console.error(err);
    return json(502, { ok: false, error: 'send_failed' });
  }

  return json(200, { ok: true });
}
