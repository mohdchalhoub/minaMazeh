# Email Setup Instructions

## EmailJS Configuration

To enable email functionality in the contact form, you need to set up EmailJS and configure environment variables.

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Create a new service (Gmail, Outlook, etc.)
4. Create an email template

### 2. Email Template Setup
Create a template with these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Email message
- `{{to_email}}` - Recipient email (mazehmina@gmail.com)

### 3. Environment Variables
Create a `.env.local` file in your project root with:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 4. Get Your Credentials
1. **Service ID**: Found in EmailJS dashboard under "Services"
2. **Template ID**: Found in EmailJS dashboard under "Email Templates"
3. **Public Key**: Found in EmailJS dashboard under "Account" > "General"

### 5. Test the Setup
1. Start your development server: `pnpm dev`
2. Go to the contact form
3. Fill out and submit the form
4. Check mazehmina@gmail.com for the email

### Alternative: Direct Email Link
If you prefer not to use EmailJS, you can modify the form to open the user's email client:

```javascript
const handleEmailClient = () => {
  const subject = encodeURIComponent(formData.subject)
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )
  window.open(`mailto:mazehmina@gmail.com?subject=${subject}&body=${body}`)
}
```
