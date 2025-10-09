import { useState } from 'react'

function Settings() {
  const [restaurantId, setRestaurantId] = useState('REST-1728345678901-ABC123')
  const [restaurantName, setRestaurantName] = useState('The Tasty Spoon')
  const [address, setAddress] = useState('123 Main Street, Anytown, CA 91234')
  const [phone, setPhone] = useState('(555) 123-4567')
  const [email, setEmail] = useState('info@thetastyspoon.com')
  const [openHours, setOpenHours] = useState('Mon-Fri: 11 AM - 10 PM\nSat-Sun: 10 AM - 11 PM')
  const [newPassword, setNewPassword] = useState('')

  const handleSaveChanges = () => {
    // TODO: Implement save logic
    console.log('Saving changes...', { restaurantName, address, phone, email, openHours })
  }

  const handleChangePassword = () => {
    // TODO: Implement password change logic
    console.log('Changing password...')
    setNewPassword('')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-card-light dark:bg-card-dark/50 backdrop-blur-sm sticky top-0 z-10 border-b border-border-light dark:border-border-dark shadow-soft">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg className="text-primary h-8 w-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
              <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
            <h1 className="text-xl font-bold text-foreground-light dark:text-foreground-dark">DineAI</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors" href="#">Dashboard</a>
            <a className="text-sm font-medium text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors" href="#">Orders</a>
            <a className="text-sm font-medium text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors" href="#">Menu</a>
            <a className="text-sm font-medium text-primary dark:text-primary font-semibold" href="#">Settings</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors">
              <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5G_1gATFhHJarxvpRtsNTdhacoda_OHYF5dkg_MSJ4-ebiTXho1KHkY9rSvH0yifuKQVixL5tOrE97Pj8xbRJpwIggTRra9jKEUtWNLhVfwxTl6TEQnUta1qCfrlkDTr7zW855SwX1pz238dnt32D9oeDFLA6GJ8t2YQ6ojrg7tpV6lY-PDC6gZkj2eicMgPqGxvw5NOuwKsQo4Bqsj7sfOVLNHoRoDUU97KIvGJSelnSTYUSVS6vKW6BgZL3Au-IA62n1IJE")'}}></div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h2 className="text-3xl font-bold text-foreground-light dark:text-foreground-dark">Restaurant Settings</h2>
            <p className="mt-2 text-subtle-light dark:text-subtle-dark">Manage your restaurant's profile and settings.</p>
          </header>

          <div className="space-y-8">
            {/* Restaurant ID */}
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark">Restaurant ID</label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    className="block w-full bg-transparent border-0 border-b-2 border-border-light dark:border-border-dark focus:ring-0 p-0 text-lg font-mono font-semibold text-primary"
                    type="text"
                    value={restaurantId}
                    readOnly
                    disabled
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(restaurantId)}
                    className="px-3 py-1.5 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary text-sm font-semibold hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors whitespace-nowrap"
                  >
                    Copy ID
                  </button>
                </div>
                <p className="mt-2 text-xs text-subtle-light dark:text-subtle-dark">
                  This ID is used to match orders from the Lex bot (CnRes001) in DynamoDB
                </p>
              </div>
            </div>

            {/* Restaurant Name */}
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark">Restaurant Name</label>
                <input
                  className="mt-1 block w-full bg-transparent border-0 border-b-2 border-border-light dark:border-border-dark focus:ring-0 focus:border-primary p-0 text-lg font-semibold text-foreground-light dark:text-foreground-dark"
                  type="text"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                />
              </div>
              <div className="w-32 h-20 rounded-lg bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGIf21mZrDJNycEBT227suqecrGEpA4iOhmPgL0X2x_EkejHCsa2R7ZcoOX1ktURnAt1k6v7ho4BRkVsrctAUcbhxYsR2BI4RxmYORW3byLCAZt5A2pfCbdh99e2LCRxXqRBe859TrukhDi-0CLDM3uNhqod6QXayPuP6KpstycheExT5pvPMsuAQts1GwBT31ZBtvKJZK0EEbzQUJKdfGWe58-OQmyAOKu1lDLQtpxnuAhQNqtE2-vALFrKEAIomRnXnTK2He")'}}></div>
            </div>

            {/* Address */}
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark">Address</label>
                <input
                  className="mt-1 block w-full bg-transparent border-0 border-b-2 border-border-light dark:border-border-dark focus:ring-0 focus:border-primary p-0 text-lg font-semibold text-foreground-light dark:text-foreground-dark"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
                <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark">Phone</label>
                <input
                  className="mt-1 block w-full bg-transparent border-0 border-b-2 border-border-light dark:border-border-dark focus:ring-0 focus:border-primary p-0 text-lg font-semibold text-foreground-light dark:text-foreground-dark"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
                <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark">Email</label>
                <input
                  className="mt-1 block w-full bg-transparent border-0 border-b-2 border-border-light dark:border-border-dark focus:ring-0 focus:border-primary p-0 text-lg font-semibold text-foreground-light dark:text-foreground-dark"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Open Hours */}
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
              <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark">Open Hours</label>
              <textarea
                className="mt-1 block w-full bg-transparent border-0 border-b-2 border-border-light dark:border-border-dark focus:ring-0 focus:border-primary p-0 text-lg font-semibold text-foreground-light dark:text-foreground-dark"
                rows="3"
                value={openHours}
                onChange={(e) => setOpenHours(e.target.value)}
              />
            </div>

            {/* Change Password */}
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
              <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark">Change Password</label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  className="block w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-foreground-light dark:text-foreground-dark"
                  placeholder="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className="whitespace-nowrap px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary text-sm font-semibold hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="mt-12 flex justify-end">
            <button
              className="bg-gradient-to-r from-primary to-blue-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings
