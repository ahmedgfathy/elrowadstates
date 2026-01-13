<script lang="ts">
import type { PageData } from './$types';

let { data }: { data: PageData } = $props();

const stats = [
{
label: 'Total Properties',
value: '47',
change: '+12%',
icon: '🏠',
gradient: 'from-blue-500 to-cyan-500'
},
{
label: 'Active Clients',
value: '128',
change: '+23%',
icon: '👥',
gradient: 'from-green-500 to-emerald-500'
},
{
label: 'New Leads',
value: '23',
change: '+5%',
icon: '📈',
gradient: 'from-purple-500 to-pink-500'
},
{
label: 'Revenue',
value: '$2.4M',
change: '+18%',
icon: '💰',
gradient: 'from-yellow-500 to-orange-500'
}
];

const recentActivities = [
{ type: 'New Lead', name: 'Ahmed Hassan', property: 'Luxury Penthouse', time: '5 min ago', icon: '📩' },
{ type: 'Property Added', name: 'Marina Apartment', time: '2 hours ago', icon: '✅' },
{ type: 'Client Meeting', name: 'Sara Mohamed', property: 'Villa in New Cairo', time: '4 hours ago', icon: '📅' },
{ type: 'Property Sold', name: 'Downtown Duplex', time: '1 day ago', icon: '🎉' }
];
</script>

<div class="space-y-6">
<div class="flex items-center justify-between">
<div>
<h1 class="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
<p class="text-gray-500 mt-1">Welcome back, {data.user.username}! Here's what's happening today.</p>
</div>
<div class="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
<span class="text-2xl">📊</span>
<div class="text-right">
<div class="text-xs text-gray-500">Last updated</div>
<div class="text-sm font-semibold text-gray-900">Just now</div>
</div>
</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
{#each stats as stat}
<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
<div class="flex items-start justify-between mb-4">
<div class="w-14 h-14 rounded-xl bg-gradient-to-br {stat.gradient} opacity-20 flex items-center justify-center">
<span class="text-3xl">{stat.icon}</span>
</div>
<span class="px-3 py-1 rounded-full text-xs font-semibold text-green-700 bg-green-100">
{stat.change}
</span>
</div>
<h3 class="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
<p class="text-4xl font-bold text-gray-900">{stat.value}</p>
</div>
{/each}
</div>

<div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div class="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
<div class="flex items-center justify-between mb-6">
<h2 class="text-xl font-bold text-gray-900">Recent Activity</h2>
<button class="text-sm text-blue-600 hover:text-purple-600 font-medium transition-colors">
View All →
</button>
</div>
<div class="space-y-4">
{#each recentActivities as activity}
<div class="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
<div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-2xl flex-shrink-0">
{activity.icon}
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center gap-2">
<span class="text-sm font-semibold text-gray-900">{activity.type}</span>
<span class="text-xs text-gray-400">•</span>
<span class="text-xs text-gray-500">{activity.time}</span>
</div>
<p class="text-sm text-gray-600 truncate">
{activity.name}
{#if activity.property}
<span class="text-gray-400">•</span>
<span class="text-gray-500">{activity.property}</span>
{/if}
</p>
</div>
</div>
{/each}
</div>
</div>

<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
<h2 class="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
<div class="space-y-3">
<a href="/dashboard/inventory" class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all group">
<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
➕
</div>
<div class="flex-1">
<div class="font-semibold text-gray-900 text-sm">Add Property</div>
<div class="text-xs text-gray-500">List new inventory</div>
</div>
</a>

<a href="/dashboard/leads" class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all group">
<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
👤
</div>
<div class="flex-1">
<div class="font-semibold text-gray-900 text-sm">Manage Leads</div>
<div class="text-xs text-gray-500">Follow up clients</div>
</div>
</a>

<a href="/dashboard/reports" class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all group">
<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
📊
</div>
<div class="flex-1">
<div class="font-semibold text-gray-900 text-sm">View Reports</div>
<div class="text-xs text-gray-500">Analytics & insights</div>
</div>
</a>

<a href="/dashboard/admin" class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 transition-all group">
<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
📥
</div>
<div class="flex-1">
<div class="font-semibold text-gray-900 text-sm">Import CSV</div>
<div class="text-xs text-gray-500">Bulk add properties</div>
</div>
</a>
</div>
</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
<h2 class="text-xl font-bold text-gray-900 mb-6">Property Distribution</h2>
<div class="space-y-4">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-blue-500"></div>
<span class="text-sm text-gray-700">For Sale</span>
</div>
<div class="flex items-center gap-2">
<div class="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style="width: 65%"></div>
</div>
<span class="text-sm font-semibold text-gray-900">65%</span>
</div>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-green-500"></div>
<span class="text-sm text-gray-700">For Rent</span>
</div>
<div class="flex items-center gap-2">
<div class="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style="width: 35%"></div>
</div>
<span class="text-sm font-semibold text-gray-900">35%</span>
</div>
</div>
</div>
</div>

<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
<h2 class="text-xl font-bold text-gray-900 mb-6">Top Regions</h2>
<div class="space-y-4">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="text-2xl">🏙️</span>
<span class="text-sm text-gray-700">New Cairo</span>
</div>
<span class="text-sm font-semibold text-gray-900">18 properties</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="text-2xl">🌊</span>
<span class="text-sm text-gray-700">North Coast</span>
</div>
<span class="text-sm font-semibold text-gray-900">12 properties</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="text-2xl">🏖️</span>
<span class="text-sm text-gray-700">Alexandria</span>
</div>
<span class="text-sm font-semibold text-gray-900">10 properties</span>
</div>
</div>
</div>
</div>
</div>
