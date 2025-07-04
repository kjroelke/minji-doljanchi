import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { RSVPFormData } from '../lib/types';
import submitRSVPForm from '../lib/submitRSVPForm';
import { recaptchaSiteKey } from '../consts';

export default function RSVPForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RSVPFormData>();
	const [submitted, setSubmitted] = useState('');
	const rsvp = watch('rsvp');
	const [loading, setLoading] = useState(false);

	// Recaptcha v3 integration
	const [recaptchaReady, setRecaptchaReady] = useState(false);
	useEffect(() => {
		// @ts-ignore
		if (window.grecaptcha) {
			setRecaptchaReady(true);
			return;
		}
	}, []);

	async function onSubmit(data: RSVPFormData) {
		setLoading(true);
		// @ts-ignore
		if (!window.grecaptcha) {
			setSubmitted('Recaptcha not loaded. Please try again later.');
			setLoading(false);
			return;
		}
		try {
			// @ts-ignore
			const recaptcha_token = await window.grecaptcha.execute(
				recaptchaSiteKey,
				{ action: 'submit' }
			);
			const result = await submitRSVPForm({ ...data, recaptcha_token });
			setSubmitted(result);
		} catch (error) {
			setSubmitted(
				`There was an error submitting your RSVP. ${error}. Please try again later.`
			);
		} finally {
			setLoading(false);
		}
	}

	if ('' !== submitted) {
		return <div className="alert alert-success mt-4">{submitted}</div>;
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="row row-gap-3 justify-content-center text-md-center"
		>
			<div className="col-md-6">
				<input
					type="text"
					className="form-control"
					placeholder="Your Name"
					autoComplete="name"
					{...register('name', { required: true })}
					disabled={loading}
				/>
				{errors.name && (
					<span className="text-danger small">Name is required</span>
				)}
			</div>
			<div className="col-md-6">
				<input
					type="email"
					autoComplete="email"
					className="form-control"
					placeholder="Your Email"
					{...register('email', { required: true })}
					disabled={loading}
				/>
				{errors.email && (
					<span className="text-danger small">Email is required</span>
				)}
			</div>
			<div className="col-12">
				<div className="d-flex justify-content-center gap-3">
					<label>
						<input
							type="radio"
							value="yes"
							{...register('rsvp', { required: true })}
							disabled={loading}
						/>{' '}
						Yes, I/we will attend
					</label>
					<label>
						<input
							type="radio"
							value="no"
							{...register('rsvp', { required: true })}
							disabled={loading}
						/>{' '}
						No, I/we cannot attend
					</label>
				</div>
				{errors.rsvp && (
					<span className="text-danger small">
						Please select an option
					</span>
				)}
			</div>
			{rsvp === 'yes' && (
				<>
					<div className="col-md-6">
						<input
							type="number"
							className="form-control"
							placeholder="Number of Adults"
							min={1}
							{...register('adults', { required: true, min: 1 })}
							disabled={loading}
						/>
						{errors.adults && (
							<span className="text-danger small">Required</span>
						)}
					</div>
					<div className="col-md-6">
						<input
							type="number"
							className="form-control"
							placeholder="Number of Kids"
							min={0}
							{...register('kids', { required: true, min: 0 })}
							disabled={loading}
						/>
						{errors.kids && (
							<span className="text-danger small">Required</span>
						)}
					</div>
					<div className="col-12">
						<textarea
							className="form-control"
							placeholder="Dietary restrictions or other notes"
							{...register('dietary')}
							disabled={loading}
						></textarea>
						{errors.dietary && (
							<span className="text-danger small">Required</span>
						)}
					</div>
				</>
			)}
			{rsvp === 'no' && (
				<div className="col-12">
					<textarea
						className="form-control"
						placeholder="Send us a note (optional)"
						{...register('note')}
						disabled={loading}
					></textarea>
				</div>
			)}
			{rsvp && (
				<div className="col-12">
					<button
						type="submit"
						className="btn btn-outline-dark"
						disabled={!recaptchaReady || loading}
						style={{ position: 'relative', minWidth: 100 }}
					>
						{loading ? (
							<span
								className="spinner-border spinner-border-sm me-2"
								role="status"
								aria-hidden="true"
							></span>
						) : null}
						RSVP
					</button>
					{!recaptchaReady && (
						<div className="text-danger small mt-2">
							Loading Recaptcha...
						</div>
					)}
				</div>
			)}
		</form>
	);
}
