import React from 'react'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    BarChart2Icon,
    ShoppingCartIcon,
    UsersIcon,
    MessageSquareIcon,
    ChevronRightIcon,
    CalendarIcon,
    ClockIcon,
} from 'lucide-react'
export default  function Dashboard() {
    return (
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Orders Today */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ShoppingCartIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Orders Today
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                24
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    View all orders
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Revenue */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <BarChart2Icon className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Revenue
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                $3,240
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="flex items-center">
                                <div className="flex items-center text-sm text-green-600">
                                    <ArrowUpIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span className="font-medium">12%</span>
                                    <span className="ml-1">from last week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Customers */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <UsersIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Active Customers
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                573
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="flex items-center">
                                <div className="flex items-center text-sm text-green-600">
                                    <ArrowUpIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span className="font-medium">8%</span>
                                    <span className="ml-1">from last month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Conversations */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MessageSquareIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Active Conversations
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                18
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="flex items-center">
                                <div className="flex items-center text-sm text-red-600">
                                    <ArrowDownIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span className="font-medium">3%</span>
                                    <span className="ml-1">from yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Charts */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Sales Chart */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Sales Overview
                                </h3>
                                <div className="flex items-center">
                                    <div className="relative inline-block text-left">
                                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                            <option>Last 7 days</option>
                                            <option>Last 30 days</option>
                                            <option>Last 3 months</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            {/* Placeholder for chart */}
                            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                                <div className="text-center">
                                    <BarChart2Icon className="mx-auto h-12 w-12 text-gray-300" />
                                    <p className="mt-2 text-sm text-gray-500">
                                        Sales chart will appear here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Channel Distribution */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Channel Distribution
                                </h3>
                                <div className="flex items-center">
                                    <div className="relative inline-block text-left">
                                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                            <option>Last 7 days</option>
                                            <option>Last 30 days</option>
                                            <option>Last 3 months</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            {/* Placeholder for chart */}
                            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                                <div className="text-center">
                                    <BarChart2Icon className="mx-auto h-12 w-12 text-gray-300" />
                                    <p className="mt-2 text-sm text-gray-500">
                                        Channel distribution chart will appear here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recent Orders */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Recent Orders
                            </h3>
                            <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                View all
                            </a>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Order ID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Customer
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Amount
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Channel
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">View</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <tr key={item} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #ORD-{Math.floor(Math.random() * 10000)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-xs font-medium">JD</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    John Doe
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    john@example.com
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <CalendarIcon className="mr-1.5 h-4 w-4 text-gray-400" />
                                            <span>May 12, 2023</span>
                                        </div>
                                        <div className="flex items-center mt-1 text-xs">
                                            <ClockIcon className="mr-1.5 h-3 w-3 text-gray-400" />
                                            <span>10:32 AM</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${Math.floor(Math.random() * 200) + 20}.00
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                                <svg
                                                    className="h-4 w-4 text-green-700"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M17.6 6.3A7.8 7.8 0 0 0 12 4.2a8 8 0 0 0-8 8 8 8 0 0 0 3 6.3l-1.2 3.5 3.6-1.2a8 8 0 0 0 11.6-7 8 8 0 0 0-3.4-7.5z"></path>
                                                </svg>
                                            </div>
                                            WhatsApp
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a
                                            href="#"
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <ChevronRightIcon className="h-5 w-5" />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}
