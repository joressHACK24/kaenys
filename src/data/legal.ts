import type { Lang } from '../i18n/ui';

// BROUILLONS. À compléter puis faire relire par un professionnel avant la mise en ligne (cahier des charges, section 6).
// Mettre à jour la raison sociale, le numéro d'immatriculation et l'adresse à l'enregistrement de Kaenys au Cameroun.

export type LegalKey = 'legal' | 'privacy' | 'terms';

interface Doc {
  title: string;
  description: string;
  updated: string;
  draftNote: string;
  sections: { h: string; p: string[] }[];
}

const draftFr = 'Document provisoire, en cours de relecture par un professionnel.';
const draftEn = 'Provisional document, currently being reviewed by a professional.';

export const legal: Record<LegalKey, Record<Lang, Doc>> = {
  legal: {
    fr: {
      title: 'Mentions légales',
      description: 'Mentions légales du site kaenys.com : éditeur, hébergement et propriété intellectuelle.',
      updated: '16 novembre 2026',
      draftNote: draftFr,
      sections: [
        { h: 'Éditeur du site', p: ['Kaenys, [forme juridique et raison sociale à compléter], Douala, Cameroun.', 'Numéro d’immatriculation : [à compléter après enregistrement].', 'Contact : <a href="mailto:contact@kaenys.com">contact@kaenys.com</a>.', 'Responsables de la publication : Joress Fritz Nyam Fotso et Bryan Nlend Biyeguel Linkholn.'] },
        { h: 'Hébergement', p: ['Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis — <a href="https://www.cloudflare.com" rel="noopener">cloudflare.com</a>.'] },
        { h: 'Propriété intellectuelle', p: ['Les textes, logos, visuels et vidéos de ce site appartiennent à Kaenys ou à ses clients, qui en ont autorisé la diffusion. Toute reproduction sans accord écrit est interdite.'] },
        { h: 'Statistiques de visite', p: ['Le site utilise Cloudflare Web Analytics, un outil de mesure d’audience sans cookies, qui ne collecte pas de données permettant de vous identifier.'] },
      ],
    },
    en: {
      title: 'Legal notice',
      description: 'Legal notice for kaenys.com: publisher, hosting and intellectual property.',
      updated: '16 November 2026',
      draftNote: draftEn,
      sections: [
        { h: 'Publisher', p: ['Kaenys, [legal form and company name to be completed], Douala, Cameroon.', 'Registration number: [to be completed after registration].', 'Contact: <a href="mailto:contact@kaenys.com">contact@kaenys.com</a>.', 'Publication managers: Joress Fritz Nyam Fotso and Bryan Nlend Biyeguel Linkholn.'] },
        { h: 'Hosting', p: ['Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, United States — <a href="https://www.cloudflare.com" rel="noopener">cloudflare.com</a>.'] },
        { h: 'Intellectual property', p: ['The text, logos, visuals and videos on this site belong to Kaenys or to its clients, who have authorised their publication. Any reproduction without written consent is prohibited.'] },
        { h: 'Visitor analytics', p: ['This site uses Cloudflare Web Analytics, a cookie-free audience measurement tool that does not collect data that can identify you.'] },
      ],
    },
  },
  privacy: {
    fr: {
      title: 'Politique de confidentialité',
      description: 'Comment Kaenys collecte et protège les données personnelles transmises par le formulaire de contact.',
      updated: '16 novembre 2026',
      draftNote: draftFr,
      sections: [
        { h: 'Données collectées', p: ['Lorsque vous remplissez le formulaire de devis, nous recevons : votre nom, votre entreprise (facultatif), votre e-mail, votre numéro de téléphone ou WhatsApp, le service souhaité, votre budget approximatif (facultatif), la description de votre besoin et, le cas échéant, une pièce jointe.'] },
        { h: 'Utilisation', p: ['Ces informations servent uniquement à répondre à votre demande et à établir un devis. Elles ne sont ni vendues ni cédées à des tiers.'] },
        { h: 'Conservation', p: ['Nous conservons vos données le temps nécessaire au traitement de votre demande, puis au maximum 3 ans après notre dernier échange, sauf obligation légale contraire.'] },
        { h: 'Prestataires', p: ['L’envoi des e-mails du formulaire passe par un prestataire technique [nom à compléter]. Le site est hébergé par Cloudflare.'] },
        { h: 'Vos droits', p: ['Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à <a href="mailto:contact@kaenys.com">contact@kaenys.com</a>. Ces droits s’appliquent conformément à la loi camerounaise sur la cybersécurité et la protection des données et, pour les visiteurs européens, au RGPD.'] },
        { h: 'Cookies', p: ['Ce site n’utilise pas de cookies de suivi. La mesure d’audience est réalisée sans cookies.'] },
      ],
    },
    en: {
      title: 'Privacy policy',
      description: 'How Kaenys collects and protects personal data sent through the contact form.',
      updated: '16 November 2026',
      draftNote: draftEn,
      sections: [
        { h: 'Data we collect', p: ['When you fill in the quote form, we receive: your name, your company (optional), your email, your phone or WhatsApp number, the service you need, your approximate budget (optional), a description of your needs and, if provided, an attachment.'] },
        { h: 'How we use it', p: ['This information is used only to reply to your request and prepare a quote. It is never sold or shared with third parties.'] },
        { h: 'Retention', p: ['We keep your data for as long as needed to handle your request, then for no more than 3 years after our last exchange, unless the law requires otherwise.'] },
        { h: 'Service providers', p: ['Form emails are sent through a technical provider [name to be completed]. The site is hosted by Cloudflare.'] },
        { h: 'Your rights', p: ['You can request access to, correction of or deletion of your data by writing to <a href="mailto:contact@kaenys.com">contact@kaenys.com</a>. These rights apply under Cameroonian law on cybersecurity and data protection and, for European visitors, under the GDPR.'] },
        { h: 'Cookies', p: ['This site does not use tracking cookies. Audience measurement is cookie-free.'] },
      ],
    },
  },
  terms: {
    fr: {
      title: 'Conditions de vente',
      description: 'Conditions générales de vente des prestations de Kaenys.',
      updated: '16 novembre 2026',
      draftNote: draftFr,
      sections: [
        { h: 'Devis et commande', p: ['Chaque prestation fait l’objet d’un devis gratuit, valable 30 jours. La commande est confirmée par l’acceptation écrite du devis et le versement de l’acompte prévu.'] },
        { h: 'Prix et paiement', p: ['Les prix sont indiqués en francs CFA (FCFA). Les tarifs affichés « à partir de » sont indicatifs ; seul le devis fait foi. Paiement par mobile money ou virement, selon l’échéancier du devis.'] },
        { h: 'Délais', p: ['Les délais indiqués dans le devis courent à partir de la réception de l’acompte et des éléments nécessaires fournis par le client.'] },
        { h: 'Formations', p: ['L’inscription est confirmée à réception du paiement par mobile money. [Conditions d’annulation et de report à compléter.]'] },
        { h: 'Propriété et droits', p: ['Les droits d’utilisation des livrables sont transférés au client après paiement complet. Kaenys peut présenter les travaux réalisés dans son portfolio, uniquement avec l’accord écrit du client.'] },
      ],
    },
    en: {
      title: 'Terms of sale',
      description: 'General terms of sale for Kaenys services.',
      updated: '16 November 2026',
      draftNote: draftEn,
      sections: [
        { h: 'Quotes and orders', p: ['Every service is subject to a free quote, valid for 30 days. The order is confirmed by written acceptance of the quote and payment of the agreed deposit.'] },
        { h: 'Prices and payment', p: ['Prices are in CFA francs (FCFA). “From” prices are indicative; only the quote is binding. Payment by mobile money or bank transfer, according to the quote’s schedule.'] },
        { h: 'Timelines', p: ['Timelines stated in the quote start once the deposit and all materials needed from the client have been received.'] },
        { h: 'Training', p: ['Enrolment is confirmed once mobile money payment is received. [Cancellation and rescheduling terms to be completed.]'] },
        { h: 'Ownership and rights', p: ['Usage rights to deliverables are transferred to the client after full payment. Kaenys may show completed work in its portfolio only with the client’s written consent.'] },
      ],
    },
  },
};
