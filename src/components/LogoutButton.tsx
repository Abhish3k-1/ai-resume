"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 rounded-xl hover:bg-red-50/50 transition-all cursor-pointer"
        >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
        </button>
    );
}
