import { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log('Login attempt:', { username, password })
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-[#1A2830] rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="p-3 mb-4 bg-primary/10 dark:bg-primary/20 rounded-full">
            <span className="material-symbols-outlined text-primary text-4xl">
              restaurant
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Login to manage your restaurant orders.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="username">Username</label>
              <input
                autoComplete="username"
                className="relative block w-full px-3 py-3 text-gray-900 bg-background-light border border-gray-300 rounded-lg placeholder-gray-500 appearance-none dark:bg-background-dark dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:z-10 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300"
                id="username"
                name="username"
                placeholder="Username"
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                autoComplete="current-password"
                className="relative block w-full px-3 py-3 text-gray-900 bg-background-light border border-gray-300 rounded-lg placeholder-gray-500 appearance-none dark:bg-background-dark dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:z-10 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300"
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a className="font-medium text-primary hover:text-primary/80 transition-colors duration-300" href="#">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button className="group relative flex justify-center w-full py-3 px-4 border border-transparent text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform duration-300 transform hover:scale-105" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
