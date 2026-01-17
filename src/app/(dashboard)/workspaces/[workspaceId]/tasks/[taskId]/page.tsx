"use client"

import { useCurrent } from "@/features/auth/api/use-current";
import { redirect } from "next/navigation";
import { TaskIdClient } from "./client";

const TaskIdPage = async () => {
    const user = await useCurrent();
    if(!user) redirect("/sign-in");

    return (
        <div>
            <TaskIdClient />
        </div>
    )
}

export default TaskIdPage;