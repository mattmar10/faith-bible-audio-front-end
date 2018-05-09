export default function hasErrors(result) {
    if (result === undefined) {
        return false;
    }
    return result.errors !== undefined || result.error !== undefined
}

