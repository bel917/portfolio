export function splitName(name) {
    const parts = name.trim().split(/\s+/);

    return {
        firstName: parts[0] || name,
        lastName: parts.slice(1).join(' ') || parts[0] || name,
    };
}
