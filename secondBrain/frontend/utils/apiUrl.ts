export default function apiUrl(env, local, prod) {
    if (env === "development") {
        return local
    } else {
        return prod;
    }
}
