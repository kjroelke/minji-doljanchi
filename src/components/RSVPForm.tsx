import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { RSVPFormData } from '../lib/types';
import submitRSVPForm from '../lib/submitRSVPForm';

export default function RSVPForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RSVPFormData>();
	const [submitted, setSubmitted] = useState('');
	const rsvp = watch('rsvp');

	async function onSubmit(data: RSVPFormData) {
		try {
			await submitRSVPForm(data);
			setSubmitted('Thank you for your RSVP!');
		} catch (error) {
			console.error('Error submitting RSVP form:', error);
			setSubmitted(
				`There was an error submitting your RSVP. ${error}. Please try again later.`
			);
			return;
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
						/>{' '}
						Yes, I/we will attend
					</label>
					<label>
						<input
							type="radio"
							value="no"
							{...register('rsvp', { required: true })}
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
					></textarea>
				</div>
			)}
			{rsvp && (
				<div className="col-12">
					<input
						type="submit"
						className="btn btn-outline-dark"
						value="RSVP"
					/>
				</div>
			)}
		</form>
	);
}
