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
				vote: data.vote,
				doljabi: data.doljabi,
			}),
		}
	);
	const result = await response.json();

	if (result.success) {
		return 'Nice!';
	} else {
		return result.error || result.message || 'Unknown error.';
	}
}
