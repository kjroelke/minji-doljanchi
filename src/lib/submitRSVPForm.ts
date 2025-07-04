import type { RSVPFormData } from './types';

export default async function submitRSVPForm(data: RSVPFormData) {
	const response = await fetch(
		'https://www.kjroelke.online/wp-json/custom/v1/send-email',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				rsvp: data.rsvp,
				adults: data.adults,
				kids: data.kids,
				dietary: data.dietary,
				note: data.note,
				recaptcha_token: data.recaptcha_token,
			}),
		}
	);
	const result = await response.json();

	if (result.success) {
		return "Thank you for your RSVP! Check your email for confirmation from “WordPress,” we promise it's us! (It might take a few minutes to arrive, and it might end up in your spam folder, so please check there too.)";
	} else {
		return result.error || result.message || 'Unknown error.';
	}
}
