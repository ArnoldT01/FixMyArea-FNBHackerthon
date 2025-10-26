import { supabase } from "@/lib/supabaseClient";
import { Issue } from "./issuesService";

export function subscribeToIssues(
    onInsert: (issue: Issue) => void,
    onUpdate: (issue: Issue) => void,
    onDelete: (issue: Issue) => void
) {
    const channel = supabase
        .channel("public:Issues")
        .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "Issues" },
            (payload) => onInsert(payload.new as Issue)
        )
        .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "Issues" },
            (payload) => onUpdate(payload.new as Issue)
        )
        .on(
            "postgres_changes",
            { event: "DELETE", schema: "public", table: "Issues" },
            (payload) => onDelete(payload.old as Issue)
        )
        .subscribe();

    return {
        unsubscribe: () => channel.unsubscribe(),
    };
}
