import type { RSVPFormData } from './types';

export default async function submitRSVPForm(data: RSVPFormData) {
	const response = await fetch(
		'https://www.kjroelke.online/wp-json/custom/v1/send-email',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Basic ' +
					btoa(
						`${process.env.WP_APP_USER}:${process.env.WP_APP_PASSWORD}`
					),
			},
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				rsvp: data.rsvp,
				adults: data.adults,
				kids: data.kids,
				dietary: data.dietary,
				note: data.note,
			}),
		}
	);
	const result = await response.json();
	if (result.success) {
		return 'Thank you for your RSVP!';
	} else {
		return result.error;
	}
}
