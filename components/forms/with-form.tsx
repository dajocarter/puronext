import { useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function withForm(
  InputFields: () => JSX.Element,
  formName: string
) {
  return function FormInputs() {
    const [status, setStatus] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const myForm = e.currentTarget
      const formData = new FormData(myForm)

      try {
        const res = await fetch('/__forms.html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        })
        if (res.status === 200) {
          setStatus('ok')
          myForm.reset()
        } else {
          setStatus('error')
        }
      } catch (e) {
        setStatus('error')
      }
    }

    return (
      <form name={formName} onSubmit={handleSubmit}>
        <input type='hidden' name='form-name' value={formName} />
        <p className='d-none'>
          <label>
            Don’t fill this out: <input type='text' name='bot-field' />
          </label>
        </p>
        <InputFields />
        <input
          type='hidden'
          name='_subject'
          value={`New submission from ${formName} form.`}
        />
        <Button type='submit' variant='light'>
          Submit
        </Button>
        {status === 'ok' && (
          <div className='alert alert-success mt-3'>
            Thank you for your submission!
          </div>
        )}
        {status === 'error' && (
          <div className='alert alert-danger mt-3'>
            Something went wrong. Please try again.
          </div>
        )}
      </form>
    )
  }
}
