<script lang="ts">
	import type { PageData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: PageData;
	const { property } = data;

	const agentPhone = '01002778090';

	let currentImageIndex = 0;
	let showContactForm = false;
	let formData = {
		name: '',
		email: '',
		phone: '',
		message: ''
	};
	let formStatus = '';

	function formatPrice(price: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0
		}).format(price);
	}

	function nextImage() {
		if (property.images.length > 0) {
			currentImageIndex = (currentImageIndex + 1) % property.images.length;
		}
	}

	function prevImage() {
		if (property.images.length > 0) {
			currentImageIndex =
				(currentImageIndex - 1 + property.images.length) % property.images.length;
		}
	}

	function selectImage(index: number) {
		currentImageIndex = index;
	}

	async function handleSubmit() {
		if (!formData.name || !formData.phone || !formData.message) {
			formStatus = 'Please fill in all required fields';
			return;
		}

		try {
			const response = await fetch('/api/leads', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...formData,
					propertyId: property.id
				})
			});

			if (response.ok) {
				formStatus = 'Thank you! We will contact you soon.';
				formData = { name: '', email: '', phone: '', message: '' };
			} else {
				formStatus = 'Error sending message. Please try again.';
			}
		} catch (error) {
			formStatus = 'Error sending message. Please try again.';
		}
	}
</script>

<Navbar />

<main>
	<div class="container">
		<div class="property-details">
			<div class="gallery">
				{#if property.images && property.images.length > 0}
					<div class="main-image">
						<img src={property.images[currentImageIndex]} alt={property.title} />
						{#if property.images.length > 1}
							<button class="nav-btn prev" on:click={prevImage}>←</button>
							<button class="nav-btn next" on:click={nextImage}>→</button>
						{/if}
					</div>
					{#if property.images.length > 1}
						<div class="thumbnails">
							{#each property.images as image, i}
								<button
									class="thumbnail"
									class:active={i === currentImageIndex}
									on:click={() => selectImage(i)}
								>
									<img src={image} alt={`${property.title} ${i + 1}`} />
								</button>
							{/each}
						</div>
					{/if}
				{:else}
					<div class="main-image">
						<img
							src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
							alt={property.title}
						/>
					</div>
				{/if}
			</div>

			<div class="content-wrapper">
				<div class="property-info">
					<div class="header">
						<div>
							<span class="type-badge" class:rent={property.type === 'rent'}>
								{property.type === 'sell' ? 'For Sale' : 'For Rent'}
							</span>
							<h1>{property.title}</h1>
							<p class="location">📍 {property.region}</p>
						</div>
						<div class="price">
							{formatPrice(property.price)}{property.type === 'rent' ? '/month' : ''}
						</div>
					</div>

					<div class="features-grid">
						{#if property.bedrooms}
							<div class="feature">
								<span class="icon">🛏️</span>
								<div>
									<strong>{property.bedrooms}</strong>
									<span>Bedrooms</span>
								</div>
							</div>
						{/if}
						{#if property.bathrooms}
							<div class="feature">
								<span class="icon">🚿</span>
								<div>
									<strong>{property.bathrooms}</strong>
									<span>Bathrooms</span>
								</div>
							</div>
						{/if}
						{#if property.area}
							<div class="feature">
								<span class="icon">📐</span>
								<div>
									<strong>{property.area} m²</strong>
									<span>Area</span>
								</div>
							</div>
						{/if}
						<div class="feature">
							<span class="icon">🏷️</span>
							<div>
								<strong>{property.category}</strong>
								<span>Type</span>
							</div>
						</div>
					</div>

					<div class="description">
						<h2>Description</h2>
						<p>{property.description}</p>
					</div>

					{#if property.address}
						<div class="address">
							<h2>Address</h2>
							<p>{property.address}</p>
						</div>
					{/if}
				</div>

				<div class="contact-card">
					<h3>Contact Agent</h3>
					<div class="agent-info">
						<p class="agent-phone">📞 {agentPhone}</p>
					</div>

					<button class="contact-btn" on:click={() => (showContactForm = !showContactForm)}>
						{showContactForm ? 'Hide Form' : 'Send Message'}
					</button>

					{#if showContactForm}
						<form on:submit|preventDefault={handleSubmit} class="contact-form">
							<input
								type="text"
								placeholder="Your Name *"
								bind:value={formData.name}
								required
							/>
							<input type="email" placeholder="Email" bind:value={formData.email} />
							<input
								type="tel"
								placeholder="Phone *"
								bind:value={formData.phone}
								required
							/>
							<textarea
								placeholder="Message *"
								bind:value={formData.message}
								required
								rows="4"
							></textarea>
							<button type="submit" class="submit-btn">Send Message</button>
							{#if formStatus}
								<p class="form-status">{formStatus}</p>
							{/if}
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>

<Footer />

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 40px 20px;
	}

	.property-details {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.gallery {
		width: 100%;
	}

	.main-image {
		position: relative;
		width: 100%;
		height: 500px;
		border-radius: 12px;
		overflow: hidden;
		background: #f0f0f0;
	}

	.main-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.nav-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.5);
		color: white;
		border: none;
		padding: 1rem 1.5rem;
		cursor: pointer;
		font-size: 1.5rem;
		transition: background 0.3s;
	}

	.nav-btn:hover {
		background: rgba(0, 0, 0, 0.7);
	}

	.nav-btn.prev {
		left: 0;
	}

	.nav-btn.next {
		right: 0;
	}

	.thumbnails {
		display: flex;
		gap: 10px;
		margin-top: 10px;
		overflow-x: auto;
	}

	.thumbnail {
		flex-shrink: 0;
		width: 100px;
		height: 75px;
		border: 2px solid transparent;
		border-radius: 6px;
		overflow: hidden;
		cursor: pointer;
		background: none;
		padding: 0;
		transition: border-color 0.3s;
	}

	.thumbnail.active {
		border-color: #0066cc;
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.content-wrapper {
		display: grid;
		grid-template-columns: 1fr 350px;
		gap: 2rem;
	}

	.property-info {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
		gap: 2rem;
	}

	.type-badge {
		display: inline-block;
		background: #0066cc;
		color: white;
		padding: 6px 12px;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.type-badge.rent {
		background: #28a745;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: #333;
	}

	.location {
		color: #666;
		font-size: 1.1rem;
	}

	.price {
		font-size: 2rem;
		color: #0066cc;
		font-weight: 700;
		white-space: nowrap;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
		padding: 2rem;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.feature {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.feature .icon {
		font-size: 2rem;
	}

	.feature div {
		display: flex;
		flex-direction: column;
	}

	.feature strong {
		font-size: 1.1rem;
		color: #333;
	}

	.feature span {
		font-size: 0.875rem;
		color: #666;
	}

	.description,
	.address {
		margin-bottom: 2rem;
	}

	.description h2,
	.address h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #333;
	}

	.description p,
	.address p {
		line-height: 1.8;
		color: #666;
	}

	.contact-card {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		height: fit-content;
		position: sticky;
		top: 20px;
	}

	.contact-card h3 {
		margin-bottom: 1.5rem;
		color: #333;
	}

	.agent-info {
		margin-bottom: 1.5rem;
	}

	.agent-phone {
		font-size: 1.25rem;
		color: #0066cc;
		font-weight: 600;
	}

	.contact-btn {
		width: 100%;
		background: #0066cc;
		color: white;
		border: none;
		padding: 1rem;
		border-radius: 6px;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.3s;
		margin-bottom: 1rem;
	}

	.contact-btn:hover {
		background: #0052a3;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.contact-form input,
	.contact-form textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 1rem;
		font-family: inherit;
	}

	.submit-btn {
		background: #28a745;
		color: white;
		border: none;
		padding: 1rem;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s;
	}

	.submit-btn:hover {
		background: #218838;
	}

	.form-status {
		text-align: center;
		padding: 0.5rem;
		border-radius: 6px;
		background: #e7f3ff;
		color: #0066cc;
	}

	@media (max-width: 968px) {
		.content-wrapper {
			grid-template-columns: 1fr;
		}

		.contact-card {
			position: static;
		}

		.header {
			flex-direction: column;
		}

		.price {
			font-size: 1.75rem;
		}

		h1 {
			font-size: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.main-image {
			height: 300px;
		}

		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
