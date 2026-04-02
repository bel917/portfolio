import { useEffect, useState } from 'react';

const initialPortfolio = {
    profile: null,
    skills: [],
    projects: [],
};

export function usePortfolio() {
    const [portfolio, setPortfolio] = useState(initialPortfolio);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                const response = await window.axios.get('/api/portfolio');
                setPortfolio(response.data);
            } catch (error) {
                setLoadError('Unable to load portfolio data right now.');
            } finally {
                setLoading(false);
            }
        };

        loadPortfolio();
    }, []);

    return {
        portfolio,
        loading,
        loadError,
    };
}
