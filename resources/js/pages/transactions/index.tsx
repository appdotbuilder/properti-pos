import React from 'react';
import AppLayout from '@/components/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Transaction {
    id: number;
    transaction_code: string;
    transaction_date: string;
    total_price: number;
    status: string;
    property: {
        unit_number: string;
        project: {
            name: string;
        };
    };
    customer: {
        name: string;
    };
    sales_agent: {
        name: string;
    };
}

interface Props {
    transactions: {
        data: Transaction[];
        links: Record<string, unknown>;
        meta: Record<string, unknown>;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Transaksi', href: '/transactions' },
];

const statusLabels: { [key: string]: string } = {
    'draft': 'Draft',
    'active': 'Aktif',
    'completed': 'Selesai',
    'cancelled': 'Dibatalkan'
};

const statusColors: { [key: string]: string } = {
    'draft': 'bg-gray-100 text-gray-800',
    'active': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export default function TransactionIndex({ transactions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Transaksi" />
            
            <div className="p-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            💰 Daftar Transaksi
                        </h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Kelola transaksi penjualan properti
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href={route('transactions.create')}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Buat Transaksi
                        </Link>
                    </div>
                </div>

                <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Kode Transaksi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Properti
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Konsumen
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Total Harga
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Tanggal
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Status
                                </th>
                                <th className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-800 dark:divide-gray-700">
                            {transactions.data.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                        {transaction.transaction_code}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {transaction.property.project.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Unit {transaction.property.unit_number}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-900 dark:text-white">
                                            {transaction.customer.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Agent: {transaction.sales_agent.name}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                        {formatCurrency(transaction.total_price)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                        {formatDate(transaction.transaction_date)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[transaction.status]}`}>
                                            {statusLabels[transaction.status]}
                                        </span>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <Link
                                            href={route('transactions.show', transaction.id)}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                                        >
                                            Lihat
                                        </Link>
                                        <Link
                                            href={route('transactions.edit', transaction.id)}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {transactions.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">💰</div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Belum ada transaksi</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Mulai dengan membuat transaksi penjualan pertama Anda.
                        </p>
                        <div className="mt-6">
                            <Link
                                href={route('transactions.create')}
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Buat Transaksi
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}