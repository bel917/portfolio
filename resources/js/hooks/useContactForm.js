import { useState } from 'react';

const emptyForm = {
    name: '',
    email: '',
    message: '',
};

export function useContactForm() {
    const [formData, setFormData] = useState(emptyForm);
    const [formErrors, setFormErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFormErrors({});
        setSubmitMessage('');

        try {
            const response = await window.axios.post('/api/contact-messages', formData);
            setSubmitMessage(response.data.message);
            setFormData(emptyForm);
        } catch (error) {
            if (error.response?.status === 422) {
                setFormErrors(error.response.data.errors || {});
                setSubmitMessage('Please fix the highlighted fields and try again.');
            } else {
                setSubmitMessage('Something went wrong while sending your message.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        formErrors,
        submitMessage,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
}
