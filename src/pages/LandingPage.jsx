import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl text-center">
          <div className="bg-white dark:bg-background-dark p-8 sm:p-12 rounded-xl shadow-soft-lg">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-light dark:text-text-dark tracking-tight">
              Let AI take your restaurant's phone orders.
            </h1>
            <p className="mt-4 text-lg text-subtle-light dark:text-subtle-dark">
              Our intelligent system automates your order-taking process, freeing up your staff and delighting your customers.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors duration-300" to="/register">
                Register Restaurant
              </Link>
              <Link className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-primary bg-primary/10 hover:bg-primary/20 dark:text-primary dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors duration-300" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-subtle-light dark:text-subtle-dark text-sm">
          <div className="flex justify-center gap-6 mb-2">
            <a className="hover:text-primary transition-colors duration-300" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors duration-300" href="#">Contact</a>
          </div>
          <p>© 2024 YourBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
