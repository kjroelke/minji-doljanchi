export interface RSVPFormData {
	name: string;
	email: string;
	rsvp: 'yes' | 'no';
	adults?: number;
	kids?: number;
	dietary?: string;
	note?: string;
	recaptcha_token?: string;
}
