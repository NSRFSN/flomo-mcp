/**
 * Flomo client used to interact with Flomo API.
 * */
export class FlomoClient {

    private readonly apiUrl: string;

    /**
     * Create a new Flomo client.
     * @param apiUrl - The API URL of te Flomo API.
     * */
    constructor({apiUrl}: { apiUrl: string }) {
        this.apiUrl = apiUrl;
    }

    /**
     * Write a note to Flomo
     * @param content - The content of the note.
     * @returns The response from the Flomo API.
     * */
    async writeNote({content}: {content: string}) {
        try {
            if (!content) {
                throw new Error("Invalid content");
            }

            const req = {
                content
            };

            const resp = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })

            if (!resp.ok) {
                throw new Error(`request failed with status ${resp.status}`);
            }

            let result = await resp.json();

            if (result && result.memo && result.memo.slug) {
                result.memo.url = `https://v.flomoapp.com/mine/?memo_id=${result.memo.slug}`;
            }
            return result;
        } catch (e) {
            throw e;
        }
    }
}