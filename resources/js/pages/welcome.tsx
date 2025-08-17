import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="PropertyPOS - Sistem Point of Sale Properti">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="relative z-10">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                        <div className="flex items-center gap-x-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                <span className="text-lg font-bold text-white">🏠</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">PropertyPOS</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all duration-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all duration-200"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="relative">
                    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                🏘️ <span className="text-indigo-600">PropertyPOS</span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Sistem Point of Sale untuk manajemen penjualan properti secara kredit. 
                                Kelola proyek, properti, konsumen, dan transaksi kredit dengan mudah dan efisien.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-xl hover:bg-indigo-500 transition-all duration-200 hover:scale-105"
                                    >
                                        Buka Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-xl hover:bg-indigo-500 transition-all duration-200 hover:scale-105"
                                        >
                                            Mulai Sekarang
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="text-base font-semibold text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 transition-colors"
                                        >
                                            Sudah punya akun? <span aria-hidden="true">→</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section className="py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                ✨ Fitur Lengkap untuk Bisnis Properti
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                Semua yang Anda butuhkan untuk mengelola penjualan properti dengan sistem kredit
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {/* Feature 1 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-600">
                                        <span className="text-2xl">🏗️</span>
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Manajemen Proyek & Properti
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                        Kelola berbagai proyek properti dengan detail unit, tipe, luas, harga, dan status ketersediaan.
                                    </dd>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-green-600">
                                        <span className="text-2xl">👥</span>
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Database Konsumen
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                        Simpan data lengkap konsumen termasuk informasi pribadi, kontak, dan riwayat transaksi.
                                    </dd>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-purple-600">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Sistem Kredit Lengkap
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                        Atur DP dengan cicilan hingga 24 bulan dan kredit hingga 8 tahun dengan perhitungan bunga otomatis.
                                    </dd>
                                </div>

                                {/* Feature 4 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-orange-600">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Pelacakan Pembayaran
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                        Monitor semua pembayaran cicilan dengan detail tanggal jatuh tempo, jumlah, dan status pembayaran.
                                    </dd>
                                </div>

                                {/* Feature 5 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-red-600">
                                        <span className="text-2xl">👨‍💼</span>
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Multi-Role Management
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                        Sistem peran untuk Administrator, Agen Penjualan, dan Staff Keuangan dengan hak akses berbeda.
                                    </dd>
                                </div>

                                {/* Feature 6 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-teal-600">
                                        <span className="text-2xl">📈</span>
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Dashboard & Laporan
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                        Pantau performa penjualan, ringkasan keuangan, dan laporan per konsumen dalam dashboard interaktif.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-white dark:bg-gray-800 py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                🎯 Solusi Terpadu untuk Bisnis Properti
                            </h2>
                        </div>
                        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-center sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                            <div className="flex flex-col gap-y-3">
                                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-400">Jenis Properti</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    5+ Tipe
                                </dd>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Rumah, Apartment, Ruko, Kavling, Villa
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-400">Cicilan DP</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    24 Bulan
                                </dd>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Fleksibilitas pembayaran uang muka
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-400">Cicilan Kredit</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    8 Tahun
                                </dd>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Tenor kredit hingga 96 bulan
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-400">User Roles</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    3 Peran
                                </dd>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Admin, Sales, Finance
                                </div>
                            </div>
                        </dl>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-indigo-600 dark:bg-indigo-800">
                    <div className="px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Siap untuk mengelola bisnis properti Anda?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
                                Bergabunglah dengan PropertyPOS dan rasakan kemudahan mengelola penjualan properti dengan sistem kredit yang terintegrasi.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {!auth.user && (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-xl hover:bg-indigo-50 transition-all duration-200 hover:scale-105"
                                        >
                                            Mulai Gratis
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="text-base font-semibold text-white hover:text-indigo-200 transition-colors"
                                        >
                                            Pelajari lebih lanjut <span aria-hidden="true">→</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                            <p>
                                Built with ❤️ using{' '}
                                <a 
                                    href="https://laravel.com" 
                                    target="_blank" 
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                >
                                    Laravel
                                </a>
                                {' & '}
                                <a 
                                    href="https://reactjs.org" 
                                    target="_blank" 
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                >
                                    React
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}