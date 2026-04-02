import { navigationItems } from '../../constants/navigation';

export function Header({ name, theme, onToggleTheme }) {
    const themeLabel = theme === 'light' ? 'Dark mode' : 'Light mode';

    return (
        <header className="site-header">
            <a className="brand" href="#home">
                <span>{name}</span>
                <small>Software Developer</small>
            </a>

            <nav className="site-nav" aria-label="Primary">
                {navigationItems.map((item) => (
                    <a key={item.id} href={`#${item.id}`}>
                        {item.label}
                    </a>
                ))}
            </nav>

            <button
                type="button"
                className="theme-toggle"
                onClick={onToggleTheme}
                aria-label={`Switch to ${themeLabel}`}
            >
                {themeLabel}
            </button>
        </header>
    );
}
