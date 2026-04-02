export function ContactSection({
    formData,
    formErrors,
    submitMessage,
    isSubmitting,
    onChange,
    onSubmit,
}) {
    return (
        <section id="contact" className="panel contact-grid">
            <div>
                <p className="eyebrow">Contact</p>
                <h2 className="section-title">Let&apos;s build something thoughtful and easy to use.</h2>
                <p className="section-copy">Send a quick message and it will be validated and stored by the Laravel backend.</p>
            </div>

            <form className="contact-form" onSubmit={onSubmit} noValidate>
                <label>
                    <span>Name</span>
                    <input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Your name" />
                    {formErrors.name ? <small>{formErrors.name[0]}</small> : null}
                </label>

                <label>
                    <span>Email</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        placeholder="you@example.com"
                    />
                    {formErrors.email ? <small>{formErrors.email[0]}</small> : null}
                </label>

                <label>
                    <span>Message</span>
                    <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={onChange}
                        placeholder="Tell me a little about your project..."
                    />
                    {formErrors.message ? <small>{formErrors.message[0]}</small> : null}
                </label>

                <div className="form-footer">
                    <button type="submit" className="button button-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    {submitMessage ? <p className="form-message">{submitMessage}</p> : null}
                </div>
            </form>
        </section>
    );
}
