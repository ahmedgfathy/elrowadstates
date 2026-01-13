<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let lang = 'en';
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function switchLang() {
		lang = lang === 'en' ? 'ar' : 'en';
	}

	async function handleLogin() {
		await goto('/login');
	}
</script>

<nav class="navbar">
	<div class="container">
		<div class="nav-content">
			<a href="/" class="logo">
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none">
					<rect width="40" height="40" rx="8" fill="#0066cc"/>
					<path d="M10 20L15 15V25L10 20Z" fill="white"/>
					<path d="M20 10L25 15H15L20 10Z" fill="white"/>
					<path d="M30 20L25 25V15L30 20Z" fill="white"/>
					<path d="M20 30L15 25H25L20 30Z" fill="white"/>
				</svg>
				<span class="logo-text">Contaboo</span>
			</a>

    <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle mobile menu">
				<span></span>
			</button>

			<div class="nav-links" class:open={isMenuOpen}>
				<a href="/">Home</a>
				<a href="/sell">Sell</a>
				<a href="/rent">Rent</a>
				<a href="/about">About Us</a>
				<a href="/contact">Contact Us</a>
			</div>

			<div class="nav-actions">
				<button class="lang-btn" on:click={switchLang} title="Switch Language">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
						<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 17.931 9zM10 17.17a12.789 12.789 0 0 1-2.453-6.17h4.906A12.789 12.789 0 0 1 10 17.17zm-2.763-7.17A12.789 12.789 0 0 1 10 2.83a12.789 12.789 0 0 1 2.763 7.17H7.237zm-.582-7.243A14.67 14.67 0 0 0 4.863 9H2.069a8.013 8.013 0 0 1 4.586-6.243zM2.07 11h2.764a14.67 14.67 0 0 0 1.792 6.243A8.013 8.013 0 0 1 2.07 11zm10.695 6.243A14.67 14.67 0 0 0 14.557 11h2.764a8.013 8.013 0 0 1-4.556 6.243z"/>
					</svg>
					{lang.toUpperCase()}
				</button>
				<button class="login-btn" on:click={handleLogin}>Login</button>
			</div>
		</div>
	</div>
</nav>

<style>
	.navbar {
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 1000;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.nav-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0;
		gap: 2rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: #333;
		font-weight: 700;
		font-size: 1.5rem;
	}

	.logo-text {
		color: #0066cc;
	}

	.menu-toggle {
		display: none;
		flex-direction: column;
		gap: 4px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 5px;
	}

	.menu-toggle span {
		width: 25px;
		height: 3px;
		background: #333;
		border-radius: 3px;
		transition: 0.3s;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
		align-items: center;
		flex: 1;
		justify-content: center;
	}

	.nav-links a {
		text-decoration: none;
		color: #333;
		font-weight: 500;
		transition: color 0.3s;
		padding: 0.5rem 1rem;
	}

	.nav-links a:hover {
		color: #0066cc;
	}

	.nav-actions {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.lang-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: 1px solid #ddd;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.3s;
	}

	.lang-btn:hover {
		background: #f5f5f5;
		border-color: #0066cc;
		color: #0066cc;
	}

	.login-btn {
		background: #0066cc;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s;
	}

	.login-btn:hover {
		background: #0052a3;
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: flex;
		}

		.nav-links {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: white;
			flex-direction: column;
			padding: 1rem;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			display: none;
		}

		.nav-links.open {
			display: flex;
		}

		.nav-links a {
			width: 100%;
			text-align: center;
		}
	}
</style>
