<script lang="ts">
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let error = '';
	let loading = false;

	async function handleLogin() {
		error = '';
		loading = true;

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			const data = await response.json();

			if (response.ok) {
				await goto('/dashboard');
			} else {
				error = data.error || 'Login failed';
			}
		} catch (err) {
			error = 'Connection error. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="login-page">
	<div class="login-container">
		<div class="logo-section">
			<svg width="60" height="60" viewBox="0 0 40 40" fill="none">
				<rect width="40" height="40" rx="8" fill="#0066cc" />
				<path d="M10 20L15 15V25L10 20Z" fill="white" />
				<path d="M20 10L25 15H15L20 10Z" fill="white" />
				<path d="M30 20L25 25V15L30 20Z" fill="white" />
				<path d="M20 30L15 25H25L20 30Z" fill="white" />
			</svg>
			<h1>Contaboo</h1>
			<p>Real Estate CRM</p>
		</div>

		<form on:submit|preventDefault={handleLogin} class="login-form">
			<h2>Login</h2>

			{#if error}
				<div class="error-message">{error}</div>
			{/if}

			<div class="form-group">
				<label for="username">Username</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					placeholder="Enter username"
					required
					disabled={loading}
				/>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="Enter password"
					required
					disabled={loading}
				/>
			</div>

			<button type="submit" disabled={loading} class="login-btn">
				{loading ? 'Logging in...' : 'Login'}
			</button>
		</form>
	</div>
</div>

<style>
	.login-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 20px;
	}

	.login-container {
		background: white;
		border-radius: 16px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
		padding: 3rem;
		width: 100%;
		max-width: 450px;
	}

	.logo-section {
		text-align: center;
		margin-bottom: 2rem;
	}

	.logo-section svg {
		margin-bottom: 1rem;
	}

	.logo-section h1 {
		font-size: 2rem;
		color: #0066cc;
		margin-bottom: 0.5rem;
	}

	.logo-section p {
		color: #666;
		font-size: 1.1rem;
	}

	.login-form h2 {
		margin-bottom: 1.5rem;
		color: #333;
		text-align: center;
	}

	.error-message {
		background: #fee;
		color: #c33;
		padding: 1rem;
		border-radius: 6px;
		margin-bottom: 1rem;
		text-align: center;
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

	.form-group input {
		width: 100%;
		padding: 0.875rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s;
	}

	.form-group input:focus {
		outline: none;
		border-color: #0066cc;
	}

	.form-group input:disabled {
		background: #f5f5f5;
		cursor: not-allowed;
	}

	.login-btn {
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

	.login-btn:hover:not(:disabled) {
		background: #0052a3;
	}

	.login-btn:disabled {
		background: #ccc;
		cursor: not-allowed;
	}
</style>
