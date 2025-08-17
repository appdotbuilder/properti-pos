import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardStats {
    total_properties: number;
    available_properties: number;
    sold_properties: number;
    total_customers: number;
    total_transactions: number;
    pending_payments: number;
    overdue_payments: number;
}

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

interface Payment {
    id: number;
    payment_code: string;
    due_date: string;
    amount_due: number;
    payment_type: string;
    installment_number: number;
    sales_transaction: {
        property: {
            unit_number: string;
            project: {
                name: string;
            };
        };
        customer: {
            name: string;
        };
    };
}

interface MonthlySale {
    month: number;
    transaction_count: number;
    total_amount: number;
}

interface PropertyType {
    type: string;
    count: number;
}

interface Props {
    stats: DashboardStats;
    recentTransactions: Transaction[];
    upcomingPayments: Payment[];
    monthlySales: MonthlySale[];
    propertyTypes: PropertyType[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

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

const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

export default function Dashboard({ stats, recentTransactions, upcomingPayments, monthlySales, propertyTypes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard PropertyPOS" />
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🏠 Dashboard PropertyPOS
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Ringkasan bisnis properti Anda
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Total Properties */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500 text-white">
                                        🏘️
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Total Properti
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                            {stats.total_properties}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <span className="font-medium text-green-600 dark:text-green-400">
                                    {stats.available_properties} tersedia
                                </span>
                                <span className="text-gray-500 dark:text-gray-400"> • </span>
                                <span className="font-medium text-red-600 dark:text-red-400">
                                    {stats.sold_properties} terjual
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Total Customers */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white">
                                        👥
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Total Konsumen
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                            {stats.total_customers}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <Link 
                                    href={route('customers.index')}
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                >
                                    Lihat semua konsumen
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Total Transactions */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500 text-white">
                                        💰
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Total Transaksi
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                            {stats.total_transactions}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <Link 
                                    href={route('transactions.index')}
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                >
                                    Lihat semua transaksi
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Payment Status */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-white">
                                        📊
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Status Pembayaran
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                            {stats.pending_payments}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <span className="font-medium text-yellow-600 dark:text-yellow-400">
                                    {stats.pending_payments} pending
                                </span>
                                <span className="text-gray-500 dark:text-gray-400"> • </span>
                                <span className="font-medium text-red-600 dark:text-red-400">
                                    {stats.overdue_payments} terlambat
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Recent Transactions */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                📋 Transaksi Terbaru
                            </h3>
                            <div className="mt-6 flow-root">
                                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                                    {recentTransactions.map((transaction) => (
                                        <li key={transaction.id} className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-800">
                                                        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">
                                                            {transaction.transaction_code.slice(-4)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                        {transaction.property.project.name} - Unit {transaction.property.unit_number}
                                                    </p>
                                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                        {transaction.customer.name} • {formatDate(transaction.transaction_date)}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0 text-sm font-medium text-gray-900 dark:text-white">
                                                    {formatCurrency(transaction.total_price)}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-6">
                                <Link 
                                    href={route('transactions.index')}
                                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Lihat semua
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Payments */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                ⏰ Pembayaran Mendatang
                            </h3>
                            <div className="mt-6 flow-root">
                                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                                    {upcomingPayments.slice(0, 5).map((payment) => (
                                        <li key={payment.id} className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                                        payment.payment_type === 'dp' 
                                                            ? 'bg-green-100 dark:bg-green-800' 
                                                            : 'bg-blue-100 dark:bg-blue-800'
                                                    }`}>
                                                        <span className={`text-xs font-medium ${
                                                            payment.payment_type === 'dp'
                                                                ? 'text-green-600 dark:text-green-300'
                                                                : 'text-blue-600 dark:text-blue-300'
                                                        }`}>
                                                            {payment.payment_type === 'dp' ? 'DP' : 'KR'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                        {payment.sales_transaction.property.project.name} - Unit {payment.sales_transaction.property.unit_number}
                                                    </p>
                                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                        {payment.sales_transaction.customer.name} • Cicilan #{payment.installment_number}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0 text-right">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {formatCurrency(payment.amount_due)}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatDate(payment.due_date)}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Monthly Sales */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                📈 Penjualan Bulanan ({new Date().getFullYear()})
                            </h3>
                            <div className="mt-6 space-y-3">
                                {monthlySales.map((sale) => (
                                    <div key={sale.month} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {monthNames[sale.month - 1]}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {sale.transaction_count} transaksi
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(sale.total_amount)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Property Types */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                🏗️ Distribusi Tipe Properti
                            </h3>
                            <div className="mt-6 space-y-3">
                                {propertyTypes.map((type) => {
                                    const percentage = stats.total_properties > 0 ? (type.count / stats.total_properties) * 100 : 0;
                                    const typeLabels: { [key: string]: string } = {
                                        'rumah': 'Rumah',
                                        'apartment': 'Apartment',
                                        'ruko': 'Ruko',
                                        'kavling': 'Kavling',
                                        'villa': 'Villa'
                                    };

                                    return (
                                        <div key={type.type} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {typeLabels[type.type] || type.type}
                                                </div>
                                                <div className="w-32 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                                    <div 
                                                        className="bg-indigo-600 h-2 rounded-full dark:bg-indigo-500" 
                                                        style={{width: `${percentage}%`}}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {type.count} ({percentage.toFixed(1)}%)
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            🚀 Aksi Cepat
                        </h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <Link 
                                href={route('properties.create')}
                                className="flex flex-col items-center p-4 text-center border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 mb-2 dark:bg-indigo-800">
                                    🏠
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Tambah Properti</span>
                            </Link>
                            
                            <Link 
                                href={route('customers.create')}
                                className="flex flex-col items-center p-4 text-center border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 mb-2 dark:bg-green-800">
                                    👤
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Tambah Konsumen</span>
                            </Link>
                            
                            <Link 
                                href={route('transactions.create')}
                                className="flex flex-col items-center p-4 text-center border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 mb-2 dark:bg-purple-800">
                                    💰
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Buat Transaksi</span>
                            </Link>
                            
                            <Link 
                                href={route('projects.create')}
                                className="flex flex-col items-center p-4 text-center border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 mb-2 dark:bg-orange-800">
                                    🏗️
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Tambah Proyek</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}