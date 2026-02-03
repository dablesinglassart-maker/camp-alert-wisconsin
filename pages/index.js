import React, { useState } from 'react';

const CampAlertWisconsin = () => {
  const [selectedPark, setSelectedPark] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [wantsSMS, setWantsSMS] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [userAlerts, setUserAlerts] = useState([]);
  const [showFAQPage, setShowFAQPage] = useState(false);
  const [showPrivacyPage, setShowPrivacyPage] = useState(false);
  const [showTermsPage, setShowTermsPage] = useState(false);
  const [alertCreated, setAlertCreated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [siteType, setSiteType] = useState('any');
  const [electricOption, setElectricOption] = useState('any');
  const [equipmentType, setEquipmentType] = useState('any');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [pendingPlanChange, setPendingPlanChange] = useState(null);
  const [showEmailPreview, setShowEmailPreview] = useState(null);
  const [planChangeConfirmed, setPlanChangeConfirmed] = useState(false);

  const wisconsinParks = [
    { id: 'devils-lake', name: "Devil's Lake State Park", region: 'South Central', popular: true },
    { id: 'peninsula', name: 'Peninsula State Park', region: 'Northeast', popular: true },
    { id: 'copper-falls', name: 'Copper Falls State Park', region: 'Northwest', popular: true },
    { id: 'governor-dodge', name: 'Governor Dodge State Park', region: 'Southwest', popular: true },
    { id: 'kohler-andrae', name: 'Kohler-Andrae State Park', region: 'Southeast', popular: true },
    { id: 'willow-river', name: 'Willow River State Park', region: 'Northwest', popular: false },
    { id: 'mirror-lake', name: 'Mirror Lake State Park', region: 'South Central', popular: false },
    { id: 'wyalusing', name: 'Wyalusing State Park', region: 'Southwest', popular: false },
    { id: 'pattison', name: 'Pattison State Park', region: 'Northwest', popular: false },
    { id: 'interstate', name: 'Interstate State Park', region: 'Northwest', popular: false },
    { id: 'potawatomi', name: 'Potawatomi State Park', region: 'Northeast', popular: false },
    { id: 'big-bay', name: 'Big Bay State Park', region: 'Northwest', popular: false },
    { id: 'hartman-creek', name: 'Hartman Creek State Park', region: 'Central', popular: false },
    { id: 'high-cliff', name: 'High Cliff State Park', region: 'Northeast', popular: false },
    { id: 'blue-mound', name: 'Blue Mound State Park', region: 'Southwest', popular: false },
    { id: 'wildcat-mountain', name: 'Wildcat Mountain State Park', region: 'Southwest', popular: false },
    { id: 'kettle-moraine-north', name: 'Kettle Moraine - Northern Unit', region: 'Southeast', popular: false },
    { id: 'kettle-moraine-south', name: 'Kettle Moraine - Southern Unit', region: 'Southeast', popular: false },
    { id: 'black-river', name: 'Black River State Forest', region: 'West Central', popular: false },
  ];

  const siteTypeOptions = [
    { value: 'any', label: 'Any Site Type' },
    { value: 'standard', label: 'Standard Campsite' },
    { value: 'accessible', label: 'Accessible (ADA) Campsite' },
    { value: 'backpack', label: 'Backpack / Walk-in Site' },
    { value: 'water-access', label: 'Water Access (Canoe/Kayak-in)' },
    { value: 'double', label: 'Double Campsite' },
    { value: 'group', label: 'Group Campsite' },
    { value: 'equestrian', label: 'Equestrian Campsite' },
    { value: 'cabin', label: 'Accessible Cabin' },
  ];

  const electricOptions = [
    { value: 'any', label: 'Any (Electric or Non-Electric)' },
    { value: 'electric', label: 'Electric Sites Only' },
    { value: 'non-electric', label: 'Non-Electric Sites Only' },
  ];

  const equipmentOptions = [
    { value: 'any', label: 'Any Equipment' },
    { value: 'tent', label: 'Tent Only' },
    { value: 'rv-small', label: 'Small RV/Trailer (under 25 ft)' },
    { value: 'rv-large', label: 'Large RV/Trailer (25+ ft)' },
    { value: 'popup', label: 'Pop-up Camper' },
    { value: 'van', label: 'Camper Van' },
  ];

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/[^\d]/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleCreateAlert = () => {
    if (selectedPark && checkInDate && checkOutDate && email) setAlertCreated(true);
  };

  const getFilterSummary = () => {
    const filters = [];
    if (siteType !== 'any') filters.push(siteTypeOptions.find(o => o.value === siteType)?.label);
    if (electricOption !== 'any') filters.push(electricOptions.find(o => o.value === electricOption)?.label);
    if (equipmentType !== 'any') filters.push(equipmentOptions.find(o => o.value === equipmentType)?.label);
    return filters;
  };

  const goHome = () => { setShowPrivacyPage(false); setShowTermsPage(false); setShowFAQPage(false); setShowLoginPage(false); setShowMyAccount(false); };

  const [userAccount, setUserAccount] = useState({
    email: '',
    phone: '',
    plan: 'free',
    autoRenew: true,
    cardLast4: '',
    cardBrand: '',
    nextBillDate: '',
  });
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [tempPhone, setTempPhone] = useState('');

  const handleLogin = () => {
    if (loginEmail) {
      setIsLoggedIn(true);
      setShowLoginPage(false);
      setShowMyAccount(true);
      
      // Check if it's the pro demo account
      if (loginEmail.toLowerCase() === 'pro@campalert.com') {
        setUserAccount({
          email: 'pro@campalert.com',
          phone: '(555) 123-4567',
          plan: 'pro-annual',
          autoRenew: true,
          cardLast4: '4242',
          cardBrand: 'Visa',
          nextBillDate: '2026-01-15',
        });
        setUserAlerts([
          { id: 1, park: "Devil's Lake State Park", checkIn: '2025-06-15', checkOut: '2025-06-17', siteType: 'Electric Sites Only', status: 'active' },
          { id: 2, park: 'Peninsula State Park', checkIn: '2025-07-04', checkOut: '2025-07-06', siteType: 'Standard Campsite', status: 'active' },
          { id: 3, park: 'Copper Falls State Park', checkIn: '2025-08-10', checkOut: '2025-08-12', siteType: 'Any', status: 'active' },
        ]);
      } else {
        // Free account
        setUserAccount({
          email: loginEmail,
          phone: '',
          plan: 'free',
          autoRenew: false,
          cardLast4: '',
          cardBrand: '',
          nextBillDate: '',
        });
        setUserAlerts([
          { id: 1, park: "Devil's Lake State Park", checkIn: '2025-06-15', checkOut: '2025-06-17', siteType: 'Electric Sites Only', status: 'active' },
          { id: 2, park: 'Peninsula State Park', checkIn: '2025-07-04', checkOut: '2025-07-06', siteType: 'Any', status: 'active' },
        ]);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserAlerts([]);
    setUserAccount({ email: '', phone: '', plan: 'free', autoRenew: true, cardLast4: '', cardBrand: '', nextBillDate: '' });
    setLoginEmail('');
    setLoginPassword('');
    goHome();
  };

  const scrollToAlert = () => { goHome(); setTimeout(() => document.getElementById('create-alert')?.scrollIntoView({ behavior: 'smooth' }), 100); };

  const Nav = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={goHome} className="text-2xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">CAMP ALERT</button>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => { goHome(); setTimeout(() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-gray-600 hover:text-gray-800 font-medium">How It Works</button>
          <button onClick={() => { goHome(); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-gray-600 hover:text-gray-800 font-medium">Pricing</button>
          <button onClick={() => setShowFAQPage(true)} className="text-gray-600 hover:text-gray-800 font-medium">FAQ</button>
          {isLoggedIn ? (
            <>
              <button onClick={() => setShowMyAccount(true)} className="px-4 py-2 text-green-600 font-bold">My Account</button>
              <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800 font-medium">Sign Out</button>
            </>
          ) : (
            <>
              <button onClick={() => setShowLoginPage(true)} className="px-4 py-2 text-green-600 font-bold">Sign In</button>
              <button onClick={scrollToAlert} className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold shadow-md">Create Alert</button>
            </>
          )}
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white">
          <button onClick={() => { goHome(); setMobileMenuOpen(false); setTimeout(() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="block text-gray-600 w-full text-left">How It Works</button>
          <button onClick={() => { goHome(); setMobileMenuOpen(false); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="block text-gray-600 w-full text-left">Pricing</button>
          <button onClick={() => { setShowFAQPage(true); setMobileMenuOpen(false); }} className="block text-gray-600 w-full text-left">FAQ</button>
          {isLoggedIn ? (
            <>
              <button onClick={() => { setShowMyAccount(true); setMobileMenuOpen(false); }} className="block text-green-600 font-bold w-full text-left">My Account</button>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="block text-gray-600 w-full text-left">Sign Out</button>
            </>
          ) : (
            <button onClick={() => { setShowLoginPage(true); setMobileMenuOpen(false); }} className="block text-green-600 font-bold w-full text-left">Sign In</button>
          )}
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <button onClick={goHome} className="text-3xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">CAMP ALERT</button>
        <p className="text-gray-400 mb-8">Never miss a Wisconsin campsite</p>
        <div className="flex flex-wrap justify-center gap-8 text-sm mb-8">
          <button onClick={() => setShowPrivacyPage(true)} className="text-gray-400 hover:text-white">Privacy</button>
          <button onClick={() => setShowTermsPage(true)} className="text-gray-400 hover:text-white">Terms</button>
          <button onClick={() => setShowFAQPage(true)} className="text-gray-400 hover:text-white">FAQ</button>
        </div>
        <div className="pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-xs max-w-2xl mx-auto">Camp Alert Wisconsin is not affiliated with or endorsed by the Wisconsin Department of Natural Resources or Wisconsin State Parks.</p>
          <p className="text-gray-600 text-xs mt-4">© 2025 Camp Alert Wisconsin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  if (showPrivacyPage) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Nav />
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-gray-600">
          <section><h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2><p>We collect your email address, phone number (if you opt-in to SMS), and campsite preferences.</p></section>
          <section><h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2><p>We use your information solely to send campsite availability alerts. We do not sell your data.</p></section>
          <section><h2 className="text-xl font-bold text-gray-800 mb-3">3. SMS Communications</h2><p>By opting in to SMS alerts, you consent to receive text messages. Reply STOP to opt out anytime.</p></section>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (showTermsPage) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Nav />
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
        <div className="space-y-6 text-gray-600">
          <section><h2 className="text-xl font-bold text-gray-800 mb-3">1. Service Description</h2><p>Camp Alert Wisconsin monitors campsite availability and notifies you when sites become available. We do not book campsites on your behalf.</p></section>
          <section><h2 className="text-xl font-bold text-gray-800 mb-3">2. No Guarantee</h2><p>We cannot guarantee you will be able to book a campsite. Availability changes rapidly.</p></section>
          <section><h2 className="text-xl font-bold text-gray-800 mb-3">3. SMS Terms</h2><p>Message and data rates may apply. Reply STOP to cancel.</p></section>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (showFAQPage) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Nav />
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black mb-8">Frequently Asked Questions</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-bold text-lg mb-2">What campsite types can I filter by?</h3><p className="text-gray-600">You can filter by site type (standard, accessible, backpack, water access, group, equestrian), electric/non-electric, and equipment type (tent, RV, trailer size). These match the Wisconsin DNR reservation system.</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-bold text-lg mb-2">Do you book the campsite for me?</h3><p className="text-gray-600">No. We only send alerts. You'll need to visit wisconsin.goingtocamp.com to complete your booking.</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-bold text-lg mb-2">How quickly will I be notified?</h3><p className="text-gray-600">Free email alerts check every 5 minutes. Pro SMS alerts check every 2 minutes.</p></div>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (showLoginPage) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Nav />
      <div className="pt-32 pb-20 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-black text-center mb-6">{showSignup ? 'Create Account' : 'Sign In'}</h1>
          <div className="space-y-4">
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Email</label><input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="demo@campalert.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Password</label><input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none" /></div>
            <button onClick={handleLogin} className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold">{showSignup ? 'Create Account' : 'Sign In'}</button>
            <p className="text-center text-sm text-gray-600">{showSignup ? 'Already have an account?' : "Don't have an account?"} <button onClick={() => setShowSignup(!showSignup)} className="text-green-600 font-bold">{showSignup ? 'Sign In' : 'Sign Up'}</button></p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-bold mb-2">Demo Accounts:</p>
              <div className="space-y-2 text-xs text-gray-500">
                <p><span className="font-medium">Free:</span> any email (e.g., demo@campalert.com)</p>
                <p><span className="font-medium">Pro:</span> pro@campalert.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (showMyAccount) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Nav />
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-black mb-8">My Account</h1>
        
        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Account Information</h2>
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                {editingEmail ? (
                  <input type="email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} className="mt-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none" />
                ) : (
                  <p className="font-medium">{userAccount.email}</p>
                )}
              </div>
              {editingEmail ? (
                <div className="flex gap-2">
                  <button onClick={() => { setUserAccount({...userAccount, email: tempEmail}); setEditingEmail(false); }} className="text-green-600 font-bold text-sm">Save</button>
                  <button onClick={() => setEditingEmail(false)} className="text-gray-500 text-sm">Cancel</button>
                </div>
              ) : (
                <button onClick={() => { setTempEmail(userAccount.email); setEditingEmail(true); }} className="text-green-600 font-bold text-sm">Edit</button>
              )}
            </div>
            {/* Phone - only show for pro accounts or allow adding */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Phone (for SMS alerts)</p>
                {editingPhone ? (
                  <input type="tel" value={tempPhone} onChange={(e) => setTempPhone(formatPhoneNumber(e.target.value))} placeholder="(555) 123-4567" className="mt-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none" />
                ) : (
                  <p className="font-medium">{userAccount.phone || <span className="text-gray-400">Not set</span>}</p>
                )}
              </div>
              {editingPhone ? (
                <div className="flex gap-2">
                  <button onClick={() => { setUserAccount({...userAccount, phone: tempPhone}); setEditingPhone(false); }} className="text-green-600 font-bold text-sm">Save</button>
                  <button onClick={() => setEditingPhone(false)} className="text-gray-500 text-sm">Cancel</button>
                </div>
              ) : (
                <button onClick={() => { setTempPhone(userAccount.phone); setEditingPhone(true); }} className="text-green-600 font-bold text-sm">{userAccount.phone ? 'Edit' : 'Add'}</button>
              )}
            </div>
          </div>
        </div>

        {/* Subscription / Plan */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Plan</h2>
            {userAccount.plan === 'free' ? (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Free Plan</span>
            ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {userAccount.plan === 'pro-annual' ? 'Pro (Annual)' : 'Pro (Monthly)'}
              </span>
            )}
          </div>
          
          {userAccount.plan === 'free' ? (
            <>
              <p className="text-gray-600 mb-4">You're on the free plan with email alerts only. Upgrade to get instant SMS text alerts.</p>
              <button onClick={() => { goHome(); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold">Upgrade to SMS Alerts - $5/mo</button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="font-bold text-green-800">SMS + Email Alerts Active</span>
                </div>
                <p className="text-sm text-green-700">You're getting instant text alerts for all your campsite watches.</p>
              </div>

              {/* Plan Selection */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-bold text-gray-700 mb-3">Billing Cycle</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      if (userAccount.plan !== 'pro-monthly') {
                        setPendingPlanChange('pro-monthly');
                        setPlanChangeConfirmed(false);
                      }
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      userAccount.plan === 'pro-monthly' ? 'border-green-500 bg-green-50' : 
                      pendingPlanChange === 'pro-monthly' ? 'border-yellow-500 bg-yellow-50' : 
                      'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {userAccount.plan === 'pro-monthly' && <div className="text-xs text-green-600 font-bold mb-1">CURRENT PLAN</div>}
                    {pendingPlanChange === 'pro-monthly' && <div className="text-xs text-yellow-600 font-bold mb-1">SELECTED</div>}
                    <div className="font-bold text-gray-800">Monthly</div>
                    <div className="text-xl font-black text-green-600">$5<span className="text-sm font-normal text-gray-500">/mo</span></div>
                    <div className="text-xs text-gray-500 mt-1">Flexible, cancel anytime</div>
                  </button>
                  <button 
                    onClick={() => {
                      if (userAccount.plan !== 'pro-annual') {
                        setPendingPlanChange('pro-annual');
                        setPlanChangeConfirmed(false);
                      }
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                      userAccount.plan === 'pro-annual' ? 'border-green-500 bg-green-50' : 
                      pendingPlanChange === 'pro-annual' ? 'border-yellow-500 bg-yellow-50' : 
                      'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full">SAVE 33%</div>
                    {userAccount.plan === 'pro-annual' && <div className="text-xs text-green-600 font-bold mb-1">CURRENT PLAN</div>}
                    {pendingPlanChange === 'pro-annual' && <div className="text-xs text-yellow-600 font-bold mb-1">SELECTED</div>}
                    <div className="font-bold text-gray-800">Annual</div>
                    <div className="text-xl font-black text-green-600">$40<span className="text-sm font-normal text-gray-500">/yr</span></div>
                    <div className="text-xs text-gray-500 mt-1">Best value</div>
                  </button>
                </div>
                
                {/* Pending Plan Change Confirmation */}
                {pendingPlanChange && !planChangeConfirmed && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      <div className="flex-1">
                        <p className="font-bold text-yellow-800">
                          Switch to {pendingPlanChange === 'pro-annual' ? 'Annual ($40/year)' : 'Monthly ($5/month)'}?
                        </p>
                        <p className="text-sm text-yellow-700 mt-1">
                          This change will take effect on your next billing date: <span className="font-bold">{userAccount.nextBillDate}</span>
                        </p>
                        <p className="text-sm text-yellow-700 mt-1">
                          You'll continue on your current plan until then.
                        </p>
                        <div className="flex gap-3 mt-3">
                          <button 
                            onClick={() => {
                              setPlanChangeConfirmed(true);
                              setShowEmailPreview('plan-change');
                            }}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-bold text-sm hover:bg-yellow-700"
                          >
                            Confirm Change
                          </button>
                          <button 
                            onClick={() => setPendingPlanChange(null)}
                            className="px-4 py-2 text-yellow-700 font-bold text-sm hover:text-yellow-800"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Plan Change Confirmed */}
                {planChangeConfirmed && pendingPlanChange && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <div className="flex-1">
                        <p className="font-bold text-green-800">Plan change scheduled!</p>
                        <p className="text-sm text-green-700 mt-1">
                          Your plan will change to {pendingPlanChange === 'pro-annual' ? 'Annual' : 'Monthly'} on <span className="font-bold">{userAccount.nextBillDate}</span>.
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          A confirmation email has been sent to {userAccount.email}.
                        </p>
                        <button 
                          onClick={() => setShowEmailPreview('plan-change')}
                          className="text-green-600 font-bold text-sm mt-2 hover:text-green-700"
                        >
                          Preview confirmation email →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {userAccount.plan === 'pro-monthly' && !pendingPlanChange && (
                  <p className="text-xs text-gray-500 mt-3">Switch to annual and save $20/year!</p>
                )}
              </div>
              
              {/* Payment Information */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-bold text-gray-700 mb-3">Payment Method</h3>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{userAccount.cardBrand}</span>
                    </div>
                    <span className="font-medium">•••• •••• •••• {userAccount.cardLast4}</span>
                  </div>
                  <button onClick={() => window.open('https://billing.stripe.com/p/login/test', '_blank')} className="text-green-600 font-bold text-sm">Update</button>
                </div>
              </div>

              {/* Billing Info */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-bold text-gray-700 mb-3">Next Payment</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Next billing date</p>
                    <p className="font-medium">{userAccount.nextBillDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">{userAccount.plan === 'pro-annual' ? '$40.00/year' : '$5.00/month'}</p>
                  </div>
                </div>
              </div>

              {/* Auto-renewal toggle */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-renewal</p>
                    <p className="text-sm text-gray-500">Automatically renew your subscription</p>
                  </div>
                  <button 
                    onClick={() => setUserAccount({...userAccount, autoRenew: !userAccount.autoRenew})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${userAccount.autoRenew ? 'bg-green-600' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${userAccount.autoRenew ? 'left-7' : 'left-1'}`}></span>
                  </button>
                </div>
              </div>

              {/* Manage subscription link */}
              <div className="pt-4">
                <button onClick={() => window.open('https://billing.stripe.com/p/login/test', '_blank')} className="text-gray-500 text-sm hover:text-gray-700">Manage subscription on Stripe →</button>
              </div>
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Alerts</h2>
            <button onClick={scrollToAlert} className="text-green-600 font-bold text-sm">+ New Alert</button>
          </div>
          {userAlerts.length > 0 ? (
            <div className="space-y-4">
              {userAlerts.map(alert => (
                <div key={alert.id} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{alert.park}</h3>
                      <p className="text-sm text-gray-500">{alert.checkIn} to {alert.checkOut}</p>
                      <p className="text-sm text-gray-500">{alert.siteType}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
                      <button onClick={() => setUserAlerts(userAlerts.filter(a => a.id !== alert.id))} className="text-red-500 text-sm hover:text-red-700">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You don't have any alerts yet.</p>
              <button onClick={scrollToAlert} className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold">Create Your First Alert</button>
            </div>
          )}
        </div>
      </div>

      {/* Email Preview Modal */}
      {showEmailPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-lg">Email Preview</h3>
              <button onClick={() => setShowEmailPreview(null)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              {showEmailPreview === 'plan-change' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <p className="text-sm"><span className="font-bold">From:</span> Camp Alert Wisconsin &lt;alerts@campalertwi.com&gt;</p>
                    <p className="text-sm"><span className="font-bold">To:</span> {userAccount.email}</p>
                    <p className="text-sm"><span className="font-bold">Subject:</span> Camp Alert: Your plan change has been scheduled</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">CAMP ALERT</div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Plan Change Confirmed</h2>
                    <p className="text-gray-600 mb-4">Hi there,</p>
                    <p className="text-gray-600 mb-4">
                      Your billing cycle change has been scheduled. Here are the details:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm"><span className="font-bold">Current Plan:</span> {userAccount.plan === 'pro-annual' ? 'Annual ($40/year)' : 'Monthly ($5/month)'}</p>
                      <p className="text-sm"><span className="font-bold">New Plan:</span> {pendingPlanChange === 'pro-annual' ? 'Annual ($40/year)' : 'Monthly ($5/month)'}</p>
                      <p className="text-sm"><span className="font-bold">Effective Date:</span> {userAccount.nextBillDate}</p>
                    </div>
                    <p className="text-gray-600 mb-4">
                      You'll continue to have full access to SMS alerts until your plan changes. No action is needed on your part.
                    </p>
                    <div className="text-center mb-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold">View My Account →</button>
                      <p className="text-xs text-gray-500 mt-2">campalertwi.com/account</p>
                    </div>
                    <p className="text-gray-600 mb-4">Happy camping!</p>
                    <p className="text-gray-600">— The Camp Alert Team</p>
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                      <p>Camp Alert Wisconsin</p>
                      <p className="mt-1">You're receiving this because you have an account at campalertwi.com</p>
                    </div>
                  </div>
                </div>
              )}

              {showEmailPreview === 'alert-created' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <p className="text-sm"><span className="font-bold">From:</span> Camp Alert Wisconsin &lt;alerts@campalertwi.com&gt;</p>
                    <p className="text-sm"><span className="font-bold">To:</span> {userAccount.email || email}</p>
                    <p className="text-sm"><span className="font-bold">Subject:</span> Camp Alert: Your campsite alert is now active!</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">CAMP ALERT</div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Alert Created Successfully!</h2>
                    <p className="text-gray-600 mb-4">Hi there,</p>
                    <p className="text-gray-600 mb-4">
                      Great news! Your campsite alert is now active. We'll monitor availability and notify you the moment a matching site opens up.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-bold text-green-800 mb-2">Alert Details:</p>
                      <p className="text-sm text-green-700"><span className="font-medium">Park:</span> {wisconsinParks.find(p => p.id === selectedPark)?.name || "Devil's Lake State Park"}</p>
                      <p className="text-sm text-green-700"><span className="font-medium">Dates:</span> {checkInDate || '2025-06-15'} to {checkOutDate || '2025-06-17'}</p>
                      <p className="text-sm text-green-700"><span className="font-medium">Filters:</span> {getFilterSummary().join(', ') || 'Any site type'}</p>
                    </div>
                    <div className="text-center mb-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold">View My Alerts →</button>
                      <p className="text-xs text-gray-500 mt-2">campalertwi.com/account</p>
                    </div>
                    <p className="text-gray-600 mb-4">Happy camping!</p>
                    <p className="text-gray-600">— The Camp Alert Team</p>
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                      <p>Camp Alert Wisconsin</p>
                    </div>
                  </div>
                </div>
              )}

              {showEmailPreview === 'alert-expired-free' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <p className="text-sm"><span className="font-bold">From:</span> Camp Alert Wisconsin &lt;alerts@campalertwi.com&gt;</p>
                    <p className="text-sm"><span className="font-bold">To:</span> {userAccount.email || 'demo@campalert.com'}</p>
                    <p className="text-sm"><span className="font-bold">Subject:</span> Camp Alert: Your campsite alert has ended</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">CAMP ALERT</div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Your Alert Has Ended</h2>
                    <p className="text-gray-600 mb-4">Hi there,</p>
                    <p className="text-gray-600 mb-4">
                      Your free campsite alert for <span className="font-bold">Devil's Lake State Park</span> has ended after 30 days of monitoring.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">Unfortunately, we weren't able to find availability matching your dates. Campsites at popular parks fill up quickly!</p>
                    </div>
                    <p className="text-gray-600 mb-4">
                      <span className="font-bold">Want to keep searching?</span> Create a new alert for different dates, or upgrade to Pro for faster monitoring and SMS alerts.
                    </p>
                    <div className="text-center mb-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold">Create New Alert →</button>
                      <p className="text-xs text-gray-500 mt-2">campalertwi.com</p>
                    </div>
                    <p className="text-gray-600">— The Camp Alert Team</p>
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                      <p>Camp Alert Wisconsin</p>
                    </div>
                  </div>
                </div>
              )}

              {showEmailPreview === 'alert-expired-pro' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <p className="text-sm"><span className="font-bold">From:</span> Camp Alert Wisconsin &lt;alerts@campalertwi.com&gt;</p>
                    <p className="text-sm"><span className="font-bold">To:</span> {userAccount.email || 'pro@campalert.com'}</p>
                    <p className="text-sm"><span className="font-bold">Subject:</span> Camp Alert: Your subscription has ended - alerts paused</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">CAMP ALERT</div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Your Subscription Has Ended</h2>
                    <p className="text-gray-600 mb-4">Hi there,</p>
                    <p className="text-gray-600 mb-4">
                      Your Pro subscription was not renewed, so your campsite alerts have been paused.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-yellow-800"><span className="font-bold">3 alerts paused:</span></p>
                      <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                        <li>• Devil's Lake State Park (Jun 15-17)</li>
                        <li>• Peninsula State Park (Jul 4-6)</li>
                        <li>• Copper Falls State Park (Aug 10-12)</li>
                      </ul>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Renew your subscription to reactivate your alerts and continue receiving instant SMS notifications.
                    </p>
                    <div className="text-center mb-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold">Renew Subscription →</button>
                      <p className="text-xs text-gray-500 mt-2">campalertwi.com/account</p>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      Or continue with free email-only alerts (standard monitoring instead of instant).
                    </p>
                    <p className="text-gray-600">— The Camp Alert Team</p>
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                      <p>Camp Alert Wisconsin</p>
                    </div>
                  </div>
                </div>
              )}

              {showEmailPreview === 'card-expiring' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <p className="text-sm"><span className="font-bold">From:</span> Camp Alert Wisconsin &lt;alerts@campalertwi.com&gt;</p>
                    <p className="text-sm"><span className="font-bold">To:</span> {userAccount.email || 'pro@campalert.com'}</p>
                    <p className="text-sm"><span className="font-bold">Subject:</span> Camp Alert: Your payment method is expiring soon</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">CAMP ALERT</div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Update Your Payment Method</h2>
                    <p className="text-gray-600 mb-4">Hi there,</p>
                    <p className="text-gray-600 mb-4">
                      Your credit card ending in <span className="font-bold">4242</span> is expiring soon. Please update your payment method to ensure uninterrupted service.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-yellow-800"><span className="font-bold">Card Expiration:</span> 02/2025</p>
                      <p className="text-sm text-yellow-800"><span className="font-bold">Next Renewal:</span> {userAccount.nextBillDate}</p>
                    </div>
                    <p className="text-gray-600 mb-4">
                      If your card expires before your next renewal, your subscription will be paused and you'll stop receiving SMS alerts.
                    </p>
                    <div className="text-center mb-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold">Update Payment Method →</button>
                      <p className="text-xs text-gray-500 mt-2">campalertwi.com/account</p>
                    </div>
                    <p className="text-gray-600">— The Camp Alert Team</p>
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                      <p>Camp Alert Wisconsin</p>
                      <p className="mt-1 text-gray-400">You'll receive this reminder again in 1 week if not updated.</p>
                    </div>
                  </div>
                </div>
              )}

              {showEmailPreview === 'renewal-reminder' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <p className="text-sm"><span className="font-bold">From:</span> Camp Alert Wisconsin &lt;alerts@campalertwi.com&gt;</p>
                    <p className="text-sm"><span className="font-bold">To:</span> {userAccount.email || 'pro@campalert.com'}</p>
                    <p className="text-sm"><span className="font-bold">Subject:</span> Camp Alert: Your subscription renews in 3 days</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">CAMP ALERT</div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Subscription Renewal Reminder</h2>
                    <p className="text-gray-600 mb-4">Hi there,</p>
                    <p className="text-gray-600 mb-4">
                      Just a friendly reminder that your Camp Alert Pro subscription will automatically renew in <span className="font-bold">3 days</span>.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm"><span className="font-bold">Plan:</span> {userAccount.plan === 'pro-annual' ? 'Annual' : 'Monthly'}</p>
                      <p className="text-sm"><span className="font-bold">Amount:</span> {userAccount.plan === 'pro-annual' ? '$40.00' : '$5.00'}</p>
                      <p className="text-sm"><span className="font-bold">Renewal Date:</span> {userAccount.nextBillDate}</p>
                      <p className="text-sm"><span className="font-bold">Payment Method:</span> Visa •••• 4242</p>
                    </div>
                    <p className="text-gray-600 mb-4">
                      No action is needed if you'd like to continue. If you want to change your plan or cancel, you can do so from your account.
                    </p>
                    <div className="text-center mb-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold">Manage Subscription →</button>
                      <p className="text-xs text-gray-500 mt-2">campalertwi.com/account</p>
                    </div>
                    <p className="text-gray-600">— The Camp Alert Team</p>
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                      <p>Camp Alert Wisconsin</p>
                    </div>
                  </div>
                </div>
              )}

              {showEmailPreview === 'renewal-receipt' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <p className="text-sm"><span className="font-bold">From:</span> Camp Alert Wisconsin &lt;alerts@campalertwi.com&gt;</p>
                    <p className="text-sm"><span className="font-bold">To:</span> {userAccount.email || 'pro@campalert.com'}</p>
                    <p className="text-sm"><span className="font-bold">Subject:</span> Camp Alert: Payment receipt for your subscription renewal</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">CAMP ALERT</div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Payment Receipt</h2>
                    <p className="text-gray-600 mb-4">Hi there,</p>
                    <p className="text-gray-600 mb-4">
                      Thank you! Your Camp Alert Pro subscription has been renewed. Here's your receipt:
                    </p>
                    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <p className="font-bold">Receipt #CA-2025-001234</p>
                        <p className="text-sm text-gray-500">January 15, 2025</p>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Camp Alert Pro ({userAccount.plan === 'pro-annual' ? 'Annual' : 'Monthly'})</span>
                          <span className="font-bold">{userAccount.plan === 'pro-annual' ? '$40.00' : '$5.00'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Tax</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between py-2 font-bold">
                          <span>Total</span>
                          <span>{userAccount.plan === 'pro-annual' ? '$40.00' : '$5.00'}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-sm text-gray-600">
                        <p><span className="font-medium">Payment Method:</span> Visa •••• 4242</p>
                        <p><span className="font-medium">Next Renewal:</span> {userAccount.plan === 'pro-annual' ? 'January 15, 2026' : 'February 15, 2025'}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Your SMS alerts will continue uninterrupted. Thank you for being a Pro member!
                    </p>
                    <div className="text-center mb-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold">View My Account →</button>
                      <p className="text-xs text-gray-500 mt-2">campalertwi.com/account</p>
                    </div>
                    <p className="text-gray-600">— The Camp Alert Team</p>
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                      <p>Camp Alert Wisconsin</p>
                      <p className="mt-1">Questions about this charge? Reply to this email.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500 mb-2 font-medium">Preview all email templates:</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setShowEmailPreview('alert-created')} className={`px-3 py-1 rounded text-xs font-medium ${showEmailPreview === 'alert-created' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Alert Created</button>
                <button onClick={() => setShowEmailPreview('plan-change')} className={`px-3 py-1 rounded text-xs font-medium ${showEmailPreview === 'plan-change' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Plan Change</button>
                <button onClick={() => setShowEmailPreview('alert-expired-free')} className={`px-3 py-1 rounded text-xs font-medium ${showEmailPreview === 'alert-expired-free' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Alert Ended (Free)</button>
                <button onClick={() => setShowEmailPreview('alert-expired-pro')} className={`px-3 py-1 rounded text-xs font-medium ${showEmailPreview === 'alert-expired-pro' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Sub Ended</button>
                <button onClick={() => setShowEmailPreview('card-expiring')} className={`px-3 py-1 rounded text-xs font-medium ${showEmailPreview === 'card-expiring' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Card Expiring</button>
                <button onClick={() => setShowEmailPreview('renewal-reminder')} className={`px-3 py-1 rounded text-xs font-medium ${showEmailPreview === 'renewal-reminder' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Renewal Reminder</button>
                <button onClick={() => setShowEmailPreview('renewal-receipt')} className={`px-3 py-1 rounded text-xs font-medium ${showEmailPreview === 'renewal-receipt' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Receipt</button>
              </div>
              <div className="mt-3 flex justify-end">
                <button onClick={() => setShowEmailPreview(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Nav />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6"><span className="text-green-700 font-medium">Wisconsin State Parks</span></div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Never Miss a <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">Campsite</span> Again</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Get instant alerts when campsites open up. Filter by site type, electric hookups, and equipment.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['49 Parks', '6,000+ Sites', 'Instant Alerts'].map((stat, i) => (<div key={i} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md"><svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-sm font-medium">{stat}</span></div>))}
          </div>
        </div>
      </section>

      <section id="create-alert" className="py-8 px-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-black mb-6 text-center">Create Your Alert</h2>
            {alertCreated ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                <h3 className="text-xl font-bold mb-2">Alert Created!</h3>
                <p className="text-gray-600 mb-2">We'll notify you when a matching campsite becomes available.</p>
                <p className="text-sm text-gray-500 mb-2">A confirmation email has been sent to {email}.</p>
                {getFilterSummary().length > 0 && (<div className="mt-4 p-3 bg-green-50 rounded-lg"><p className="text-sm text-green-700"><span className="font-bold">Filters:</span> {getFilterSummary().join(', ')}</p></div>)}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">
                    {wantsSMS ? 'Your alert will remain active as long as your subscription is active.' : 'Free alerts are active for 30 days. Upgrade for unlimited monitoring.'}
                  </p>
                </div>
                <button onClick={() => setShowEmailPreview('alert-created')} className="mt-4 text-green-600 font-bold text-sm">Preview confirmation email →</button>
                <div className="mt-4">
                  <button onClick={() => { setAlertCreated(false); setSelectedPark(''); setCheckInDate(''); setCheckOutDate(''); setSiteType('any'); setElectricOption('any'); setEquipmentType('any'); }} className="text-green-600 font-bold">Create Another Alert</button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select State Park</label>
                  <select value={selectedPark} onChange={(e) => setSelectedPark(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white">
                    <option value="">Choose a park...</option>
                    <optgroup label="Most Popular">{wisconsinParks.filter(p => p.popular).map(park => (<option key={park.id} value={park.id}>{park.name}</option>))}</optgroup>
                    <optgroup label="All Parks">{wisconsinParks.filter(p => !p.popular).map(park => (<option key={park.id} value={park.id}>{park.name}</option>))}</optgroup>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-bold text-gray-700 mb-2">Check-in Date</label><input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none" /></div>
                  <div><label className="block text-sm font-bold text-gray-700 mb-2">Check-out Date</label><input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate || new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className="block text-sm font-bold text-gray-700 mb-2">Site Type</label><select value={siteType} onChange={(e) => setSiteType(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white text-sm">{siteTypeOptions.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}</select></div>
                  <div><label className="block text-sm font-bold text-gray-700 mb-2">Electrical</label><select value={electricOption} onChange={(e) => setElectricOption(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white text-sm">{electricOptions.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}</select></div>
                  <div><label className="block text-sm font-bold text-gray-700 mb-2">Equipment</label><select value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white text-sm">{equipmentOptions.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}</select></div>
                </div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none" /></div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={wantsSMS} onChange={(e) => { setWantsSMS(e.target.checked); if (e.target.checked) setSelectedPlan('monthly'); }} className="w-5 h-5 mt-0.5 text-green-600 border-2 border-green-300 rounded" />
                    <div><div className="font-bold text-green-800">Add SMS Text Alerts</div><div className="text-sm text-green-700">Get notified instantly. <span className="font-medium">Requires paid plan.</span></div></div>
                  </label>
                  {wantsSMS && (<div className="mt-4"><input type="tel" value={phone} onChange={(e) => setPhone(formatPhoneNumber(e.target.value))} placeholder="(555) 123-4567" className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none" /></div>)}
                </div>
                {wantsSMS && (
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setSelectedPlan('monthly')} className={`p-4 rounded-xl border-2 text-left ${selectedPlan === 'monthly' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}><div className="font-bold">Monthly</div><div className="text-2xl font-black text-green-600">$5<span className="text-sm font-normal text-gray-500">/mo</span></div></button>
                    <button onClick={() => setSelectedPlan('annual')} className={`p-4 rounded-xl border-2 text-left relative ${selectedPlan === 'annual' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}><div className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full">SAVE 33%</div><div className="font-bold">Annual</div><div className="text-2xl font-black text-green-600">$40<span className="text-sm font-normal text-gray-500">/yr</span></div></button>
                  </div>
                )}
                <button onClick={handleCreateAlert} disabled={!selectedPark || !checkInDate || !checkOutDate || !email} className={`w-full py-4 rounded-xl font-bold text-lg ${selectedPark && checkInDate && checkOutDate && email ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-xl' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>{wantsSMS ? `Start Alert - $${selectedPlan === 'annual' ? '40/year' : '5/month'}` : 'Create Free Email Alert'}</button>
                <p className="text-xs text-center text-gray-500">By creating an alert, you agree to our <button onClick={() => setShowTermsPage(true)} className="text-green-600">Terms</button> and <button onClick={() => setShowPrivacyPage(true)} className="text-green-600">Privacy Policy</button>.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="how" className="py-16 px-6 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ n: '1', t: 'Set Your Alert', d: 'Choose your park, dates, site type, and notification method.' },{ n: '2', t: 'We Monitor 24/7', d: 'Our system checks for cancellations every few minutes.' },{ n: '3', t: 'Book Instantly', d: 'Get alerted and book directly with Wisconsin State Parks.' }].map((s, i) => (<div key={i} className="text-center"><div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"><span className="text-2xl font-black text-green-600">{s.n}</span></div><h3 className="font-bold text-lg mb-2">{s.t}</h3><p className="text-gray-600">{s.d}</p></div>))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">Simple Pricing</h2>
          <p className="text-gray-600 text-center mb-12">Start free, upgrade for SMS alerts</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-6"><h3 className="font-bold text-xl mb-2">Email Alerts</h3><div className="text-4xl font-black">Free</div></div>
              <ul className="space-y-3 mb-8">
                {['Unlimited email alerts', 'All 49 state parks', 'All campsite filters', 'Standard monitoring'].map((f, i) => (<li key={i} className="flex items-center gap-2"><svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span>{f}</span></li>))}
              </ul>
              <button onClick={scrollToAlert} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200">Get Started Free</button>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">MOST POPULAR</div>
              <div className="text-center mb-6"><h3 className="font-bold text-xl mb-2">SMS + Email</h3><div className="text-4xl font-black">$5<span className="text-lg font-normal opacity-80">/month</span></div><p className="text-sm opacity-80 mt-1">or $40/year (save 33%)</p></div>
              <ul className="space-y-3 mb-8">
                {['Unlimited email alerts', 'All 49 state parks', 'All campsite filters', 'Instant SMS alerts', 'Faster monitoring', 'Priority notifications'].map((f, i) => (<li key={i} className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className={i >= 3 ? 'font-bold' : ''}>{f}</span></li>))}
              </ul>
              <button onClick={scrollToAlert} className="w-full py-3 bg-white text-green-600 rounded-xl font-bold hover:bg-gray-50">Start SMS Alerts</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">Popular Wisconsin Parks</h2>
          <p className="text-gray-600 text-center mb-12">These parks fill up fast - set an alert to catch cancellations</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wisconsinParks.filter(p => p.popular).map(park => (<div key={park.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"><h3 className="font-bold text-lg text-gray-800">{park.name}</h3><p className="text-sm text-gray-500 mb-4">{park.region} Wisconsin</p><button onClick={() => { setSelectedPark(park.id); scrollToAlert(); }} className="text-green-600 font-bold text-sm hover:text-green-700">Set Alert →</button></div>))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Don't Miss Your Perfect Campsite</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of Wisconsin campers who never miss a cancellation.</p>
          <button onClick={scrollToAlert} className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl">Create Your Free Alert</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampAlertWisconsin;
