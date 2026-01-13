<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let formData = {
		name: '',
		email: '',
		phone: '',
		message: ''
	};

	let formStatus = '';
	let loading = false;

	async function handleSubmit() {
		if (!formData.name || !formData.phone || !formData.message) {
			formStatus = 'Please fill in all required fields';
			return;
		}

		loading = true;
		formStatus = '';

		try {
			const response = await fetch('/api/leads', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				formStatus = 'Thank you for contacting us! We will get back to you soon.';
				formData = { name: '', email: '', phone: '', message: '' };
			} else {
				formStatus = 'Error sending message. Please try again.';
			}
		} catch (error) {
			formStatus = 'Error sending message. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<Navbar />

<main>
	<div class="hero">
		<h1>Contact Us</h1>
		<p>We're here to help with all your real estate needs</p>
	</div>

	<div class="container">
		<div class="contact-wrapper">
			<div class="contact-info">
				<h2>Get In Touch</h2>
				<p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

				<div class="info-items">
					<div class="info-item">
						<span class="icon">📞</span>
						<div>
							<h3>Phone</h3>
							<p><a href="tel:01002778090">01002778090</a></p>
						</div>
					</div>

					<div class="info-item">
						<span class="icon">📧</span>
						<div>
							<h3>Email</h3>
							<p><a href="mailto:info@contaboo.com">info@contaboo.com</a></p>
						</div>
					</div>

					<div class="info-item">
						<span class="icon">📍</span>
						<div>
							<h3>Office</h3>
							<p>Visit our office for personalized service</p>
						</div>
					</div>

					<div class="info-item">
						<span class="icon">🕒</span>
						<div>
							<h3>Business Hours</h3>
							<p>Mon - Sat: 9:00 AM - 6:00 PM</p>
							<p>Sunday: Closed</p>
						</div>
					</div>
				</div>
			</div>

			<div class="contact-form-section">
				<h2>Send Us a Message</h2>
				<form on:submit|preventDefault={handleSubmit}>
					<div class="form-group">
						<label for="name">Name *</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							placeholder="Your name"
							required
							disabled={loading}
						/>
					</div>

					<div class="form-group">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							placeholder="your@email.com"
							disabled={loading}
						/>
					</div>

					<div class="form-group">
						<label for="phone">Phone *</label>
						<input
							type="tel"
							id="phone"
							bind:value={formData.phone}
							placeholder="Your phone number"
							required
							disabled={loading}
						/>
					</div>

					<div class="form-group">
						<label for="message">Message *</label>
						<textarea
							id="message"
							bind:value={formData.message}
							placeholder="How can we help you?"
							required
							rows="6"
							disabled={loading}
						></textarea>
					</div>

					<button type="submit" disabled={loading} class="submit-btn">
						{loading ? 'Sending...' : 'Send Message'}
					</button>

					{#if formStatus}
						<p class="form-status" class:success={formStatus.includes('Thank you')}>
							{formStatus}
						</p>
					{/if}
				</form>
			</div>
		</div>
	</div>
</main>

<Footer />

<style>
	.hero {
		height: 300px;
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
			url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab') center/cover;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
		text-align: center;
	}

	.hero h1 {
		font-size: 3.5rem;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
	}

	.hero p {
		font-size: 1.5rem;
		text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 60px 20px;
	}

	.contact-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
	}

	.contact-info h2,
	.contact-form-section h2 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		color: #333;
	}

	.contact-info p {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #666;
		margin-bottom: 2rem;
	}

	.info-items {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.info-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.info-item .icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.info-item h3 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
		color: #333;
	}

	.info-item p {
		margin: 0;
		color: #666;
	}

	.info-item a {
		color: #0066cc;
		text-decoration: none;
	}

	.info-item a:hover {
		text-decoration: underline;
	}

	.contact-form-section {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #333;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 0.875rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 1rem;
		font-family: inherit;
		transition: border-color 0.3s;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #0066cc;
	}

	.form-group input:disabled,
	.form-group textarea:disabled {
		background: #f5f5f5;
		cursor: not-allowed;
	}

	.submit-btn {
		width: 100%;
		background: #0066cc;
		color: white;
		border: none;
		padding: 1rem;
		border-radius: 8px;
		font-weight: 600;
		font-size: 1.1rem;
		cursor: pointer;
		transition: background 0.3s;
	}

	.submit-btn:hover:not(:disabled) {
		background: #0052a3;
	}

	.submit-btn:disabled {
		background: #ccc;
		cursor: not-allowed;
	}

	.form-status {
		margin-top: 1rem;
		padding: 1rem;
		border-radius: 6px;
		text-align: center;
		background: #fee;
		color: #c33;
	}

	.form-status.success {
		background: #d4edda;
		color: #155724;
	}

	@media (max-width: 968px) {
		.contact-wrapper {
			grid-template-columns: 1fr;
		}

		.hero h1 {
			font-size: 2.5rem;
		}

		.hero p {
			font-size: 1.2rem;
		}
	}
</style>
