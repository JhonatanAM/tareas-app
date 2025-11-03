import { useState } from "react";

type Breed = {
    id: string;
    name: string;
};

type CatImage = {
    id: string;
    url: string;
    breeds?: Breed[];
};

const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY",
});

const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
};

export function useCatApi() {
    const [cat, setCat] = useState<CatImage | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCat = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
                requestOptions
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = (await res.json()) as CatImage[];
            setCat(json[0] ?? null);
        } catch (err: any) {
            setError(err.message ?? "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    return { cat, loading, error, fetchCat };
}
