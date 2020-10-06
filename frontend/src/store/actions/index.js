export function toggleSection(module, section) {
    return {
        type: 'TOGGLE_SECTION',
        module,
        section
    }
}