import { supabase } from "@/lib/supabaseClient";

export type Issue = {
    id: number;
    category: string;
    status: string;
    location: string;
    date_reported: string;
    description: string;
    images: string | string[];
};

export async function fetchIssues(): Promise<Issue[]> {
    const { data, error } = await supabase
        .from("Issues")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching issues:", error);
        return [];
    }

    return data || [];
}

export function parseIssueImages(images: string | string[]): string[] {
    if (Array.isArray(images)) return images;
    try {
        return JSON.parse(images || "[]");
    } catch {
        return [];
    }
}
