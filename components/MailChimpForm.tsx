'use client'

import { useState } from 'react'
import jsonp from 'jsonp'
import { cx } from 'lib/cx'

// Mailchimp URL
// u=2f59f4888aeaef053a48ad2bc (User ID)
// id=100146c012 (Form ID)
const MAILCHIMP_URL =
'https://facebook.us10.list-manage.com/subscribe/post?u=2f59f4888aeaef053a48ad2bc&id=100146c012'

// Honeypot Field: MUST be included with an empty value to pass Mailchimp's bot check.
const HONEYPOT_FIELD = 'b_2f59f4888aeaef053a48ad2bc_100146c012';

const MailchimpForm = () => {
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    // Prevent submission if email is missing
    if (!email) return;

    setSubmitting(true)
    setStatus(null)
    setError(null)

    let url = MAILCHIMP_URL.replace('/post?', '/post-json?')
    
    // Ensure all values are URL-encoded
    const encodedEmail = encodeURIComponent(email)
    const encodedFirstName = encodeURIComponent(firstName)
    const encodedLastName = encodeURIComponent(lastName)
    
    // ADDED: The required honeypot field with an empty value
    const encodedHoneypot = encodeURIComponent(''); // Empty string is the key!

    // Construct the data string with all required fields
    const dataString = `&EMAIL=${encodedEmail}&FNAME=${encodedFirstName}&LNAME=${encodedLastName}&${HONEYPOT_FIELD}=${encodedHoneypot}`

    jsonp(`${url}${dataString}`, { param: 'c' }, (err: any, data: any) => {
      if (err) {
        // Handle network error
        setStatus('error')
        setError("Network error or invalid JSONP response.")
      } else if (data.result !== 'success') {
        // Handle Mailchimp validation/list error
        setStatus('error')
        // Show the message returned by Mailchimp
        setError(data.msg)
      } else {
        // Success
        setStatus('success')
        // Clear fields on success
        setEmail('')
        setFirstName('')
        setLastName('')
        setError(data.msg)
      }
      setSubmitting(false)
    })
  }

  return (
    <div className="MailchimpForm w-full">
      <form
        onSubmit={onSubmit}
        className={cx(status === 'success' ? 'hidden' : '', 'flex flex-col gap-3')}
      >
        
        {/* Name Fields: Two-column grid for Names on md screens, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* First Name Field */}
            <div className='flex flex-col'>
                <label htmlFor="FNAME" className="text-label font-semibold text-label mb-1">First Name (Optional)</label>
                <input
                    type="text"
                    name="FNAME"
                    id="FNAME"
                    className="p-2 text-small bg-paper border border-line rounded-sm focus:ring-forest focus:border-forest"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName} // Added value binding
                />
            </div>
            
            {/* Last Name Field */}
            <div className='flex flex-col'>
                <label htmlFor="LNAME" className="text-label font-semibold text-label mb-1">Last Name (Optional)</label>
                <input
                    type="text"
                    name="LNAME"
                    id="LNAME"
                    className="p-2 text-small bg-paper border border-line rounded-sm focus:ring-forest focus:border-forest"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName} // Added value binding
                />
            </div>
        </div>

        {/* Email and Button: Horizontal Layout (Flex) */}
        <div className="flex gap-3">
            {/* Email Field */}
            <div className='flex flex-col flex-grow'>
                <label htmlFor="EMAIL" className="text-label font-semibold text-label mb-1 sr-only">Email</label>
                <input
                    type="email"
                    name="EMAIL"
                    id="EMAIL"
                    placeholder="Enter your email"
                    className="p-3 text-small bg-paper border border-line rounded-sm focus:ring-forest focus:border-forest w-full"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} // Added value binding
                />
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={submitting || !email} 
                className="btn btn-primary disabled:opacity-50 text-small flex-shrink-0"
            >
              {submitting ? 'Sending...' : 'Subscribe'}
            </button>
        </div>
      </form>

      {/* Messages (Styling adjusted for clearer error message display) */}
      <div
        className={cx(
          'success',
          status === 'success' ? '' : 'hidden',
          'mt-4 text-forest text-small',
        )}
      >
        <p>Thanks for subscribing! You'll receive our next update shortly.</p>
      </div>

      <div
        className={cx('error', status === 'error' ? '' : 'hidden', 'mt-4 pl-3 border-l-4 border-coral text-forest text-small')}
      >
        <p>
          There was an error subscribing you: <span dangerouslySetInnerHTML={{ __html: error || 'Please check your email address and try again.' }} />
        </p>
      </div>
    </div>
  )
}

export default MailchimpForm