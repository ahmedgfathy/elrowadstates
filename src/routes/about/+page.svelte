<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />

<main>
	<div class="hero">
		<h1>About Contaboo</h1>
		<p>Your Trusted Real Estate Partner</p>
	</div>

	<div class="container">
		<section class="about-content">
			<h2>Who We Are</h2>
			<p>
				Contaboo is a leading real estate company dedicated to helping you find your dream property.
				With years of experience in the market, we provide comprehensive real estate services
				including property sales, rentals, and professional consultation.
			</p>

			<h2>Our Mission</h2>
			<p>
				To provide exceptional real estate services that exceed our clients' expectations, offering
				transparent, reliable, and personalized solutions for all your property needs.
			</p>

			<h2>Why Choose Us</h2>
			<div class="features">
				<div class="feature">
					<span class="icon">🏆</span>
					<h3>Expert Team</h3>
					<p>Professional real estate agents with extensive market knowledge</p>
				</div>
				<div class="feature">
					<span class="icon">🌟</span>
					<h3>Premium Properties</h3>
					<p>Exclusive collection of high-quality properties in prime locations</p>
				</div>
				<div class="feature">
					<span class="icon">🤝</span>
					<h3>Trusted Service</h3>
					<p>Transparent processes and dedicated customer support</p>
				</div>
				<div class="feature">
					<span class="icon">💼</span>
					<h3>Professional Guidance</h3>
					<p>Expert advice throughout your property journey</p>
				</div>
			</div>
		</section>
	</div>
</main>

<Footer />

<style>
	.hero {
		height: 400px;
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
			url('https://images.unsplash.com/photo-1560518883-ce09059eeffa') center/cover;
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

	.about-content h2 {
		font-size: 2.5rem;
		margin-bottom: 1.5rem;
		color: #333;
	}

	.about-content p {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #666;
		margin-bottom: 2rem;
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.feature {
		text-align: center;
		padding: 2rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.feature .icon {
		font-size: 3rem;
		display: block;
		margin-bottom: 1rem;
	}

	.feature h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #333;
	}

	.feature p {
		color: #666;
		margin: 0;
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2.5rem;
		}

		.hero p {
			font-size: 1.2rem;
		}

		.about-content h2 {
			font-size: 2rem;
		}

		.features {
			grid-template-columns: 1fr;
		}
	}
</style>
