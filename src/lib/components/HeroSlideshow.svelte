<script lang="ts">
	import { onMount } from 'svelte';

	export let slides: any[] = [];

	let currentSlide = 0;
	let intervalId: any;

	onMount(() => {
		if (slides.length > 1) {
			intervalId = setInterval(() => {
				currentSlide = (currentSlide + 1) % slides.length;
			}, 5000);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});

	function goToSlide(index: number) {
		currentSlide = index;
	}
</script>

<div class="hero-slideshow">
	{#if slides.length > 0}
		{#each slides as slide, i}
			<div class="slide" class:active={i === currentSlide}>
				<img src={slide.imageUrl} alt={slide.title || 'Property'} />
				<div class="slide-content">
					{#if slide.title}
						<h1>{slide.title}</h1>
					{/if}
					{#if slide.subtitle}
						<p>{slide.subtitle}</p>
					{/if}
				</div>
			</div>
		{/each}

		{#if slides.length > 1}
			<div class="dots">
				{#each slides as _, i}
					<button
						class="dot"
						class:active={i === currentSlide}
						on:click={() => goToSlide(i)}
						aria-label="Go to slide {i + 1}"
					></button>
				{/each}
			</div>
		{/if}
	{:else}
		<div class="slide active">
			<img
				src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
				alt="Default hero"
			/>
			<div class="slide-content">
				<h1>Find Your Dream Property</h1>
				<p>Explore our collection of premium real estate</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.hero-slideshow {
		position: relative;
		height: 500px;
		overflow: hidden;
		background: #000;
	}

	.slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	.slide.active {
		opacity: 1;
		z-index: 1;
	}

	.slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.slide-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		color: white;
		z-index: 2;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
		width: 90%;
		max-width: 800px;
	}

	.slide-content h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		font-weight: 700;
	}

	.slide-content p {
		font-size: 1.5rem;
		opacity: 0.9;
	}

	.dots {
		position: absolute;
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 12px;
		z-index: 3;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.5);
		border: none;
		cursor: pointer;
		transition: all 0.3s;
	}

	.dot.active {
		background: white;
		width: 30px;
		border-radius: 6px;
	}

	@media (max-width: 768px) {
		.hero-slideshow {
			height: 400px;
		}

		.slide-content h1 {
			font-size: 2rem;
		}

		.slide-content p {
			font-size: 1.2rem;
		}
	}
</style>
