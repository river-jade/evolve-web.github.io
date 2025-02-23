'use client'

import { useState } from 'react'
import jsonp from 'jsonp'
import { cx } from 'app/lib/cx'

const MAILCHIMP_URL =
  'https://facebook.us10.list-manage.com/subscribe/post?u=2f59f4888aeaef053a48ad2bc&amp;id=100146c012&amp;f_id=005857e4f0'

/**
 * https://triplethreat.dev/blog/using-mailchimp-with-nextjs
 */
const MailchimpForm = () => {
  const [email, setEmail] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    console.log('onSubmit', { email })

    setSubmitting(true)
    setStatus(null)
    setError(null)

    let url = MAILCHIMP_URL.replace('/post?', '/post-json?')
    jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, (err: any, data: any) => {
      if (err) {
        setStatus('error')
        setError(err)
      } else if (data.result !== 'success') {
        setStatus('error')
        setError(data.msg)
      } else {
        setStatus('success')
        setError(data.msg)
      }
      setSubmitting(false)
    })
  }

  return (
    <div className="MailchimpForm">
      <form onSubmit={onSubmit} className={cx(status == 'success' ? 'hidden' : '', 'flex')}>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="EMAIL" className="" required onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" disabled={submitting || !email} className="">
          Subscribe
        </button>
      </form>

      <div className={cx('success', status == 'success' ? '' : 'hidden', 'flex gap-3')}>
        <p className="text-lg leading-8">Thanks for subscribing!</p>
      </div>

      <div className={cx('error', status == 'error' ? '' : 'hidden', 'flex gap-3')}>
        <p className="text-lg leading-8">There was an error subscribing you to our mailing list: {error}</p>
      </div>
    </div>
  )
}

export default MailchimpForm
