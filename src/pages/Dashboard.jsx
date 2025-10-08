function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-content-light dark:bg-content-dark flex flex-col">
        <div className="flex items-center gap-2 h-16 px-6 border-b border-border-light dark:border-border-dark">
          <span className="material-symbols-outlined text-primary text-3xl">
            restaurant
          </span>
          <h1 className="text-xl font-bold">OrderAI</h1>
        </div>
        <nav className="flex-1 px-4 py-4">
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold" href="#">
            <span className="material-symbols-outlined"> dashboard </span>
            <span>Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-subtext-light dark:text-subtext-dark hover:bg-primary/10 hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined"> receipt_long </span>
            <span>Orders</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-subtext-light dark:text-subtext-dark hover:bg-primary/10 hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined"> menu_book </span>
            <span>Menu</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-subtext-light dark:text-subtext-dark hover:bg-primary/10 hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined"> analytics </span>
            <span>Reports</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-8 border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-primary/10 text-subtext-light dark:text-subtext-dark hover:text-primary transition-colors">
              <span className="material-symbols-outlined"> notifications </span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrdGa40N-I_TnwIe-NAoiedZg9PKNeLKDK16mEc6YCf8ZUyGeHCnorp_VQlgqXGy1U16SF7qF9Vs0wNwy0qfWRDUaivb3yhJbxotDBXul4XfUEvNdfFYdQ06QV5h980v5lpYcbpipHXSCpfJcVjNojv0YIoLv3nLJuGTcnANsGN9jN_4s5Y_j097N9X0xw1DgN85tGcPm1sBB6b_xHFIEFvfWPipbjmkhq1a62QzG_Mf1A60iE9ZN3hfdFDCFwETV1I4IDi-vn")'}}></div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Restaurant Information */}
            <div className="lg:col-span-3">
              <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Restaurant Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-subtext-light dark:text-subtext-dark">
                      Restaurant Name
                    </p>
                    <p className="font-medium">The Golden Spoon</p>
                  </div>
                  <div>
                    <p className="text-sm text-subtext-light dark:text-subtext-dark">
                      Phone Number
                    </p>
                    <p className="font-medium">(555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-sm text-subtext-light dark:text-subtext-dark">
                      Email Address
                    </p>
                    <p className="font-medium">info@thegoldenspoon.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm">
              <p className="text-sm font-medium text-subtext-light dark:text-subtext-dark">
                Today's Calls
              </p>
              <p className="text-3xl font-bold mt-2">25</p>
            </div>
            <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm">
              <p className="text-sm font-medium text-subtext-light dark:text-subtext-dark">
                Total Orders
              </p>
              <p className="text-3xl font-bold mt-2 text-primary">150</p>
            </div>
            <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm">
              <p className="text-sm font-medium text-subtext-light dark:text-subtext-dark">
                Pending Orders
              </p>
              <p className="text-3xl font-bold mt-2">5</p>
            </div>

            {/* Recent Orders Table */}
            <div className="lg:col-span-3">
              <div className="bg-content-light dark:bg-content-dark rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 flex justify-between items-center border-b border-border-light dark:border-border-dark">
                  <h3 className="text-lg font-semibold">Recent Orders</h3>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary font-semibold hover:bg-primary/30 transition-colors">
                      <span className="material-symbols-outlined text-base">
                        restaurant_menu
                      </span>
                      <span>Manage Menu</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary font-semibold hover:bg-primary/30 transition-colors">
                      <span className="material-symbols-outlined text-base">
                        settings
                      </span>
                      <span>Profile Settings</span>
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs text-subtext-light dark:text-subtext-dark uppercase bg-background-light dark:bg-background-dark">
                      <tr>
                        <th className="px-6 py-3" scope="col">Order ID</th>
                        <th className="px-6 py-3" scope="col">Date</th>
                        <th className="px-6 py-3" scope="col">Items</th>
                        <th className="px-6 py-3" scope="col">Customer</th>
                        <th className="px-6 py-3" scope="col">Status</th>
                        <th className="px-6 py-3 text-right" scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-light dark:border-border-dark">
                        <td className="px-6 py-4 font-medium">#12345</td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          2024-01-15
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          2x Burger, 1x Fries
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          Emily Carter
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">Completed</span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">$25.00</td>
                      </tr>
                      <tr className="border-b border-border-light dark:border-border-dark">
                        <td className="px-6 py-4 font-medium">#12346</td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          2024-01-15
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          1x Pizza, 2x Drinks
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          David Lee
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">Completed</span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">$30.00</td>
                      </tr>
                      <tr className="border-b border-border-light dark:border-border-dark">
                        <td className="px-6 py-4 font-medium">#12347</td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          2024-01-14
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          3x Pasta, 1x Salad
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          Sophia Clark
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">Completed</span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">$45.00</td>
                      </tr>
                      <tr className="border-b border-border-light dark:border-border-dark">
                        <td className="px-6 py-4 font-medium">#12348</td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          2024-01-14
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          1x Steak, 1x Wine
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          Ethan Walker
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-500">Pending</span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">$50.00</td>
                      </tr>
                      <tr className="border-b border-border-light dark:border-border-dark">
                        <td className="px-6 py-4 font-medium">#12349</td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          2024-01-13
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          2x Sushi, 1x Sake
                        </td>
                        <td className="px-6 py-4 text-subtext-light dark:text-subtext-dark">
                          Olivia Green
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-500">Cancelled</span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">$40.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
